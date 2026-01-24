import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './CRMDashboard.css';

const CRMDashboard = () => {
    const [stats, setStats] = useState({
        totalLeads: 0,
        leadsNuevos: 0,
        dealsActivos: 0,
        valorPipeline: 0,
        tareasHoy: 0,
        proyectosActivos: 0,
    });
    const [loading, setLoading] = useState(true);
    const [recentActivities, setRecentActivities] = useState([]);

    useEffect(() => {
        loadDashboardData();
    }, []);

    // Safety Net: Force stop loading after 5 seconds to prevent black screen
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const loadDashboardData = async () => {
        try {
            // Total Leads
            const { count: totalLeads } = await supabase
                .from('leads')
                .select('*', { count: 'exact', head: true });

            // Leads Nuevos (últimos 7 días)
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            const { count: leadsNuevos } = await supabase
                .from('leads')
                .select('*', { count: 'exact', head: true })
                .gte('created_at', sevenDaysAgo.toISOString());

            // Deals Activos
            const { count: dealsActivos } = await supabase
                .from('deals')
                .select('*', { count: 'exact', head: true })
                .not('etapa', 'in', '(cerrado_ganado,cerrado_perdido)');

            // Valor Pipeline
            const { data: deals } = await supabase
                .from('deals')
                .select('valor')
                .not('etapa', 'in', '(cerrado_ganado,cerrado_perdido)');
            const valorPipeline = deals?.reduce((sum, deal) => sum + (parseFloat(deal.valor) || 0), 0) || 0;

            // Tareas Pendientes (Todas)
            const { count: tareasHoy } = await supabase
                .from('tasks')
                .select('*', { count: 'exact', head: true })
                .eq('estado', 'pendiente');

            // Proyectos Activos (Corregido statuses)
            const { count: proyectosActivos } = await supabase
                .from('projects')
                .select('*', { count: 'exact', head: true })
                .in('estado', ['planificacion', 'en_progreso', 'en_revision']);

            // Recent Activities
            const { data: activities } = await supabase
                .from('activities')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(10);

            setStats({
                totalLeads: totalLeads || 0,
                leadsNuevos: leadsNuevos || 0,
                dealsActivos: dealsActivos || 0,
                valorPipeline,
                tareasHoy: tareasHoy || 0,
                proyectosActivos: proyectosActivos || 0,
            });

            setRecentActivities(activities || []);
        } catch (error) {
            console.error('Error loading dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
        }).format(value);
    };

    if (loading) {
        return (
            <div className="crm-dashboard">
                <div className="crm-loading">Cargando dashboard...</div>
            </div>
        );
    }

    return (
        <div className="crm-dashboard">
            <div className="crm-dashboard-header">
                <h1>Dashboard CRM</h1>
                <p>Resumen general de tu negocio</p>
            </div>

            <div className="crm-stats-grid">
                <div className="crm-stat-card">
                    <div className="crm-stat-icon" style={{ background: '#dbeafe' }}>
                        👥
                    </div>
                    <div className="crm-stat-content">
                        <h3>{stats.totalLeads}</h3>
                        <p>Total Leads</p>
                        <span className="crm-stat-badge success">+{stats.leadsNuevos} esta semana</span>
                    </div>
                </div>

                <div className="crm-stat-card">
                    <div className="crm-stat-icon" style={{ background: '#fef3c7' }}>
                        🎯
                    </div>
                    <div className="crm-stat-content">
                        <h3>{stats.dealsActivos}</h3>
                        <p>Deals Activos</p>
                        <span className="crm-stat-badge">{formatCurrency(stats.valorPipeline)}</span>
                    </div>
                </div>

                <div className="crm-stat-card">
                    <div className="crm-stat-icon" style={{ background: '#dcfce7' }}>
                        ✓
                    </div>
                    <div className="crm-stat-content">
                        <h3>{stats.tareasHoy}</h3>
                        <p>Tareas Pendientes</p>
                        <span className="crm-stat-badge warning">Por hacer</span>
                    </div>
                </div>

                <div className="crm-stat-card">
                    <div className="crm-stat-icon" style={{ background: '#e0e7ff' }}>
                        📁
                    </div>
                    <div className="crm-stat-content">
                        <h3>{stats.proyectosActivos}</h3>
                        <p>Proyectos Activos</p>
                        <span className="crm-stat-badge">En progreso</span>
                    </div>
                </div>
            </div>

            <div className="crm-dashboard-sections">
                <div className="crm-section">
                    <h2>Actividad Reciente</h2>
                    <div className="crm-activity-list">
                        {recentActivities.length === 0 ? (
                            <p className="crm-empty">No hay actividades recientes</p>
                        ) : (
                            recentActivities.map((activity) => (
                                <div key={activity.id} className="crm-activity-item">
                                    <div className="crm-activity-icon">{getActivityIcon(activity.tipo)}</div>
                                    <div className="crm-activity-content">
                                        <p className="crm-activity-title">{activity.titulo || activity.tipo}</p>
                                        <p className="crm-activity-desc">{activity.descripcion}</p>
                                        <span className="crm-activity-time">
                                            {new Date(activity.created_at).toLocaleString('es-CO')}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="crm-section">
                    <h2>Acciones Rápidas</h2>
                    <div className="crm-quick-actions">
                        <a href="/crm/leads?action=new" className="crm-quick-action">
                            <span>➕</span>
                            <p>Nuevo Lead</p>
                        </a>
                        <a href="/crm/pipeline?action=new" className="crm-quick-action">
                            <span>🎯</span>
                            <p>Nuevo Deal</p>
                        </a>
                        <a href="/crm/tasks?action=new" className="crm-quick-action">
                            <span>✓</span>
                            <p>Nueva Tarea</p>
                        </a>
                        <a href="/crm/projects?action=new" className="crm-quick-action">
                            <span>📁</span>
                            <p>Nuevo Proyecto</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const getActivityIcon = (tipo) => {
    const icons = {
        email: '📧',
        llamada: '📞',
        nota: '📝',
        whatsapp: '💬',
        reunion: '🤝',
        cambio_estado: '🔄',
    };
    return icons[tipo] || '📌';
};

export default CRMDashboard;
