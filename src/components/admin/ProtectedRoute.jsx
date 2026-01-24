import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

// Lista de emails de administradores autorizados (Legacy)
const ADMIN_EMAILS = [
    'info@amcagencyweb.com',
    'vidadigitalco11@gmail.com'
];

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const checkUserRole = async (session) => {
        if (!session?.user?.email) {
            setIsAdmin(false);
            return;
        }

        try {
            // 1. Check Hardcoded Admins (Fastest)
            const isHardcodedAdmin = ADMIN_EMAILS.includes(session.user.email.toLowerCase());
            if (isHardcodedAdmin) {
                setIsAdmin(true);
                return;
            }

            // 2. Check Database Role (SaaS Admin)
            const { data: profile, error } = await supabase
                .from('user_profiles')
                .select('rol, organization_id')
                .eq('id', session.user.id)
                .maybeSingle(); // Use maybeSingle to avoid 406 errors if no rows

            if (error) {
                console.warn('Error fetching profile:', error);
                // Fail safe: If we can't read profile, assume not admin to avoid loops
                setIsAdmin(false);
                return;
            }

            // Allow if admin OR has organization (implied SaaS Admin)
            const isSaaSAdmin = profile?.rol === 'admin' || !!profile?.organization_id;
            setIsAdmin(isSaaSAdmin);

        } catch (err) {
            console.error('Unexpected auth check error:', err);
            setIsAdmin(false);
        }
    };

    useEffect(() => {
        let mounted = true;

        const initAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (mounted) {
                    setSession(session);
                    if (session) {
                        await checkUserRole(session);
                    }
                }
            } catch (error) {
                console.error('Session check failed', error);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        initAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (mounted) {
                setSession(session);
                if (session) {
                    // Reset loading to verify new user role if session changes
                    // But don't block UI if just a token refresh
                    if (_event === 'SIGNED_IN') {
                        setLoading(true);
                        await checkUserRole(session);
                        setLoading(false);
                    }
                } else {
                    setLoading(false);
                }
            }
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    // Safety Net: Force stop loading after 5 seconds no matter what
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5000);
        return () => clearTimeout(timer);
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
