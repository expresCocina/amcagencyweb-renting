import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import './SharedPageStyles.css';
import '../pages/SEOPage.css';

const WebDevPage = () => {
    return (
        <div className="page webdev-page">
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-content">
                        <h1>Sitios web que <span className="gradient-text">convierten visitantes en clientes</span></h1>
                        <p className="page-subtitle">
                            Desarrollo web profesional optimizado para ventas, velocidad y experiencia de usuario. Diseñado para el mercado latinoamericano.
                        </p>
                        <div className="page-ctas">
                            <a href="#contacto" className="btn btn-primary">Solicitar cotización personalizada</a>
                            <Link to="/casos" className="btn btn-secondary">Ver portafolio →</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h2 className="text-center">UX orientada a ventas</h2>
                    <p className="text-center mt-3" style={{ maxWidth: '800px', margin: '16px auto 40px' }}>
                        Cada pixel tiene un propósito: convertir. Diseñamos experiencias digitales basadas en psicología de conversión, datos de comportamiento y mejores prácticas de UX.
                    </p>

                    <div className="grid grid-3">
                        <div className="card">
                            <h3>📱 Mobile-First</h3>
                            <p className="mt-2">80% del tráfico LATAM es móvil. Diseñamos primero para smartphones.</p>
                        </div>
                        <div className="card">
                            <h3>⚡ Velocidad &lt; 2s</h3>
                            <p className="mt-2">Sitios ultra-rápidos que no pierden visitantes por carga lenta.</p>
                        </div>
                        <div className="card">
                            <h3>🎯 CTAs Estratégicos</h3>
                            <p className="mt-2">Botones de acción cada 2-3 secciones para maximizar conversión.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: 'var(--bg-container)' }}>
                <div className="container">
                    <h2 className="text-center">Integración con pasarelas LATAM</h2>
                    <p className="text-center mt-3 mb-5">Acepta pagos desde el día 1 con las pasarelas más usadas en Latinoamérica</p>

                    <div className="grid grid-2">
                        <div className="card">
                            <h3>💳 Wompi (Colombia)</h3>
                            <p className="mt-2">Tarjetas, PSE, Nequi y más métodos locales.</p>
                        </div>
                        <div className="card">
                            <h3>💰 MercadoPago (LATAM)</h3>
                            <p className="mt-2">Tarjetas, transferencias y cuotas sin interés.</p>
                        </div>
                        <div className="card">
                            <h3>🌐 Stripe (Internacional)</h3>
                            <p className="mt-2">Tarjetas y suscripciones para pagos globales.</p>
                        </div>
                        <div className="card">
                            <h3>💵 PayPal (Global)</h3>
                            <p className="mt-2">Pagos internacionales seguros y confiables.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h2 className="text-center mb-5">Tipos de sitios web</h2>

                    <div className="grid grid-3">
                        <div className="card">
                            <h3>Landing Page</h3>
                            <p className="mt-2">Una sola página ultra-optimizada para un objetivo específico.</p>
                            <div className="mt-3">
                                <strong className="gradient-text">Desde $350.000 COP</strong>
                                <p style={{ fontSize: '14px', marginTop: '8px' }}>Tiempo: 2-3 semanas</p>
                            </div>
                        </div>

                        <div className="card" style={{ borderColor: 'var(--accent-magenta)' }}>
                            <div className="badge">🔥 Más popular</div>
                            <h3>Sitio Corporativo</h3>
                            <p className="mt-2">5-10 páginas estratégicas con blog integrado para SEO.</p>
                            <div className="mt-3">
                                <strong className="gradient-text">Desde $950.000 COP</strong>
                                <p style={{ fontSize: '14px', marginTop: '8px' }}>Tiempo: 4-6 semanas</p>
                            </div>
                        </div>

                        <div className="card">
                            <h3>E-commerce</h3>
                            <p className="mt-2">Tienda online completa con carrito, pagos y panel de administración.</p>
                            <div className="mt-3">
                                <strong className="gradient-text">Desde $1.500.000 COP</strong>
                                <p style={{ fontSize: '14px', marginTop: '8px' }}>Tiempo: 6-8 semanas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="cta-box glass text-center">
                        <h2>Lanza tu sitio web profesional en menos de 8 semanas</h2>
                        <p className="mt-3">💳 Pago a crédito disponible - Financia tu proyecto hasta en 12 cuotas</p>
                        <div className="page-ctas mt-4">
                            <a href="#contacto" className="btn btn-primary">Solicitar cotización</a>
                            <Link to="/credito" className="btn btn-secondary">Ver opciones de financiación</Link>
                        </div>
                    </div>
                </div>
            </section>

            <ContactForm />
        </div>
    );
};

export default WebDevPage;
