import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './SharedPageStyles.css';
import './LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Authenticate with Supabase
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (authError) {
                throw new Error(authError.message);
            }

            if (!data.user) {
                throw new Error('No se pudo iniciar sesión. Por favor intenta de nuevo.');
            }

            // Fetch client data from clients table
            const { data: clientData, error: clientError } = await supabase
                .from('clients')
                .select('*')
                .eq('user_id', data.user.id)
                .single();

            if (clientError || !clientData) {
                console.warn('No client data found:', clientError);
            }

            // Store session info
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', clientData?.name || data.user.email);
            localStorage.setItem('userEmail', data.user.email);
            localStorage.setItem('clientId', clientData?.id || '');

            // Redirect to dashboard
            navigate('/dashboard');

        } catch (err) {
            console.error('Login error:', err);

            // Translate common errors to Spanish
            let errorMessage = err.message;
            if (err.message.includes('Invalid login credentials')) {
                errorMessage = 'Credenciales incorrectas. Verifica tu email y contraseña.';
            } else if (err.message.includes('Email not confirmed')) {
                errorMessage = 'Tu email no ha sido confirmado. Revisa tu bandeja de entrada.';
            }

            setError(errorMessage);
        } finally {
            setIsLoading(false);
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

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu@email.com"
                                required
                                disabled={isLoading}
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
                                disabled={isLoading}
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

                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Ingresando...' : 'Ingresar al Portal'}
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>¿No tienes una cuenta? <Link to="/registro">Registrarse</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
