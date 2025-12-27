import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { trackPurchase } from '../utils/analytics';
import './SharedPageStyles.css';
import './RegistroPage.css';

const NEQUI_PAYMENT_LINK = 'https://checkout.nequi.wompi.co/l/xQ1z3t';

const RegistroPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre_negocio: '',
        nombre_representante: '',
        email: '',
        password: '',
        confirmPassword: '',
        whatsapp: '',
        dominio: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // Validate passwords match
            if (formData.password !== formData.confirmPassword) {
                throw new Error('Las contraseñas no coinciden.');
            }

            // Validate password length
            if (formData.password.length < 6) {
                throw new Error('La contraseña debe tener al menos 6 caracteres.');
            }

            // Step 1: Create user with Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        nombre_representante: formData.nombre_representante,
                        nombre_negocio: formData.nombre_negocio,
                    }
                }
            });

            if (authError) {
                throw new Error(authError.message);
            }

            if (!authData.user) {
                throw new Error('No se pudo crear el usuario. Por favor intenta de nuevo.');
            }

            // Step 2: Insert client data into clients table
            const { error: insertError } = await supabase
                .from('clients')
                .insert([{
                    user_id: authData.user.id,
                    company: formData.nombre_negocio,
                    name: formData.nombre_representante,
                    nombre_representante: formData.nombre_representante,
                    domain: formData.dominio || null,
                    whatsapp: formData.whatsapp,
                    phone: formData.whatsapp, // Also store in phone for compatibility
                    estado_pago: 'pendiente',
                    status: 'pending', // Mark as pending until payment is confirmed
                    plan: '80000', // Default plan amount
                }]);

            if (insertError) {
                console.error('Insert error:', insertError);
                throw new Error('Error al guardar los datos. Por favor intenta de nuevo.');
            }

            // Step 3: Track Purchase event for Facebook Pixel
            trackPurchase(80000, 'COP', 'Plan Onboarding', {
                email: formData.email,
                business_name: formData.nombre_negocio,
                source: 'registro_page'
            });

            // Step 4: Show success and redirect to payment
            setSuccess(true);

            // Wait a moment to show success message, then redirect to Nequi
            setTimeout(() => {
                window.location.href = NEQUI_PAYMENT_LINK;
            }, 2000);

        } catch (err) {
            console.error('Registration error:', err);
            setError(err.message || 'Ocurrió un error durante el registro. Por favor intenta de nuevo.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="registro-page">
            <div className="registro-container">
                <div className="registro-hero">
                    <div className="registro-branding">
                        <h1>🚀 ¡Bienvenido a AMC Agency!</h1>
                        <p>
                            Estás a un paso de tener tu presencia digital profesional.
                            Regístrate ahora y comienza tu transformación digital.
                        </p>
                    </div>
                    <ul className="registro-benefits">
                        <li>✅ Sitio web profesional en 48 horas</li>
                        <li>✅ Hosting incluido</li>
                        <li>✅ Optimizado para Google</li>
                        <li>✅ Soporte técnico 24/7</li>
                        <li>✅ Panel de administración fácil</li>
                    </ul>
                </div>

                <div className="registro-form-container">
                    <form className="registro-form" onSubmit={handleSubmit}>
                        <h2>Crear Cuenta</h2>
                        <p className="subtitle">Completa tus datos para comenzar</p>

                        {error && (
                            <div className="registro-error">
                                ⚠️ {error}
                            </div>
                        )}

                        {success && (
                            <div className="registro-success">
                                ✅ ¡Registro exitoso! Redirigiendo al pago...
                            </div>
                        )}

                        <div className="payment-notice">
                            <span className="icon">💳</span>
                            <div>
                                Al completar el registro, serás redirigido a <strong>Nequi</strong> para realizar el pago de <strong>$80,000 COP</strong> y activar tu servicio.
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="nombre_negocio">Nombre del Negocio *</label>
                            <input
                                type="text"
                                id="nombre_negocio"
                                name="nombre_negocio"
                                value={formData.nombre_negocio}
                                onChange={handleChange}
                                placeholder="Ej: Restaurante El Sabor"
                                required
                                disabled={isSubmitting || success}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="nombre_representante">Nombre del Representante *</label>
                            <input
                                type="text"
                                id="nombre_representante"
                                name="nombre_representante"
                                value={formData.nombre_representante}
                                onChange={handleChange}
                                placeholder="Ej: Carlos Mendoza"
                                required
                                disabled={isSubmitting || success}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="email">Correo Electrónico *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="tu@email.com"
                                    required
                                    disabled={isSubmitting || success}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Contraseña *</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Mínimo 6 caracteres"
                                    required
                                    minLength={6}
                                    disabled={isSubmitting || success}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirmar Contraseña *</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Repite tu contraseña"
                                    required
                                    disabled={isSubmitting || success}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="whatsapp">WhatsApp *</label>
                                <input
                                    type="tel"
                                    id="whatsapp"
                                    name="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                    placeholder="Ej: 3001234567"
                                    required
                                    disabled={isSubmitting || success}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="dominio">
                                ¿Ya tienes dominio? <span className="optional">(opcional)</span>
                            </label>
                            <input
                                type="text"
                                id="dominio"
                                name="dominio"
                                value={formData.dominio}
                                onChange={handleChange}
                                placeholder="Ej: www.tunegocio.com (si ya lo tienes)"
                                disabled={isSubmitting || success}
                            />
                            <small className="field-hint">Si no tienes dominio, déjalo en blanco y te ayudamos a elegir uno.</small>
                        </div>

                        <button
                            type="submit"
                            className="btn-register"
                            disabled={isSubmitting || success}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner-small"></span>
                                    Registrando...
                                </>
                            ) : success ? (
                                'Redirigiendo a Nequi...'
                            ) : (
                                '🚀 Registrar y Pagar'
                            )}
                        </button>
                    </form>

                    <div className="registro-footer">
                        <p>¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistroPage;
