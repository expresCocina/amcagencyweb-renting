import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './ClientDashboard.css';

const ClientDashboard = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [clientData, setClientData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuthAndFetchData();
    }, []);

    const checkAuthAndFetchData = async () => {
        try {
            // Check Supabase session
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                navigate('/login');
                return;
            }

            // Fetch client data
            const { data: client, error } = await supabase
                .from('clients')
                .select('*')
                .eq('user_id', session.user.id)
                .single();

            if (error) {
                console.error('Error fetching client data:', error);
            }

            if (client) {
                setClientData(client);
                setUserName(client.name || client.nombre_representante || session.user.email);
            } else {
                setUserName(session.user.email);
            }
        } catch (err) {
            console.error('Auth error:', err);
            navigate('/login');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        localStorage.clear();
        window.location.href = '/login';
    };

    const getPaymentStatusInfo = () => {
        if (!clientData) return { label: 'Cargando...', icon: '⏳', class: 'pending' };

        switch (clientData.estado_pago) {
            case 'activo':
                return { label: 'Activo', icon: '✅', class: 'active' };
            case 'pendiente':
                return { label: 'Pendiente de Pago', icon: '⏳', class: 'pending' };
            default:
                return { label: 'Pendiente', icon: '⏳', class: 'pending' };
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'No definida';
        return new Date(dateString).toLocaleDateString('es-CO', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatPlan = (plan) => {
        if (!plan) return '$0';
        return `$${parseInt(plan).toLocaleString('es-CO')} COP`;
    };

    if (isLoading) {
        return (
            <div className="dashboard-page">
                <div className="dashboard-loading">
                    <div className="spinner"></div>
                    <p>Cargando tu panel...</p>
                </div>
            </div>
        );
    }

    const paymentStatus = getPaymentStatusInfo();

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <div className="container">
                    <div className="dashboard-header-content">
                        <div className="dashboard-welcome">
                            <h1>👋 Hola, {userName}</h1>
                            <p>Bienvenido a tu portal de cliente</p>
                        </div>
                        <button onClick={handleLogout} className="btn btn-secondary">
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="container">
                    {/* Client Info Cards */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">🏢</div>
                            <div className="stat-info">
                                <div className="stat-value">{clientData?.company || 'Mi Negocio'}</div>
                                <div className="stat-label">Empresa</div>
                            </div>
                        </div>
                        <div className={`stat-card ${paymentStatus.class}`}>
                            <div className="stat-icon">{paymentStatus.icon}</div>
                            <div className="stat-info">
                                <div className="stat-value">{paymentStatus.label}</div>
                                <div className="stat-label">Estado del Servicio</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">💰</div>
                            <div className="stat-info">
                                <div className="stat-value">{formatPlan(clientData?.plan)}</div>
                                <div className="stat-label">Plan Mensual</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">📅</div>
                            <div className="stat-info">
                                <div className="stat-value">{formatDate(clientData?.next_payment)}</div>
                                <div className="stat-label">Próximo Pago</div>
                            </div>
                        </div>
                    </div>

                    {/* Domain Section */}
                    {clientData?.domain && (
                        <section className="dashboard-section">
                            <h2>🌐 Tu Sitio Web</h2>
                            <div className="domain-card">
                                <div className="domain-info">
                                    <strong>Dominio:</strong>
                                    <a href={`https://${clientData.domain}`} target="_blank" rel="noopener noreferrer">
                                        {clientData.domain}
                                    </a>
                                </div>
                                <div className="domain-status">
                                    {clientData.status === 'active' ? (
                                        <span className="status-badge active">🟢 Sitio Activo</span>
                                    ) : (
                                        <span className="status-badge pending">🟡 En Construcción</span>
                                    )}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Payment Notice for Pending */}
                    {clientData?.estado_pago === 'pendiente' && (
                        <section className="dashboard-section payment-notice-section">
                            <div className="payment-notice-card">
                                <div className="notice-icon">💳</div>
                                <div className="notice-content">
                                    <h3>Completa tu pago para activar tu servicio</h3>
                                    <p>Tu registro está completo. Una vez realices el pago, tu sitio web será activado.</p>
                                    <a
                                        href="https://checkout.nequi.wompi.co/l/xQ1z3t"
                                        className="btn btn-primary"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        💰 Realizar Pago
                                    </a>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Contact Section */}
                    <section className="dashboard-section">
                        <h2>📞 Contacto</h2>
                        <div className="contact-grid">
                            <div className="contact-item">
                                <span className="contact-icon">📧</span>
                                <div className="contact-info">
                                    <strong>Email</strong>
                                    <span>soporte@amcagencyweb.com</span>
                                </div>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">📱</span>
                                <div className="contact-info">
                                    <strong>WhatsApp</strong>
                                    <a href="https://wa.me/573138537261" target="_blank" rel="noopener noreferrer">
                                        +57 313 853 7261
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Support Section */}
                    <section className="dashboard-section">
                        <h2>🎧 Soporte</h2>
                        <div className="support-card">
                            <p>¿Necesitas ayuda con tu sitio web?</p>
                            <a
                                href="https://wa.me/573138537261?text=Hola,%20necesito%20ayuda%20con%20mi%20sitio%20web"
                                className="btn btn-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                💬 Contactar Soporte
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
