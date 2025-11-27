import { useState } from 'react';
import { trackEvent } from '../utils/analytics';
import './ContactForm.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: 'seo',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Crear mensaje de WhatsApp
        const whatsappMessage = `Hola! Me gustaría solicitar información sobre:
    
Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone}
Servicio: ${formData.service}
Mensaje: ${formData.message}`;

        const whatsappUrl = `https://wa.me/573001234567?text=${encodeURIComponent(whatsappMessage)}`;

        // Abrir WhatsApp
        window.open(whatsappUrl, '_blank');

        // Track Lead Event
        trackEvent('Lead', {
            content_name: formData.service,
            currency: 'USD',
            value: 0 // Or estimated value
        }, {
            email: formData.email,
            phone: formData.phone
        });

        setSubmitted(true);

        // Reset form después de 3 segundos
        setTimeout(() => {
            setFormData({
                name: '',
                email: '',
                phone: '',
                service: 'seo',
                message: ''
            });
            setSubmitted(false);
        }, 3000);
    };

    return (
        <div className="contact-form-section" id="contacto">
            <div className="container">
                <div className="contact-grid">
                    <div className="contact-info">
                        <h2>¿Listo para impulsar tu negocio?</h2>
                        <p className="mt-3">
                            Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas.
                        </p>

                        <div className="contact-methods mt-5">
                            <div className="contact-method">
                                <div className="method-icon">📱</div>
                                <div>
                                    <strong>WhatsApp</strong>
                                    <p>+57 300 123 4567</p>
                                </div>
                            </div>

                            <div className="contact-method">
                                <div className="method-icon">✉️</div>
                                <div>
                                    <strong>Email</strong>
                                    <p>hola@amcagencyweb.com</p>
                                </div>
                            </div>

                            <div className="contact-method">
                                <div className="method-icon">📅</div>
                                <div>
                                    <strong>Calendly</strong>
                                    <p>Agenda una llamada</p>
                                </div>
                            </div>
                        </div>

                        <div className="trust-badges mt-5">
                            <div className="badge-item">✅ Respuesta en 24h</div>
                            <div className="badge-item">✅ Sin compromiso</div>
                            <div className="badge-item">✅ Consultoría gratuita</div>
                        </div>
                    </div>

                    <div className="contact-form-container glass">
                        {submitted ? (
                            <div className="success-message">
                                <div className="success-icon">✅</div>
                                <h3>¡Mensaje enviado!</h3>
                                <p className="mt-2">Te contactaremos pronto por WhatsApp</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-group">
                                    <label htmlFor="name">Nombre completo *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Juan Pérez"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="juan@empresa.com"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Teléfono / WhatsApp *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="+57 300 123 4567"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="service">Servicio de interés *</label>
                                    <select
                                        id="service"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="seo">SEO Profesional</option>
                                        <option value="web">Desarrollo Web</option>
                                        <option value="funnels">Embudos + Automatización</option>
                                        <option value="academy">AMC Academy (Cursos)</option>
                                        <option value="credit">Financiación a Crédito</option>
                                        <option value="other">Otro</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Cuéntanos sobre tu proyecto</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Describe brevemente lo que necesitas..."
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                    Enviar solicitud por WhatsApp
                                </button>

                                <p className="form-note mt-3">
                                    Al enviar, aceptas que te contactemos por WhatsApp
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
