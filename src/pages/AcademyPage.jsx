import Academy from '../components/Academy';
import ContactForm from '../components/ContactForm';
import './SharedPageStyles.css';
import './SEOPage.css';

const AcademyPage = () => {
    return (
        <div className="page academy-full-page">
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-content">
                        <h1>Aprende las habilidades <span className="gradient-text">digitales más demandadas</span></h1>
                        <p className="page-subtitle">
                            Formación práctica en marketing digital, SEO y desarrollo web para Latinoamérica. Certificación profesional + comunidad + bolsa de trabajo.
                        </p>
                        <div className="page-ctas">
                            <a href="#cursos" className="btn btn-primary">Ver cursos disponibles</a>
                            <a href="https://wa.me/573138537261?text=Hola,%20quiero%20información%20sobre%20los%20cursos" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                                Hablar con asesor académico
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Academy />

            <section className="section" style={{ background: 'var(--bg-container)' }} id="certificacion">
                <div className="container">
                    <h2 className="text-center">Certificación profesional</h2>
                    <p className="text-center mt-3 mb-5">Certificados reconocidos en la industria</p>

                    <div className="grid grid-2">
                        <div className="card">
                            <h3>✅ Certificado digital verificable</h3>
                            <p className="mt-2">Con badge para LinkedIn y validación de habilidades prácticas.</p>
                        </div>
                        <div className="card" id="bolsa-trabajo">
                            <h3>💼 Acceso a bolsa de trabajo</h3>
                            <p className="mt-2">Conexión directa con empresas que buscan talento digital.</p>
                        </div>
                        <div className="card">
                            <h3>🎯 78% consigue trabajo en 3 meses</h3>
                            <p className="mt-2">Nuestros graduados tienen alta empleabilidad en el mercado.</p>
                        </div>
                        <div className="card">
                            <h3>💰 Salario promedio $3.2M-6M COP/mes</h3>
                            <p className="mt-2">Trabajos remotos con ingresos en dólares.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="cta-box glass text-center">
                        <h2>Invierte en tu futuro digital hoy</h2>
                        <p className="mt-3">💳 Pago a crédito disponible - Hasta 6 cuotas sin interés</p>
                        <div className="page-ctas mt-4">
                            <a href="#contacto" className="btn btn-primary">Ver todos los cursos</a>
                            <a href="https://wa.me/573138537261?text=Hola,%20quiero%20información%20sobre%20los%20cursos" className="btn btn-secondary" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('Contact', { method: 'whatsapp', source: 'academy_page', button_text: 'Hablar con asesor' })}>
                                Hablar con asesor
                            </a>
                        </div>
                        <p className="mt-4" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                            💯 30 días de garantía - Si no estás satisfecho, te devolvemos tu dinero
                        </p>
                    </div>
                </div>
            </section>

            <ContactForm />
        </div>
    );
};

export default AcademyPage;
