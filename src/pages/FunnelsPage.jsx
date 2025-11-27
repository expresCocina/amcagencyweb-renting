import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import './SEOPage.css';

const FunnelsPage = () => {
    return (
        <div className="page funnels-page">
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-content">
                        <h1>Vende <span className="gradient-text">24/7 sin estar presente</span></h1>
                        <p className="page-subtitle">
                            Embudos de ventas y automatización de marketing que convierten leads en clientes mientras duermes.
                        </p>
                        <div className="page-ctas">
                            <a href="#contacto" className="btn btn-primary">Solicitar consultoría gratuita</a>
                            <Link to="/casos" className="btn btn-secondary">Ver casos de automatización →</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h2 className="text-center">Cómo funciona un sistema 24/7</h2>
                    <p className="text-center mt-3 mb-5" style={{ maxWidth: '800px', margin: '16px auto 40px' }}>
                        Tu equipo de ventas digital que nunca descansa. Captura, califica y convierte leads automáticamente.
                    </p>

                    <div className="service-includes">
                        <div className="include-item">
                            <div className="include-number">1</div>
                            <div>
                                <h3>Captura de leads multicanal</h3>
                                <p>Landing pages optimizadas, formularios inteligentes, lead magnets e integración con Facebook Ads y Google Ads.</p>
                            </div>
                        </div>

                        <div className="include-item">
                            <div className="include-number">2</div>
                            <div>
                                <h3>Calificación automática</h3>
                                <p>Scoring de leads basado en comportamiento, segmentación por interés y presupuesto, identificación de leads calientes vs fríos.</p>
                            </div>
                        </div>

                        <div className="include-item">
                            <div className="include-number">3</div>
                            <div>
                                <h3>Nutrición automatizada</h3>
                                <p>Secuencias de email personalizadas, mensajes de WhatsApp automatizados y contenido educativo progresivo.</p>
                            </div>
                        </div>

                        <div className="include-item">
                            <div className="include-number">4</div>
                            <div>
                                <h3>Conversión y cierre</h3>
                                <p>Agendamiento automático de llamadas, recordatorios y seguimiento, integración con CRM.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: 'var(--bg-container)' }}>
                <div className="container">
                    <h2 className="text-center">Integraciones WhatsApp + Bots + Email</h2>

                    <div className="grid grid-2 mt-5">
                        <div className="card">
                            <h3>📱 WhatsApp Business API</h3>
                            <p className="mt-2">Respuestas automáticas 24/7, chatbots con IA, envío masivo personalizado e integración con CRM.</p>
                        </div>

                        <div className="card">
                            <h3>✉️ Email Marketing</h3>
                            <p className="mt-2">ActiveCampaign, Mailchimp, Mautic y secuencias automatizadas personalizadas.</p>
                        </div>

                        <div className="card">
                            <h3>🤖 Chatbots Inteligentes</h3>
                            <p className="mt-2">ManyChat para Facebook/Instagram, Chatfuel y bots personalizados con IA.</p>
                        </div>

                        <div className="card">
                            <h3>📊 CRM y Seguimiento</h3>
                            <p className="mt-2">HubSpot, Pipedrive, Zoho CRM e integraciones personalizadas.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h2 className="text-center">Beneficios reales</h2>

                    <div className="grid grid-2 mt-5" style={{ maxWidth: '900px', margin: '40px auto 0' }}>
                        <div className="stat-card">
                            <div className="stat-card-number gradient-text">80%</div>
                            <div className="stat-card-label">Automatización del proceso de ventas</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-card-number gradient-text">+45%</div>
                            <div className="stat-card-label">Más conversión vs proceso manual</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-card-number gradient-text">0%</div>
                            <div className="stat-card-label">Leads olvidados (seguimiento perfecto)</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-card-number gradient-text">6.2x</div>
                            <div className="stat-card-label">ROI promedio en el primer año</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="cta-box glass text-center">
                        <h2>Automatiza tu proceso de ventas en 30 días</h2>
                        <p className="mt-3">Desde $1,500 USD. Pago a crédito disponible.</p>
                        <div className="page-ctas mt-4">
                            <a href="#contacto" className="btn btn-primary">Agendar consultoría estratégica</a>
                            <a href="https://wa.me/573001234567?text=Hola,%20quiero%20información%20sobre%20automatización" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                                Hablar por WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <ContactForm />
        </div>
    );
};

export default FunnelsPage;
