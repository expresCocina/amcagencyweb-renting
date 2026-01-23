import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './CRMPipeline.css';

const PipelinePage = () => {
    const [deals, setDeals] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [leads, setLeads] = useState([]);
    const [clients, setClients] = useState([]);
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        valor: 0,
        etapa: 'prospecto',
        probabilidad: 10,
        fecha_estimada_cierre: '',
        lead_id: '',
        cliente_id: '',
        asignado_a: '',
        notas: '',
    });

    const stages = [
        { id: 'prospecto', label: 'Prospecto', color: '#6366f1' },
        { id: 'propuesta', label: 'Propuesta', color: '#8b5cf6' },
        { id: 'negociacion', label: 'Negociación', color: '#ec4899' },
        { id: 'cerrado_ganado', label: 'Ganado', color: '#10b981' },
        { id: 'cerrado_perdido', label: 'Perdido', color: '#ef4444' },
    ];

    useEffect(() => {
        loadDeals();
        loadLeads();
        loadClients();
        loadUsers();
    }, []);

    const loadDeals = async () => {
        const { data } = await supabase
            .from('deals')
            .select(`
        *,
        leads:lead_id (nombre, empresa),
        clients:cliente_id (nombre_negocio),
        user_profiles:asignado_a (nombre_completo)
      `)
            .order('created_at', { ascending: false });
        setDeals(data || []);
    };

    const loadLeads = async () => {
        const { data } = await supabase.from('leads').select('id, nombre, empresa');
        setLeads(data || []);
    };

    const loadClients = async () => {
        const { data } = await supabase.from('clients').select('id, nombre_negocio');
        setClients(data || []);
    };

    const loadUsers = async () => {
        const { data } = await supabase.from('user_profiles').select('id, nombre_completo').eq('activo', true);
        setUsers(data || []);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase.from('deals').insert([{
                ...formData,
                valor: parseFloat(formData.valor) || 0,
                probabilidad: parseInt(formData.probabilidad) || 10,
            }]);

            if (error) throw error;

            setShowModal(false);
            resetForm();
            loadDeals();
        } catch (error) {
            console.error('Error creating deal:', error);
            alert('Error al crear el deal');
        }
    };

    const updateDealStage = async (dealId, newStage) => {
        try {
            const { error } = await supabase
                .from('deals')
                .update({ etapa: newStage })
                .eq('id', dealId);

            if (error) throw error;
            loadDeals();
        } catch (error) {
            console.error('Error updating deal:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            titulo: '',
            descripcion: '',
            valor: 0,
            etapa: 'prospecto',
            probabilidad: 10,
            fecha_estimada_cierre: '',
            lead_id: '',
            cliente_id: '',
            asignado_a: '',
            notas: '',
        });
    };

    const getDealsByStage = (stageId) => {
        return deals.filter(deal => deal.etapa === stageId);
    };

    const getTotalValue = (stageDeals) => {
        return stageDeals.reduce((sum, deal) => sum + (parseFloat(deal.valor) || 0), 0);
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="pipeline-page">
            <div className="pipeline-header">
                <div>
                    <h1>Pipeline de Ventas</h1>
                    <p>{deals.length} oportunidades activas</p>
                </div>
                <button className="btn-primary" onClick={() => setShowModal(true)}>
                    ➕ Nuevo Deal
                </button>
            </div>

            <div className="pipeline-board">
                {stages.map((stage) => {
                    const stageDeals = getDealsByStage(stage.id);
                    const totalValue = getTotalValue(stageDeals);

                    return (
                        <div key={stage.id} className="pipeline-column">
                            <div className="column-header" style={{ borderTopColor: stage.color }}>
                                <h3>{stage.label}</h3>
                                <div className="column-stats">
                                    <span className="deal-count">{stageDeals.length}</span>
                                    <span className="deal-value">{formatCurrency(totalValue)}</span>
                                </div>
                            </div>

                            <div className="column-content">
                                {stageDeals.length === 0 ? (
                                    <div className="empty-column">Sin deals</div>
                                ) : (
                                    stageDeals.map((deal) => (
                                        <div key={deal.id} className="deal-card">
                                            <h4>{deal.titulo}</h4>
                                            <p className="deal-company">
                                                {deal.leads?.empresa || deal.clients?.nombre_negocio || 'Sin empresa'}
                                            </p>
                                            <div className="deal-info">
                                                <span className="deal-amount">{formatCurrency(deal.valor)}</span>
                                                <span className="deal-probability">{deal.probabilidad}%</span>
                                            </div>
                                            {deal.user_profiles?.nombre_completo && (
                                                <p className="deal-assigned">👤 {deal.user_profiles.nombre_completo}</p>
                                            )}

                                            {/* Stage navigation */}
                                            <div className="deal-actions">
                                                {stage.id !== 'prospecto' && stage.id !== 'cerrado_perdido' && (
                                                    <button onClick={() => {
                                                        const currentIndex = stages.findIndex(s => s.id === stage.id);
                                                        if (currentIndex > 0) updateDealStage(deal.id, stages[currentIndex - 1].id);
                                                    }} className="btn-move">←</button>
                                                )}
                                                {stage.id !== 'cerrado_ganado' && stage.id !== 'cerrado_perdido' && (
                                                    <button onClick={() => {
                                                        const currentIndex = stages.findIndex(s => s.id === stage.id);
                                                        if (currentIndex < stages.length - 2) updateDealStage(deal.id, stages[currentIndex + 1].id);
                                                    }} className="btn-move">→</button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => { setShowModal(false); resetForm(); }}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Nuevo Deal</h2>
                            <button onClick={() => { setShowModal(false); resetForm(); }} className="modal-close">✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="deal-form">
                            <div className="form-group">
                                <label>Título *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.titulo}
                                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Valor (COP) *</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.valor}
                                        onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Probabilidad (%)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={formData.probabilidad}
                                        onChange={(e) => setFormData({ ...formData, probabilidad: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Lead</label>
                                    <select value={formData.lead_id} onChange={(e) => setFormData({ ...formData, lead_id: e.target.value })}>
                                        <option value="">Seleccionar lead</option>
                                        {leads.map(lead => (
                                            <option key={lead.id} value={lead.id}>{lead.nombre} - {lead.empresa}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Cliente</label>
                                    <select value={formData.cliente_id} onChange={(e) => setFormData({ ...formData, cliente_id: e.target.value })}>
                                        <option value="">Seleccionar cliente</option>
                                        {clients.map(client => (
                                            <option key={client.id} value={client.id}>{client.nombre_negocio}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Etapa</label>
                                    <select value={formData.etapa} onChange={(e) => setFormData({ ...formData, etapa: e.target.value })}>
                                        {stages.filter(s => !s.id.startsWith('cerrado')).map(stage => (
                                            <option key={stage.id} value={stage.id}>{stage.label}</option>
                                        ))}
                                    </select>
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
                                <label>Fecha estimada de cierre</label>
                                <input
                                    type="date"
                                    value={formData.fecha_estimada_cierre}
                                    onChange={(e) => setFormData({ ...formData, fecha_estimada_cierre: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Descripción</label>
                                <textarea
                                    rows="3"
                                    value={formData.descripcion}
                                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="modal-actions">
                                <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="btn-secondary">
                                    Cancelar
                                </button>
                                <button type="submit" className="btn-primary">
                                    Crear Deal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PipelinePage;
