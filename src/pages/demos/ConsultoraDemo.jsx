import { useState } from 'react';
import '../SharedPageStyles.css';
import '../demos/DemoPages.css';
import '../SharedPageStyles.css';

const ConsultoraDemo = () => {
    const [selectedService, setSelectedService] = useState(null);

    const services = [
        {
            id: 1,
            icon: '📊',
            title: 'Consultoría Estratégica',
            description: 'Transformación digital y optimización de procesos empresariales',
            results: '+35% eficiencia operacional'
        },
        {
            id: 2,
            icon: '💼',
            title: 'Gestión del Cambio',
            description: 'Implementación de nuevas tecnologías y culturas organizacionales',
            results: '92% adopción exitosa'
        },
        {
            id: 3,
            icon: '📈',
            title: 'Growth Consulting',
            description: 'Estrategias de crecimiento acelerado para empresas B2B',
            results: '+180% revenue growth'
        },
        {
            id: 4,
            icon: '🎯',
            title: 'Marketing B2B',
            description: 'Lead generation y posicionamiento en mercados corporativos',
            results: '+740% leads calificados'
        }
    ];

    const caseStudies = [
        { company: 'Tech Corp', industry: 'Tecnología', result: '+250% revenue' },
        { company: 'Banco  Regional', industry: 'Finanzas', result: '60% menos costos' },
        { company: 'Constructora XYZ', industry: 'Construcción', result: '45% más proyectos' },
    ];

    return (
        <div className="demo-page consultora-demo">
            {/* Hero */}
            <div className="demo-header corporate-header">
                <div className="demo-overlay"></div>
                <div className="container">
                    <div className="demo-header-content">
                        <div className="demo-logo">💼</div>
                        <h1>Consultora Empresarial Líder</h1>
                        <p className="demo-tagline">Transformamos Empresas en Líderes de su Industria</p>
                        <button className="btn btn-primary btn-large">Solicitar Diagnóstico Gratuito</button>
                    </div>
                </div>
            </div>

            {/* Trust Bar */}
            <div className="trust-bar">
                <div className="container">
                    <div className="trust-text">Empresas que confían en nosotros:</div>
                    <div className="logos-row">
                        {['🏢', '🏦', '🏗️', '🏭', '🏪'].map((logo, i) => (
                            <div key={i} className="company-logo">{logo}</div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="demo-content">
                <div className="container">
                    {/* Services */}
                    <section className="services-section">
                        <h2>Nuestros Servicios</h2>
                        <div className="services-grid">
                            {services.map(service => (
                                <div
                                    key={service.id}
                                    className={`service-card ${selectedService === service.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedService(service.id)}
                                >
                                    <div className="service-icon">{service.icon}</div>
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    <div className="service-result">{service.results}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Methodology */}
                    <section className="methodology-section">
                        <h2>Nuestra Metodología</h2>
                        <div className="methodology-steps">
                            <div className="method-step">
                                <div className="method-number">01</div>
                                <h3>Diagnóstico</h3>
                                <p>Análisis profundo de tu situación actual, retos y oportunidades</p>
                            </div>
                            <div className="method-step">
                                <div className="method-number">02</div>
                                <h3>Estrategia</h3>
                                <p>Plan personalizado con objetivos SMART y roadmap detallado</p>
                            </div>
                            <div className="method-step">
                                <div className="method-number">03</div>
                                <h3>Implementación</h3>
                                <p>Ejecución con tu equipo y acompañamiento constante</p>
                            </div>
                            <div className="method-step">
                                <div className="method-number">04</div>
                                <h3>Medición</h3>
                                <p>Tracking de KPIs y ajustes basados en datos reales</p>
                            </div>
                        </div>
                    </section>

                    {/* Case Studies */}
                    <section className="case-studies-section">
                        <h2>Casos de Éxito</h2>
                        <div className="cases-grid">
                            {caseStudies.map((caso, index) => (
                                <div key={index} className="case-card">
                                    <div className="case-company">{caso.company}</div>
                                    <div className="case-industry">{caso.industry}</div>
                                    <div className="case-result">{caso.result}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Results with AMC */}
                    <section className="results-section">
                        <h2>Resultados con AMC Agency Web</h2>
                        <div className="metrics-cards">
                            <div className="metric-card highlight">
                                <div className="metric-value">+740%</div>
                                <div className="metric-label">Leads Calificados</div>
                                <div className="metric-desc">12 → 101/mes</div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-value">+450%</div>
                                <div className="metric-label">Propuestas</div>
                                <div className="metric-desc">5 → 27.5/mes</div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-value">18%</div>
                                <div className="metric-label">Tasa Cierre</div>
                                <div className="metric-desc">Antes: 8%</div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-value">+$92K</div>
                                <div className="metric-label">Revenue</div>
                                <div className="metric-desc">USD en 4 meses</div>
                            </div>
                        </div>

                        <div className="strategy-section">
                            <h3>Estrategia de Lead Generation B2B</h3>
                            <div className="strategy-list">
                                <div className="strategy-item">
                                    <span className="strategy-icon">👤</span>
                                    <div>
                                        <h4>Personal Branding en LinkedIn</h4>
                                        <p>Posicionamos a los socios como thought leaders con contenido de valor semanal y networking estratégico.</p>
                                    </div>
                                </div>
                                <div className="strategy-item">
                                    <span className="strategy-icon">📝</span>
                                    <div>
                                        <h4>Content Marketing</h4>
                                        <p>Whitepapers, webinars y case studies que atraen a decision makers de empresas target.</p>
                                    </div>
                                </div>
                                <div className="strategy-item">
                                    <span className="strategy-icon">🎯</span>
                                    <div>
                                        <h4>Outreach Automatizado</h4>
                                        <p>Secuencias de LinkedIn + Email personalizadas que generan reuniones con C-levels.</p>
                                    </div>
                                </div>
                                <div className="strategy-item">
                                    <span className="strategy-icon">🧲</span>
                                    <div>
                                        <h4>Lead Magnets</h4>
                                        <p>Diagnósticos gratuitos y herramientas que capturan info de contacto de prospects calificados.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-box">
                            <blockquote>
                                "Pasamos de depender de referidos a tener un sistema de generación de leads predecible.
                                101 leads calificados al mes y tasa de cierre de 18%. El ROI fue de 9.2x en solo 4 meses."
                                <cite>— Ricardo Salazar, Managing Partner</cite>
                            </blockquote>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="demo-footer-cta">
                        <h3>¿Tienes una consultora o negocio B2B?</h3>
                        <p>Creamos sistemas de lead generation que generan reuniones con decision makers</p>
                        <a href="/#contacto" className="btn btn-primary">Agendar Consultoría Estratégica</a>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ConsultoraDemo;
