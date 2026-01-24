import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './StartCRMPage.css';

const StartCRMPage = () => {
    return (
        <div className="start-crm-page">
            <Navbar />
            <div className="hero-crm">
                <div className="hero-content">
                    <h1>Comienza tu Prueba Gratuita de AMC CRM</h1>
                    <p>Gestiona leads, automatiza tus ventas y organiza tu empresa en un solo lugar.</p>

                    <div className="cta-container">
                        <Link to="/onboarding" className="btn-primary-large">
                            🚀 Crear mi Espacio de Trabajo
                        </Link>
                        <p className="subtext">No requiere tarjeta de crédito • 14 días de prueba</p>
                    </div>
                </div>
            </div>

            <div className="features-grid">
                <div className="feature-card">
                    <h3>🏢 Multi-Empresa</h3>
                    <p>Crea tu propia organización y gestiona tus vendedores.</p>
                </div>
                <div className="feature-card">
                    <h3>🤖 Automatización</h3>
                    <p>Email marketing y seguimiento automático de leads.</p>
                </div>
                <div className="feature-card">
                    <h3>📊 Reportes Reales</h3>
                    <p>Toma decisiones basadas en datos, no en intuición.</p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default StartCRMPage;
