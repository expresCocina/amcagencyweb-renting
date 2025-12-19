import { trackEvent } from '../utils/analytics';
import './CTA.css';

const CTA = () => {
  const handleWhatsAppClick = () => {
    trackEvent('Contact', {
      method: 'whatsapp',
      source: 'cta_section',
      button_text: 'Enviar mensaje por WhatsApp'
    });
  };

  const handleCalendlyClick = () => {
    trackEvent('Contact', {
      method: 'calendly',
      source: 'cta_section',
      button_text: 'Agendar llamada gratuita'
    });
  };

  return (
    <section className="section cta-section" id="contacto">
      <div className="container">
        <div className="cta-box glass">
          <h2>¿Listo para escalar tu negocio?</h2>
          <p className="mt-3">
            Agenda una llamada estratégica gratuita de 30 minutos. Analizamos tu situación actual y te mostramos el camino más rápido hacia tus objetivos.
          </p>
          <div className="cta-buttons mt-4">
            <a href="https://calendly.com/amc-agency" className="btn btn-primary" target="_blank" rel="noopener noreferrer" onClick={handleCalendlyClick}>
              Agendar llamada gratuita
            </a>
            <a href="https://wa.me/573138537261" className="btn btn-secondary" target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick}>
              Enviar mensaje por WhatsApp
            </a>
          </div>
          <div className="trust-note mt-4">
            🔒 Sin compromiso. Cancela cuando quieras.
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
