import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ClientDashboard.css';

const ClientDashboard = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const name = localStorage.getItem('userName');

        if (!isLoggedIn) {
            navigate('/login');
        } else {
            setUserName(name || 'Usuario');
        }
    }, [navigate]);

    const handleLogout = () => {
        // Clear localStorage first
        localStorage.clear();

        // Hard redirect to login page (forces page refresh)
        window.location.href = '/login';
    };

    const projects = [
        {
            name: 'Campaña Google Ads - E-commerce',
            status: 'En Progreso',
            progress: 75,
            startDate: '01/12/2024',
            budget: '$10,000,000 COP'
        },
        {
            name: 'Rediseño Web Corporativo',
            status: 'En Revisión',
            progress: 85,
            startDate: '15/11/2024',
            budget: '$20,000,000 COP'
        }
    ];

    const invoices = [
        { id: '#INV-001', date: '01/12/2024', amount: '$1,200', status: 'Pagada' },
        { id: '#INV-002', date: '01/11/2024', amount: '$1,500', status: 'Pagada' },
        { id: '#INV-003', date: '01/01/2025', amount: '$1,200', status: 'Pendiente' }
    ];

    const reports = [
        { month: 'Diciembre 2024', type: 'Reporte Mensual', file: 'reporte-dic-2024.pdf' },
        { month: 'Noviembre 2024', type: 'Reporte Mensual', file: 'reporte-nov-2024.pdf' }
    ];

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <div className="container">
                    <div className="dashboard-header-content">
                        <div className="dashboard-welcome">
                            <h1>👋 Hola, {userName}</h1>
                            <p>Bienvenido a tu portal de cliente</p>
                        </div>
                        <button onClick={handleLogout} className="btn btn-secondary">
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="container">
                    {/* Stats Cards */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">📊</div>
                            <div className="stat-info">
                                <div className="stat-value">2</div>
                                <div className="stat-label">Proyectos Activos</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">🚀</div>
                            <div className="stat-info">
                                <div className="stat-value">5</div>
                                <div className="stat-label">Campañas en Curso</div>
                            </div>
                        </div>
                        <div className="stat-card highlight">
                            <div className="stat-icon">📈</div>
                            <div className="stat-info">
                                <div className="stat-value">+180%</div>
                                <div className="stat-label">ROI Este Mes</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">💰</div>
                            <div className="stat-info">
                                <div className="stat-value">65%</div>
                                <div className="stat-label">Presupuesto Utilizado</div>
                            </div>
                        </div>
                    </div>

                    {/* Projects Section */}
                    <section className="dashboard-section">
                        <h2>📁 Proyectos Activos</h2>
                        <div className="projects-grid">
                            {projects.map((project, index) => (
                                <div key={index} className="project-card">
                                    <div className="project-header">
                                        <h3>{project.name}</h3>
                                        <span className={`status-badge ${project.status === 'En Progreso' ? 'progress' : 'review'}`}>
                                            {project.status}
                                        </span>
                                    </div>
                                    <div className="project-details">
                                        <div className="detail-row">
                                            <span>📅 Inicio:</span>
                                            <strong>{project.startDate}</strong>
                                        </div>
                                        <div className="detail-row">
                                            <span>💵 Budget:</span>
                                            <strong>{project.budget}</strong>
                                        </div>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${project.progress}%` }}></div>
                                    </div>
                                    <div className="progress-label">{project.progress}% Completado</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Metrics Section */}
                    <section className="dashboard-section">
                        <h2>📊 Métricas Recientes</h2>
                        <div className="metrics-grid">
                            <div className="metric-chart">
                                <h3>Tráfico Web</h3>
                                <div className="chart-placeholder">
                                    <div className="chart-line">📈</div>
                                    <p>+45% vs mes anterior</p>
                                </div>
                            </div>
                            <div className="metric-chart">
                                <h3>Conversiones</h3>
                                <div className="chart-placeholder">
                                    <div className="chart-bars">📊</div>
                                    <p>+32% incremento</p>
                                </div>
                            </div>
                            <div className="metric-chart">
                                <h3>ROI por Canal</h3>
                                <div className="chart-placeholder">
                                    <div className="chart-donut">🎯</div>
                                    <p>Google Ads: 4.2x</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="dashboard-row">
                        {/* Invoices Section */}
                        <section className="dashboard-section half">
                            <h2>💳 Facturas y Pagos</h2>
                            <div className="invoices-list">
                                {invoices.map((invoice, index) => (
                                    <div key={index} className="invoice-item">
                                        <div className="invoice-info">
                                            <strong>{invoice.id}</strong>
                                            <span>{invoice.date}</span>
                                        </div>
                                        <div className="invoice-details">
                                            <span className="invoice-amount">{invoice.amount}</span>
                                            <span className={`invoice-status ${invoice.status === 'Pagada' ? 'paid' : 'pending'}`}>
                                                {invoice.status}
                                            </span>
                                        </div>
                                        <button className="btn btn-small">Descargar PDF</button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Reports Section */}
                        <section className="dashboard-section half">
                            <h2>📄 Reportes Mensuales</h2>
                            <div className="reports-list">
                                {reports.map((report, index) => (
                                    <div key={index} className="report-item">
                                        <div className="report-icon">📊</div>
                                        <div className="report-info">
                                            <strong>{report.month}</strong>
                                            <span>{report.type}</span>
                                        </div>
                                        <button className="btn btn-small">Descargar</button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Support Section */}
                    <section className="dashboard-section">
                        <h2>🎧 Soporte</h2>
                        <div className="support-card">
                            <p>¿Necesitas ayuda con tu proyecto?</p>
                            <button className="btn btn-primary">Crear Ticket de Soporte</button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
