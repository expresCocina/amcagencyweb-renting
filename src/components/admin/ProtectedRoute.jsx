import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

// Lista de emails de administradores autorizados
const ADMIN_EMAILS = [
    'info@amcagencyweb.com',
    'vidadigitalco11@gmail.com'
];

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check current session
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            setSession(session);

            if (session?.user?.email) {
                const isHardcodedAdmin = ADMIN_EMAILS.includes(session.user.email.toLowerCase());

                if (isHardcodedAdmin) {
                    setIsAdmin(true);
                } else {
                    // Check database role
                    const { data: profile } = await supabase
                        .from('user_profiles')
                        .select('rol, organization_id')
                        .eq('id', session.user.id)
                        .single();

                    setIsAdmin(profile?.rol === 'admin' || !!profile?.organization_id);
                }
            }

            setLoading(false);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);

            if (session?.user?.email) {
                // Check hardcoded admins
                const isHardcodedAdmin = ADMIN_EMAILS.includes(session.user.email.toLowerCase());

                if (isHardcodedAdmin) {
                    setIsAdmin(true);
                } else {
                    // Check database role for SaaS Admins
                    const { data: profile } = await supabase
                        .from('user_profiles')
                        .select('rol, organization_id')
                        .eq('id', session.user.id)
                        .single();

                    // Allow if they are admin or have an organization (implied admin for now)
                    setIsAdmin(profile?.rol === 'admin' || !!profile?.organization_id);
                }
            } else {
                setIsAdmin(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                background: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8',
                fontSize: '1.125rem'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        border: '4px solid rgba(59, 130, 246, 0.1)',
                        borderTopColor: '#3b82f6',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 16px'
                    }}></div>
                    Verificando sesión...
                </div>
            </div>
        );
    }

    // No session - redirect to login
    if (!session) {
        return <Navigate to="/admin/login" replace />;
    }

    // Session exists but user is not admin - redirect to client dashboard
    if (!isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    // User is authenticated and is admin
    return children;
};

export default ProtectedRoute;
