import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
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
            results: [
                { label: 'Automatización', value: '80%', desc: 'Del proceso de ventas' },
                { label: 'Ahorro de tiempo', value: '-15h/sem', desc: 'Trabajo manual' },
                { label: 'Conversión', value: '3% → 7.2%', desc: 'Tasa de cierre' },
                { label: 'Ventas adicionales', value: '+$45K', desc: 'USD en 4 meses' }
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
            results: [
                { label: 'Google Maps', value: '#1', desc: 'Búsquedas locales' },
                { label: 'Llamadas', value: '+280%', desc: '8-10 → 35-40 pacientes/mes' },
                { label: 'CAC', value: '$85 → $32', desc: 'Costo por adquisición' },
                { label: 'Rating', value: '4.9/5', desc: '67 reseñas' }
            ],
            roi: '5.1x en 5 meses'
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

                            <div className="case-roi mt-4">
                                <strong>ROI:</strong> <span className="gradient-text">{caseStudy.roi}</span>
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
                            <a href="https://wa.me/573001234567?text=Hola,%20quiero%20información%20sobre%20sus%20servicios" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
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
