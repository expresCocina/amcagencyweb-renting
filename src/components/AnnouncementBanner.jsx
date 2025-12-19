import './AnnouncementBanner.css';

const AnnouncementBanner = () => {
    return (
        <div className="announcement-banner">
            <div className="announcement-content">
                <span className="announcement-icon">🎉</span>
                <span className="announcement-text">
                    <strong>¡PAGA CUANDO TU PROYECTO SE TE ENTREGUE!</strong> Primera cuota al recibir tu proyecto terminado
                </span>
                <a href="https://wa.me/573138537261?text=Hola!%20Quiero%20iniciar%20mi%20proyecto%20con%20pago%20al%20entregar" className="announcement-cta" target="_blank" rel="noopener noreferrer">
                    Iniciar Proyecto →
                </a>
            </div>
        </div>
    );
};

export default AnnouncementBanner;
