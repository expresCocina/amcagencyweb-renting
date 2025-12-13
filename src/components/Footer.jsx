import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="footer-logo">
                            <span className="gradient-text">AMC</span> Agency Web
                        </h3>
                        <p className="mt-2">
                            Agencia de marketing digital especializada en SEO, desarrollo web y automatización para Latinoamérica.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4>Servicios</h4>
                        <ul>
                            <li><Link to="/seo">SEO Profesional</Link></li>
                            <li><Link to="/desarrollo-web">Desarrollo Web</Link></li>
                            <li><Link to="/embudos">Embudos + Automatización</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>AMC Academy</h4>
                        <ul>
                            <li><Link to="/cursos">Cursos y Bootcamps</Link></li>
                            <li><Link to="/cursos#certificacion">Certificación</Link></li>
                            <li><Link to="/cursos#bolsa-trabajo">Bolsa de Trabajo</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Empresa</h4>
                        <ul>
                            <li><Link to="/casos">Casos de Estudio</Link></li>
                            <li><Link to="/credito">Pago a Crédito</Link></li>
                            <li><Link to="/sobre-nosotros">Sobre AMC</Link></li>
                            <li><Link to="/agendar">Contacto</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Contacto</h4>
                        <ul>
                            <li><a href="https://wa.me/573138537261" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
                            <li><a href="mailto:info@amcagencyweb.com">Email</a></li>
                            <li><a href="https://calendly.com/amc-agency" target="_blank" rel="noopener noreferrer">Agendar Llamada</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-bottom-left">
                        <p>&copy; 2025 AMC Agency Web. Todos los derechos reservados.</p>
                        <div className="footer-legal">
                            <Link to="/privacidad">Privacidad</Link>
                            <span>•</span>
                            <Link to="/terminos">Términos</Link>
                        </div>
                    </div>
                    <div className="footer-social">
                        <a href="https://www.facebook.com/DigitalBoostamc" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
                        <a href="https://www.instagram.com/amc_agencycol?igsh=MWlrNWZhb2dzdXk4Yw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
                        <a href="https://www.tiktok.com/@amcagencycol?_r=1&_t=ZS-923QsYchh4L" target="_blank" rel="noopener noreferrer" aria-label="TikTok">TT</a>
                        <a href="https://linkedin.com/company/amcagencyweb" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LI</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
