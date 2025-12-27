import React, { useEffect } from 'react';
import { trackPageView, trackCTAClick } from '../utils/analytics';
import './FreeWebsiteLanding.css';

const FreeWebsiteLanding = () => {
    useEffect(() => {
        trackPageView('/gratis', 'Free Website Landing');
        window.scrollTo(0, 0);
    }, []);

    const handleCTAClick = (ctaName, position) => {
        trackCTAClick(ctaName, 'Free Website Landing', 'WhatsApp', {
            position,
            offer: 'free_website'
        });
    };

    const whatsappLink = "https://wa.me/573138537261?text=Hola,%20quiero%20mi%20sitio%20web%20GRATIS";

    return (
        <div className="free-website-landing">
            {/* Hero Section */}
            <section className="fwl-hero">
                <div className="container">
                    <div className="fwl-hero-badge">
                        🔥 OFERTA LIMITADA - Solo 10 cupos este mes
                    </div>

                    <h1 className="fwl-hero-title">
                        TU PÁGINA WEB PROFESIONAL
                        <span className="gradient-text"> 100% GRATIS</span>
                    </h1>

                    <p className="fwl-hero-subtitle">
                        Sin pago inicial • Sin costos ocultos • Sin complicaciones
                    </p>

                    <div className="fwl-pricing-box">
                        <div className="fwl-pricing-main">
                            <span className="fwl-pricing-label">Solo pagas</span>
                            <span className="fwl-pricing-amount">$20</span>
                            <span className="fwl-pricing-period">/mes</span>
                        </div>
                        <p className="fwl-pricing-sub">Cancela cuando quieras • Sin contratos</p>
                    </div>

                    <div className="fwl-benefits-grid">
                        <div className="fwl-benefit">✅ Hosting Premium</div>
                        <div className="fwl-benefit">✅ Dominio .com</div>
                        <div className="fwl-benefit">✅ SSL Gratis</div>
                        <div className="fwl-benefit">✅ Mantenimiento</div>
                        <div className="fwl-benefit">✅ Soporte 24/7</div>
                        <div className="fwl-benefit">✅ Actualizaciones</div>
                    </div>

                    <a
                        href={whatsappLink}
                        className="fwl-cta-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleCTAClick('Hero CTA', 'hero')}
                    >
                        🚀 SÍ, QUIERO MI SITIO GRATIS AHORA
                    </a>

                    <div className="fwl-trust">
                        <span><strong>+500</strong> clientes</span>
                        <span><strong>4.9/5</strong> estrellas</span>
                        <span><strong>7 días</strong> entrega</span>
                    </div>
                </div>
            </section>

            {/* Pain Points Section */}
            <section className="fwl-pain">
                <div className="container">
                    <h2 className="fwl-section-title">
                        ¿Tu Negocio Está Perdiendo Dinero Cada Día?
                    </h2>

                    <div className="fwl-pain-grid">
                        <div className="fwl-pain-item">
                            <div className="fwl-pain-icon">❌</div>
                            <h3>No tienes presencia en internet</h3>
                            <p>Tus competidores te están quitando clientes mientras duermes</p>
                        </div>
                        <div className="fwl-pain-item">
                            <div className="fwl-pain-icon">❌</div>
                            <h3>Los sitios web cuestan $1,500+</h3>
                            <p>No puedes invertir tanto dinero ahora mismo</p>
                        </div>
                        <div className="fwl-pain-item">
                            <div className="fwl-pain-icon">❌</div>
                            <h3>Mantenimiento complicado y caro</h3>
                            <p>Gastas tiempo y dinero en problemas técnicos</p>
                        </div>
                        <div className="fwl-pain-item">
                            <div className="fwl-pain-icon">❌</div>
                            <h3>No sabes cómo conseguir clientes online</h3>
                            <p>Tu negocio no crece como debería</p>
                        </div>
                    </div>

                    <div className="fwl-stat-highlight">
                        <strong>87%</strong> de clientes buscan en Google antes de comprar
                        <br />
                        <span>Si no estás online, no existes</span>
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section className="fwl-solution">
                <div className="container">
                    <h2 className="fwl-section-title">
                        La Solución Más Inteligente para Tu Negocio
                    </h2>

                    <div className="fwl-solution-grid">
                        <div className="fwl-solution-card">
                            <div className="fwl-solution-badge">GRATIS</div>
                            <h3>SITIO WEB PROFESIONAL</h3>
                            <div className="fwl-solution-price">$0 USD</div>
                            <ul className="fwl-solution-list">
                                <li>✅ Diseño 100% personalizado</li>
                                <li>✅ Responsive (móvil, tablet, desktop)</li>
                                <li>✅ Optimizado para Google (SEO)</li>
                                <li>✅ Formulario de contacto</li>
                                <li>✅ Integración redes sociales</li>
                            </ul>
                        </div>

                        <div className="fwl-solution-card fwl-solution-featured">
                            <div className="fwl-solution-badge">TODO INCLUIDO</div>
                            <h3>SOLO PAGAS</h3>
                            <div className="fwl-solution-price">$20/mes</div>
                            <ul className="fwl-solution-list">
                                <li>✅ Hosting de alta velocidad</li>
                                <li>✅ Dominio .com incluido</li>
                                <li>✅ Certificado SSL (HTTPS)</li>
                                <li>✅ Mantenimiento mensual</li>
                                <li>✅ Actualizaciones de seguridad</li>
                                <li>✅ Soporte técnico 24/7</li>
                                <li>✅ Copias de seguridad automáticas</li>
                            </ul>
                        </div>
                    </div>

                    {/* Price Comparison Table */}
                    <div className="fwl-comparison">
                        <h3>Comparación de Precios</h3>
                        <table className="fwl-comparison-table">
                            <thead>
                                <tr>
                                    <th>Concepto</th>
                                    <th>Tradicional</th>
                                    <th className="fwl-highlight">Con Nosotros</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Pago inicial</td>
                                    <td className="fwl-old-price">$1,500+</td>
                                    <td className="fwl-new-price">$0 USD</td>
                                </tr>
                                <tr>
                                    <td>Hosting</td>
                                    <td className="fwl-old-price">$15/mes</td>
                                    <td className="fwl-new-price">Incluido</td>
                                </tr>
                                <tr>
                                    <td>Mantenimiento</td>
                                    <td className="fwl-old-price">$50/mes</td>
                                    <td className="fwl-new-price">Incluido</td>
                                </tr>
                                <tr>
                                    <td>Dominio</td>
                                    <td className="fwl-old-price">$12/año</td>
                                    <td className="fwl-new-price">Incluido</td>
                                </tr>
                                <tr>
                                    <td>SSL</td>
                                    <td className="fwl-old-price">$50/año</td>
                                    <td className="fwl-new-price">Incluido</td>
                                </tr>
                                <tr className="fwl-total-row">
                                    <td><strong>TOTAL</strong></td>
                                    <td className="fwl-old-price"><strong>$1,626+</strong></td>
                                    <td className="fwl-new-price"><strong>$20/mes</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <a
                        href={whatsappLink}
                        className="fwl-cta-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleCTAClick('Solution CTA', 'solution')}
                    >
                        💰 QUIERO AHORRAR $1,600+ AHORA
                    </a>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="fwl-why">
                <div className="container">
                    <h2 className="fwl-section-title">
                        Por Qué Somos Diferentes
                    </h2>

                    <div className="fwl-why-grid">
                        <div className="fwl-why-card">
                            <div className="fwl-why-icon">🎁</div>
                            <h3>INVERSIÓN CERO</h3>
                            <p>No pagas nada por adelantado. Tu sitio web es 100% gratis.</p>
                        </div>
                        <div className="fwl-why-card">
                            <div className="fwl-why-icon">💰</div>
                            <h3>PRECIO JUSTO</h3>
                            <p>Solo $20/mes. Sin costos ocultos. Cancela cuando quieras.</p>
                        </div>
                        <div className="fwl-why-card">
                            <div className="fwl-why-icon">⚡</div>
                            <h3>ENTREGA RÁPIDA</h3>
                            <p>Tu sitio listo en 7-10 días. No esperes meses.</p>
                        </div>
                        <div className="fwl-why-card">
                            <div className="fwl-why-icon">🛡️</div>
                            <h3>TODO INCLUIDO</h3>
                            <p>Hosting, dominio, SSL, mantenimiento. No pagas extras.</p>
                        </div>
                        <div className="fwl-why-card">
                            <div className="fwl-why-icon">📱</div>
                            <h3>SOPORTE 24/7</h3>
                            <p>Siempre disponibles por WhatsApp. Respuesta en minutos.</p>
                        </div>
                        <div className="fwl-why-card">
                            <div className="fwl-why-icon">🎯</div>
                            <h3>RESULTADOS REALES</h3>
                            <p>+500 clientes satisfechos. 4.9/5 estrellas.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="fwl-faq">
                <div className="container">
                    <h2 className="fwl-section-title">Preguntas Frecuentes</h2>

                    <div className="fwl-faq-grid">
                        <div className="fwl-faq-item">
                            <h3>❓ ¿Por qué es gratis?</h3>
                            <p>Queremos que más negocios tengan presencia online. Ganamos con el mantenimiento mensual.</p>
                        </div>
                        <div className="fwl-faq-item">
                            <h3>❓ ¿Hay contratos de permanencia?</h3>
                            <p>No. Cancela cuando quieras sin penalizaciones.</p>
                        </div>
                        <div className="fwl-faq-item">
                            <h3>❓ ¿Qué pasa si cancelo?</h3>
                            <p>Te entregamos todos los archivos de tu sitio.</p>
                        </div>
                        <div className="fwl-faq-item">
                            <h3>❓ ¿Cuánto tiempo toma?</h3>
                            <p>7-10 días hábiles desde que apruebas el diseño.</p>
                        </div>
                        <div className="fwl-faq-item">
                            <h3>❓ ¿Incluye cambios después?</h3>
                            <p>Sí, hasta 2 cambios menores al mes incluidos.</p>
                        </div>
                        <div className="fwl-faq-item">
                            <h3>❓ ¿Funciona para cualquier negocio?</h3>
                            <p>Sí, restaurantes, clínicas, tiendas, servicios, etc.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="fwl-final-cta">
                <div className="container">
                    <div className="fwl-final-box">
                        <div className="fwl-urgency-badge">
                            ⏰ SOLO QUEDAN 3 CUPOS ESTE MES
                        </div>

                        <h2>¡Consigue Tu Sitio Web GRATIS Hoy!</h2>

                        <div className="fwl-bonuses">
                            <h3>🎁 BONOS SI CONTRATAS HOY:</h3>
                            <ul>
                                <li>✅ Logo profesional GRATIS ($150 valor)</li>
                                <li>✅ 3 meses al precio de 2 (ahorra $20)</li>
                                <li>✅ Configuración de redes sociales GRATIS</li>
                                <li>✅ Consultoría SEO inicial GRATIS</li>
                            </ul>
                        </div>

                        <a
                            href={whatsappLink}
                            className="fwl-cta-final"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleCTAClick('Final CTA', 'final')}
                        >
                            🔥 SÍ, QUIERO MI SITIO GRATIS + BONOS
                        </a>

                        <p className="fwl-guarantee">
                            ✅ Garantía de satisfacción 100% • Sin riesgos
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FreeWebsiteLanding;
