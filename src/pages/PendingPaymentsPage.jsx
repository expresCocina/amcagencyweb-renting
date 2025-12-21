import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import { getPendingPayments } from '../data/adminMockData';
import './PendingPaymentsPage.css';

const PendingPaymentsPage = () => {
    const navigate = useNavigate();
    const pendingClients = getPendingPayments();

    const handleWhatsApp = (client) => {
        const message = `Hola ${client.name}, te recordamos que tu pago de $${client.plan.toLocaleString('es-CO')} COP está pendiente (vencimiento: ${client.nextPayment}). Por favor, realiza el pago lo antes posible para evitar la suspensión del servicio. ¡Gracias!`;
        const url = `https://wa.me/57${client.phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const handleLogout = () => {
        localStorage.removeItem('adminAuthenticated');
        localStorage.removeItem('adminLoginTime');
        navigate('/admin/login');
    };

    return (
        <div className="admin-dashboard">
            <AdminSidebar />

            <div className="admin-content">
                <div className="admin-header">
                    <div>
                        <h1>Pagos Pendientes</h1>
                        <p className="admin-subtitle">Clientes con pagos atrasados</p>
                    </div>
                    <button onClick={handleLogout} className="btn-logout">
                        🚪 Cerrar Sesión
                    </button>
                </div>

                <div className="pending-stats">
                    <div className="stat-box">
                        <div className="stat-number">{pendingClients.length}</div>
                        <div className="stat-label">Pagos Pendientes</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-number">
                            ${pendingClients.reduce((sum, c) => sum + c.plan, 0).toLocaleString('es-CO')}
                        </div>
                        <div className="stat-label">Total a Cobrar (COP)</div>
                    </div>
                </div>

                {pendingClients.length === 0 ? (
                    <div className="no-pending">
                        <div className="no-pending-icon">✅</div>
                        <h2>¡Todo al día!</h2>
                        <p>No hay pagos pendientes en este momento</p>
                    </div>
                ) : (
                    <div className="pending-list">
                        {pendingClients.map((client) => (
                            <div key={client.id} className="pending-card">
                                <div className="pending-header">
                                    <div className="client-info-compact">
                                        <div className="client-avatar-small">
                                            {client.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                        </div>
                                        <div>
                                            <div className="client-name-small">{client.name}</div>
                                            <div className="client-company-small">{client.company}</div>
                                        </div>
                                    </div>
                                    <div className="pending-amount">
                                        ${client.plan.toLocaleString('es-CO')} COP
                                    </div>
                                </div>

                                <div className="pending-details">
                                    <div className="detail-item">
                                        <span className="detail-label">Dominio:</span>
                                        <a href={`https://${client.domain}`} target="_blank" rel="noopener noreferrer">
                                            {client.domain}
                                        </a>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Vencimiento:</span>
                                        <span className="overdue-date">{client.nextPayment}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Teléfono:</span>
                                        <span>{client.phone}</span>
                                    </div>
                                </div>

                                <div className="pending-actions">
                                    <button
                                        className="btn-whatsapp-full"
                                        onClick={() => handleWhatsApp(client)}
                                    >
                                        💬 Enviar Recordatorio por WhatsApp
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PendingPaymentsPage;
