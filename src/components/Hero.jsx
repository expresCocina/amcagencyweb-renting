import { Link } from 'react-router-dom';
import TrackedLink from './TrackedLink';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero" id="inicio">
            <div className="hero-background">
                <div className="particles"></div>
            </div>
            <div className="container">
                <div className="hero-content fade-in-up">
                    <h1>Desarrollamos la tecnología que <span className="gradient-text">escala tu facturación</span></h1>
                    <p className="hero-subtitle">
                        Sitios web, SEO y automatización con financiación directa. No solo hacemos webs, creamos máquinas de ventas.
                    </p>
                    <div className="hero-ctas">
                        <TrackedLink href="#contacto" type="contact" source="hero" className="btn btn-primary">
                            COTIZAR PROYECTO
                        </TrackedLink>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
