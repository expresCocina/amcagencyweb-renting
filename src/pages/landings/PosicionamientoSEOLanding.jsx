import { useEffect, useState } from 'react';
import TrackedLink from '../../components/TrackedLink';
import { trackPageView, trackEvent } from '../../utils/analytics';
import './LandingPage.css';

const PosicionamientoSEOLanding = () => {
    useEffect(() => {
        trackPageView();
    }, []);

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="landing-hero">
                <div className="container">
                    <div className="landing-hero-content">
                        <h1>Posicionamiento SEO que genera <span className="gradient-text">Tráfico Real</span></h1>
                        <p className="landing-subtitle">
                            Llega a la primera página de Google y atrae clientes que buscan activamente tus servicios.
                        </p>
                        <div className="landing-benefits">
                            <div className="benefit-item">✅ Más visibilidad en Google</div>
                            <div className="benefit-item">✅ Tráfico orgánico calificado</div>
                            <div className="benefit-item">✅ Resultados medibles mes a mes</div>
                        </div>
                        <TrackedLink href="#contacto-landing" type="contact" source="landing-hero-seo" className="btn btn-primary btn-large">
                            SOLICITAR AUDITORÍA SEO GRATUITA
                        </TrackedLink>
                    </div>
                </div>
            </section>

            {/* Problems Section */}
            <section className="landing-section">
                <div className="container">
                    <h2 className="text-center">¿Por qué tu web no aparece en Google?</h2>
                    <div className="problems-grid">
                        <div className="problem-card glass">
                            <div className="problem-icon">🔍</div>
                            <h3>Sin optimización técnica</h3>
                            <p>Google no puede rastrear ni indexar correctamente tu sitio</p>
                        </div>
                        <div className="problem-card glass">
                            <div className="problem-icon">📝</div>
                            <h3>Contenido sin estrategia</h3>
                            <p>No atacas las palabras clave que tus clientes buscan</p>
                        </div>
                        <div className="problem-card glass">
                            <div className="problem-icon">🔗</div>
                            <h3>Falta de autoridad</h3>
                            <p>Sin backlinks de calidad tu dominio no tiene peso</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section className="landing-section bg-dark">
                <div className="container">
                    <h2 className="text-center">Nuestra metodología SEO probada</h2>
                    <div className="features-grid">
                        <div className="feature-card glass">
                            <h3>🔎 Auditoría técnica completa</h3>
                            <p>Identificamos todos los errores que impiden que Google te posicione</p>
                        </div>
                        <div className="feature-card glass">
                            <h3>📊 Investigación de palabras clave</h3>
                            <p>Encontramos las búsquedas exactas de tus clientes potenciales</p>
                        </div>
                        <div className="feature-card glass">
                            <h3>✍️ Optimización de contenido</h3>
                            <p>Creamos y optimizamos contenido que Google ama y usuarios comparten</p>
                        </div>
                        <div className="feature-card glass">
                            <h3>🔗 Link building estratégico</h3>
                            <p>Construimos autoridad con backlinks de sitios relevantes</p>
                        </div>
                        <div className="feature-card glass">
                            <h3>📱 SEO Local</h3>
                            <p>Optimización para Google My Business y búsquedas locales</p>
                        </div>
                        <div className="feature-card glass">
                            <h3>📈 Reportes mensuales</h3>
                            <p>Seguimiento transparente de posiciones, tráfico y conversiones</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Results Section */}
            <section className="landing-section">
                <div className="container">
                    <h2 className="text-center">Resultados que puedes esperar</h2>
                    <div className="results-timeline">
                        <div className="timeline-item glass">
                            <div className="timeline-period">Mes 1-2</div>
                            <h3>Fundamentos técnicos</h3>
                            <p>Corrección de errores críticos, optimización de velocidad, estructura de URLs</p>
                        </div>
                        <div className="timeline-item glass">
                            <div className="timeline-period">Mes 3-4</div>
                            <h3>Primeras posiciones</h3>
                            <p>Aparición en primeras páginas para palabras clave de cola larga</p>
                        </div>
                        <div className="timeline-item glass">
                            <div className="timeline-period">Mes 5-6</div>
                            <h3>Crecimiento sostenido</h3>
                            <p>Incremento de 50-100% en tráfico orgánico, mejores posiciones</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Financing Section */}
            <section className="landing-section bg-dark">
                <div className="container">
                    <div className="financing-banner glass">
                        <h2>💳 Financia tu estrategia SEO</h2>
                        <p>Invierte en tu visibilidad hoy, paga en cuotas cómodas. Aprobación rápida.</p>
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
                        <h2 className="text-center">Solicita tu auditoría SEO gratuita</h2>
                        <p className="text-center mt-2">Analizaremos tu posicionamiento actual y te diremos cómo llegar al top 3</p>
                        <LandingContactForm service="seo" />
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
        service: service || 'seo'
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

        const whatsappMessage = `Hola! Solicito auditoría SEO gratuita:
    
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
                service: service || 'seo'
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
                Solicitar auditoría SEO gratuita
            </button>

            <p className="form-note mt-3">
                ✅ Sin compromiso ✅ Respuesta en 24h
            </p>
        </form>
    );
};

export default PosicionamientoSEOLanding;
