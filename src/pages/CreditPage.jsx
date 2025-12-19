import { trackEvent } from '../utils/analytics';
import CreditPayment from '../components/CreditPayment';
import CreditSimulator from '../components/CreditSimulator';
import ContactForm from '../components/ContactForm';
import './SEOPage.css';

const CreditPage = () => {
    return (
        <div className="page credit-full-page">
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-content">
                        <h1>Invierte en tu crecimiento hoy, <span className="gradient-text">paga en cuotas cómodas</span></h1>
                        <p className="page-subtitle">
                            Financia tus servicios sin complicaciones. <strong>Primera cuota cuando se entregue tu proyecto.</strong> Aprobación en 24-48 horas. Sin trámites bancarios complejos.
                        </p>
                        <div className="page-ctas">
                            <a href="#simulador" className="btn btn-primary">Simular mi financiación</a>
                            <a href="https://wa.me/573138537261?text=Hola,%20quiero%20información%20sobre%20financiación" className="btn btn-secondary" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('Contact', { method: 'whatsapp', source: 'credit_page', button_text: 'Hablar con asesor' })}>
                                Hablar con asesor
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <CreditSimulator />

            <CreditPayment />

            <section className="section" style={{ background: 'var(--bg-container)' }}>
                <div className="container">
                    <h2 className="text-center">Proceso simple en 3 pasos</h2>

                    <div className="grid grid-3 mt-5">
                        <div className="card text-center">
                            <div style={{ fontSize: '48px', marginBottom: '16px' }}>1️⃣</div>
                            <h3>Solicita</h3>
                            <p className="mt-2">Completa el formulario en 2 minutos. Sin documentación compleja. 100% online.</p>
                        </div>

                        <div className="card text-center">
                            <div style={{ fontSize: '48px', marginBottom: '16px' }}>2️⃣</div>
                            <h3>Aprobación</h3>
                            <p className="mt-2">Respuesta en 24-48 horas. Análisis crediticio flexible. 85% de aprobación.</p>
                        </div>

                        <div className="card text-center">
                            <div style={{ fontSize: '48px', marginBottom: '16px' }}>3️⃣</div>
                            <h3>Comienza</h3>
                            <p className="mt-2">Inicia tu proyecto o curso de inmediato. Primera cuota a los 30 días.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}>
                <div className="container">
                    <h2 className="text-center">Requisitos</h2>

                    <div className="grid grid-2 mt-5" style={{ maxWidth: '900px', margin: '40px auto 0' }}>
                        <div className="card">
                            <h3>✅ Para calificar necesitas:</h3>
                            <ul style={{ marginTop: '16px', paddingLeft: '20px' }}>
                                <li>Ser mayor de 18 años</li>
                                <li>Residir en LATAM</li>
                                <li>Tener ingresos demostrables</li>
                                <li>Identificación oficial vigente</li>
                            </ul>
                        </div>

                        <div className="card">
                            <h3>❌ NO necesitas:</h3>
                            <ul style={{ marginTop: '16px', paddingLeft: '20px' }}>
                                <li>Historial crediticio perfecto</li>
                                <li>Trámites bancarios complejos</li>
                                <li>Aval o garantías</li>
                                <li>Papeleo extenso</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <ContactForm />
        </div>
    );
};

export default CreditPage;
