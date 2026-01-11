import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

// Lista de emails de administradores autorizados
const ADMIN_EMAILS = [
    'salcri4110@gmail.com',
    'admin@amcagencyweb.com',
    'cristhian@amcagencyweb.com'
];

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check current session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);

            // Check if user is admin
            if (session?.user?.email) {
                const userIsAdmin = ADMIN_EMAILS.includes(session.user.email.toLowerCase());
                setIsAdmin(userIsAdmin);
            }

            setLoading(false);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);

            // Check if user is admin
            if (session?.user?.email) {
                const userIsAdmin = ADMIN_EMAILS.includes(session.user.email.toLowerCase());
                setIsAdmin(userIsAdmin);
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
