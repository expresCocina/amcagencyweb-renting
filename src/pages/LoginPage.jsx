import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SharedPageStyles.css';
import './LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Demo login validation
        if (email === 'demo@amc.com' && password === 'demo123') {
            // Store demo session
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', 'Juan Pérez');

            // Redirect to dashboard
            navigate('/dashboard');
        } else {
            setError('Credenciales incorrectas. Usa: demo@amc.com / demo123');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-hero">
                    <div className="login-branding">
                        <h1>🔐 Portal de Clientes</h1>
                        <p>Accede a tus proyectos, métricas y reportes</p>
                    </div>
                </div>

                <div className="login-form-container">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h2>Iniciar Sesión</h2>

                        {error && (
                            <div className="login-error">
                                ⚠️ {error}
                            </div>
                        )}

                        <div className="demo-credentials">
                            <strong>🎯 Credenciales Demo:</strong>
                            <div>Email: <code>demo@amc.com</code></div>
                            <div>Password: <code>demo123</code></div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu@email.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="form-options">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span>Recordarme</span>
                            </label>
                            <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">
                            Ingresar al Portal
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>¿No tienes una cuenta? <a href="/#contacto">Contacta con ventas</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
