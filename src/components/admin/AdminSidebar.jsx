import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './AdminSidebar.css';

const AdminSidebar = () => {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const menuItems = [
        { path: '/admin', label: 'Dashboard', icon: '📊' },
        { path: '/admin/clientes/nuevo', label: 'Agregar Cliente', icon: '➕' },
        { path: '/admin/pagos', label: 'Pagos Pendientes', icon: '⚠️' },
        { path: '/admin/config', label: 'Configuración', icon: '⚙️' },
    ];

    const handleLinkClick = () => {
        setMobileOpen(false);
    };

    return (
        <>
            <button
                className="mobile-menu-toggle"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
            >
                {mobileOpen ? '✕' : '☰'}
            </button>

            <div
                className={`sidebar-overlay ${mobileOpen ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
            />

            <div className={`admin-sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
                <div className="sidebar-logo">
                    <h2>AMC Agency</h2>
                    <p>Admin Panel</p>
                </div>

                <nav className="sidebar-nav">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                            onClick={handleLinkClick}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span className="nav-label">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <p>WaaS Management</p>
                    <p className="version">v1.0.0</p>
                </div>
            </div>
        </>
    );
};

export default AdminSidebar;
