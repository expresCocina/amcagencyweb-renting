import { Link } from 'react-router-dom';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import './SharedPageStyles.css';
import './SEOPage.css';
import './CasesPage.css';

const CasesPage = () => {
    const cases = [
        {
            title: 'EcoTienda Online',
            country: 'Colombia',
            flag: '🇨🇴',
            industry: 'E-commerce sostenible',
            service: 'SEO + Desarrollo Web',
            duration: '6 meses',
            demoUrl: '/demo/ecotienda',
            results: [
                { label: 'Tráfico orgánico', value: '+1,150%', desc: '200 → 2,500 visitas/mes' },
                { label: 'Ventas', value: '+320%', desc: '2-3 → 10-12 ventas/mes' },
                { label: 'Velocidad', value: '1.8s', desc: 'Antes: 4.2s' },
                { label: 'Keywords Top 3', value: '15', desc: 'Posiciones principales' }
            ],
            roi: '4.8x en 6 meses'
        },
        {
            title: 'Inmobiliaria Horizonte',
            country: 'México',
            flag: '🇲🇽',
            industry: 'Bienes raíces',
            service: 'Embudos + Automatización',
            duration: '4 meses',
            demoUrl: '/demo/inmobiliaria',
            results: [
                { label: 'Automatización', value: '80%', desc: 'Del proceso de ventas' },
                { label: 'Ahorro de tiempo', value: '-15h/sem', desc: 'Trabajo manual' },
                { label: 'Conversión', value: '3% → 7.2%', desc: 'Tasa de cierre' },
                { label: 'Ventas adicionales', value: '+$180M', desc: 'COP en 4 meses' }
            ],
            roi: '6.2x en 4 meses'
        },
        {
            title: 'Clínica Dental Sonrisa',
            country: 'Argentina',
            flag: '🇦🇷',
            industry: 'Salud dental',
            service: 'SEO Local + Google Ads',
            duration: '5 meses',
            demoUrl: '/demo/clinica-dental',
            results: [
                { label: 'Google Maps', value: '#1', desc: 'Búsquedas locales' },
                { label: 'Llamadas', value: '+280%', desc: '8-10 → 35-40 pacientes/mes' },
                { label: 'CAC', value: '$85 → $32', desc: 'Costo por adquisición' },
                { label: 'Rating', value: '4.9/5', desc: '67 reseñas' }
            ],
            roi: '5.1x en 5 meses'
        },
        {
            title: 'TechStart Colombia',
            country: 'Colombia',
            flag: '🇨🇴',
            industry: 'Startup tecnológica',
            service: 'Growth Hacking + Social Ads',
            duration: '3 meses',
            demoUrl: '/demo/techstart',
            results: [
                { label: 'Usuarios registrados', value: '+890%', desc: '450 → 4,500 usuarios' },
                { label: 'CAC', value: '$12', desc: 'Costo por usuario' },
                { label: 'Viral coefficient', value: '1.8x', desc: 'Crecimiento orgánico' },
                { label: 'App Store rating', value: '4.7/5', desc: '230+ reviews' }
            ],
            roi: '7.5x en 3 meses'
        },
        {
            title: 'Restaurante Sabor Argentino',
            country: 'Argentina',
            flag: '🇦🇷',
            industry: 'Gastronomía',
            service: 'Social Media + Influencers',
            duration: '4 meses',
            demoUrl: '/demo/restaurante',
            results: [
                { label: 'Seguidores IG', value: '+425%', desc: '2.8K → 14.7K' },
                { label: 'Engagement', value: '8.2%', desc: 'Antes: 1.3%' },
                { label: 'Reservas online', value: '+340%', desc: '15 → 66/semana' },
                { label: 'Ventas delivery', value: '+180%', desc: 'Pedidos semanales' }
            ],
            roi: '5.8x en 4 meses'
        },
        {
            title: 'Academia Digital Pro',
            country: 'México',
            flag: '🇲🇽',
            industry: 'E-learning',
            service: 'SEO + Google Ads + YouTube',
            duration: '6 meses',
            demoUrl: '/demo/academia',
            results: [
                { label: 'Alumnos inscritos', value: '+650%', desc: '120 → 900 alumnos' },
                { label: 'Suscriptores YouTube', value: '15.2K', desc: 'Desde 0' },
                { label: 'Tráfico orgánico', value: '+980%', desc: 'Google Search' },
                { label: 'Revenue mensual', value: '+$112M', desc: 'COP adicionales' }
            ],
            roi: '8.2x en 6 meses'
        },
        {
            title: 'Boutique Eleganza',
            country: 'Chile',
            flag: '🇨🇱',
            industry: 'Moda',
            service: 'Branding + E-commerce + Ads',
            duration: '5 meses',
            demoUrl: '/demo/boutique',
            results: [
                { label: 'Ventas online', value: '+520%', desc: '$8K → $49.6K/mes' },
                { label: 'ROAS', value: '4.8x', desc: 'Retorno en ads' },
                { label: 'Tasa conversión', value: '2.1% → 5.7%', desc: 'Checkout mejorado' },
                { label: 'Ticket promedio', value: '+45%', desc: 'Valor de compra' }
            ],
            roi: '6.8x en 5 meses'
        },
        {
            title: 'Consultora Empresarial Líder',
            country: 'Perú',
            flag: '🇵🇪',
            industry: 'Consultoría B2B',
            service: 'Lead Generation + LinkedIn',
            duration: '4 meses',
            demoUrl: '/demo/consultora',
            results: [
                { label: 'Leads calificados', value: '+740%', desc: '12 → 101/mes' },
                { label: 'Propuestas enviadas', value: '+450%', desc: '5 → 27.5/mes' },
                { label: 'Tasa cierre', value: '8% → 18%', desc: 'Conversión mejorada' },
                { label: 'Revenue', value: '+$368M', desc: 'COP en 4 meses' }
            ],
            roi: '9.2x en 4 meses'
        }
    ];

    return (
        <div className="page cases-page">
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-content">
                        <h1>Resultados <span className="gradient-text">reales de clientes reales</span></h1>
                        <p className="page-subtitle">
                            Descubre cómo empresas en Latinoamérica están creciendo con nuestras estrategias digitales.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {cases.map((caseStudy, index) => (
                        <div key={index} className="case-study-card glass" style={{ marginBottom: '40px' }}>
                            <div className="case-header">
                                <div>
                                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>{caseStudy.flag}</div>
                                    <h2>{caseStudy.title}</h2>
                                    <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
                                        {caseStudy.industry} • {caseStudy.country}
                                    </p>
                                </div>
                                <div className="case-meta">
                                    <div><strong>Servicio:</strong> {caseStudy.service}</div>
                                    <div><strong>Duración:</strong> {caseStudy.duration}</div>
                                </div>
                            </div>

                            <div className="grid grid-2 mt-4" style={{ gap: '16px' }}>
                                {caseStudy.results.map((result, idx) => (
                                    <div key={idx} className="result-item">
                                        <div className="result-value gradient-text">{result.value}</div>
                                        <div className="result-label">{result.label}</div>
                                        <div className="result-desc">{result.desc}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="case-roi mt-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                                <div>
                                    <strong>ROI:</strong> <span className="gradient-text">{caseStudy.roi}</span>
                                </div>
                                <Link
                                    to={caseStudy.demoUrl}
                                    className="btn btn-primary"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    Ver Demo en Vivo 🚀
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Testimonials />

            <section className="section" style={{ background: 'var(--bg-container)' }}>
                <div className="container">
                    <h2 className="text-center">Resultados consolidados</h2>
                    <p className="text-center mt-3 mb-5">El impacto de trabajar con AMC Agency Web</p>

                    <div className="grid grid-3">
                        <div className="stat-card">
                            <div className="stat-card-number gradient-text">+287%</div>
                            <div className="stat-card-label">Tráfico web promedio</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-card-number gradient-text">+156%</div>
                            <div className="stat-card-label">Leads calificados</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-card-number gradient-text">5.9x</div>
                            <div className="stat-card-label">ROI promedio</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="cta-box glass text-center">
                        <h2>¿Listo para ser nuestro próximo caso de éxito?</h2>
                        <div className="page-ctas mt-4">
                            <a href="#contacto" className="btn btn-primary">Solicitar consultoría estratégica</a>
                            <a href="https://wa.me/573138537261?text=Hola,%20quiero%20información%20sobre%20sus%20servicios" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
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

export default CasesPage;
