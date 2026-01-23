import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import ActivityTimeline from '../../components/crm/ActivityTimeline';
import { getWhatsAppUrl, getWhatsAppMessage } from '../../utils/whatsappUtils';
import { useNotifications } from '../../context/NotificationContext';
import toast from 'react-hot-toast';
import './LeadsPage.css';

const LeadsPage = () => {
    const { createNotification } = useNotifications();
    const [leads, setLeads] = useState([]);
    const [filteredLeads, setFilteredLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingLead, setEditingLead] = useState(null);
    const [activeTab, setActiveTab] = useState('details'); // 'details' or 'history'
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({
        estado: 'all',
        fuente: 'all',
        search: '',
        dateRange: 'all', // all, today, week, month
        minValue: '',
    });

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        empresa: '',
        fuente: 'web',
        estado: 'nuevo',
        valor_estimado: 0,
        asignado_a: '',
        notas: '',
    });

    const [searchParams] = useSearchParams();

    useEffect(() => {
        loadLeads();
        loadUsers();
    }, []);

    // Check for ID in URL to open modal automatically
    useEffect(() => {
        if (!loading && leads.length > 0) {
            const leadIdFromUrl = searchParams.get('id');
            if (leadIdFromUrl) {
                const leadToOpen = leads.find(l => l.id === leadIdFromUrl);
                if (leadToOpen) {
                    handleEdit(leadToOpen);
                    // Optional: remove param from URL without refreshing
                    window.history.replaceState({}, '', '/crm/leads');
                }
            }
        }
    }, [loading, leads, searchParams]);

    useEffect(() => {
        applyFilters();
    }, [leads, filters]);

    const loadLeads = async () => {
        try {
            const { data, error } = await supabase
                .from('leads')
                .select('*, user_profiles:asignado_a(nombre_completo)')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setLeads(data || []);
        } catch (error) {
            console.error('Error loading leads:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadUsers = async () => {
        try {
            const { data } = await supabase
                .from('user_profiles')
                .select('id, nombre_completo')
                .eq('activo', true)
                .in('rol', ['admin', 'vendedor']); // Only show staff
            setUsers(data || []);
        } catch (error) {
            console.error('Error loading users:', error);
        }
    };

    const applyFilters = () => {
        let filtered = [...leads];

        if (filters.estado !== 'all') {
            filtered = filtered.filter(lead => lead.estado === filters.estado);
        }

        if (filters.fuente !== 'all') {
            filtered = filtered.filter(lead => lead.fuente === filters.fuente);
        }

        if (filters.minValue) {
            filtered = filtered.filter(lead => (lead.valor_estimado || 0) >= Number(filters.minValue));
        }

        if (filters.dateRange !== 'all') {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            filtered = filtered.filter(lead => {
                const leadDate = new Date(lead.created_at);
                if (filters.dateRange === 'today') {
                    return leadDate >= today;
                } else if (filters.dateRange === 'week') {
                    const weekAgo = new Date(today);
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return leadDate >= weekAgo;
                } else if (filters.dateRange === 'month') {
                    const monthAgo = new Date(today);
                    monthAgo.setMonth(monthAgo.getMonth() - 1);
                    return leadDate >= monthAgo;
                }
                return true;
            });
        }

        if (filters.search) {
            const search = filters.search.toLowerCase();
            filtered = filtered.filter(lead =>
                lead.nombre?.toLowerCase().includes(search) ||
                lead.email?.toLowerCase().includes(search) ||
                lead.empresa?.toLowerCase().includes(search)
            );
        }

        setFilteredLeads(filtered);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Guardando...');

        try {
            const payload = {
                ...formData,
                asignado_a: formData.asignado_a || null,
            };

            if (editingLead) {
                // Update
                const { error } = await supabase
                    .from('leads')
                    .update({
                        ...payload,
                        updated_at: new Date().toISOString(),
                    })
                    .eq('id', editingLead.id);

                if (error) throw error;

                // Log activity
                await supabase.from('activities').insert({
                    tipo: 'cambio_estado',
                    titulo: 'Lead actualizado',
                    descripcion: `${formData.nombre} fue actualizado`,
                    relacionado_con: 'lead',
                    relacionado_id: editingLead.id,
                    usuario_id: payload.asignado_a
                });

                // Notify assignee if changed
                if (payload.asignado_a && payload.asignado_a !== editingLead.asignado_a) {
                    createNotification(
                        payload.asignado_a,
                        'Lead Asignado',
                        `Se te ha asignado el lead: ${formData.nombre}`,
                        'info',
                        '/crm/leads'
                    );
                }

                toast.success('Lead actualizado correctamente', { id: toastId });

            } else {
                // Create
                const { data, error } = await supabase
                    .from('leads')
                    .insert([payload])
                    .select()
                    .single();

                if (error) throw error;

                // Log activity
                await supabase.from('activities').insert({
                    tipo: 'nota',
                    titulo: 'Nuevo lead creado',
                    descripcion: `${formData.nombre} fue agregado como nuevo lead`,
                    relacionado_con: 'lead',
                    relacionado_id: data.id,
                });

                // Notify assignee
                if (payload.asignado_a) {
                    createNotification(
                        payload.asignado_a,
                        'Nuevo Lead',
                        `Se te ha asignado un nuevo lead: ${formData.nombre}`,
                        'success',
                        '/crm/leads'
                    );
                }

                toast.success('Lead creado correctamente', { id: toastId });
            }

            setShowModal(false);
            setEditingLead(null);
            resetForm();
            loadLeads();
        } catch (error) {
            console.error('Error saving lead:', error);
            toast.error('Error al guardar el lead', { id: toastId });
        }
    };

    const handleEdit = (lead) => {
        setEditingLead(lead);
        setFormData({
            nombre: lead.nombre || '',
            email: lead.email || '',
            telefono: lead.telefono || '',
            empresa: lead.empresa || '',
            fuente: lead.fuente || 'web',
            estado: lead.estado || 'nuevo',
            valor_estimado: lead.valor_estimado || 0,
            asignado_a: lead.asignado_a || '',
            notas: lead.notas || '',
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('¿Estás seguro de eliminar este lead?')) return;

        try {
            const { error } = await supabase
                .from('leads')
                .delete()
                .eq('id', id);

            if (error) throw error;
            loadLeads();
        } catch (error) {
            console.error('Error deleting lead:', error);
            alert('Error al eliminar el lead');
        }
    };

    const resetForm = () => {
        setFormData({
            nombre: '',
            email: '',
            telefono: '',
            empresa: '',
            fuente: 'web',
            estado: 'nuevo',
            valor_estimado: 0,
            asignado_a: '',
            notas: '',
        });
    };

    const getEstadoBadge = (estado) => {
        const badges = {
            nuevo: { label: 'Nuevo', class: 'badge-new' },
            contactado: { label: 'Contactado', class: 'badge-contacted' },
            calificado: { label: 'Calificado', class: 'badge-qualified' },
            propuesta: { label: 'Propuesta', class: 'badge-proposal' },
            ganado: { label: 'Ganado', class: 'badge-won' },
            perdido: { label: 'Perdido', class: 'badge-lost' },
        };
        return badges[estado] || badges.nuevo;
    };

    if (loading) {
        return <div className="crm-loading">Cargando leads...</div>;
    }

    return (
        <div className="leads-page">
            <div className="leads-header">
                <div>
                    <h1>Gestión de Leads</h1>
                    <p>{filteredLeads.length} leads encontrados</p>
                </div>
                <button className="btn-primary" onClick={() => setShowModal(true)}>
                    ➕ Nuevo Lead
                </button>
            </div>

            <div className="leads-filters">
                <input
                    type="text"
                    placeholder="Buscar por nombre, email o empresa..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="search-input"
                />
                <select
                    value={filters.estado}
                    onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
                    className="filter-select"
                >
                    <option value="all">Todos los estados</option>
                    <option value="nuevo">Nuevo</option>
                    <option value="contactado">Contactado</option>
                    <option value="calificado">Calificado</option>
                    <option value="propuesta">Propuesta</option>
                    <option value="ganado">Ganado</option>
                    <option value="perdido">Perdido</option>
                </select>

                <select
                    value={filters.fuente}
                    onChange={(e) => setFilters({ ...filters, fuente: e.target.value })}
                    className="filter-select"
                >
                    <option value="all">Todas las fuentes</option>
                    <option value="web">Web</option>
                    <option value="referido">Referido</option>
                    <option value="redes_sociales">Redes Sociales</option>
                </select>

                <select
                    value={filters.dateRange}
                    onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                    className="filter-select"
                >
                    <option value="all">Cualquier fecha</option>
                    <option value="today">Hoy</option>
                    <option value="week">Última semana</option>
                    <option value="month">Último mes</option>
                </select>

                <input
                    type="number"
                    placeholder="Valor min ($)"
                    value={filters.minValue}
                    onChange={(e) => setFilters({ ...filters, minValue: e.target.value })}
                    className="filter-input-small"
                />
            </div>

            <div className="leads-table-container">
                <table className="leads-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Empresa</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Estado</th>
                            <th>Valor Est.</th>
                            <th>Asignado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeads.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="empty-state">
                                    No hay leads para mostrar
                                </td>
                            </tr>
                        ) : (
                            filteredLeads.map((lead) => {
                                const badge = getEstadoBadge(lead.estado);
                                return (
                                    <tr
                                        key={lead.id}
                                        className="lead-row interactive-row"
                                        onClick={() => handleEdit(lead)}
                                    >
                                        <td className="lead-name">{lead.nombre}</td>
                                        <td>{lead.empresa || '-'}</td>
                                        <td>{lead.email || '-'}</td>
                                        <td>{lead.telefono || '-'}</td>
                                        <td>
                                            <span className={`badge ${badge.class}`}>{badge.label}</span>
                                        </td>
                                        <td>${lead.valor_estimado?.toLocaleString() || 0}</td>
                                        <td>{lead.user_profiles?.nombre_completo || 'Sin asignar'}</td>
                                        <td className="actions" onClick={(e) => e.stopPropagation()}>
                                            {lead.telefono && (
                                                <a
                                                    href={getWhatsAppUrl(lead.telefono, getWhatsAppMessage('lead', lead.nombre || ''))}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn-icon btn-whatsapp"
                                                    title="Chat WhatsApp"
                                                >
                                                    💬
                                                </a>
                                            )}
                                            {/* Edit button redundant if row is clickable but kept for clarity */}
                                            <button onClick={(e) => { e.stopPropagation(); handleEdit(lead); }} className="btn-icon" title="Editar">
                                                ✏️
                                            </button>
                                            <button onClick={(e) => { e.stopPropagation(); handleDelete(lead.id); }} className="btn-icon" title="Eliminar">
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => { setShowModal(false); setEditingLead(null); resetForm(); }}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingLead ? 'Editar Lead' : 'Nuevo Lead'}</h2>
                            <button onClick={() => { setShowModal(false); setEditingLead(null); resetForm(); }} className="modal-close">
                                ✕
                            </button>
                        </div>

                        {editingLead ? (
                            <div className="modal-tabs">
                                <button
                                    className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('details')}
                                >
                                    Detalles
                                </button>
                                <button
                                    className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('history')}
                                >
                                    Historial
                                </button>
                            </div>
                        ) : null}

                        {activeTab === 'details' ? (
                            <form onSubmit={handleSubmit} className="lead-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Nombre *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.nombre}
                                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Teléfono</label>
                                        <input
                                            type="tel"
                                            value={formData.telefono}
                                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Empresa</label>
                                        <input
                                            type="text"
                                            value={formData.empresa}
                                            onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Fuente</label>
                                        <select value={formData.fuente} onChange={(e) => setFormData({ ...formData, fuente: e.target.value })}>
                                            <option value="web">Web</option>
                                            <option value="referido">Referido</option>
                                            <option value="redes_sociales">Redes Sociales</option>
                                            <option value="llamada_fria">Llamada Fría</option>
                                            <option value="evento">Evento</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Estado</label>
                                        <select value={formData.estado} onChange={(e) => setFormData({ ...formData, estado: e.target.value })}>
                                            <option value="nuevo">Nuevo</option>
                                            <option value="contactado">Contactado</option>
                                            <option value="calificado">Calificado</option>
                                            <option value="propuesta">Propuesta</option>
                                            <option value="ganado">Ganado</option>
                                            <option value="perdido">Perdido</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Valor Estimado (COP)</label>
                                        <input
                                            type="number"
                                            value={formData.valor_estimado}
                                            onChange={(e) => setFormData({ ...formData, valor_estimado: parseFloat(e.target.value) || 0 })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Asignar a</label>
                                        <select value={formData.asignado_a} onChange={(e) => setFormData({ ...formData, asignado_a: e.target.value })}>
                                            <option value="">Sin asignar</option>
                                            {users.map(user => (
                                                <option key={user.id} value={user.id}>{user.nombre_completo}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Notas</label>
                                    <textarea
                                        rows="3"
                                        value={formData.notas}
                                        onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="modal-actions">
                                    <button type="button" onClick={() => { setShowModal(false); setEditingLead(null); resetForm(); }} className="btn-secondary">
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn-primary">
                                        {editingLead ? 'Actualizar' : 'Crear'} Lead
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="lead-history-panel">
                                <ActivityTimeline relationType="lead" relationId={editingLead.id} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeadsPage;
