import { useEffect, useState } from 'react';
import TrackedLink from '../../components/TrackedLink';
import { trackPageView, trackEvent } from '../../utils/analytics';
import './LandingPage.css';

const AutomatizacionVentasLanding = () => {
    useEffect(() => {
        trackPageView();
    }, []);

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="landing-hero">
                <div className="container">
                    <div className="landing-hero-content">
                        <h1>Automatización de Ventas que <span className="gradient-text">Trabaja 24/7</span></h1>
                        <p className="landing-subtitle">
                            CRM inteligente y bots de WhatsApp que convierten leads en clientes mientras duermes.
                        </p>
                        <div className="landing-benefits">
                            <div className="benefit-item">✅ Respuesta instantánea a leads</div>
                            <div className="benefit-item">✅ Seguimiento automatizado</div>
                            <div className="benefit-item">✅ Más ventas, menos trabajo manual</div>
                        </div>
                        <TrackedLink href="#contacto-landing" type="contact" source="landing-hero-automatizacion" className="btn btn-primary btn-large">
                            SOLICITAR DEMO GRATUITA
                        </TrackedLink>
                    </div>
                </div>
            </section>

            {/* Problems Section */}
            <section className="landing-section">
                <div className="container">
                    <h2 className="text-center">¿Estás perdiendo ventas por estos motivos?</h2>
                    <div className="problems-grid">
                        <div className="problem-card glass">
                            <div className="problem-icon">⏰</div>
                            <h3>Respuestas lentas</h3>
                            <p>Tardas horas en responder y los leads se van con la competencia</p>
                        </div>
                        <div className="problem-card glass">
                            <div className="problem-icon">📋</div>
                            <h3>Seguimiento manual</h3>
                            <p>Pierdes oportunidades porque olvidas hacer seguimiento</p>
                        </div>
                        <div className="problem-card glass">
                            <div className="problem-icon">💬</div>
                            <h3>Sin atención 24/7</h3>
                            <p>Tus clientes escriben de noche y nadie responde</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section className="landing-section bg-dark">
                <div className="container">
                    <h2 className="text-center">Nuestra solución de automatización completa</h2>
                    <div className="features-grid">
                        <div className="feature-card glass">
                            <h3>🤖 Bot de WhatsApp inteligente</h3>
                            <p>Responde preguntas frecuentes, califica leads y agenda citas automáticamente</p>
                        </div>
                        <div className="feature-card glass">
                            <h3>📊 CRM centralizado</h3>
                            <p>Todos tus contactos, conversaciones y ventas en un solo lugar</p>
                        </div>
                        <div className="feature-card glass">
                            <h3>📧 Email marketing automatizado</h3>
                            <p>Secuencias de correos que nutren leads hasta convertirlos en clientes</p>
                        </div>
                        <div className="feature-card glass">
                            <h3>🔔 Notificaciones en tiempo real</h3>
                            <p>Alertas instantáneas cuando llega un lead caliente</p>
                        </div>
                        <div className="feature-card glass">
                            <h3>📈 Reportes automáticos</h3>
                            <p>Dashboards en tiempo real de tus métricas de ventas</p>
                        </div>
                        <div className="feature-card glass">
                            <h3>🔄 Integraciones</h3>
                            <p>Conecta con tus herramientas: Facebook Ads, Google Ads, Calendly, etc.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ROI Section */}
            <section className="landing-section">
                <div className="container">
                    <h2 className="text-center">El ROI de automatizar tus ventas</h2>
                    <div className="roi-grid">
                        <div className="roi-card glass">
                            <div className="roi-number gradient-text">3x</div>
                            <h3>Más leads atendidos</h3>
                            <p>Sin contratar más personal de ventas</p>
                        </div>
                        <div className="roi-card glass">
                            <div className="roi-number gradient-text">60%</div>
                            <h3>Reducción de tiempo</h3>
                            <p>En tareas repetitivas de seguimiento</p>
                        </div>
                        <div className="roi-card glass">
                            <div className="roi-number gradient-text">24/7</div>
                            <h3>Atención continua</h3>
                            <p>Nunca pierdas un lead por horario</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="landing-section bg-dark">
                <div className="container">
                    <h2 className="text-center">Casos de uso reales</h2>
                    <div className="use-cases-grid">
                        <div className="use-case-card glass">
                            <h3>🏠 Inmobiliarias</h3>
                            <p>Bot que envía propiedades según presupuesto y zona, agenda visitas automáticamente</p>
                        </div>
                        <div className="use-case-card glass">
                            <h3>🏥 Clínicas y consultorios</h3>
                            <p>Agendamiento de citas, recordatorios automáticos, confirmaciones por WhatsApp</p>
                        </div>
                        <div className="use-case-card glass">
                            <h3>🛒 E-commerce</h3>
                            <p>Recuperación de carritos abandonados, seguimiento post-venta, upselling automatizado</p>
                        </div>
                        <div className="use-case-card glass">
                            <h3>📚 Academias y cursos</h3>
                            <p>Calificación de leads, envío de información, recordatorios de inscripción</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Financing Section */}
            <section className="landing-section">
                <div className="container">
                    <div className="financing-banner glass">
                        <h2>💳 Financia tu automatización</h2>
                        <p>Implementa tu sistema de ventas automatizado hoy, paga en cuotas cómodas.</p>
                        <div className="financing-options">
                            <div className="financing-option">
                                <div className="option-term">3 cuotas</div>
                                <div className="option-rate">5% interés</div>
                            </div>
                            <div className="financing-option highlighted">
                                <div className="option-term">6 cuotas</div>
                                <div className="option-rate">10% interés</div>
                            </div>
                            <div className="financing-option">
                                <div className="option-term">12 cuotas</div>
                                <div className="option-rate">16% interés</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="landing-section" id="contacto-landing">
                <div className="container">
                    <div className="landing-form-container glass">
                        <h2 className="text-center">Solicita una demo personalizada</h2>
                        <p className="text-center mt-2">Te mostraremos cómo automatizar tu proceso de ventas específico</p>
                        <LandingContactForm service="funnels" />
                    </div>
                </div>
            </section>

            {/* Simple Footer */}
            <footer className="landing-footer">
                <div className="container">
                    <p>© 2025 AMC Agency Web - Agencia de Marketing Digital</p>
                    <p className="mt-2">
                        <a href="mailto:info@amcagencyweb.com">info@amcagencyweb.com</a> |
                        <a href="https://wa.me/573138537261" target="_blank" rel="noopener noreferrer"> WhatsApp: +57 313 853 7261</a>
                    </p>
                </div>
            </footer>
        </div>
    );
};

// Simplified Contact Form Component
const LandingContactForm = ({ service }) => {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        phone: '',
        service: service || 'funnels'
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const whatsappMessage = `Hola! Solicito demo de automatización:
    
Nombre: ${formData.name}
Empresa: ${formData.company}
WhatsApp: ${formData.phone}
Servicio: ${formData.service}`;

        const whatsappUrl = `https://wa.me/573138537261?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');

        // Track Lead Event
        trackEvent('Lead', {
            content_name: formData.service,
            currency: 'USD',
            value: 0
        }, {
            phone: formData.phone
        });

        setSubmitted(true);

        setTimeout(() => {
            setFormData({
                name: '',
                company: '',
                phone: '',
                service: service || 'funnels'
            });
            setSubmitted(false);
        }, 3000);
    };

    if (submitted) {
        return (
            <div className="success-message">
                <div className="success-icon">✅</div>
                <h3>¡Solicitud enviada!</h3>
                <p className="mt-2">Te contactaremos pronto por WhatsApp</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="landing-form">
            <div className="form-group">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Nombre completo *"
                />
            </div>

            <div className="form-group">
                <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    placeholder="Empresa *"
                />
            </div>

            <div className="form-group">
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="WhatsApp *"
                />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Solicitar demo gratuita
            </button>

            <p className="form-note mt-3">
                ✅ Sin compromiso ✅ Respuesta en 24h
            </p>
        </form>
    );
};

export default AutomatizacionVentasLanding;
