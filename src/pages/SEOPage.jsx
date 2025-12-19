import { Link } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';
import ContactForm from '../components/ContactForm';
import './SEOPage.css';

const SEOPage = () => {
    return (
        <div className="page seo-page">
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-content">
                        <h1>SEO que genera <span className="gradient-text">tráfico real y clientes calificados</span></h1>
                        <p className="page-subtitle">
                            Posicionamiento estratégico en Google para empresas en LATAM que quieren dominar su mercado.
                        </p>
                        <div className="page-ctas">
                            <a href="#contacto" className="btn btn-primary">Solicitar auditoría SEO gratuita</a>
                            <Link to="/casos" className="btn btn-secondary">Ver casos de éxito →</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h2 className="text-center">No vendemos rankings, vendemos resultados</h2>
                    <p className="text-center mt-3" style={{ maxWidth: '800px', margin: '16px auto 0' }}>
                        Nuestro SEO está diseñado para generar tráfico que convierte. Nos enfocamos en keywords con intención de compra, optimización técnica y contenido que posiciona.
                    </p>

                    <div className="grid grid-2 mt-5">
                        <div className="card">
                            <h3>✅ Estrategia basada en datos</h3>
                            <p className="mt-2">No en intuición. Cada decisión respaldada por análisis profundo.</p>
                        </div>
                        <div className="card">
                            <h3>📊 Reportes mensuales con KPIs</h3>
                            <p className="mt-2">Leads, ventas, ROI - métricas de negocio reales.</p>
                        </div>
                        <div className="card">
                            <h3>🌎 Especialistas en LATAM</h3>
                            <p className="mt-2">Conocemos el mercado y comportamiento local.</p>
                        </div>
                        <div className="card">
                            <h3>⚡ Resultados desde el mes 3</h3>
                            <p className="mt-2">Primeros resultados visibles en 90 días.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: 'var(--bg-container)' }}>
                <div className="container">
                    <h2 className="text-center">Qué incluye nuestro servicio SEO</h2>

                    <div className="service-includes mt-5">
                        <div className="include-item">
                            <div className="include-number">1</div>
                            <div>
                                <h3>Auditoría técnica completa</h3>
                                <p>Análisis de velocidad, Core Web Vitals, errores de indexación y optimización de arquitectura web.</p>
                            </div>
                        </div>

                        <div className="include-item">
                            <div className="include-number">2</div>
                            <div>
                                <h3>Investigación de keywords LATAM</h3>
                                <p>Análisis de competencia local, keywords de alta conversión y oportunidades de long-tail.</p>
                            </div>
                        </div>

                        <div className="include-item">
                            <div className="include-number">3</div>
                            <div>
                                <h3>Optimización on-page</h3>
                                <p>Estructura de contenido SEO-friendly, meta tags optimizados y schema markup.</p>
                            </div>
                        </div>

                        <div className="include-item">
                            <div className="include-number">4</div>
                            <div>
                                <h3>Estrategia de contenido</h3>
                                <p>Calendario editorial mensual, contenido optimizado para conversión y link building estratégico.</p>
                            </div>
                        </div>

                        <div className="include-item">
                            <div className="include-number">5</div>
                            <div>
                                <h3>Reportes y seguimiento</h3>
                                <p>Dashboard en tiempo real, reuniones mensuales y ajustes continuos basados en datos.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h2 className="text-center">Resultados promedio de nuestros clientes</h2>

                    <div className="grid grid-2 mt-5" style={{ maxWidth: '900px', margin: '40px auto 0' }}>
                        <div className="stat-card">
                            <div className="stat-card-number gradient-text">+287%</div>
                            <div className="stat-card-label">Tráfico orgánico en 6 meses</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-card-number gradient-text">+156%</div>
                            <div className="stat-card-label">Leads calificados desde Google</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-card-number gradient-text">4.2x</div>
                            <div className="stat-card-label">ROI promedio en el primer año</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-card-number gradient-text">Top 3</div>
                            <div className="stat-card-label">Posiciones en 4-8 meses</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: 'var(--bg-container)' }}>
                <div className="container">
                    <h2 className="text-center">Cronograma de trabajo</h2>

                    <div className="timeline mt-5">
                        <div className="timeline-item">
                            <div className="timeline-marker">Mes 1</div>
                            <div className="timeline-content">
                                <h3>Diagnóstico y fundamentos</h3>
                                <p>Auditoría técnica completa, investigación de keywords y optimización técnica inicial.</p>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-marker">Mes 2-3</div>
                            <div className="timeline-content">
                                <h3>Optimización y contenido</h3>
                                <p>Optimización on-page completa, primeras publicaciones de contenido e inicio de link building.</p>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-marker">Mes 4-6</div>
                            <div className="timeline-content">
                                <h3>Escalamiento</h3>
                                <p>Expansión de keywords, contenido avanzado (pillar pages) y optimización de conversión.</p>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-marker">Mes 7+</div>
                            <div className="timeline-content">
                                <h3>Dominio y mantenimiento</h3>
                                <p>Consolidación de posiciones, expansión a nuevos mercados y optimización continua.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="cta-box glass text-center">
                        <h2>Empieza a recibir tráfico calificado desde Google</h2>
                        <p className="mt-3">Planes desde $550.000 COP/mes. Pago a crédito disponible.</p>
                        <div className="page-ctas mt-4">
                            <a href="#contacto" className="btn btn-primary">Solicitar auditoría SEO gratuita</a>
                            <a href="https://wa.me/573138537261?text=Hola,%20quiero%20información%20sobre%20SEO" className="btn btn-secondary" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('Contact', { method: 'whatsapp', source: 'seo_page', button_text: 'Hablar con especialista' })}>
                                Hablar con especialista
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <ContactForm />
        </div>
    );
};

export default SEOPage;
