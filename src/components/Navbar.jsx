import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/seo">SEO</Link></li>
                        <li><Link to="/desarrollo-web">Desarrollo Web</Link></li>
                        <li><Link to="/embudos">Automatización</Link></li>
                        <li><Link to="/cursos">Cursos</Link></li>
                        <li><Link to="/casos">Casos</Link></li>
                        <li><a href="#contacto" className="btn btn-primary btn-small">Contacto</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
