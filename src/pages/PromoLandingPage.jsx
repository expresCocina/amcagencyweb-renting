import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SharedPageStyles.css';
import './PromoLandingPage.css';

const PromoLandingPage = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // Countdown timer to end of promotion (Feb 28, 2026)
    useEffect(() => {
        const calculateTimeLeft = () => {
            const promoEnd = new Date('2026-02-28T23:59:59');
            const now = new Date();
            const difference = promoEnd - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    const handlePromoClick = () => {
        // Track Facebook Lead event
        if (window.fbq) {
            window.fbq('track', 'Lead', {
                content_name: 'Oferta Navideña WhatsApp',
                content_category: 'Promoción',
                value: 380000,
                currency: 'COP'
            });
        }

        const message = '🎄 ¡Hola! Quiero aprovechar la OFERTA NAVIDEÑA de páginas web en 72 horas por $380,000 COP. ¿Podemos hablar?';
        const whatsappUrl = `https://wa.me/573138537261?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleMainSiteClick = () => {
        navigate('/home');
    };

    return (
        <div className="promo-landing">
            {/* Snowflakes Animation */}
            <div className="snowflakes" aria-hidden="true">
                {[...Array(50)].map((_, i) => (
                    <div key={i} className="snowflake">❅</div>
                ))}
            </div>

            {/* Christmas Lights */}
            <div className="christmas-lights">
                <div className="light red"></div>
                <div className="light green"></div>
                <div className="light blue"></div>
                <div className="light yellow"></div>
                <div className="light red"></div>
                <div className="light green"></div>
                <div className="light blue"></div>
                <div className="light yellow"></div>
            </div>

            <div className="promo-container">
                {/* Hero Section */}
                <div className="promo-hero">
                    <div className="promo-badge pulse">
                        <span className="badge-icon">🎄</span>
                        <span className="badge-text">OFERTA NAVIDEÑA</span>
                        <span className="badge-icon">🎄</span>
                    </div>

                    <h1 className="promo-title">
                        ¡LLEVA TU NEGOCIO A
                        <span className="gradient-text"> INTERNET YA!</span>
                    </h1>

                    <div className="promo-subtitle">
                        <span className="highlight-text">Páginas web en</span>
                        <span className="time-highlight">72 horas</span>
                    </div>

                    {/* Features */}
                    <div className="promo-features">
                        <div className="feature-item">
                            <span className="feature-icon">✨</span>
                            <span>Página web profesional</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">🚀</span>
                            <span>Dominio incluido</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">📱</span>
                            <span>100% Responsive</span>
                        </div>
                    </div>

                    {/* Price Badge */}
                    <div className="price-container">
                        <div className="price-badge">
                            <div className="price-label">Solo por</div>
                            <div className="price-amount">$380,000</div>
                            <div className="price-currency">COP</div>
                        </div>
                    </div>

                    {/* Urgency Section */}
                    <div className="urgency-section">
                        <div className="urgency-badge shake">
                            <span className="urgency-icon">⚡</span>
                            <span className="urgency-text">¡ÚLTIMOS 10 CUPOS!</span>
                            <span className="urgency-icon">⚡</span>
                        </div>

                        {/* Countdown Timer */}
                        <div className="countdown-timer">
                            <div className="countdown-label">La promoción termina en:</div>
                            <div className="countdown-boxes">
                                <div className="countdown-box">
                                    <div className="countdown-value">{timeLeft.days}</div>
                                    <div className="countdown-unit">Días</div>
                                </div>
                                <div className="countdown-separator">:</div>
                                <div className="countdown-box">
                                    <div className="countdown-value">{timeLeft.hours}</div>
                                    <div className="countdown-unit">Horas</div>
                                </div>
                                <div className="countdown-separator">:</div>
                                <div className="countdown-box">
                                    <div className="countdown-value">{timeLeft.minutes}</div>
                                    <div className="countdown-unit">Min</div>
                                </div>
                                <div className="countdown-separator">:</div>
                                <div className="countdown-box">
                                    <div className="countdown-value">{timeLeft.seconds}</div>
                                    <div className="countdown-unit">Seg</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="cta-buttons">
                        <button className="cta-primary" onClick={handlePromoClick}>
                            <span className="cta-icon">🎁</span>
                            <span className="cta-text">¡QUIERO LA PROMOCIÓN!</span>
                            <span className="cta-arrow">→</span>
                        </button>
                        <button className="cta-secondary" onClick={handleMainSiteClick}>
                            <span>Ir al Sitio Web</span>
                        </button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="trust-indicators">
                        <div className="trust-item">
                            <span className="trust-icon">⚡</span>
                            <span>Entrega en 72 horas</span>
                        </div>
                        <div className="trust-item">
                            <span className="trust-icon">💎</span>
                            <span>Calidad profesional</span>
                        </div>
                        <div className="trust-item">
                            <span className="trust-icon">🎯</span>
                            <span>Soporte incluido</span>
                        </div>
                    </div>
                </div>

                {/* Visual Elements */}
                <div className="promo-visual">
                    <div className="visual-element browser-window float">
                        <div className="browser-header">
                            <div className="browser-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div className="browser-content">
                            <div className="content-line"></div>
                            <div className="content-line short"></div>
                            <div className="content-line"></div>
                        </div>
                    </div>

                    <div className="visual-element search-icon float-delayed">
                        <div className="search-circle"></div>
                        <div className="search-handle"></div>
                    </div>

                    <div className="visual-element globe-icon rotate">
                        <div className="globe-circle">
                            <div className="globe-line"></div>
                            <div className="globe-line vertical"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="decoration star star-1">⭐</div>
            <div className="decoration star star-2">✨</div>
            <div className="decoration star star-3">⭐</div>
            <div className="decoration star star-4">✨</div>
            <div className="decoration gift gift-1">🎁</div>
            <div className="decoration gift gift-2">🎁</div>
        </div>
    );
};

export default PromoLandingPage;
