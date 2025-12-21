import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import KPICards from '../components/admin/KPICards';
import ClientsTable from '../components/admin/ClientsTable';
import { clientsData, calculateKPIs } from '../data/adminMockData';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const kpis = calculateKPIs();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminAuthenticated');
        localStorage.removeItem('adminLoginTime');
        navigate('/admin/login');
    };

    return (
        <div className="admin-dashboard">
            <AdminSidebar />

            <div className="admin-content">
                <div className="admin-header">
                    <div>
                        <h1>Dashboard de Administración</h1>
                        <p className="admin-subtitle">Gestión de clientes WaaS</p>
                    </div>
                    <button onClick={handleLogout} className="btn-logout">
                        🚪 Cerrar Sesión
                    </button>
                </div>

                <KPICards kpis={kpis} />

                <ClientsTable clients={clientsData} />
            </div>
        </div>
    );
};

export default AdminDashboard;
