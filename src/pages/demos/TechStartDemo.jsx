import { useState } from 'react';
import '../SharedPageStyles.css';
import '../demos/DemoPages.css';
import '../SharedPageStyles.css';

const TechStartDemo = () => {
    const [activeTab, setActiveTab] = useState('features');

    return (
        <div className="demo-page">
            {/* Demo Header */}
            <div className="demo-header">
                <div className="demo-overlay"></div>
                <div className="container">
                    <div className="demo-header-content">
                        <div className="demo-logo">🚀</div>
                        <h1>TechStart</h1>
                        <p className="demo-tagline">La App que Conecta Startups con Inversionistas en LATAM</p>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="demo-nav">
                <div className="container">
                    <button
                        className={activeTab === 'features' ? 'active' : ''}
                        onClick={() => setActiveTab('features')}
                    >
                        Características
                    </button>
                    <button
                        className={activeTab === 'growth' ? 'active' : ''}
                        onClick={() => setActiveTab('growth')}
                    >
                        Crecimiento
                    </button>
                    <button
                        className={activeTab === 'metrics' ? 'active' : ''}
                        onClick={() => setActiveTab('metrics')}
                    >
                        Métricas
                    </button>
                </div>
            </div>

            {/* Content Sections */}
            <div className="demo-content">
                <div className="container">
                    {activeTab === 'features' && (
                        <div className="content-section fade-in">
                            <h2>Features de la Plataforma</h2>

                            <div className="features-grid">
                                <div className="feature-card">
                                    <div className="feature-icon">🎯</div>
                                    <h3>Matching Inteligente</h3>
                                    <p>Algoritmo de ML que conecta startups con inversionistas según sector, etapa y monto de inversión.</p>
                                </div>
                                <div className="feature-card">
                                    <div className="feature-icon">📊</div>
                                    <h3>Dashboard Analytics</h3>
                                    <p>Métricas en tiempo real de tu startup: traction, burn rate, runway y KPIs personalizados.</p>
                                </div>
                                <div className="feature-card">
                                    <div className="feature-icon">💬</div>
                                    <h3>Chat Directo</h3>
                                    <p>Comunicación directa entre founders e inversionistas con video calls integradas.</p>
                                </div>
                                <div className="feature-card">
                                    <div className="feature-icon">📄</div>
                                    <h3>Virtual Data Room</h3>
                                    <p>Espacio seguro para compartir documentos, financials y term sheets.</p>
                                </div>
                                <div className="feature-card">
                                    <div className="feature-icon">🏆</div>
                                    <h3>Leaderboard</h3>
                                    <p>Ranking de startups más prometedoras basado en traction y validación de mercado.</p>
                                </div>
                                <div className="feature-card">
                                    <div className="feature-icon">🎓</div>
                                    <h3>Recursos Educativos</h3>
                                    <p>Webinars, templates y guías sobre fundraising, pitch decks y term sheets.</p>
                                </div>
                            </div>

                            <div className="demo-cta-section">
                                <h3>Testimonial del Fundador</h3>
                                <blockquote>
                                    "AMC nos ayudó a escalar de 450 a 4,500 usuarios en solo 3 meses.
                                    Su estrategia de growth hacking combinada con Social Ads fue perfecta para nuestro target."
                                    <cite>— Andrés Morales, CEO TechStart</cite>
                                </blockquote>
                            </div>
                        </div>
                    )}

                    {activeTab === 'growth' && (
                        <div className="content-section fade-in">
                            <h2>Estrategia de Growth Hacking</h2>

                            <div className="metrics-cards">
                                <div className="metric-card highlight">
                                    <div className="metric-value">+890%</div>
                                    <div className="metric-label">Usuarios Registrados</div>
                                    <div className="metric-desc">450 → 4,500 en 3 meses</div>
                                </div>
                                <div className="metric-card">
                                    <div className="metric-value">$12</div>
                                    <div className="metric-label">CAC</div>
                                    <div className="metric-desc">Costo por adquisición</div>
                                </div>
                                <div className="metric-card">
                                    <div className="metric-value">1.8x</div>
                                    <div className="metric-label">Viral Coefficient</div>
                                    <div className="metric-desc">Crecimiento orgánico</div>
                                </div>
                            </div>

                            <div className="tactics-section">
                                <h3>Tácticas Implementadas</h3>
                                <div className="tactics-list">
                                    <div className="tactic-item">
                                        <span className="tactic-number">1</span>
                                        <div>
                                            <h4>Programa de Referidos</h4>
                                            <p>Incentivos para usuarios que invitan: 30 días premium gratis por cada 3 referidos activos.</p>
                                        </div>
                                    </div>
                                    <div className="tactic-item">
                                        <span className="tactic-number">2</span>
                                        <div>
                                            <h4>Product Hunt Launch</h4>
                                            <p>Lanzamiento coordinado que nos llevó a Top 5 del día, generando 850+ signups.</p>
                                        </div>
                                    </div>
                                    <div className="tactic-item">
                                        <span className="tactic-number">3</span>
                                        <div>
                                            <h4>LinkedIn Ads + Retargeting</h4>
                                            <p>Campañas específicas para founders y angel investors con lookalike audiences.</p>
                                        </div>
                                    </div>
                                    <div className="tactic-item">
                                        <span className="tactic-number">4</span>
                                        <div>
                                            <h4>Community Building</h4>
                                            <p>Slack community con 1,200+ miembros activos compartiendo recursos y haciendo networking.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'metrics' && (
                        <div className="content-section fade-in">
                            <h2>Métricas del Proyecto</h2>

                            <div className="stats-grid">
                                <div className="stat-box">
                                    <div className="stat-icon">👥</div>
                                    <div className="stat-number">4,500</div>
                                    <div className="stat-label">Usuarios Activos</div>
                                </div>
                                <div className="stat-box">
                                    <div className="stat-icon">🚀</div>
                                    <div className="stat-number">320</div>
                                    <div className="stat-label">Startups Registradas</div>
                                </div>
                                <div className="stat-box">
                                    <div className="stat-icon">💰</div>
                                    <div className="stat-number">85</div>
                                    <div className="stat-label">Inversionistas Activos</div>
                                </div>
                                <div className="stat-box">
                                    <div className="stat-icon">🤝</div>
                                    <div className="stat-number">23</div>
                                    <div className="stat-label">Deals Cerrados</div>
                                </div>
                            </div>

                            <div className="results-section">
                                <h3>Resultados en 3 Meses</h3>
                                <div className="results-list">
                                    <div className="result-item">
                                        <div className="result-icon">✅</div>
                                        <div className="result-content">
                                            <h4>Growth Explosivo</h4>
                                            <p>De 450 a 4,500 usuarios (+890%) en solo 3 meses con CAC de $12 USD.</p>
                                        </div>
                                    </div>
                                    <div className="result-item">
                                        <div className="result-icon">✅</div>
                                        <div className="result-content">
                                            <h4>Viralidad Orgánica</h4>
                                            <p>Coeficiente viral de 1.8x - cada usuario trae 1.8 usuarios adicionales sin costo.</p>
                                        </div>
                                    </div>
                                    <div className="result-item">
                                        <div className="result-icon">✅</div>
                                        <div className="result-content">
                                            <h4>App Store Success</h4>
                                            <p>Rating de 4.7/5 con 230+ reviews positivas y featured en Colombia.</p>
                                        </div>
                                    </div>
                                    <div className="result-item">
                                        <div className="result-icon">✅</div>
                                        <div className="result-content">
                                            <h4>ROI Comprobado</h4>
                                            <p>ROI de 7.5x en 3 meses - cada dólar invertido generó $7.50 en valor.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="demo-footer-cta">
                                <h3>¿Quieres resultados similares?</h3>
                                <p>Trabajemos juntos para escalar tu startup o negocio digital</p>
                                <a href="/#contacto" className="btn btn-primary">Solicitar Consultoría Gratuita</a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TechStartDemo;
