import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero" id="inicio">
            <div className="hero-background">
                <div className="particles"></div>
            </div>
            <div className="container">
                <div className="hero-content fade-in-up">
                    <h1>Convertimos tu negocio en una <span className="gradient-text">máquina digital de ventas</span></h1>
                    <p className="hero-subtitle">
                        Agencia especializada en SEO, desarrollo web y automatización para empresas en Latinoamérica que quieren crecer sin límites.
                    </p>
                    <div className="hero-ctas">
                        <a href="#contacto" className="btn btn-primary">Solicitar cotización gratis</a>
                        <Link to="/casos" className="btn btn-secondary">Ver casos de éxito →</Link>
                    </div>
                    <div className="hero-stats">
                        <div className="stat">
                            <div className="stat-number gradient-text">+287%</div>
                            <div className="stat-label">Tráfico promedio</div>
                        </div>
                        <div className="stat">
                            <div className="stat-number gradient-text">5.9x</div>
                            <div className="stat-label">ROI promedio</div>
                        </div>
                        <div className="stat">
                            <div className="stat-number gradient-text">+500</div>
                            <div className="stat-label">Clientes LATAM</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
