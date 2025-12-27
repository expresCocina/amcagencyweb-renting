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
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                navigate('/login');
                return;
            }

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

    // Servicios incluidos en el plan
    const planServices = [
        {
            icon: '🌐',
            title: 'Sitio Web Profesional',
            description: 'Diseño y desarrollo de tu sitio web',
            status: clientData?.status === 'active' ? 'Activo' : 'En desarrollo'
        },
        {
            icon: '🚀',
            title: 'Hosting Incluido',
            description: 'Alojamiento web de alta velocidad',
            status: 'Incluido'
        },
        {
            icon: '🔒',
            title: 'Certificado SSL',
            description: 'Seguridad HTTPS para tu sitio',
            status: 'Incluido'
        },
        {
            icon: '📱',
            title: 'Diseño Responsive',
            description: 'Adaptado a móviles y tablets',
            status: 'Incluido'
        },
        {
            icon: '🎨',
            title: 'Diseño Personalizado',
            description: 'Colores y estilo de tu marca',
            status: 'Incluido'
        },
        {
            icon: '📊',
            title: 'Google Analytics',
            description: 'Seguimiento de visitas y métricas',
            status: 'Incluido'
        },
        {
            icon: '🔍',
            title: 'SEO Básico',
            description: 'Optimización para buscadores',
            status: 'Incluido'
        },
        {
            icon: '🎧',
            title: 'Soporte 24/7',
            description: 'Asistencia técnica permanente',
            status: 'Incluido'
        }
    ];

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
            {/* Header */}
            <div className="dashboard-header">
                <div className="container">
                    <div className="dashboard-header-content">
                        <div className="dashboard-welcome">
                            <h1>👋 Hola, {userName}</h1>
                            <p>Panel de Control - {clientData?.company || 'Mi Negocio'}</p>
                        </div>
                        <button onClick={handleLogout} className="btn btn-secondary">
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="container">
                    {/* Payment Notice for Pending */}
                    {clientData?.estado_pago === 'pendiente' && (
                        <div className="payment-notice-banner">
                            <div className="notice-icon">💳</div>
                            <div className="notice-content">
                                <h3>¡Completa tu pago para activar tu sitio web!</h3>
                                <p>Tu registro está completo. Una vez realices el pago de {formatPlan(clientData?.plan)}, activaremos tu sitio web en 48 horas.</p>
                                <a
                                    href="https://checkout.nequi.wompi.co/l/xQ1z3t"
                                    className="btn btn-primary"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    💰 Pagar Ahora
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Status Cards */}
                    <div className="status-cards">
                        <div className={`status-card ${paymentStatus.class}`}>
                            <div className="status-icon">{paymentStatus.icon}</div>
                            <div className="status-info">
                                <h3>{paymentStatus.label}</h3>
                                <p>Estado del Servicio</p>
                            </div>
                        </div>
                        <div className="status-card">
                            <div className="status-icon">💰</div>
                            <div className="status-info">
                                <h3>{formatPlan(clientData?.plan)}</h3>
                                <p>Plan Mensual</p>
                            </div>
                        </div>
                        <div className="status-card">
                            <div className="status-icon">📅</div>
                            <div className="status-info">
                                <h3>{formatDate(clientData?.next_payment)}</h3>
                                <p>Próximo Pago</p>
                            </div>
                        </div>
                    </div>

                    {/* Domain Info */}
                    {clientData?.domain && (
                        <section className="dashboard-section">
                            <h2>🌐 Tu Sitio Web</h2>
                            <div className="domain-card-large">
                                <div className="domain-main">
                                    <div className="domain-icon">🌐</div>
                                    <div className="domain-details">
                                        <h3>Dominio</h3>
                                        <a href={`https://${clientData.domain}`} target="_blank" rel="noopener noreferrer">
                                            {clientData.domain}
                                        </a>
                                    </div>
                                </div>
                                <div className="domain-status-badge">
                                    {clientData.status === 'active' ? (
                                        <span className="badge-active">🟢 Sitio Activo</span>
                                    ) : (
                                        <span className="badge-pending">🟡 En Construcción</span>
                                    )}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Services Included */}
                    <section className="dashboard-section">
                        <h2>✨ Servicios Incluidos en tu Plan</h2>
                        <div className="services-grid">
                            {planServices.map((service, index) => (
                                <div key={index} className="service-card">
                                    <div className="service-icon">{service.icon}</div>
                                    <div className="service-content">
                                        <h3>{service.title}</h3>
                                        <p>{service.description}</p>
                                        <span className="service-status">{service.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Support Section */}
                    <section className="dashboard-section">
                        <h2>💬 ¿Necesitas Ayuda?</h2>
                        <div className="support-grid">
                            <div className="support-card-item">
                                <div className="support-icon">📧</div>
                                <div className="support-info">
                                    <h3>Email</h3>
                                    <a href="mailto:soporte@amcagencyweb.com">soporte@amcagencyweb.com</a>
                                </div>
                            </div>
                            <div className="support-card-item">
                                <div className="support-icon">📱</div>
                                <div className="support-info">
                                    <h3>WhatsApp</h3>
                                    <a href="https://wa.me/573138537261?text=Hola,%20necesito%20ayuda%20con%20mi%20sitio%20web" target="_blank" rel="noopener noreferrer">
                                        +57 313 853 7261
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
