import { useState, useEffect } from 'react';
import { trackEvent } from '../utils/analytics';
import './LeadMagnetPopup.css';

const LeadMagnetPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showExitOffer, setShowExitOffer] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check if user has already subscribed or dismissed
        const hasSubscribed = localStorage.getItem('leadmagnet_subscribed');
        const lastDismissed = localStorage.getItem('leadmagnet_dismissed');

        if (hasSubscribed) return;

        if (lastDismissed) {
            const daysSinceDismissed = (Date.now() - parseInt(lastDismissed)) / (1000 * 60 * 60 * 24);
            if (daysSinceDismissed < 7) return;
        }

        // Trigger popup after 5 seconds
        const timer = setTimeout(() => {
            setIsVisible(true);
            trackEvent('PopupView', {
                category: 'Lead Generation',
                label: 'Subscription Popup',
                trigger: 'time_5s'
            });
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        if (!showExitOffer) {
            // Show exit offer instead of closing
            setShowExitOffer(true);
            trackEvent('ExitIntentOffer', {
                category: 'Lead Generation',
                label: 'Exit Offer Shown',
                discount: '50%'
            });
        } else {
            // Actually close the popup
            setIsVisible(false);
            localStorage.setItem('leadmagnet_dismissed', Date.now().toString());
            trackEvent('PopupClose', {
                category: 'Lead Generation',
                label: 'Subscription Popup',
                reason: 'user_dismissed_after_offer'
            });
        }
    };

    const handleBackToForm = () => {
        setShowExitOffer(false);
        trackEvent('ExitOfferAccepted', {
            category: 'Lead Generation',
            label: 'User Returned to Form',
            discount: '50%'
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'El teléfono es requerido';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Teléfono inválido (10 dígitos)';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            // Track as Lead (Facebook/GA4)
            trackEvent('Lead', {
                category: 'Lead Generation',
                label: 'Subscription Form',
                source: 'popup',
                value: 0,
                currency: 'COP',
                discount_claimed: showExitOffer ? '50%' : 'none'
            }, {
                email: formData.email,
                phone: formData.phone
            });

            // Track as Subscribe
            trackEvent('Subscribe', {
                category: 'Email Marketing',
                label: 'Popup Subscription',
                email: formData.email,
                phone: formData.phone,
                name: formData.name,
                discount: showExitOffer ? '50%' : 'none'
            });

            // Mark as subscribed
            localStorage.setItem('leadmagnet_subscribed', 'true');

            // Create WhatsApp message
            const discountText = showExitOffer ? '\n\n🎁 *¡Quiero mi 50% de descuento en mi primer proyecto!*' : '';

            const message = `Hola! Me gustaría suscribirme a sus servicios.

📝 *Mis datos:*
• Nombre: ${formData.name}
• Teléfono: ${formData.phone}
• Email: ${formData.email}${discountText}

Quiero recibir más información sobre sus servicios.`;

            const whatsappUrl = `https://wa.me/573138537261?text=${encodeURIComponent(message)}`;

            // Track WhatsApp redirect
            trackEvent('Contact', {
                method: 'whatsapp',
                source: 'subscription_popup',
                button_text: 'Suscribirse',
                discount: showExitOffer ? '50%' : 'none'
            });

            // Redirect to WhatsApp
            window.open(whatsappUrl, '_blank');

            // Close popup
            setTimeout(() => {
                setIsVisible(false);
            }, 500);

        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Hubo un error. Por favor intenta de nuevo.' });
        } finally {
            setIsLoading(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="leadmagnet-overlay" onClick={handleClose}>
            <div className="leadmagnet-popup glass" onClick={(e) => e.stopPropagation()}>
                <button className="popup-close" onClick={handleClose} aria-label="Cerrar">
                    ✕
                </button>

                {showExitOffer ? (
                    // Exit Offer Screen
                    <div className="exit-offer">
                        <div className="exit-offer-icon">🎁</div>
                        <h2 className="gradient-text">¡No te vayas!</h2>
                        <p className="exit-offer-text">
                            Llena el formulario ahora y obtén un
                        </p>
                        <div className="discount-badge">
                            50% DE DESCUENTO
                        </div>
                        <p className="exit-offer-subtext">
                            en tu primer proyecto con nosotros
                        </p>

                        <div className="exit-offer-buttons">
                            <button
                                className="btn btn-primary btn-large"
                                onClick={handleBackToForm}
                            >
                                ✅ Sí, quiero mi descuento
                            </button>
                            <button
                                className="btn btn-outline"
                                onClick={handleClose}
                            >
                                No, gracias
                            </button>
                        </div>

                        <p className="exit-offer-disclaimer">
                            ⏰ Oferta válida solo por hoy
                        </p>
                    </div>
                ) : (
                    // Main Form
                    <>
                        <div className="popup-header">
                            <div className="popup-icon">🎯</div>
                            <h2 className="gradient-text">¡Únete a Nuestra Comunidad!</h2>
                            <p className="popup-subtitle">
                                Recibe tips exclusivos, ofertas especiales y contenido premium directo en WhatsApp
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="popup-form">
                            <div className="form-group">
                                <label htmlFor="name">Nombre completo *</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Juan Pérez"
                                    className={errors.name ? 'error' : ''}
                                />
                                {errors.name && <span className="error-message">{errors.name}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Teléfono (WhatsApp) *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="3001234567"
                                    className={errors.phone ? 'error' : ''}
                                />
                                {errors.phone && <span className="error-message">{errors.phone}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="tu@email.com"
                                    className={errors.email ? 'error' : ''}
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

                            {errors.submit && (
                                <div className="error-message submit-error">{errors.submit}</div>
                            )}

                            <button
                                type="submit"
                                className="btn btn-primary btn-large"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Procesando...' : '📱 Suscribirme por WhatsApp →'}
                            </button>

                            <p className="popup-disclaimer">
                                🔒 Tus datos están seguros. Te contactaremos por WhatsApp.
                            </p>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default LeadMagnetPopup;
