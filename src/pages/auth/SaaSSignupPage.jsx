import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import toast from 'react-hot-toast';
import './SaaSSignupPage.css';

const SaaSSignupPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.fullName,
                        signup_type: 'saas' // CRITICAL FLAG
                    }
                }
            });

            if (error) throw error;

            toast.success('¡Cuenta creada! Revisa tu correo o inicia sesión.');

            // Auto login logic usually handles this, but let's redirect to onboarding
            if (data.session) {
                navigate('/onboarding');
            } else {
                navigate('/login'); // If email confirmation enabled
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Error al registrarse');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="saas-signup-container">
            <div className="signup-card">
                <h2>🚀 Crea tu cuenta CRM</h2>
                <p>Prueba gratis por 14 días. Sin tarjeta de crédito.</p>

                <form onSubmit={handleSignup}>
                    <div className="form-group">
                        <label>Nombre Completo</label>
                        <input
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Correo Electrónico</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            required
                            minLength={6}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="btn-primary full-width" disabled={loading}>
                        {loading ? 'Creando cuenta...' : 'Comenzar Gratis'}
                    </button>
                </form>

                <div className="signup-footer">
                    <p>¿Ya tienes cuenta? <Link to="/login">Iniciar Sesión</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SaaSSignupPage;
