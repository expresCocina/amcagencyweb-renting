import { useEffect } from 'react';
import './SitioBloqueadoPage.css';

const SitioBloqueadoPage = () => {
    useEffect(() => {
        document.title = 'Sitio Bloqueado - AMC Agency Web';
    }, []);

    return (
        <div className="sitio-bloqueado-page">
            <div className="bloqueado-container">
                <div className="bloqueado-icon">🚫</div>
                <h1>Sitio Temporalmente Bloqueado</h1>
                <p className="bloqueado-subtitle">Este sitio web ha sido suspendido por falta de pago</p>

                <div className="bloqueado-info">
                    <div className="info-icon">ℹ️</div>
                    <div className="info-content">
                        <h2>¿Qué significa esto?</h2>
                        <p>El propietario de este sitio web no ha realizado el pago mensual de su servicio de hosting y desarrollo web.</p>
                        <p>El sitio será reactivado automáticamente una vez se complete el pago pendiente.</p>
                    </div>
                </div>

                <div className="bloqueado-owner-section">
                    <h3>¿Eres el propietario de este sitio?</h3>
                    <p>Realiza tu pago para reactivar tu sitio web en menos de 24 horas.</p>

                    <div className="bloqueado-actions">
                        <a
                            href="https://checkout.nequi.wompi.co/l/xQ1z3t"
                            className="btn btn-primary btn-large"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            💳 Realizar Pago
                        </a>
                        <a
                            href="/login"
                            className="btn btn-secondary btn-large"
                        >
                            🔐 Acceder al Panel
                        </a>
                    </div>
                </div>

                <div className="bloqueado-support">
                    <h3>¿Necesitas ayuda?</h3>
                    <div className="support-contacts">
                        <a href="mailto:soporte@amcagencyweb.com" className="support-link">
                            📧 soporte@amcagencyweb.com
                        </a>
                        <a href="https://wa.me/573138537261?text=Hola,%20mi%20sitio%20está%20bloqueado" className="support-link" target="_blank" rel="noopener noreferrer">
                            📱 +57 313 853 7261
                        </a>
                    </div>
                </div>

                <div className="bloqueado-footer">
                    <p>Powered by <strong>AMC Agency Web</strong></p>
                    <p className="footer-tagline">Desarrollo Web Profesional</p>
                </div>
            </div>
        </div>
    );
};

export default SitioBloqueadoPage;
