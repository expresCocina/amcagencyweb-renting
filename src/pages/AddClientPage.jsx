import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import { supabase } from '../supabaseClient';
import './AddClientPage.css';

const AddClientPage = () => {
    const navigate = useNavigate();

    // Calculate next payment date (1 month from today)
    const getNextPaymentDate = () => {
        const today = new Date();
        const nextMonth = new Date(today);
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        // Format as YYYY-MM-DD for date input
        const year = nextMonth.getFullYear();
        const month = String(nextMonth.getMonth() + 1).padStart(2, '0');
        const day = String(nextMonth.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const [formData, setFormData] = useState({
        name: '',
        company: '',
        domain: '',
        plan: '80000',
        phone: '',
        next_payment: getNextPaymentDate(),
        status: 'active',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const { error: insertError } = await supabase
                .from('clients')
                .insert([formData]);

            if (insertError) throw insertError;

            setSuccess(true);
            setTimeout(() => {
                navigate('/admin');
            }, 1500);
        } catch (err) {
            console.error('Error adding client:', err);
            setError('Error al agregar el cliente. Por favor, intenta de nuevo.');
            setIsSubmitting(false);
        }
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

                    {error && (
                        <div className="error-message">
                            ⚠️ {error}
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
                                <label htmlFor="next_payment">Próximo Pago (Auto-calculado) *</label>
                                <input
                                    type="date"
                                    id="next_payment"
                                    name="next_payment"
                                    value={formData.next_payment}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                />
                                <small style={{ color: '#64748b', fontSize: '0.8rem' }}>
                                    📅 Calculado automáticamente: 1 mes desde hoy
                                </small>
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
