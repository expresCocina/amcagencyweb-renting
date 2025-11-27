import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
    const services = [
        {
            title: 'SEO Profesional',
            description: 'Posicionamiento en Google para keywords de alta conversión. Auditoría técnica + estrategia de contenido + reportes mensuales con KPIs reales.',
            benefit: 'Aumenta tu tráfico orgánico hasta 300% en 6 meses',
            icon: '🎯',
            link: '/seo'
        },
        {
            title: 'Desarrollo Web',
            description: 'Sitios optimizados para ventas. Integración con pasarelas LATAM (Wompi, MercadoPago, Stripe). Responsive + rápido + SEO-ready.',
            benefit: 'Sitios que cargan en <2 segundos y convierten 40% más',
            icon: '💻',
            link: '/desarrollo-web',
            featured: true
        },
        {
            title: 'Embudos + Automatización',
            description: 'Sistemas de ventas automatizados. Integración WhatsApp + email + CRM. Seguimiento inteligente de leads.',
            benefit: 'Automatiza hasta el 80% de tu proceso de ventas',
            icon: '🚀',
            link: '/embudos'
        }
    ];

    return (
        <section className="section services" id="servicios">
            <div className="container">
                <div className="section-header text-center">
                    <h2>Soluciones completas para cada etapa de tu crecimiento</h2>
                </div>

                <div className="grid grid-3">
                    {services.map((service, index) => (
                        <div key={index} className={`card service-card ${service.featured ? 'featured' : ''}`}>
                            {service.featured && <div className="badge">🔥 Más popular</div>}
                            <div className="service-icon">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p className="mt-2">{service.description}</p>
                            <div className="benefit-box mt-3">
                                <strong>✨ {service.benefit}</strong>
                            </div>
                            <Link to={service.link} className="btn btn-secondary mt-4" style={{ width: '100%' }}>
                                Ver más sobre {service.title.split(' ')[0]} →
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
