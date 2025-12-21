import { Link, useLocation } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/admin', label: 'Dashboard', icon: '📊' },
        { path: '/admin/clientes', label: 'Clientes', icon: '👥' },
        { path: '/admin/pagos', label: 'Pagos Pendientes', icon: '⚠️' },
        { path: '/admin/config', label: 'Configuración', icon: '⚙️' },
    ];

    return (
        <div className="admin-sidebar">
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
    );
};

export default AdminSidebar;
