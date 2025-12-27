import React from 'react';
import { Link } from 'react-router-dom';
import { trackCTAClick, trackButtonClick } from '../utils/analytics';
import './Hero.css';

const Hero = () => {
    const scrollToDemos = () => {
        const demosSection = document.getElementById('demos');
        if (demosSection) {
            demosSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="hero" id="inicio">
            <div className="hero-background">
                <div className="particles"></div>
            </div>
            <div className="container">
                <div className="hero-content fade-in-up">
                    {/* Badge de oferta */}
                    <div className="hero-badge">
                        🎁 OFERTA LIMITADA - Solo 10 cupos este mes
                    </div>

                    {/* Headline principal */}
                    <h1>
                        TU PÁGINA WEB PROFESIONAL
                        <span className="gradient-text"> 100% GRATIS</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="hero-subtitle">
                        Sin pago inicial. Sin costos ocultos. Sin complicaciones.
                    </p>

                    {/* Precio destacado */}
                    <div className="pricing-highlight">
                        <div className="pricing-main">
                            <span className="pricing-label">Solo pagas</span>
                            <span className="pricing-amount">$20 USD</span>
                            <span className="pricing-period">/mes</span>
                        </div>
                        <div className="pricing-subtext">
                            Cancela cuando quieras • Sin contratos
                        </div>
                    </div>

                    {/* Lista de beneficios */}
                    <div className="hero-benefits">
                        <div className="benefit-item">
                            <span className="benefit-icon">✅</span>
                            <span>Hosting Premium</span>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon">✅</span>
                            <span>Dominio .com</span>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon">✅</span>
                            <span>SSL Gratis</span>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon">✅</span>
                            <span>Mantenimiento</span>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon">✅</span>
                            <span>Soporte 24/7</span>
                        </div>
                    </div>

                    {/* CTAs */}
                    <div className="hero-buttons">
                        <a
                            href="https://wa.me/573138537261?text=Hola,%20quiero%20mi%20sitio%20web%20GRATIS"
                            className="btn btn-primary btn-large"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                                trackCTAClick('Obtener Sitio Gratis', 'Hero', 'WhatsApp', {
                                    position: 'primary_cta',
                                    destination: 'WhatsApp',
                                    offer: 'free_website'
                                });
                            }}
                        >
                            🚀 SÍ, QUIERO MI SITIO GRATIS
                        </a>
                        <Link
                            to="/demos"
                            className="btn btn-secondary"
                            onClick={() => {
                                trackCTAClick('Ver Ejemplos', 'Hero', '/demos', {
                                    position: 'secondary_cta'
                                });
                            }}
                        >
                            Ver Ejemplos →
                        </Link>
                    </div>

                    {/* Trust indicators */}
                    <div className="hero-trust">
                        <div className="trust-item">
                            <strong>+500</strong> clientes satisfechos
                        </div>
                        <div className="trust-item">
                            <strong>4.9/5</strong> estrellas
                        </div>
                        <div className="trust-item">
                            <strong>7 días</strong> entrega
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
