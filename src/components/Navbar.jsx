import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToDemos = () => {
        const demosSection = document.getElementById('demos');
        if (demosSection) {
            demosSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

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

                    <button onClick={scrollToDemos} className="btn btn-primary btn-small">
                        VER PLANES
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
