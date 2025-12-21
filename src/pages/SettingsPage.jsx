import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import { getCredentials, updateCredentials } from '../data/adminMockData';
import './SettingsPage.css';

const SettingsPage = () => {
    const navigate = useNavigate();
    const currentCreds = getCredentials();
    const [credentials, setCredentials] = useState(currentCreds);
    const [isEditing, setIsEditing] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        updateCredentials(credentials);
        setSuccess(true);
        setIsEditing(false);
        setTimeout(() => setSuccess(false), 3000);
    };

    const handleLogout = () => {
        localStorage.removeItem('adminAuthenticated');
        localStorage.removeItem('adminLoginTime');
        navigate('/admin/login');
    };

    return (
        <div className="admin-dashboard">
            <AdminSidebar />

            <div className="admin-content">
                <div className="admin-header">
                    <div>
                        <h1>Configuración</h1>
                        <p className="admin-subtitle">Administra las credenciales de acceso</p>
                    </div>
                    <button onClick={handleLogout} className="btn-logout">
                        🚪 Cerrar Sesión
                    </button>
                </div>

                <div className="settings-container">
                    {success && (
                        <div className="success-message">
                            ✅ Credenciales actualizadas exitosamente
                        </div>
                    )}

                    <div className="settings-card">
                        <div className="card-header">
                            <h2>🔐 Credenciales de Acceso</h2>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="btn-edit-creds"
                                >
                                    ✏️ Editar
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSave} className="creds-form">
                            <div className="form-group">
                                <label htmlFor="username">Usuario</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={credentials.username}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type={isEditing ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    required
                                />
                            </div>

                            {isEditing && (
                                <div className="form-actions">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setCredentials(currentCreds);
                                            setIsEditing(false);
                                        }}
                                        className="btn-cancel"
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn-submit">
                                        Guardar Cambios
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>

                    <div className="settings-card">
                        <div className="card-header">
                            <h2>ℹ️ Información del Sistema</h2>
                        </div>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">Versión:</span>
                                <span className="info-value">1.0.0</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Almacenamiento:</span>
                                <span className="info-value">LocalStorage</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Sesión:</span>
                                <span className="info-value">24 horas</span>
                            </div>
                        </div>
                    </div>

                    <div className="settings-card danger-zone">
                        <div className="card-header">
                            <h2>⚠️ Zona de Peligro</h2>
                        </div>
                        <p className="danger-text">
                            Estas acciones son irreversibles. Úsalas con precaución.
                        </p>
                        <button
                            onClick={() => {
                                if (window.confirm('¿Estás seguro de que quieres borrar todos los datos? Esta acción no se puede deshacer.')) {
                                    localStorage.clear();
                                    alert('Todos los datos han sido borrados. Serás redirigido al login.');
                                    navigate('/admin/login');
                                }
                            }}
                            className="btn-danger"
                        >
                            🗑️ Borrar Todos los Datos
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
