import { useState, useEffect } from 'react';
import { trackEvent } from '../utils/analytics';
import './CreditSimulator.css';

const CreditSimulator = () => {
    const [amount, setAmount] = useState(2500);
    const [months, setMonths] = useState(6);

    const calculatePayment = (principal, term) => {
        const interestRates = {
            3: 0.05,
            6: 0.10,
            12: 0.16
        };

        const rate = interestRates[term] || 0.10;
        const total = principal * (1 + rate);
        ```javascript
import { useState, useEffect } from 'react';
import { trackEvent } from '../utils/analytics';
import './CreditSimulator.css';

const CreditSimulator = () => {
    const [amount, setAmount] = useState(2500);
    const [months, setMonths] = useState(6);

    const calculatePayment = (principal, term) => {
        const interestRates = {
            3: 0.05,
            6: 0.10,
            12: 0.16
        };

        const rate = interestRates[term] || 0.10;
        const total = principal * (1 + rate);
        const monthly = total / term;

        return {
            monthly: monthly.toFixed(2),
            total: total.toFixed(2),
            interest: (total - principal).toFixed(2),
            rate: (rate * 100).toFixed(0)
        };
    };

    const payment = calculatePayment(amount, months);

    // Track when user interacts with simulator (Debounced)
    useEffect(() => {
        const timer = setTimeout(() => {
            trackEvent('CustomizeProduct', {
                content_name: 'Credit Simulation',
                value: amount,
                currency: 'USD',
                period: months
            });
        }, 2000); // Track after 2 seconds of inactivity
        return () => clearTimeout(timer);
    }, [amount, months]);

    return (
        <div className="credit-simulator" id="simulador">
            <div className="simulator-container glass">
                <h2 className="text-center">Simula tu financiación</h2>
                <p className="text-center mt-2" style={{ color: 'var(--text-secondary)' }}>
                    Ajusta el monto y plazo para ver tu cuota mensual
                </p>

                <div className="simulator-controls mt-4">
                    <div className="control-group">
                        <label>Monto del proyecto</label>
                        <div className="amount-display gradient-text">${amount.toLocaleString()} USD</div>
                        <input
                            type="range"
                            min="500"
                            max="10000"
                            step="100"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="slider"
                        />
                        <div className="range-labels">
                            <span>$500</span>
                            <span>$10,000</span>
                        </div>
                    </div>

                    <div className="control-group mt-4">
                        <label>Plazo de pago</label>
                        <div className="months-selector">
                            {[3, 6, 12].map((m) => (
                                <button
                                    key={m}
                                    className={`month - btn ${ months === m ? 'active' : '' } `}
                                    onClick={() => setMonths(m)}
                                >
                                    {m} cuotas
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="payment-result mt-5">
                    <div className="result-grid">
                        <div className="result-item">
                            <div className="result-label">Cuota mensual</div>
                            <div className="result-value gradient-text">${payment.monthly}</div>
                        </div>
                        <div className="result-item">
                            <div className="result-label">Total a pagar</div>
                            <div className="result-value">${payment.total}</div>
                        </div>
                        <div className="result-item">
                            <div className="result-label">Interés total</div>
                            <div className="result-value">${payment.interest} ({payment.rate}%)</div>
                        </div>
                    </div>

                    <div className="simulator-cta mt-4">
                        <a href="#contacto" className="btn btn-primary" style={{ width: '100%' }}>
                            Solicitar esta financiación
                        </a>
                        <p className="mt-3 text-center" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                            🔒 Consulta sin compromiso. Aprobación en 24-48 horas.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditSimulator;
```
