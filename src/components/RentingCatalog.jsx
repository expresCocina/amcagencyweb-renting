import React from 'react';
import { trackDesignSelection, trackWhatsAppClick } from '../utils/analytics';
import WhatsAppCTA from './WhatsAppCTA';
import './RentingCatalog.css';

const RentingCatalog = () => {
    const categories = [
        {
            title: "Salud y Bienestar",
            icon: "🏥",
            description: "Ideal para médicos, odontólogos y profesionales de la salud",
            whatsappText: "Hola AMC, me interesa el diseño de Salud y Bienestar del Plan Renting de 80k."
        },
        {
            title: "Servicios Profesionales",
            icon: "💼",
            description: "Ideal para abogados, contadores y consultores",
            whatsappText: "Hola AMC, me interesa el diseño de Servicios Profesionales del Plan Renting de 80k."
        },
        {
            title: "Hogar y Mantenimiento",
            icon: "🔧",
            description: "Ideal para reformas, técnicos y servicios del hogar",
            whatsappText: "Hola AMC, me interesa el diseño de Hogar y Mantenimiento del Plan Renting de 80k."
        }
    ];

    const handleWhatsApp = (text, category) => {
        // Track design selection as lead
        trackDesignSelection(category.title, 'Renting Catalog', {
            plan: 'Renting 80k',
            icon: category.icon
        });

        // Track WhatsApp click
        trackWhatsAppClick('Catalog Design Selection', text, {
            design: category.title
        });

        const url = `https://wa.me/573138537261?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    return (
        <section className="catalog-section" id="demos">
            <div className="container">
                <h2 className="section-title">Elige el diseño para tu negocio</h2>
                <div className="catalog-grid">
                    {categories.map((cat, index) => (
                        <div key={index} className="catalog-card">
                            <div className="card-icon">{cat.icon}</div>
                            <h3 className="card-title">{cat.title}</h3>
                            <p className="card-description">{cat.description}</p>
                            <button
                                className="cta-button"
                                onClick={() => handleWhatsApp(cat.whatsappText, cat)}
                            >
                                QUIERO ESTE DISEÑO
                            </button>
                        </div>
                    ))}
                </div>

                <WhatsAppCTA
                    message="¡Hola! Me encanta el catálogo. ¿Puedo personalizar mi diseño? 🎨"
                    buttonText="Quiero personalizar mi diseño"
                    section="catalog"
                />
            </div>
        </section>
    );
};

export default RentingCatalog;
