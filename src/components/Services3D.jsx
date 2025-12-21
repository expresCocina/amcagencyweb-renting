import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WhatsAppCTA from './WhatsAppCTA';
import './Services3D.css';

const Services3D = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoRotating, setIsAutoRotating] = useState(true);
    const [isFlipped, setIsFlipped] = useState(false);

    const services = [
        {
            title: 'SEO Profesional',
            description: 'Posicionamiento en Google para keywords de alta conversión. Auditoría técnica + estrategia de contenido + reportes mensuales con KPIs reales.',
            benefit: 'Aumenta tu tráfico orgánico hasta 300% en 6 meses',
            icon: (
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="28" fill="url(#grad1)" />
                    <path d="M32 12L36 24L48 24L38 32L42 44L32 36L22 44L26 32L16 24L28 24L32 12Z" fill="white" />
                    <defs>
                        <linearGradient id="grad1" x1="0" y1="0" x2="64" y2="64">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                    </defs>
                </svg>
            ),
            link: '/seo',
            color: '#8b5cf6'
        },
        {
            title: 'Desarrollo Web',
            description: 'Sitios optimizados para ventas. Integración con pasarelas LATAM (Wompi, MercadoPago, Stripe). Responsive + rápido + SEO-ready.',
            benefit: 'Sitios que cargan en <2 segundos y convierten 40% más',
            icon: (
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="12" width="48" height="36" rx="4" fill="url(#grad2)" />
                    <rect x="12" y="16" width="40" height="24" fill="#1e1b4b" />
                    <path d="M20 24L24 28L20 32" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="28" y1="24" x2="32" y2="32" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
                    <path d="M36 32L40 28L36 24" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="8" y="48" width="48" height="4" rx="2" fill="url(#grad2)" />
                    <defs>
                        <linearGradient id="grad2" x1="0" y1="0" x2="64" y2="64">
                            <stop offset="0%" stopColor="#ec4899" />
                            <stop offset="100%" stopColor="#f472b6" />
                        </linearGradient>
                    </defs>
                </svg>
            ),
            link: '/desarrollo-web',
            featured: true,
            color: '#ec4899'
        },
        {
            title: 'Embudos + Automatización',
            description: 'Sistemas de ventas automatizados. Integración WhatsApp + email + CRM. Seguimiento inteligente de leads.',
            benefit: 'Automatiza hasta el 80% de tu proceso de ventas',
            icon: (
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="28" fill="url(#grad3)" />
                    <path d="M32 16L40 24L48 20L44 32L52 40L40 36L32 48L24 36L12 40L20 32L16 20L24 24L32 16Z" fill="white" />
                    <circle cx="32" cy="32" r="8" fill="#f59e0b" />
                    <defs>
                        <linearGradient id="grad3" x1="0" y1="0" x2="64" y2="64">
                            <stop offset="0%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#fbbf24" />
                        </linearGradient>
                    </defs>
                </svg>
            ),
            link: '/embudos',
            color: '#f59e0b'
        }
    ];

    // Auto-rotate carousel
    useEffect(() => {
        if (!isAutoRotating) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % services.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoRotating, services.length]);

    const handleNext = () => {
        setIsAutoRotating(false);
        setIsFlipped(false); // Reset flip when navigating
        setCurrentIndex((prev) => (prev + 1) % services.length);
    };

    const handlePrev = () => {
        setIsAutoRotating(false);
        setIsFlipped(false); // Reset flip when navigating
        setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    };

    const handleDotClick = (index) => {
        setIsAutoRotating(false);
        setIsFlipped(false); // Reset flip when navigating
        setCurrentIndex(index);
    };

    const handleBoxClick = () => {
        // Toggle flip on mobile devices
        setIsFlipped(!isFlipped);
    };

    return (
        <section className="section services-3d" id="servicios">
            <div className="container">
                <div className="section-header text-center">
                    <h2>Soluciones completas para cada etapa de tu crecimiento</h2>
                    <p className="subtitle">Servicios diseñados para impulsar tu negocio al siguiente nivel</p>
                </div>

                <div className="carousel-3d-container">
                    {/* 3D Carousel */}
                    <div className="carousel-3d">
                        {services.map((service, index) => {
                            const position = (index - currentIndex + services.length) % services.length;
                            let className = 'carousel-item';

                            if (position === 0) className += ' active';
                            else if (position === 1) className += ' next';
                            else className += ' prev';

                            return (
                                <div
                                    key={index}
                                    className={className}
                                    style={{ '--service-color': service.color }}
                                >
                                    <div
                                        className={`service-box-3d ${position === 0 && isFlipped ? 'flipped' : ''}`}
                                        onClick={position === 0 ? handleBoxClick : undefined}
                                    >
                                        {/* Front Face */}
                                        <div className="box-face front">
                                            {service.featured && <div className="featured-badge">🔥 Más popular</div>}
                                            <div className="service-icon-3d">{service.icon}</div>
                                            <h3 className="service-title-3d">{service.title}</h3>
                                            <p className="service-description-3d">{service.description}</p>
                                        </div>

                                        {/* Back Face */}
                                        <div className="box-face back">
                                            <div className="benefit-content">
                                                <div className="benefit-icon">✨</div>
                                                <h4>Beneficio Principal</h4>
                                                <p>{service.benefit}</p>
                                                <Link to={service.link} className="btn-3d">
                                                    Ver más detalles →
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Left Face */}
                                        <div className="box-face left">
                                            <div className="side-pattern"></div>
                                        </div>

                                        {/* Right Face */}
                                        <div className="box-face right">
                                            <div className="side-pattern"></div>
                                        </div>

                                        {/* Top Face */}
                                        <div className="box-face top">
                                            <div className="top-glow"></div>
                                        </div>

                                        {/* Bottom Face */}
                                        <div className="box-face bottom">
                                            <div className="bottom-shadow"></div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Navigation Controls */}
                    <button className="carousel-control prev-btn" onClick={handlePrev} aria-label="Anterior">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button className="carousel-control next-btn" onClick={handleNext} aria-label="Siguiente">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {/* Dots Navigation */}
                    <div className="carousel-dots">
                        {services.map((_, index) => (
                            <button
                                key={index}
                                className={`dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => handleDotClick(index)}
                                aria-label={`Ir a servicio ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Service Details Below Carousel */}
                <div className="service-details">
                    <div className="detail-card">
                        <h4>{services[currentIndex].title}</h4>
                        <p className="benefit-highlight">
                            <span className="benefit-icon">✨</span>
                            {services[currentIndex].benefit}
                        </p>
                        <Link to={services[currentIndex].link} className="btn btn-primary">
                            Conocer más sobre {services[currentIndex].title.split(' ')[0]} →
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services3D;
