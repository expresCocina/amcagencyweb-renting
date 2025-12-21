import React from 'react';
import './ComparisonTable.css';

const ComparisonTable = () => {
    const comparisons = [
        {
            feature: "Costo Inicial",
            traditional: "$2M - $5M",
            amc: "$0 Pesos"
        },
        {
            feature: "Hosting/SSL",
            traditional: "Se paga aparte",
            amc: "INCLUIDO"
        },
        {
            feature: "Tecnología",
            traditional: "WordPress Lento",
            amc: "Next.js Ultra Rápido"
        },
        {
            feature: "Entrega",
            traditional: "20 días",
            amc: "48 Horas"
        }
    ];

    return (
        <section className="comparison-section">
            <div className="container">
                <h2 className="section-title">¿Por qué comprar si puedes alquilar?</h2>
                <div className="table-wrapper">
                    <table className="comparison-table">
                        <thead>
                            <tr>
                                <th>Característica</th>
                                <th className="traditional-col">Agencia Tradicional</th>
                                <th className="amc-col">AMC Renting</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisons.map((item, index) => (
                                <tr key={index}>
                                    <td className="feature-cell">{item.feature}</td>
                                    <td className="traditional-cell">
                                        <span className="icon-x">✗</span>
                                        <span>{item.traditional}</span>
                                    </td>
                                    <td className="amc-cell">
                                        <span className="icon-check">✓</span>
                                        <span>{item.amc}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ComparisonTable;
