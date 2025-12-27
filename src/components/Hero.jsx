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
                    <h1>Tu Página Web Profesional: <span className="gradient-text">$0 de Cuota Inicial</span></h1>
                    <p className="hero-subtitle">
                        Obtén tu sitio web de alta velocidad, hosting y soporte técnico por una suscripción mensual fija. Sin inversión inicial.
                    </p>
                    <div className="pricing-badge">
                        <span className="badge-label">Plan Todo Incluido:</span>
                        <span className="badge-price">$80.000 COP / mes</span>
                    </div>
                    <div className="hero-buttons">
                        <Link
                            to="/demos"
                            className="btn btn-primary"
                            onClick={() => {
                                trackCTAClick('Ver Planes', 'Hero', '/demos', {
                                    position: 'primary_cta'
                                });
                            }}
                        >
                            Ver Planes
                        </Link>
                        <a
                            href="https://wa.me/573138537261?text=Hola,%20quiero%20información%20sobre%20el%20plan%20renting"
                            className="btn btn-secondary"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                                trackCTAClick('Iniciar Proyecto', 'Hero', 'WhatsApp', {
                                    position: 'secondary_cta',
                                    destination: 'WhatsApp'
                                });
                            }}
                        >
                            Iniciar Proyecto →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
