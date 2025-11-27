import { Link } from 'react-router-dom';
import './CreditPayment.css';

const CreditPayment = () => {
    return (
        <section className="section credit-payment">
            <div className="container">
                <div className="credit-content glass">
                    <div className="credit-text">
                        <h2>Invierte en tu crecimiento hoy, paga en cuotas cómodas</h2>
                        <p className="mt-3">
                            Financia tus servicios o formación sin complicaciones. Aprobación en 24-48 horas. Sin trámites bancarios complejos.
                        </p>
                        <div className="credit-features mt-4">
                            <div className="feature">
                                <span className="feature-icon">✅</span>
                                <span>Hasta 12 cuotas sin interés</span>
                            </div>
                            <div className="feature">
                                <span className="feature-icon">✅</span>
                                <span>Aprobación rápida</span>
                            </div>
                            <div className="feature">
                                <span className="feature-icon">✅</span>
                                <span>Disponible para servicios y cursos</span>
                            </div>
                        </div>
                        <Link to="/credito" className="btn btn-primary mt-4">Simular mi financiación</Link>
                    </div>
                    <div className="credit-visual">
                        <div className="example-box">
                            <div className="example-title">Ejemplo: Proyecto de $3,000 USD</div>
                            <div className="example-options">
                                <div className="option">
                                    <div className="option-term">3 cuotas</div>
                                    <div className="option-amount">$1,050/mes</div>
                                    <div className="option-interest">5% interés total</div>
                                </div>
                                <div className="option highlighted">
                                    <div className="option-term">6 cuotas</div>
                                    <div className="option-amount">$550/mes</div>
                                    <div className="option-interest">10% interés total</div>
                                </div>
                                <div className="option">
                                    <div className="option-term">12 cuotas</div>
                                    <div className="option-amount">$290/mes</div>
                                    <div className="option-interest">16% interés total</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreditPayment;
