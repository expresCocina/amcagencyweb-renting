import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './CRMLayout.css';

const CRMLayout = () => {
    const location = useLocation();
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        loadUserProfile();
    }, []);

    const loadUserProfile = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('id', user.id)
                .single();
            setUserProfile(data);
        }
    };

    const navItems = [
        { path: '/crm', label: 'Dashboard', icon: '📊' },
        { path: '/crm/leads', label: 'Leads', icon: '👥' },
        { path: '/crm/pipeline', label: 'Pipeline', icon: '🎯' },
        { path: '/crm/clients', label: 'Clientes', icon: '🏢' },
        { path: '/crm/projects', label: 'Proyectos', icon: '📁' },
        { path: '/crm/tasks', label: 'Tareas', icon: '✓' },
        { path: '/crm/reports', label: 'Reportes', icon: '📈' },
    ];

    return (
        <div className="crm-layout">
            <aside className="crm-sidebar">
                <div className="crm-sidebar-header">
                    <h2>🚀 CRM</h2>
                    <p className="crm-user-role">{userProfile?.rol || 'Usuario'}</p>
                </div>
                <nav className="crm-nav">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`crm-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            <span className="crm-nav-icon">{item.icon}</span>
                            <span className="crm-nav-label">{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <div className="crm-sidebar-footer">
                    <Link to="/dashboard" className="crm-back-link">
                        ← Volver al Dashboard
                    </Link>
                </div>
            </aside>
            <main className="crm-main">
                <Outlet />
            </main>
        </div>
    );
};

export default CRMLayout;
