import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TrackedLink from './TrackedLink';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="logo">
                        <img src="/logo.svg" alt="AMC Agency Web" className="logo-img" onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                        }} />
                        <span className="logo-text" style={{ display: 'none' }}>
                            <span className="gradient-text">AMC</span> Agency Web
                        </span>
                    </Link>

                    <button
                        className="menu-toggle"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
                        <li><a href="#inicio" onClick={() => setMenuOpen(false)}>Inicio</a></li>
                        <li><a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a></li>
                        <li><a href="#financiacion" onClick={() => setMenuOpen(false)}>Financiación</a></li>
                        <li><a href="#testimonios" onClick={() => setMenuOpen(false)}>Testimonios</a></li>
                        <li>
                            <TrackedLink href="#contacto" type="contact" source="navbar" className="btn btn-primary btn-small" onClick={() => setMenuOpen(false)}>
                                COTIZAR PROYECTO
                            </TrackedLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
