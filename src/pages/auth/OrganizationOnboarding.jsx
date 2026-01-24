import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import toast from 'react-hot-toast';
import './OrganizationOnboarding.css';

const OrganizationOnboarding = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState('create'); // 'create' or 'join'
    const [user, setUser] = useState(null);

    const [formData, setFormData] = useState({
        orgName: '',
        orgSlug: '',
        inviteCode: ''
    });

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            navigate('/login');
            return;
        }
        setUser(user);

        // Check if already has org
        const { data: profile } = await supabase
            .from('user_profiles')
            .select('organization_id')
            .eq('id', user.id)
            .single();

        if (profile?.organization_id) {
            navigate('/crm'); // Already has org
        }
    };

    const handleCreateOrg = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Create Organization
            const slug = formData.orgName.toLowerCase().replace(/[^a-z0-9]/g, '-');

            const { data: org, error: orgError } = await supabase
                .from('organizations')
                .insert([{
                    name: formData.orgName,
                    slug: slug,
                    plan: 'free' // Start free
                }])
                .select()
                .single();

            if (orgError) throw orgError;

            // 2. Assign User to Org
            const { error: profileError } = await supabase
                .from('user_profiles')
                .update({ organization_id: org.id, rol: 'admin' }) // Owner is admin
                .eq('id', user.id);

            if (profileError) throw profileError;

            toast.success('¡Organización creada! Bienvenido.');
            window.location.href = '/crm'; // Force reload to refresh context

        } catch (error) {
            console.error('Error creating org:', error);
            toast.error(error.message || 'Error al crear la organización');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="onboarding-container">
            <div className="onboarding-card">
                <div className="onboarding-header">
                    <h1>🚀 Bienvenido a AMC CRM</h1>
                    <p>Para comenzar, necesitas configurar tu espacio de trabajo.</p>
                </div>

                <div className="onboarding-tabs">
                    <button
                        className={`tab ${mode === 'create' ? 'active' : ''}`}
                        onClick={() => setMode('create')}
                    >
                        🏢 Crear Empresa
                    </button>
                    <button
                        className={`tab ${mode === 'join' ? 'active' : ''}`}
                        onClick={() => setMode('join')}
                    >
                        🔗 Unirme a una
                    </button>
                </div>

                {mode === 'create' ? (
                    <form onSubmit={handleCreateOrg} className="onboarding-form">
                        <div className="form-group">
                            <label>Nombre de tu Empresa / Negocio</label>
                            <input
                                type="text"
                                required
                                placeholder="Ej: Agencia Digital XYZ"
                                value={formData.orgName}
                                onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                            />
                        </div>
                        <div className="slug-preview">
                            <small>Tu URL será: amccrm.com/<strong>{formData.orgName.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'tu-empresa'}</strong></small>
                        </div>

                        <button type="submit" className="btn-primary full-width" disabled={loading}>
                            {loading ? 'Creando...' : '🚀 Crear mi Espacio'}
                        </button>
                    </form>
                ) : (
                    <div className="join-section">
                        <div className="form-group">
                            <label>Código de Invitación</label>
                            <input
                                type="text"
                                placeholder="Pide el código al administrador"
                                value={formData.inviteCode}
                                onChange={(e) => setFormData({ ...formData, inviteCode: e.target.value })}
                            />
                        </div>
                        <button className="btn-secondary full-width" disabled>
                            Unirse (Próximamente)
                        </button>
                        <p className="hint">Por ahora, pide al administrador que te registre manualmente.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrganizationOnboarding;
