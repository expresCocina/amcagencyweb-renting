import React, { useState, useEffect } from 'react';
import WhatsAppCTA from './WhatsAppCTA';
import './ComparisonTable.css';

const ComparisonTable = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const comparisons = [
        {
            title: "Agencia Tradicional",
            icon: "❌",
            color: "red",
            features: [
                { name: "Costo Inicial", value: "$2M - $5M" },
                { name: "Hosting/SSL", value: "Se paga aparte" },
                { name: "Tecnología", value: "WordPress Lento" },
                { name: "Entrega", value: "20 días" }
            ]
        },
        {
            title: "AMC Renting",
            icon: "✅",
            color: "green",
            features: [
                { name: "Costo Inicial", value: "$0 Pesos" },
                { name: "Hosting/SSL", value: "INCLUIDO" },
                { name: "Tecnología", value: "Next.js Ultra Rápido" },
                { name: "Entrega", value: "48 Horas" }
            ]
        }
    ];

    // Auto-rotate every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === comparisons.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [comparisons.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === comparisons.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? comparisons.length - 1 : prevIndex - 1
        );
    };

    return (
        <section className="comparison-section">
            <div className="container">
                <h2 className="section-title">¿Por qué comprar si puedes alquilar?</h2>

                <div className="comparison-carousel">
                    <button className="carousel-btn prev-btn" onClick={prevSlide}>
                        ‹
                    </button>

                    <div className="comparison-cards-wrapper">
                        <div
                            className="comparison-cards-container"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {comparisons.map((comparison, index) => (
                                <div
                                    key={index}
                                    className={`comparison-card ${comparison.color}-card`}
                                >
                                    <div className="card-header">
                                        <span className="card-icon">{comparison.icon}</span>
                                        <h3>{comparison.title}</h3>
                                    </div>
                                    <div className="card-body">
                                        {comparison.features.map((feature, idx) => (
                                            <div key={idx} className="feature-item">
                                                <span className="feature-name">{feature.name}</span>
                                                <span className={`feature-value ${comparison.color}-value`}>
                                                    {feature.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="carousel-btn next-btn" onClick={nextSlide}>
                        ›
                    </button>
                </div>

                <div className="carousel-dots">
                    {comparisons.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>

                <WhatsAppCTA
                    message="¡Hola! Quiero mi web sin inversión inicial. ¿Cuándo puedo empezar? 🚀"
                    buttonText="Quiero mi web sin pagar inicial"
                    section="comparison"
                />
            </div>
        </section>
    );
};

export default ComparisonTable;
