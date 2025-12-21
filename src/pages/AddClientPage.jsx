import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import { addClient } from '../data/adminMockData';
import './AddClientPage.css';

const AddClientPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        domain: '',
        plan: 80000,
        phone: '',
        nextPayment: '',
        status: 'active',
        isActive: true,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Add client
        addClient(formData);

        setSuccess(true);
        setTimeout(() => {
            navigate('/admin');
        }, 1500);
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
                        <h1>Agregar Nuevo Cliente</h1>
                        <p className="admin-subtitle">Registra un nuevo cliente WaaS</p>
                    </div>
                    <button onClick={handleLogout} className="btn-logout">
                        🚪 Cerrar Sesión
                    </button>
                </div>

                <div className="add-client-container">
                    {success && (
                        <div className="success-message">
                            ✅ Cliente agregado exitosamente. Redirigiendo...
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="client-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Nombre Completo *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ej: Carlos Mendoza"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="company">Empresa *</label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="Ej: Abogados Mendoza & Asociados"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="domain">Dominio *</label>
                                <input
                                    type="text"
                                    id="domain"
                                    name="domain"
                                    value={formData.domain}
                                    onChange={handleChange}
                                    placeholder="Ej: abogadosmendoza.com"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Teléfono (WhatsApp) *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Ej: 3001234567"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="plan">Plan Mensual (COP) *</label>
                                <input
                                    type="number"
                                    id="plan"
                                    name="plan"
                                    value={formData.plan}
                                    onChange={handleChange}
                                    min="0"
                                    step="1000"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="nextPayment">Próximo Pago *</label>
                                <input
                                    type="date"
                                    id="nextPayment"
                                    name="nextPayment"
                                    value={formData.nextPayment}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="status">Estado *</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                >
                                    <option value="active">Activo</option>
                                    <option value="pending">Pendiente Pago</option>
                                    <option value="suspended">Suspendido</option>
                                </select>
                            </div>

                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        checked={formData.isActive}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                    />
                                    <span>Sitio web activo</span>
                                </label>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                onClick={() => navigate('/admin')}
                                className="btn-cancel"
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="btn-submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Guardando...' : 'Agregar Cliente'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddClientPage;
