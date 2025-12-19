import { FaFacebook, FaInstagram, FaTiktok, FaLinkedin, FaWhatsapp, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
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
                            Desarrollamos la tecnología que escala tu facturación. Sitios web, SEO y automatización con financiación directa.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4>Navegación</h4>
                        <ul>
                            <li><a href="#inicio">Inicio</a></li>
                            <li><a href="#servicios">Servicios</a></li>
                            <li><a href="#financiacion">Financiación</a></li>
                            <li><a href="#testimonios">Testimonios</a></li>
                            <li><a href="#contacto">Contacto</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Contacto</h4>
                        <ul>
                            <li>
                                <a href="https://wa.me/573138537261" target="_blank" rel="noopener noreferrer">
                                    <FaWhatsapp className="contact-icon" /> WhatsApp: +57 313 853 7261
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info@amcagencyweb.com">
                                    <FaEnvelope className="contact-icon" /> info@amcagencyweb.com
                                </a>
                            </li>
                            <li>
                                <a href="https://calendly.com/amc-agency" target="_blank" rel="noopener noreferrer">
                                    <FaCalendarAlt className="contact-icon" /> Agendar Llamada
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Síguenos</h4>
                        <div className="footer-social-links">
                            <a href="https://www.facebook.com/DigitalBoostamc" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FaFacebook className="social-icon" /> Facebook
                            </a>
                            <a href="https://www.instagram.com/amc_agencycol?igsh=MWlrNWZhb2dzdXk4Yw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FaInstagram className="social-icon" /> Instagram
                            </a>
                            <a href="https://www.tiktok.com/@amcagencycol?_r=1&_t=ZS-923QsYchh4L" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                                <FaTiktok className="social-icon" /> TikTok
                            </a>
                            <a href="https://linkedin.com/company/amcagencyweb" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <FaLinkedin className="social-icon" /> LinkedIn
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2025 AMC Agency Web. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
