import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCredentials } from '../data/adminMockData';
import './AdminLogin.css';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Get credentials from localStorage
        const adminCreds = getCredentials();

        // Simulate a small delay for better UX
        setTimeout(() => {
            if (
                credentials.username === adminCreds.username &&
                credentials.password === adminCreds.password
            ) {
                // Store authentication in localStorage
                localStorage.setItem('adminAuthenticated', 'true');
                localStorage.setItem('adminLoginTime', Date.now().toString());
                navigate('/admin');
            } else {
                setError('Usuario o contraseña incorrectos');
                setIsLoading(false);
            }
        }, 500);
    };

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    return (
        <div className="admin-login-page">
            <div className="login-container">
                <div className="login-header">
                    <div className="login-logo">🔐</div>
                    <h1>Admin Dashboard</h1>
                    <p>Acceso restringido</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="login-error">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="username">Usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            placeholder="Ingresa tu usuario"
                            required
                            autoComplete="username"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="Ingresa tu contraseña"
                            required
                            autoComplete="current-password"
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-login"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Verificando...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <div className="login-footer">
                    <p>WaaS Management System</p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
