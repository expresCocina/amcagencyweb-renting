import { useState } from 'react';
import './SharedPageStyles.css';
import './ResourcesPage.css';

const ResourcesPage = () => {
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [selectedResource, setSelectedResource] = useState(null);
    const [email, setEmail] = useState('');

    const resources = [
        {
            id: 1,
            title: 'Checklist Completo de SEO 2024',
            description: 'Lista verificación de 50+ puntos para optimizar tu sitio web y mejorar tu posicionamiento en Google.',
            icon: '📋',
            type: 'PDF',
            pages: '12 páginas',
            category: 'SEO',
            downloads: '2.5K'
        },
        {
            id: 2,
            title: 'Plantilla de Plan de Marketing Digital',
            description: 'Plantilla Excel completa con estrategias, calendario, presupuesto y KPIs para tu plan de marketing.',
            icon: '📊',
            type: 'Excel',
            pages: '8 hojas',
            category: 'Marketing',
            downloads: '1.8K'
        },
        {
            id: 3,
            title: 'Guía de Creación de Buyer Personas',
            description: 'Aprende a crear buyer personas efectivos con plantillas y ejemplos reales de la industria.',
            icon: '🎯',
            type: 'PDF',
            pages: '18 páginas',
            category: 'Estrategia',
            downloads: '3.2K'
        },
        {
            id: 4,
            title: 'Calculadora de ROI de Marketing',
            description: 'Herramienta Excel para calcular el retorno de inversión de tus campañas digitales.',
            icon: '💰',
            type: 'Excel',
            pages: '5 hojas',
            category: 'Analytics',
            downloads: '1.5K'
        },
        {
            id: 5,
            title: 'Whitepaper: El Futuro del E-commerce en LATAM',
            description: 'Análisis profundo de tendencias, oportunidades y predicciones para el comercio electrónico.',
            icon: '📈',
            type: 'PDF',
            pages: '24 páginas',
            category: 'E-commerce',
            downloads: '4.1K'
        },
        {
            id: 6,
            title: 'Guía Completa de Social Media Marketing',
            description: 'Estrategias probadas para Instagram, Facebook, TikTok y LinkedIn con casos de éxito.',
            icon: '📱',
            type: 'PDF',
            pages: '20 páginas',
            category: 'Social Media',
            downloads: '2.9K'
        }
    ];

    const handleDownload = (resource) => {
        setSelectedResource(resource);
        setShowDownloadModal(true);
    };

    const handleSubmitDownload = (e) => {
        e.preventDefault();
        // Simulación de descarga
        alert(`¡Gracias! El recurso "${selectedResource.title}" ha sido enviado a ${email}`);
        setShowDownloadModal(false);
        setEmail('');
        setSelectedResource(null);
    };

    return (
        <div className="page resources-page">
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-content">
                        <h1>Recursos <span className="gradient-text">Gratuitos</span></h1>
                        <p className="page-subtitle">
                            Guías, plantillas y herramientas para impulsar tu negocio digital
                        </p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="resources-grid">
                        {resources.map(resource => (
                            <div key={resource.id} className="resource-card">
                                <div className="resource-icon">{resource.icon}</div>
                                <div className="resource-type-badge">{resource.type}</div>
                                <h3>{resource.title}</h3>
                                <p className="resource-description">{resource.description}</p>

                                <div className="resource-meta">
                                    <span>📄 {resource.pages}</span>
                                    <span>📥 {resource.downloads} descargas</span>
                                </div>

                                <div className="resource-category">
                                    {resource.category}
                                </div>

                                <button
                                    className="btn btn-primary"
                                    style={{ width: '100%', marginTop: '16px' }}
                                    onClick={() => handleDownload(resource)}
                                >
                                    Descargar Gratis
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: 'var(--bg-container)' }}>
                <div className="container text-center">
                    <h2>¿Necesitas Ayuda Profesional?</h2>
                    <p className="mt-3 mb-4" style={{ color: 'var(--text-secondary)' }}>
                        Estos recursos son solo el comienzo. Trabajemos juntos para llevar tu negocio al siguiente nivel.
                    </p>
                    <a href="#contacto" className="btn btn-primary">Solicitar Consultoría Gratuita</a>
                </div>
            </section>

            {/* Download Modal */}
            {showDownloadModal && selectedResource && (
                <div className="demo-modal" onClick={() => setShowDownloadModal(false)}>
                    <div className="demo-modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                        <button className="modal-close" onClick={() => setShowDownloadModal(false)}>
                            ×
                        </button>
                        <div className="modal-body">
                            <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: '20px' }}>
                                {selectedResource.icon}
                            </div>
                            <h2 style={{ textAlign: 'center', marginBottom: '12px' }}>Descargar Recurso</h2>
                            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '30px' }}>
                                {selectedResource.title}
                            </p>

                            <form onSubmit={handleSubmitDownload} className="demo-form">
                                <div className="form-group">
                                    <label>Email *</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="tu@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <small style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '8px', display: 'block' }}>
                                        Te enviaremos el recurso y contenido exclusivo (sin spam)
                                    </small>
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>
                                    Enviar a mi Email
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResourcesPage;
