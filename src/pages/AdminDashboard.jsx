import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import KPICards from '../components/admin/KPICards';
import ClientsTable from '../components/admin/ClientsTable';
import { getClients, calculateKPIs, initializeData } from '../data/adminMockData';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [clients, setClients] = useState([]);
    const [kpis, setKPIs] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Initialize data on first load
        initializeData();
        loadData();
    }, []);

    const loadData = () => {
        const clientsData = getClients();
        const kpisData = calculateKPIs();
        setClients(clientsData);
        setKPIs(kpisData);
    };

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
                    <div className="header-actions">
                        <button
                            onClick={() => navigate('/admin/clientes/nuevo')}
                            className="btn-add-client"
                        >
                            ➕ Agregar Cliente
                        </button>
                        <button onClick={handleLogout} className="btn-logout">
                            🚪 Cerrar Sesión
                        </button>
                    </div>
                </div>

                <KPICards kpis={kpis} />

                <ClientsTable clients={clients} onUpdate={loadData} />
            </div>
        </div>
    );
};

export default AdminDashboard;
