import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import './ClientsTable.css';

const ClientsTable = ({ clients, onUpdate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [editingClient, setEditingClient] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [updating, setUpdating] = useState(false);

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

    const getPaymentStatusBadge = (estadoPago) => {
        const badges = {
            activo: { label: 'Pagado', icon: '💰', class: 'payment-active' },
            pendiente: { label: 'Pendiente', icon: '⏳', class: 'payment-pending' },
            suspendido: { label: 'Suspendido', icon: '🚫', class: 'payment-suspended' },
        };
        return badges[estadoPago] || badges.pendiente;
    };

    const activatePayment = async (client) => {
        if (!window.confirm(`¿Confirmas que el pago de ${client.name} por $80,000 COP ha sido recibido?`)) {
            return;
        }

        try {
            // Calculate next payment date (1 month from today)
            const today = new Date();
            const nextPaymentDate = new Date(today);
            nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);

            // Format as YYYY-MM-DD
            const year = nextPaymentDate.getFullYear();
            const month = String(nextPaymentDate.getMonth() + 1).padStart(2, '0');
            const day = String(nextPaymentDate.getDate()).padStart(2, '0');
            const nextPayment = `${year}-${month}-${day}`;

            const { error } = await supabase
                .from('clients')
                .update({
                    estado_pago: 'activo',
                    status: 'active',
                    next_payment: nextPayment
                })
                .eq('id', client.id);

            if (error) throw error;

            if (onUpdate) onUpdate();
        } catch (err) {
            console.error('Error activating payment:', err);
            alert('Error al activar el pago');
        }
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
        const message = `Hola ${client.name}, te recordamos que tu próximo pago de $${parseInt(client.plan).toLocaleString('es-CO')} COP vence el ${client.next_payment}. ¡Gracias por confiar en nosotros!`;
        const url = `https://wa.me/57${client.phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const toggleSiteStatus = async (client) => {
        try {
            const newStatus = client.status === 'active' ? 'suspended' : 'active';

            const { error } = await supabase
                .from('clients')
                .update({ status: newStatus })
                .eq('id', client.id);

            if (error) throw error;

            if (onUpdate) onUpdate();
        } catch (err) {
            console.error('Error updating client status:', err);
            alert('Error al actualizar el estado del cliente');
        }
    };

    const toggleBlockSite = async (client) => {
        const isSuspended = client.estado_pago === 'suspendido';
        const action = isSuspended ? 'desbloquear' : 'bloquear';
        const newStatus = isSuspended ? 'activo' : 'suspendido';

        if (!window.confirm(`¿Confirmas que deseas ${action} el sitio de ${client.company}?`)) {
            return;
        }

        try {
            const updateData = {
                estado_pago: newStatus,
            };

            // Si se está activando, establecer próximo pago a +30 días
            if (newStatus === 'activo') {
                const today = new Date();
                const nextPaymentDate = new Date(today);
                nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
                const year = nextPaymentDate.getFullYear();
                const month = String(nextPaymentDate.getMonth() + 1).padStart(2, '0');
                const day = String(nextPaymentDate.getDate()).padStart(2, '0');
                updateData.next_payment = `${year}-${month}-${day}`;
                updateData.status = 'active';
            } else {
                updateData.status = 'suspended';
            }

            const { error } = await supabase
                .from('clients')
                .update(updateData)
                .eq('id', client.id);

            if (error) throw error;

            if (onUpdate) onUpdate();
        } catch (err) {
            console.error('Error toggling site block:', err);
            alert('Error al cambiar el estado del sitio');
        }
    };

    const handleEditClick = (client) => {
        setEditingClient(client);
        setEditFormData({
            name: client.name,
            company: client.company,
            domain: client.domain,
            phone: client.phone,
            plan: client.plan,
            next_payment: client.next_payment,
            status: client.status,
            estado_pago: client.estado_pago || 'pendiente',
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);

        try {
            const { error } = await supabase
                .from('clients')
                .update(editFormData)
                .eq('id', editingClient.id);

            if (error) throw error;

            setEditingClient(null);
            if (onUpdate) onUpdate();
        } catch (err) {
            console.error('Error updating client:', err);
            alert('Error al actualizar el cliente');
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async (clientId) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar este cliente? Esta acción no se puede deshacer.')) {
            return;
        }

        try {
            const { error } = await supabase
                .from('clients')
                .delete()
                .eq('id', clientId);

            if (error) throw error;

            setEditingClient(null);
            if (onUpdate) onUpdate();
        } catch (err) {
            console.error('Error deleting client:', err);
            alert('Error al eliminar el cliente');
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
                            <th>Estado Pago</th>
                            <th>Próximo Pago</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClients.map((client) => {
                            const statusBadge = getStatusBadge(client.status);
                            return (
                                <tr key={client.id}>
                                    <td data-label="Cliente">
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
                                    <td data-label="Dominio">
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
                                    <td data-label="Plan">
                                        <span className="plan-badge">
                                            ${parseInt(client.plan).toLocaleString('es-CO')} COP
                                        </span>
                                    </td>
                                    <td data-label="Estado">
                                        <span className={`status-badge ${statusBadge.class}`}>
                                            {statusBadge.icon} {statusBadge.label}
                                        </span>
                                    </td>
                                    <td data-label="Estado Pago">
                                        {(() => {
                                            const paymentBadge = getPaymentStatusBadge(client.estado_pago);
                                            return (
                                                <span className={`status-badge ${paymentBadge.class}`}>
                                                    {paymentBadge.icon} {paymentBadge.label}
                                                </span>
                                            );
                                        })()}
                                    </td>
                                    <td data-label="Próximo Pago" className="payment-date">{client.next_payment}</td>
                                    <td data-label="Acciones">
                                        <div className="action-buttons">
                                            {client.estado_pago === 'pendiente' && (
                                                <button
                                                    className="btn-activate-payment"
                                                    onClick={() => activatePayment(client)}
                                                    title="Marcar pago como recibido"
                                                >
                                                    ✅ Activar
                                                </button>
                                            )}
                                            <button
                                                className={client.estado_pago === 'suspendido' ? 'btn-unblock-site' : 'btn-block-site'}
                                                onClick={() => toggleBlockSite(client)}
                                                title={client.estado_pago === 'suspendido' ? 'Desbloquear sitio' : 'Bloquear sitio'}
                                            >
                                                {client.estado_pago === 'suspendido' ? '🔓 Desbloquear' : '🚫 Bloquear'}
                                            </button>
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
                                                    checked={client.status === 'active'}
                                                    onChange={() => toggleSiteStatus(client)}
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
                                            disabled={updating}
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
                                            disabled={updating}
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
                                            disabled={updating}
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
                                            disabled={updating}
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
                                            disabled={updating}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="edit-next_payment">Próximo Pago</label>
                                        <input
                                            type="date"
                                            id="edit-next_payment"
                                            name="next_payment"
                                            value={editFormData.next_payment}
                                            onChange={handleEditChange}
                                            required
                                            disabled={updating}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="edit-status">Estado del Sitio</label>
                                        <select
                                            id="edit-status"
                                            name="status"
                                            value={editFormData.status}
                                            onChange={handleEditChange}
                                            required
                                            disabled={updating}
                                        >
                                            <option value="active">Activo</option>
                                            <option value="pending">Pendiente</option>
                                            <option value="suspended">Suspendido</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="edit-estado_pago">Estado de Pago</label>
                                        <select
                                            id="edit-estado_pago"
                                            name="estado_pago"
                                            value={editFormData.estado_pago}
                                            onChange={handleEditChange}
                                            required
                                            disabled={updating}
                                        >
                                            <option value="activo">✅ Activo (Pagado)</option>
                                            <option value="pendiente">⏳ Pendiente de Pago</option>
                                            <option value="suspendido">🚫 Suspendido</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(editingClient.id)}
                                        className="btn-delete"
                                        disabled={updating}
                                    >
                                        🗑️ Eliminar Cliente
                                    </button>
                                    <div style={{ flex: 1 }}></div>
                                    <button
                                        type="button"
                                        onClick={() => setEditingClient(null)}
                                        className="btn-cancel"
                                        disabled={updating}
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn-submit" disabled={updating}>
                                        {updating ? 'Guardando...' : 'Guardar Cambios'}
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
