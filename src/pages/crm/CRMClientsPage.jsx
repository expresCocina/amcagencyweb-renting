import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Link } from 'react-router-dom';
import { getWhatsAppUrl, getWhatsAppMessage } from '../../utils/whatsappUtils';
import './CRMClientsPage.css';

const CRMClientsPage = () => {
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        estado_pago: 'all',
        search: '',
    });

    useEffect(() => {
        loadClients();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [clients, filters]);

    const loadClients = async () => {
        try {
            const { data, error } = await supabase
                .from('clients')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setClients(data || []);
        } catch (error) {
            console.error('Error loading clients:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...clients];

        if (filters.estado_pago !== 'all') {
            filtered = filtered.filter(client => client.estado_pago === filters.estado_pago);
        }

        if (filters.search) {
            const search = filters.search.toLowerCase();
            filtered = filtered.filter(client =>
                client.nombre_negocio?.toLowerCase().includes(search) ||
                client.nombre_representante?.toLowerCase().includes(search) ||
                client.email?.toLowerCase().includes(search)
            );
        }

        setFilteredClients(filtered);
    };

    const getEstadoBadge = (estado) => {
        const badges = {
            activo: { label: 'Activo', class: 'badge-active' },
            pendiente: { label: 'Pendiente', class: 'badge-pending' },
            suspendido: { label: 'Suspendido', class: 'badge-suspended' },
        };
        return badges[estado] || badges.pendiente;
    };

    const getPlanBadge = (plan) => {
        const badges = {
            basico: { label: 'Básico', class: 'plan-basic' },
            profesional: { label: 'Profesional', class: 'plan-pro' },
            empresarial: { label: 'Empresarial', class: 'plan-enterprise' },
        };
        return badges[plan] || { label: plan || 'N/A', class: 'plan-basic' };
    };

    if (loading) {
        return <div className="crm-loading">Cargando clientes...</div>;
    }

    return (
        <div className="crm-clients-page">
            <div className="clients-header">
                <div>
                    <h1>Clientes</h1>
                    <p>{filteredClients.length} clientes activos</p>
                </div>
                <Link to="/admin/clientes/nuevo" className="btn-primary">
                    ➕ Nuevo Cliente
                </Link>
            </div>

            <div className="clients-filters">
                <input
                    type="text"
                    placeholder="Buscar por nombre, empresa o email..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="search-input"
                />
                <select
                    value={filters.estado_pago}
                    onChange={(e) => setFilters({ ...filters, estado_pago: e.target.value })}
                    className="filter-select"
                >
                    <option value="all">Todos los estados</option>
                    <option value="activo">Activo</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="suspendido">Suspendido</option>
                </select>
            </div>

            <div className="clients-grid">
                {filteredClients.length === 0 ? (
                    <div className="empty-state">
                        <p>No hay clientes para mostrar</p>
                    </div>
                ) : (
                    filteredClients.map((client) => {
                        const estadoBadge = getEstadoBadge(client.estado_pago);
                        const planBadge = getPlanBadge(client.plan);

                        return (
                            <div key={client.id} className="client-card">
                                <div className="client-card-header">
                                    <div className="client-icon">🏢</div>
                                    <div className="client-badges">
                                        <span className={`badge ${estadoBadge.class}`}>
                                            {estadoBadge.label}
                                        </span>
                                    </div>
                                </div>

                                <div className="client-card-body">
                                    <h3>{client.nombre_negocio}</h3>
                                    <p className="client-rep">{client.nombre_representante}</p>

                                    <div className="client-info">
                                        <div className="info-item">
                                            <span className="info-label">📧 Email:</span>
                                            <span className="info-value">{client.email || 'N/A'}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">📱 WhatsApp:</span>
                                            {client.whatsapp ? (
                                                <a
                                                    href={getWhatsAppUrl(client.whatsapp, getWhatsAppMessage('client', client.nombre_representante || ''))}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="info-value link-whatsapp"
                                                >
                                                    {client.whatsapp} ↗
                                                </a>
                                            ) : (
                                                <span className="info-value">N/A</span>
                                            )}
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">🌐 Dominio:</span>
                                            <span className="info-value">{client.domain || 'N/A'}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">📦 Plan:</span>
                                            <span className={`badge ${planBadge.class}`}>
                                                {planBadge.label}
                                            </span>
                                        </div>
                                        {client.next_payment && (
                                            <div className="info-item">
                                                <span className="info-label">📅 Próximo Pago:</span>
                                                <span className="info-value">
                                                    {new Date(client.next_payment).toLocaleDateString('es-CO')}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="client-card-footer">
                                    <Link to="/admin" className="btn-link">
                                        Ver en Dashboard →
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default CRMClientsPage;
