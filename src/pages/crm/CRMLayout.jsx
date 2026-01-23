import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import NotificationBell from '../../components/common/NotificationBell';
import './CRMLayout.css';

const CRMLayout = () => {
    const location = useLocation();
    const [userProfile, setUserProfile] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="crm-layout">
            {/* Mobile Header with Hamburger */}
            <div className="crm-mobile-header">
                <div className="mobile-left" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button className="hamburger-btn" onClick={toggleMobileMenu} aria-label="Toggle menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <div className="crm-mobile-logo">
                        <span className="crm-icon">🚀</span>
                        <span>CRM</span>
                    </div>
                </div>
                <div className="mobile-right">
                    <NotificationBell />
                </div>
            </div>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div className="sidebar-overlay" onClick={closeMobileMenu}></div>
            )}

            {/* Sidebar */}
            <aside className={`crm-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                <div className="crm-header">
                    <span className="crm-logo">🚀</span>
                    <div>
                        <div className="crm-title">CRM</div>
                        <div className="crm-subtitle">{userProfile?.rol || 'Usuario'}</div>
                    </div>
                </div>
                <nav className="crm-nav">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={closeMobileMenu}
                            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            <span className="sidebar-icon">{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            {/* Main Content */}
            <main className="crm-main">
                {/* Desktop Header */}
                <header className="crm-top-header">
                    <div className="header-left">
                        {/* Breadcrumb or Title placeholder */}
                    </div>
                    <div className="header-right">
                        <NotificationBell />
                        <div className="user-menu">
                            <span className="user-name">{userProfile?.nombre_completo?.split(' ')[0] || 'Usuario'}</span>
                            <div className="user-avatar">
                                {userProfile?.nombre_completo?.charAt(0) || 'U'}
                            </div>
                        </div>
                    </div>
                </header>
                <div className="crm-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default CRMLayout;
