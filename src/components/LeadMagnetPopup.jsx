import { useState, useEffect } from 'react';
import { trackEvent } from '../utils/analytics';
import './LeadMagnetPopup.css';

const LeadMagnetPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        selectedResources: []
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const resources = [
        {
            id: 'seo-guide',
            title: 'Guía Completa de SEO 2024',
            description: 'Estrategias probadas para dominar Google',
            icon: '📈',
            pageUrl: '/recursos/guia-seo-2024'
        },
        {
            id: 'marketing-checklist',
            title: 'Checklist de Marketing Digital',
            description: '50+ tácticas para aumentar conversiones',
            icon: '✅',
            pageUrl: '/recursos/checklist-marketing'
        },
        {
            id: 'web-optimization',
            title: 'Template de Optimización Web',
            description: 'Plantilla para auditar y mejorar tu sitio',
            icon: '🚀',
            pageUrl: '/recursos/template-optimizacion'
        }
    ];

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
                label: 'Lead Magnet Popup',
                trigger: 'time_5s'
            });
        }, 5000);

        // Exit intent trigger
        const handleMouseLeave = (e) => {
            if (e.clientY <= 0 && !isVisible) {
                setIsVisible(true);
                trackEvent('PopupView', {
                    category: 'Lead Generation',
                    label: 'Lead Magnet Popup',
                    trigger: 'exit_intent'
                });
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isVisible]);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('leadmagnet_dismissed', Date.now().toString());
        trackEvent('PopupClose', {
            category: 'Lead Generation',
            label: 'Lead Magnet Popup',
            reason: 'user_dismissed'
        });
    };

    const handleResourceToggle = (resourceId) => {
        setFormData(prev => ({
            ...prev,
            selectedResources: prev.selectedResources.includes(resourceId)
                ? prev.selectedResources.filter(id => id !== resourceId)
                : [...prev.selectedResources, resourceId]
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'El email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (formData.selectedResources.length === 0) {
            newErrors.resources = 'Selecciona al menos un recurso';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            // Track lead event
            trackEvent('Lead', {
                category: 'Lead Generation',
                label: 'Lead Magnet Subscribe',
                resources: formData.selectedResources.join(','),
                resource_count: formData.selectedResources.length
            }, {
                email: formData.email
            });

            // Simulate API call (replace with actual backend call)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mark as subscribed
            localStorage.setItem('leadmagnet_subscribed', 'true');
            setIsSubmitted(true);

        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Hubo un error. Por favor intenta de nuevo.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewResource = (resource) => {
        trackEvent('ViewContent', {
            category: 'Engagement',
            label: 'Lead Magnet Resource View',
            resource_id: resource.id,
            resource_name: resource.title
        });

        // Redirect to resource page
        window.location.href = resource.pageUrl;
    };

    if (!isVisible) return null;

    return (
        <div className="leadmagnet-overlay" onClick={handleClose}>
            <div className="leadmagnet-popup glass" onClick={(e) => e.stopPropagation()}>
                <button className="popup-close" onClick={handleClose} aria-label="Cerrar">
                    ✕
                </button>

                {!isSubmitted ? (
                    <>
                        <div className="popup-header">
                            <div className="popup-icon">🎁</div>
                            <h2 className="gradient-text">Recursos Gratuitos Premium</h2>
                            <p className="popup-subtitle">
                                Descarga las herramientas que usan las empresas líderes para crecer online
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="popup-form">
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

                            <div className="form-group">
                                <label htmlFor="name">Nombre (opcional)</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Tu nombre"
                                />
                            </div>

                            <div className="resources-section">
                                <label>Selecciona tus recursos: *</label>
                                <div className="resources-grid">
                                    {resources.map(resource => (
                                        <div
                                            key={resource.id}
                                            className={`resource-card ${formData.selectedResources.includes(resource.id) ? 'selected' : ''}`}
                                            onClick={() => handleResourceToggle(resource.id)}
                                        >
                                            <div className="resource-icon">{resource.icon}</div>
                                            <h4>{resource.title}</h4>
                                            <p>{resource.description}</p>
                                            <div className="resource-checkbox">
                                                {formData.selectedResources.includes(resource.id) ? '✓' : '○'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {errors.resources && <span className="error-message">{errors.resources}</span>}
                            </div>

                            {errors.submit && (
                                <div className="error-message submit-error">{errors.submit}</div>
                            )}

                            <button
                                type="submit"
                                className="btn btn-primary btn-large"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Procesando...' : 'Descargar Recursos Gratis →'}
                            </button>

                            <p className="popup-disclaimer">
                                🔒 No spam. Cancela cuando quieras. Tus datos están seguros.
                            </p>
                        </form>
                    </>
                ) : (
                    <div className="popup-success">
                        <div className="success-icon">🎉</div>
                        <h2 className="gradient-text">¡Gracias por Suscribirte!</h2>
                        <p>Tus recursos están listos. Haz clic para verlos:</p>

                        <div className="download-links">
                            {resources
                                .filter(r => formData.selectedResources.includes(r.id))
                                .map(resource => (
                                    <button
                                        key={resource.id}
                                        onClick={() => handleViewResource(resource)}
                                        className="download-btn"
                                    >
                                        <span className="download-icon">{resource.icon}</span>
                                        <span className="download-text">
                                            <strong>{resource.title}</strong>
                                            <small>Haz clic para ver el recurso</small>
                                        </span>
                                        <span className="download-arrow">→</span>
                                    </button>
                                ))}
                        </div>

                        <div className="success-cta">
                            <p>¿Necesitas ayuda implementando estas estrategias?</p>
                            <a href="#contacto" className="btn btn-secondary" onClick={handleClose}>
                                Hablar con un Experto
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeadMagnetPopup;
