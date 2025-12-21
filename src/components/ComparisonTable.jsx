import React from 'react';
import './ComparisonTable.css';

const ComparisonTable = () => {
    const features = [
        {
            name: "Costo Inicial",
            traditional: "$2M - $5M",
            amc: "$0 Pesos"
        },
        {
            name: "Hosting/SSL",
            traditional: "Se paga aparte",
            amc: "INCLUIDO"
        },
        {
            name: "Tecnología",
            traditional: "WordPress Lento",
            amc: "Next.js Ultra Rápido"
        },
        {
            name: "Entrega",
            traditional: "20 días",
            amc: "48 Horas"
        }
    ];

    return (
        <section className="comparison-section">
            <div className="container">
                <h2 className="section-title">¿Por qué comprar si puedes alquilar?</h2>

                <div className="comparison-cards-grid">
                    {/* Traditional Agency Card */}
                    <div className="comparison-card traditional-card">
                        <div className="card-header">
                            <span className="card-icon">❌</span>
                            <h3>Agencia Tradicional</h3>
                        </div>
                        <div className="card-body">
                            {features.map((feature, index) => (
                                <div key={index} className="feature-item">
                                    <span className="feature-name">{feature.name}</span>
                                    <span className="feature-value traditional-value">
                                        {feature.traditional}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AMC Renting Card */}
                    <div className="comparison-card amc-card">
                        <div className="card-header">
                            <span className="card-icon">✅</span>
                            <h3>AMC Renting</h3>
                        </div>
                        <div className="card-body">
                            {features.map((feature, index) => (
                                <div key={index} className="feature-item">
                                    <span className="feature-name">{feature.name}</span>
                                    <span className="feature-value amc-value">
                                        {feature.amc}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComparisonTable;
