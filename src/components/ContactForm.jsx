import { useState } from 'react';
import { trackEvent, trackLead } from '../utils/analytics';
import './ContactForm.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: 'seo'
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Save lead to CRM database
            const { supabase } = await import('../supabaseClient');

            const { error: leadError } = await supabase
                .from('leads')
                .insert([{
                    nombre: formData.name,
                    empresa: formData.company,
                    email: formData.email,
                    telefono: formData.phone,
                    fuente: 'Formulario de Contacto Web',
                    estado: 'nuevo',
                    notas: `Servicio solicitado: ${formData.service}`
                }]);

            if (leadError) {
                console.error('Error saving lead:', leadError);
                // Don't block the WhatsApp flow if lead save fails
            } else {
                console.log('Lead saved successfully to CRM');
            }
        } catch (error) {
            console.error('Error in lead creation:', error);
            // Continue with WhatsApp even if lead save fails
        }

        // Track form submission (Browser only)
        trackEvent('form_submission', {
            form_name: 'Contact Form',
            service: formData.service
        });

        // Track Lead - THIS SENDS TO CAPI
        trackLead('Contact Form', {
            phone: formData.phone,
            service: formData.service,
            company: formData.company
        });

        // Crear mensaje de WhatsApp
        const whatsappMessage = `Hola! Me gustaría solicitar información sobre:

Nombre: ${formData.name}
Empresa: ${formData.company}
Email: ${formData.email}
Teléfono: ${formData.phone}
Servicio: ${formData.service}`;

        const whatsappUrl = `https://wa.me/573138537261?text=${encodeURIComponent(whatsappMessage)}`;

        // Track WhatsApp click (Browser only)
        trackEvent('whatsapp_click', {
            source: 'Contact Form'
        });

        // Abrir WhatsApp
        window.open(whatsappUrl, '_blank');

        setIsSubmitted(true);

        // Reset form después de 3 segundos
        setTimeout(() => {
            setFormData({
                name: '',
                company: '',
                email: '',
                phone: '',
                service: 'seo'
            });
            setIsSubmitted(false);
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
                                    <p>+57 313 853 7261</p>
                                </div>
                            </div>

                            <div className="contact-method">
                                <div className="method-icon">✉️</div>
                                <div>
                                    <strong>Email</strong>
                                    <p>info@amcagencyweb.com</p>
                                </div>
                            </div>

                            <div className="contact-method">
                                <div className="method-icon">📍</div>
                                <div>
                                    <strong>Ubicación</strong>
                                    <p>Neiva, Huila, Colombia</p>
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
                        {isSubmitted ? (
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
                                    <label htmlFor="company">Empresa *</label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        required
                                        placeholder="Mi Empresa S.A.S."
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
                                        placeholder="contacto@empresa.com"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">WhatsApp *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="+57 313 853 7261"
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
