import { useState } from 'react';
import './ClientsTable.css';

const ClientsTable = ({ clients }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [clientStates, setClientStates] = useState(
        clients.reduce((acc, client) => ({
            ...acc,
            [client.id]: client.isActive
        }), {})
    );

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusBadge = (status) => {
        const badges = {
            active: { label: 'Activo', icon: '🟢', class: 'status-active' },
            pending: { label: 'Pendiente Pago', icon: '🟡', class: 'status-pending' },
            suspended: { label: 'Suspendido', icon: '🔴', class: 'status-suspended' },
        };
        return badges[status] || badges.active;
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const handleWhatsApp = (client) => {
        const message = `Hola ${client.name}, te recordamos que tu próximo pago de $${client.plan.toLocaleString('es-CO')} COP vence el ${client.nextPayment}. ¡Gracias por confiar en nosotros!`;
        const url = `https://wa.me/57${client.phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const toggleSiteStatus = (clientId) => {
        setClientStates(prev => ({
            ...prev,
            [clientId]: !prev[clientId]
        }));
    };

    return (
        <div className="clients-table-container">
            <div className="table-header">
                <h2>Gestión de Clientes</h2>
                <div className="search-bar">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Buscar cliente por nombre o empresa..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="table-wrapper">
                <table className="clients-table">
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Dominio</th>
                            <th>Plan</th>
                            <th>Estado</th>
                            <th>Próximo Pago</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClients.map((client) => {
                            const statusBadge = getStatusBadge(client.status);
                            return (
                                <tr key={client.id}>
                                    <td>
                                        <div className="client-info">
                                            <div className="client-avatar">
                                                {getInitials(client.name)}
                                            </div>
                                            <div className="client-details">
                                                <div className="client-name">{client.name}</div>
                                                <div className="client-company">{client.company}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <a
                                            href={`https://${client.domain}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="domain-link"
                                        >
                                            {client.domain}
                                            <span className="external-icon">↗</span>
                                        </a>
                                    </td>
                                    <td>
                                        <span className="plan-badge">
                                            ${client.plan.toLocaleString('es-CO')} COP
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${statusBadge.class}`}>
                                            {statusBadge.icon} {statusBadge.label}
                                        </span>
                                    </td>
                                    <td className="payment-date">{client.nextPayment}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="btn-whatsapp"
                                                onClick={() => handleWhatsApp(client)}
                                                title="Enviar mensaje por WhatsApp"
                                            >
                                                💬
                                            </button>
                                            <button
                                                className="btn-edit"
                                                title="Editar cliente"
                                            >
                                                ✏️
                                            </button>
                                            <label className="toggle-switch">
                                                <input
                                                    type="checkbox"
                                                    checked={clientStates[client.id]}
                                                    onChange={() => toggleSiteStatus(client.id)}
                                                />
                                                <span className="toggle-slider"></span>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {filteredClients.length === 0 && (
                    <div className="no-results">
                        <p>No se encontraron clientes</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientsTable;
