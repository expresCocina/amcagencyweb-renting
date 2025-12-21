import { useState } from 'react';
import { updateClient, deleteClient } from '../../data/adminMockData';
import './ClientsTable.css';

const ClientsTable = ({ clients, onUpdate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [clientStates, setClientStates] = useState(
        clients.reduce((acc, client) => ({
            ...acc,
            [client.id]: client.isActive
        }), {})
    );
    const [editingClient, setEditingClient] = useState(null);
    const [editFormData, setEditFormData] = useState({});

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
        const newStatus = !clientStates[clientId];
        setClientStates(prev => ({
            ...prev,
            [clientId]: newStatus
        }));
        updateClient(clientId, { isActive: newStatus });
        if (onUpdate) onUpdate();
    };

    const handleEditClick = (client) => {
        setEditingClient(client);
        setEditFormData({
            name: client.name,
            company: client.company,
            domain: client.domain,
            phone: client.phone,
            plan: client.plan,
            nextPayment: client.nextPayment,
            status: client.status,
            isActive: client.isActive
        });
    };

    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateClient(editingClient.id, editFormData);
        setEditingClient(null);
        if (onUpdate) onUpdate();
    };

    const handleDelete = (clientId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
            deleteClient(clientId);
            if (onUpdate) onUpdate();
        }
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
                                                onClick={() => handleEditClick(client)}
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

            {/* Edit Modal */}
            {editingClient && (
                <div className="demo-modal" onClick={() => setEditingClient(null)}>
                    <div className="demo-modal-content edit-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setEditingClient(null)}>
                            ×
                        </button>
                        <div className="modal-body">
                            <h2>Editar Cliente</h2>
                            <form onSubmit={handleEditSubmit} className="edit-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="edit-name">Nombre Completo</label>
                                        <input
                                            type="text"
                                            id="edit-name"
                                            name="name"
                                            value={editFormData.name}
                                            onChange={handleEditChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="edit-company">Empresa</label>
                                        <input
                                            type="text"
                                            id="edit-company"
                                            name="company"
                                            value={editFormData.company}
                                            onChange={handleEditChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="edit-domain">Dominio</label>
                                        <input
                                            type="text"
                                            id="edit-domain"
                                            name="domain"
                                            value={editFormData.domain}
                                            onChange={handleEditChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="edit-phone">Teléfono</label>
                                        <input
                                            type="tel"
                                            id="edit-phone"
                                            name="phone"
                                            value={editFormData.phone}
                                            onChange={handleEditChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="edit-plan">Plan Mensual (COP)</label>
                                        <input
                                            type="number"
                                            id="edit-plan"
                                            name="plan"
                                            value={editFormData.plan}
                                            onChange={handleEditChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="edit-nextPayment">Próximo Pago</label>
                                        <input
                                            type="text"
                                            id="edit-nextPayment"
                                            name="nextPayment"
                                            value={editFormData.nextPayment}
                                            onChange={handleEditChange}
                                            placeholder="dd/mm/yyyy"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="edit-status">Estado</label>
                                        <select
                                            id="edit-status"
                                            name="status"
                                            value={editFormData.status}
                                            onChange={handleEditChange}
                                            required
                                        >
                                            <option value="active">Activo</option>
                                            <option value="pending">Pendiente Pago</option>
                                            <option value="suspended">Suspendido</option>
                                        </select>
                                    </div>
                                    <div className="form-group checkbox-group">
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="isActive"
                                                checked={editFormData.isActive}
                                                onChange={handleEditChange}
                                            />
                                            <span>Sitio web activo</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(editingClient.id)}
                                        className="btn-delete"
                                    >
                                        🗑️ Eliminar Cliente
                                    </button>
                                    <div style={{ flex: 1 }}></div>
                                    <button
                                        type="button"
                                        onClick={() => setEditingClient(null)}
                                        className="btn-cancel"
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn-submit">
                                        Guardar Cambios
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientsTable;
