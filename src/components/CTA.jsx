import { trackEvent } from '../utils/analytics';
import './CTA.css';

const CTA = () => {
  const handleWhatsAppClick = () => {
    trackEvent('Contact', {
      method: 'whatsapp',
      source: 'cta_section',
      button_text: 'Contratar Plan Renting'
    });
  };

  const scrollToPlans = () => {
    const demosSection = document.getElementById('demos');
    if (demosSection) {
      demosSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section cta-section" id="contacto">
      <div className="container">
        <div className="cta-box glass">
          <h2>¿Listo para tu sitio web profesional?</h2>
          <p className="mt-3">
            Comienza hoy con $0 de cuota inicial. Solo $80.000 COP/mes todo incluido: diseño, hosting, SSL y soporte técnico.
          </p>
          <div className="cta-buttons mt-4">
            <a
              href="https://wa.me/573138537261?text=Hola%20AMC,%20me%20interesa%20el%20Plan%20Renting%20de%2080k."
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
            >
              CONTRATAR PLAN RENTING
            </a>
            <button onClick={scrollToPlans} className="btn btn-secondary">
              Ver Plantillas
            </button>
          </div>
          <div className="trust-note mt-4">
            🔒 Contrato mínimo 12 meses. Tu dominio es 100% tuyo.
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
