import { useEffect, useState } from 'react';
import TrackedLink from '../../components/TrackedLink';
import { trackPageView, trackEvent } from '../../utils/analytics';
import './LandingPage.css';

const DisenioWebLanding = () => {
    useEffect(() => {
        trackPageView();
    }, []);

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="landing-hero">
                <div className="container">
                    <div className="landing-hero-content">
                        <h1>Diseño Web que <span className="gradient-text">Vende</span></h1>
                        <p className="landing-subtitle">
                            Sitios web de alta conversión optimizados para velocidad, experiencia de usuario y resultados medibles.
                        </p>
                        <div className="landing-benefits">
                            <div className="benefit-item">✅ Carga en menos de 2 segundos</div>
                            <div className="benefit-item">✅ Diseño responsive premium</div>
                            <div className="benefit-item">✅ Optimizado para conversión</div>
                        </div>
                        <TrackedLink href="#contacto-landing" type="contact" source="landing-hero-diseno-web" className="btn btn-primary btn-large">
                            SOLICITAR AUDITORÍA GRATUITA
                        </TrackedLink>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="landing-section">
                <div className="container">
                    <h2 className="text-center">¿Por qué tu web actual no vende?</h2>
                    <div className="problems-grid">
                        <div className="problem-card glass">
                            <div className="problem-icon">🐌</div>
                            <h3>Carga lenta</h3>
                            <p>El 53% de usuarios abandona sitios que tardan más de 3 segundos</p>
                        </div>
                        <div className="problem-card glass">
                            <div className="problem-icon">📱</div>
                            <h3>No es responsive</h3>
                            <p>El 70% del tráfico es móvil y tu web no se adapta</p>
                        </div>
                        <div className="problem-card glass">
                            <div className="problem-icon">🎯</div>
                            <h3>Sin estrategia de conversión</h3>
                            <p>Tienes visitas pero no generas leads ni ventas</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section className="landing-section bg-dark">
                <div className="container">
                    <h2 className="text-center">Nuestra solución: Infraestructura digital que convierte</h2>
                    <div className="features-grid">
                        <div className="feature-card glass">
                            <h3>⚡ Velocidad extrema</h3>
                            <p>Optimización técnica para cargar en menos de 2 segundos. Google PageSpeed 90+</p>
                        </div>
                        <div className="feature-card glass">
                            <h3>🎨 UI/UX Premium</h3>
                            <p>Diseño moderno que guía al usuario hacia la conversión en cada paso</p>
                        </div>
                        <div className="feature-card glass">
                            <h3>📊 Tracking completo</h3>
                            <p>Google Analytics, Facebook Pixel y eventos configurados para medir todo</p>
                        </div>
                        <div className="feature-card glass">
                            <h3>🔒 Seguridad SSL</h3>
                            <p>Certificado de seguridad incluido para generar confianza</p>
                        </div>
                        <div className="feature-card glass">
                            <h3>📱 100% Responsive</h3>
                            <p>Perfecto en móvil, tablet y desktop. Probado en todos los dispositivos</p>
                        </div>
                        <div className="feature-card glass">
                            <h3>🚀 SEO Técnico</h3>
                            <p>Estructura optimizada para que Google te encuentre fácilmente</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Financing Section */}
            <section className="landing-section">
                <div className="container">
                    <div className="financing-banner glass">
                        <h2>💳 Financia tu proyecto web</h2>
                        <p>Paga en cuotas cómodas. Aprobación en 24-48 horas sin trámites bancarios complejos.</p>
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
                        <h2 className="text-center">Solicita tu auditoría web gratuita</h2>
                        <p className="text-center mt-2">Analizaremos tu sitio actual y te diremos exactamente qué mejorar</p>
                        <LandingContactForm service="web" />
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
        service: service || 'web'
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

        const whatsappMessage = `Hola! Solicito auditoría gratuita:
    
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
                service: service || 'web'
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
                Solicitar auditoría gratuita
            </button>

            <p className="form-note mt-3">
                ✅ Sin compromiso ✅ Respuesta en 24h
            </p>
        </form>
    );
};

export default DisenioWebLanding;
