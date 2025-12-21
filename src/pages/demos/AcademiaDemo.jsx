import { useState } from 'react';
import '../SharedPageStyles.css';
import '../demos/DemoPages.css';
import '../SharedPageStyles.css';

const AcademiaDemo = () => {
    const [enrollmentStep, setEnrollmentStep] = useState(1);

    const courses = [
        {
            title: 'Marketing Digital Avanzado',
            duration: '8 semanas',
            price: '$199',
            students: '450+',
            rating: '4.9',
            topics: ['SEO', 'SEM', 'Social Ads', 'Analytics']
        },
        {
            title: 'Growth Hacking para Startups',
            duration: '6 semanas',
            price: '$179',
            students: '280+',
            rating: '4.8',
            topics: ['Viral Loops', 'Product-Led Growth', 'Metrics', 'A/B Testing']
        },
        {
            title: 'Copywriting que Convierte',
            duration: '4 semanas',
            price: '$129',
            students: '320+',
            rating: '4.9',
            topics: ['Headlines', 'Emails', 'Landing Pages', 'Storytelling']
        }
    ];

    return (
        <div className="demo-page academia-demo">
            {/* Hero */}
            <div className="demo-header">
                <div className="demo-overlay"></div>
                <div className="container">
                    <div className="demo-header-content">
                        <div className="demo-logo">📚</div>
                        <h1>Academia Digital Pro</h1>
                        <p className="demo-tagline">Aprende Marketing Digital de Profesionales que Generan Resultados Reales</p>
                        <button className="btn btn-primary btn-large">Ver Cursos Gratis</button>
                    </div>
                </div>
            </div>

            {/* Value Props */}
            <div className="value-props">
                <div className="container">
                    <div className="props-grid">
                        <div className="prop-card">
                            <div className="prop-icon">🎥</div>
                            <h3>70+ Videos</h3>
                            <p>Contenido actualizado cada semana</p>
                        </div>
                        <div className="prop-card">
                            <div className="prop-icon">📄</div>
                            <h3>Templates</h3>
                            <p>Plantillas listas para usar</p>
                        </div>
                        <div className="prop-card">
                            <div className="prop-icon">👨‍🏫</div>
                            <h3>Mentorías</h3>
                            <p>Sesiones 1-on-1 incluidas</p>
                        </div>
                        <div className="prop-card">
                            <div className="prop-icon">🏆</div>
                            <h3>Certificado</h3>
                            <p>Avalado por la industria</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="demo-content">
                <div className="container">
                    {/* Courses Section */}
                    <section className="courses-section">
                        <h2>Nuestros Cursos</h2>
                        <div className="courses-grid">
                            {courses.map((course, index) => (
                                <div key={index} className="course-card">
                                    <div className="course-badge">BEST SELLER</div>
                                    <h3>{course.title}</h3>
                                    <div className="course-meta">
                                        <span>⏱️ {course.duration}</span>
                                        <span>👥 {course.students}</span>
                                        <span>⭐ {course.rating}</span>
                                    </div>
                                    <div className="course-topics">
                                        {course.topics.map((topic, idx) => (
                                            <span key={idx} className="topic-tag">{topic}</span>
                                        ))}
                                    </div>
                                    <div className="course-footer">
                                        <div className="course-price">{course.price} USD</div>
                                        <button className="btn btn-primary">Inscribirse</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Enrollment Process */}
                    <section className="enrollment-section">
                        <h2>Proceso de Inscripción</h2>
                        <div className="enrollment-steps">
                            <div className={`step ${enrollmentStep >= 1 ? 'completed' : ''}`}>
                                <div className="step-number">1</div>
                                <div className="step-content">
                                    <h4>Elige tu Curso</h4>
                                    <p>Selecciona el programa perfecto para ti</p>
                                </div>
                            </div>
                            <div className={`step ${enrollmentStep >= 2 ? 'completed' : ''}`}>
                                <div className="step-number">2</div>
                                <div className="step-content">
                                    <h4>Regístrate</h4>
                                    <p>Crea tu cuenta en 30 segundos</p>
                                </div>
                            </div>
                            <div className={`step ${enrollmentStep >= 3 ? 'completed' : ''}`}>
                                <div className="step-number">3</div>
                                <div className="step-content">
                                    <h4>Acceso Inmediato</h4>
                                    <p>Comienza a aprender hoy mismo</p>
                                </div>
                            </div>
                        </div>
                        <div className="enrollment-simulator">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setEnrollmentStep(prev => prev < 3 ? prev + 1 : 1)}
                            >
                                {enrollmentStep < 3 ? 'Siguiente Paso' : 'Reiniciar Demo'}
                            </button>
                        </div>
                    </section>

                    {/* Results */}
                    <section className="results-section">
                        <h2>Resultados con AMC Agency Web</h2>
                        <div className="metrics-cards">
                            <div className="metric-card highlight">
                                <div className="metric-value">+650%</div>
                                <div className="metric-label">Alumnos</div>
                                <div className="metric-desc">120 → 900 en 6 meses</div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-value">15.2K</div>
                                <div className="metric-label">YouTube Subs</div>
                                <div className="metric-desc">Desde cero</div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-value">+980%</div>
                                <div className="metric-label">Tráfico</div>
                                <div className="metric-desc">Google orgánico</div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-value">+$28K</div>
                                <div className="metric-label">Revenue</div>
                                <div className="metric-desc">USD/mes adicional</div>
                            </div>
                        </div>

                        <div className="strategy-section">
                            <h3>Estrategia Implementada</h3>
                            <div className="strategy-list">
                                <div className="strategy-item">
                                    <span className="strategy-icon">📹</span>
                                    <div>
                                        <h4>Canal de YouTube</h4>
                                        <p>Creamos desde cero un canal educativo que llegó a 15.2K suscriptores con videos semanales de alto valor.</p>
                                    </div>
                                </div>
                                <div className="strategy-item">
                                    <span className="strategy-icon">🔍</span>
                                    <div>
                                        <h4>SEO y Google Ads</h4>
                                        <p>Optimización para keywords de alto valor comercial + campañas de búsqueda que generan +980% de tráfico.</p>
                                    </div>
                                </div>
                                <div className="strategy-item">
                                    <span className="strategy-icon">🎓</span>
                                    <div>
                                        <h4>Webinars Gratuitos</h4>
                                        <p>Embudo de webinars que convierte asistentes en alumnos con tasa del 12%.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-box">
                            <blockquote>
                                "En 6 meses pasamos de 120 a 900 alumnos. El canal de YouTube que creamos se convirtió
                                en nuestra máquina de leads. ROI de 8.2x - cada peso invertido generó $8.20."
                                <cite>— Laura Mendoza, Fundadora de Academia Digital Pro</cite>
                            </blockquote>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="demo-footer-cta">
                        <h3>¿Tienes una plataforma de educación online?</h3>
                        <p>Te ayudamos a escalar con marketing digital que funciona</p>
                        <a href="/#contacto" className="btn btn-primary">Hablar con un Especialista</a>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AcademiaDemo;
