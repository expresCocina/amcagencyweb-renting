import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import KPICards from '../components/admin/KPICards';
import ClientsTable from '../components/admin/ClientsTable';
import { supabase } from '../supabaseClient';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [clients, setClients] = useState([]);
    const [kpis, setKPIs] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch clients from Supabase
    const fetchClients = async () => {
        try {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from('clients')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            setClients(data || []);
            calculateKPIs(data || []);
        } catch (err) {
            console.error('Error fetching clients:', err);
            setError('Error al cargar los clientes. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    // Calculate KPIs from clients data
    const calculateKPIs = (clientsData) => {
        const activeClients = clientsData.filter(c => c.status === 'active').length;
        const overduePayments = clientsData.filter(c => c.status === 'pending').length;
        const mrr = clientsData
            .filter(c => c.status === 'active')
            .reduce((sum, c) => sum + (parseInt(c.plan) || 0), 0);
        const retentionRate = clientsData.length > 0
            ? ((activeClients / clientsData.length) * 100).toFixed(1)
            : 0;

        setKPIs({
            mrr,
            activeClients,
            overduePayments,
            retentionRate,
            totalClients: clientsData.length,
        });
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            navigate('/admin/login');
        } catch (err) {
            console.error('Error logging out:', err);
        }
    };

    if (loading) {
        return (
            <div className="admin-dashboard">
                <AdminSidebar />
                <div className="admin-content">
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Cargando datos...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-dashboard">
                <AdminSidebar />
                <div className="admin-content">
                    <div className="error-container">
                        <p className="error-message">⚠️ {error}</p>
                        <button onClick={fetchClients} className="btn-retry">
                            Reintentar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <AdminSidebar />

            <div className="admin-content">
                <div className="admin-header">
                    <div>
                        <h1>Dashboard de Administración</h1>
                        <p className="admin-subtitle">AMC Agency & Vida Digital CO - Gestión de clientes WaaS</p>
                    </div>
                    <div className="header-actions">
                        <button
                            onClick={() => navigate('/crm')}
                            className="btn-crm-access"
                        >
                            🚀 Ir al CRM
                        </button>
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

                <ClientsTable clients={clients} onUpdate={fetchClients} />
            </div>
        </div>
    );
};

export default AdminDashboard;
