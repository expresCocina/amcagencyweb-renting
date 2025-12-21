import AdminSidebar from '../../components/admin/AdminSidebar';
import KPICards from '../../components/admin/KPICards';
import ClientsTable from '../../components/admin/ClientsTable';
import { clientsData, calculateKPIs } from '../../data/adminMockData';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const kpis = calculateKPIs();

    return (
        <div className="admin-dashboard">
            <AdminSidebar />

            <div className="admin-content">
                <div className="admin-header">
                    <h1>Dashboard de Administración</h1>
                    <p className="admin-subtitle">Gestión de clientes WaaS</p>
                </div>

                <KPICards kpis={kpis} />

                <ClientsTable clients={clientsData} />
            </div>
        </div>
    );
};

export default AdminDashboard;
