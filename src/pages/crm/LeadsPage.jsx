import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import ActivityTimeline from '../../components/crm/ActivityTimeline';
import './LeadsPage.css';

const LeadsPage = () => {
    const [leads, setLeads] = useState([]);
    const [filteredLeads, setFilteredLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingLead, setEditingLead] = useState(null);
    const [activeTab, setActiveTab] = useState('details'); // 'details' or 'history'
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({
        estado: 'all',
        search: '',
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

    useEffect(() => {
        loadLeads();
        loadUsers();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [leads, filters]);

    const loadLeads = async () => {
        try {
            const { data, error } = await supabase
                .from('leads')
                .select('*')
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
        try {
            const payload = {
                ...formData,
                asignado_a: formData.asignado_a || null, // Convert empty string to null
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
            }

            setShowModal(false);
            setEditingLead(null);
            resetForm();
            loadLeads();
        } catch (error) {
            console.error('Error saving lead:', error);
            alert('Error al guardar el lead');
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
                                    <tr key={lead.id}>
                                        <td className="lead-name">{lead.nombre}</td>
                                        <td>{lead.empresa || '-'}</td>
                                        <td>{lead.email || '-'}</td>
                                        <td>{lead.telefono || '-'}</td>
                                        <td>
                                            <span className={`badge ${badge.class}`}>{badge.label}</span>
                                        </td>
                                        <td>${lead.valor_estimado?.toLocaleString() || 0}</td>
                                        <td>{lead.user_profiles?.nombre_completo || 'Sin asignar'}</td>
                                        <td className="actions">
                                            <button onClick={() => handleEdit(lead)} className="btn-icon" title="Editar">
                                                ✏️
                                            </button>
                                            <button onClick={() => handleDelete(lead.id)} className="btn-icon" title="Eliminar">
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
