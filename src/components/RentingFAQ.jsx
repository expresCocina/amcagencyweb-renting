import React, { useState } from 'react';
import './RentingFAQ.css';

const RentingFAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "¿Quién es dueño del dominio?",
            answer: "El dominio es 100% tuyo. Tú lo compras, tú lo controlas. Nosotros solo alojamos tu sitio web."
        },
        {
            question: "¿Qué pasa si cancelo?",
            answer: "El servicio se suspende (la web se apaga), pero te llevas tu dominio. Puedes usarlo donde quieras."
        },
        {
            question: "¿Hay permanencia?",
            answer: "Sí, contrato mínimo de 12 meses para mantener este precio bajo. Después puedes cancelar cuando quieras."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="faq-section">
            <div className="container">
                <h2 className="section-title">Preguntas Frecuentes</h2>
                <div className="faq-accordion">
                    {faqs.map((faq, index) => (
                        <div key={index} className={`faq-item ${openIndex === index ? 'active' : ''}`}>
                            <button
                                className="faq-question"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span>{faq.question}</span>
                                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
                            </button>
                            {openIndex === index && (
                                <div className="faq-answer">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RentingFAQ;
