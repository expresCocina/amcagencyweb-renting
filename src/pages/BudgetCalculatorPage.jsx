import { useState } from 'react';
import './SharedPageStyles.css';
import './BudgetCalculatorPage.css';

const BudgetCalculatorPage = () => {
    const [selectedServices, setSelectedServices] = useState([]);
    const [addons, setAddons] = useState([]);

    const services = [
        {
            id: 'seo',
            name: 'SEO - Posicionamiento Orgánico',
            price: 800000,
            description: 'Optimización completa para buscadores, contenido y linkbuilding',
            icon: '🎯'
        },
        {
            id: 'web',
            name: 'Desarrollo Web',
            price: 1500000,
            description: 'Sitio web profesional responsive con CMS',
            icon: '💻'
        },
        {
            id: 'funnels',
            name: 'Embudos de Venta',
            price: 600000,
            description: 'Automatización completa de ventas y email marketing',
            icon: '🎪'
        },
        {
            id: 'ads',
            name: 'Google Ads',
            price: 500000,
            description: 'Gestión profesional de campañas publicitarias',
            icon: '📢'
        },
        {
            id: 'social',
            name: 'Social Media Marketing',
            price: 400000,
            description: 'Manejo de redes sociales y creación de contenido',
            icon: '📱'
        },
        {
            id: 'ecommerce',
            name: 'E-commerce Completo',
            price: 2500000,
            description: 'Tienda online con pasarela de pagos integrada',
            icon: '🛒'
        }
    ];

    const addonOptions = [
        { id: 'hosting', name: 'Hosting Premium', price: 150000, icon: '☁️' },
        { id: 'maintenance', name: 'Mantenimiento Mensual', price: 200000, icon: '🔧' },
        { id: 'branding', name: 'Diseño de Marca', price: 800000, icon: '🎨' },
        { id: 'video', name: 'Video Marketing', price: 600000, icon: '🎥' },
        { id: 'consulting', name: 'Consultoría Estratégica', price: 300000, icon: '💡' }
    ];

    const toggleService = (serviceId) => {
        if (selectedServices.includes(serviceId)) {
            setSelectedServices(selectedServices.filter(id => id !== serviceId));
        } else {
            setSelectedServices([...selectedServices, serviceId]);
        }
    };

    const toggleAddon = (addonId) => {
        if (addons.includes(addonId)) {
            setAddons(addons.filter(id => id !== addonId));
        } else {
            setAddons([...addons, addonId]);
        }
    };

    const calculateSubtotal = () => {
        const servicesTotal = selectedServices.reduce((sum, id) => {
            const service = services.find(s => s.id === id);
            return sum + (service?.price || 0);
        }, 0);

        const addonsTotal = addons.reduce((sum, id) => {
            const addon = addonOptions.find(a => a.id === id);
            return sum + (addon?.price || 0);
        }, 0);

        return servicesTotal + addonsTotal;
    };

    const getDiscount = () => {
        const count = selectedServices.length;
        if (count >= 3) return 0.20; // 20% descuento
        if (count >= 2) return 0.10; // 10% descuento
        return 0;
    };

    const subtotal = calculateSubtotal();
    const discount = getDiscount();
    const discountAmount = subtotal * discount;
    const total = subtotal - discountAmount;

    return (
        <div className="page budget-calculator-page">
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-content">
                        <h1>Calculadora de <span className="gradient-text">Presupuesto</span></h1>
                        <p className="page-subtitle">
                            Calcula el costo de tu proyecto digital en tiempo real
                        </p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="calculator-layout">
                        <div className="calculator-services">
                            <h2>Selecciona tus Servicios</h2>
                            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                                Elige los servicios que necesitas para tu negocio
                            </p>

                            <div className="services-list">
                                {services.map(service => (
                                    <div
                                        key={service.id}
                                        className={`service-option ${selectedServices.includes(service.id) ? 'selected' : ''}`}
                                        onClick={() => toggleService(service.id)}
                                    >
                                        <div className="service-checkbox">
                                            {selectedServices.includes(service.id) ? '✓' : ''}
                                        </div>
                                        <div className="service-icon">{service.icon}</div>
                                        <div className="service-info">
                                            <h3>{service.name}</h3>
                                            <p>{service.description}</p>
                                        </div>
                                        <div className="service-price">
                                            ${(service.price / 1000).toFixed(0)}K COP
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {selectedServices.length > 0 && (
                                <>
                                    <h3 className="mt-5 mb-3">Add-ons Opcionales</h3>
                                    <div className="addons-grid">
                                        {addonOptions.map(addon => (
                                            <div
                                                key={addon.id}
                                                className={`addon-option ${addons.includes(addon.id) ? 'selected' : ''}`}
                                                onClick={() => toggleAddon(addon.id)}
                                            >
                                                <div className="addon-icon">{addon.icon}</div>
                                                <div className="addon-name">{addon.name}</div>
                                                <div className="addon-price">${(addon.price / 1000).toFixed(0)}K</div>
                                                <div className="addon-checkbox">
                                                    {addons.includes(addon.id) ? '✓' : '+'}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="calculator-summary">
                            <div className="summary-card glass">
                                <h3>Resumen de Presupuesto</h3>

                                {selectedServices.length === 0 ? (
                                    <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📋</div>
                                        <p>Selecciona servicios para ver tu presupuesto</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="summary-services">
                                            <strong>Servicios seleccionados:</strong>
                                            <ul>
                                                {selectedServices.map(id => {
                                                    const service = services.find(s => s.id === id);
                                                    return (
                                                        <li key={id}>
                                                            {service.icon} {service.name}
                                                            <span>${service.price.toLocaleString('es-CO')}</span>
                                                        </li>
                                                    );
                                                })}
                                            </ul>

                                            {addons.length > 0 && (
                                                <>
                                                    <strong className="mt-3">Add-ons:</strong>
                                                    <ul>
                                                        {addons.map(id => {
                                                            const addon = addonOptions.find(a => a.id === id);
                                                            return (
                                                                <li key={id}>
                                                                    {addon.icon} {addon.name}
                                                                    <span>${addon.price.toLocaleString('es-CO')}</span>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </>
                                            )}
                                        </div>

                                        <div className="summary-calculations">
                                            <div className="calc-row">
                                                <span>Subtotal:</span>
                                                <span>${subtotal.toLocaleString('es-CO')} COP</span>
                                            </div>

                                            {discount > 0 && (
                                                <>
                                                    <div className="calc-row discount">
                                                        <span>🎉 Descuento ({(discount * 100).toFixed(0)}%):</span>
                                                        <span>-${discountAmount.toLocaleString('es-CO')} COP</span>
                                                    </div>
                                                    <div className="discount-note">
                                                        ¡Ahorras por contratar {selectedServices.length} servicios!
                                                    </div>
                                                </>
                                            )}

                                            <div className="calc-row total">
                                                <strong>Total:</strong>
                                                <strong className="gradient-text">${total.toLocaleString('es-CO')} COP</strong>
                                            </div>
                                        </div>

                                        <div className="summary-actions">
                                            <button className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>
                                                Solicitar Presupuesto Detallado
                                            </button>
                                            <a href="#contacto" className="btn btn-secondary" style={{ width: '100%', padding: '16px' }}>
                                                Hablar con un Asesor
                                            </a>
                                        </div>

                                        <div className="summary-note">
                                            💡 Este es un estimado inicial. El precio final puede variar según la complejidad del proyecto.
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BudgetCalculatorPage;
