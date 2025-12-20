import { trackEvent } from '../utils/analytics';
import './AnnouncementBanner.css';

const AnnouncementBanner = () => {
    const handleClick = () => {
        trackEvent('Contact', {
            method: 'whatsapp',
            source: 'announcement_banner',
            button_text: 'Iniciar Proyecto'
        });
    };

    return (
        <div className="announcement-banner">
            {/* Desktop version */}
            <div className="announcement-desktop">
                <span className="announcement-icon">🎉</span>
                <span className="announcement-text">
                    <strong>¡PAGA CUANDO TU PROYECTO SE TE ENTREGUE!</strong> Primera cuota al recibir tu proyecto terminado
                </span>
                <a
                    href="https://wa.me/573138537261?text=Hola!%20Quiero%20iniciar%20mi%20proyecto%20con%20pago%20al%20entregar"
                    className="announcement-cta"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClick}
                >
                    Iniciar Proyecto →
                </a>
            </div>

            {/* Mobile marquee version */}
            <div className="announcement-mobile">
                <div className="marquee">
                    <div className="marquee-content">
                        <span className="announcement-icon">🎉</span>
                        <span className="announcement-text-mobile">
                            <strong>¡PAGA CUANDO TU PROYECTO SE TE ENTREGUE!</strong>
                        </span>
                        <a
                            href="https://wa.me/573138537261?text=Hola!%20Quiero%20iniciar%20mi%20proyecto%20con%20pago%20al%20entregar"
                            className="announcement-cta-mobile"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleClick}
                        >
                            Iniciar →
                        </a>
                        {/* Duplicate for seamless loop */}
                        <span className="announcement-icon">🎉</span>
                        <span className="announcement-text-mobile">
                            <strong>¡PAGA CUANDO TU PROYECTO SE TE ENTREGUE!</strong>
                        </span>
                        <a
                            href="https://wa.me/573138537261?text=Hola!%20Quiero%20iniciar%20mi%20proyecto%20con%20pago%20al%20entregar"
                            className="announcement-cta-mobile"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleClick}
                        >
                            Iniciar →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementBanner;
