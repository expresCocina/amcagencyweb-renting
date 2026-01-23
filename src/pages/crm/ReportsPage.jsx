import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './ReportsPage.css';
import { FaChartLine, FaUsers, FaMoneyBillWave, FaPercentage } from 'react-icons/fa';

const ReportsPage = () => {
    const [stats, setStats] = useState({
        totalLeads: 0,
        convertedLeads: 0,
        totalSalesVolume: 0,
        potentialValue: 0,
        wonDeals: 0,
        lostDeals: 0,
    });
    const [loading, setLoading] = useState(true);
    const [monthlyData, setMonthlyData] = useState([]);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        setLoading(true);
        try {
            // Get Leads
            const { data: leads, error: leadsError } = await supabase.from('leads').select('estado');
            if (leadsError) throw leadsError;

            // Get Deals with creation date for charting
            const { data: deals, error: dealsError } = await supabase.from('deals').select('valor, etapa, created_at');
            if (dealsError) throw dealsError;

            // Calculate Metrics
            const totalLeads = leads.length;
            const convertedLeads = leads.filter(l => ['ganado', 'cliente'].includes(l.estado)).length;

            const wonDealsList = deals.filter(d => d.etapa === 'cerrado_ganado');
            const totalSalesVolume = wonDealsList.reduce((sum, d) => sum + (parseFloat(d.valor) || 0), 0);

            // New: Potential Value (Pipeline)
            const activeDealsList = deals.filter(d => !['cerrado_ganado', 'cerrado_perdido'].includes(d.etapa));
            const potentialValue = activeDealsList.reduce((sum, d) => sum + (parseFloat(d.valor) || 0), 0);

            const wonDeals = wonDealsList.length;
            const lostDeals = deals.filter(d => d.etapa === 'cerrado_perdido').length;

            // Calculate Monthly Sales (Last 5 Months)
            const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
            const currentMonth = new Date().getMonth();
            const last5Months = [];

            for (let i = 4; i >= 0; i--) {
                const d = new Date();
                d.setMonth(currentMonth - i);
                const monthIndex = d.getMonth();
                const monthYear = d.getFullYear();

                // Filter deals won in this month
                const monthlyTotal = wonDealsList
                    .filter(deal => {
                        const dealDate = new Date(deal.created_at); // Ideally should be 'closed_at', using created_at as proxy for now
                        return dealDate.getMonth() === monthIndex && dealDate.getFullYear() === monthYear;
                    })
                    .reduce((sum, deal) => sum + (parseFloat(deal.valor) || 0), 0);

                last5Months.push({
                    label: months[monthIndex],
                    value: monthlyTotal
                });
            }

            // Normalize for chart height (max value = 100%)
            const maxVal = Math.max(...last5Months.map(m => m.value), 1);
            const normalizedChartData = last5Months.map(m => ({
                ...m,
                height: `${(m.value / maxVal) * 80 + 10}%` // Min 10% height
            }));

            setStats({
                totalLeads,
                convertedLeads,
                totalSalesVolume,
                potentialValue,
                wonDeals,
                lostDeals,
            });
            setMonthlyData(normalizedChartData);

        } catch (error) {
            console.error('Error loading stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const conversionRate = stats.totalLeads ? ((stats.convertedLeads / stats.totalLeads) * 100).toFixed(1) : 0;
    const formatCurrency = (value) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);

    return (
        <div className="reports-page">
            <div className="reports-header">
                <h1>Reportes y Analítica</h1>
                <p>Visión general del rendimiento comercial</p>
            </div>

            {loading ? (
                <div className="loading-state">Calculando métricas...</div>
            ) : (
                <div className="reports-grid">
                    {/* KPI Cards */}
                    <div className="kpi-card">
                        <div className="kpi-icon bg-blue">
                            <FaUsers />
                        </div>
                        <div className="kpi-content">
                            <h3>Total Leads</h3>
                            <p className="kpi-value">{stats.totalLeads}</p>
                            <span className="kpi-sub">Potenciales clientes</span>
                        </div>
                    </div>

                    <div className="kpi-card">
                        <div className="kpi-icon bg-green">
                            <FaMoneyBillWave />
                        </div>
                        <div className="kpi-content">
                            <h3>Ventas Totales</h3>
                            <p className="kpi-value">{formatCurrency(stats.totalSalesVolume)}</p>
                            <span className="kpi-sub">Deals Ganados</span>
                        </div>
                    </div>

                    <div className="kpi-card">
                        <div className="kpi-icon bg-yellow">
                            <FaChartLine />
                        </div>
                        <div className="kpi-content">
                            <h3>Pipeline Activo</h3>
                            <p className="kpi-value">{formatCurrency(stats.potentialValue)}</p>
                            <span className="kpi-sub">Valor en negociación</span>
                        </div>
                    </div>

                    <div className="kpi-card">
                        <div className="kpi-icon bg-purple">
                            <FaPercentage />
                        </div>
                        <div className="kpi-content">
                            <h3>Conversión</h3>
                            <p className="kpi-value">{conversionRate}%</p>
                            <span className="kpi-sub">Tasa de cierre</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Real Chart */}
            <div className="charts-section">
                <div className="chart-container">
                    <h3>Rendimiento de Ventas (Últimos 5 meses)</h3>
                    {stats.totalSalesVolume === 0 && stats.potentialValue === 0 ? (
                        <div className="empty-chart-state">
                            <p>Aún no hay datos de ventas para mostrar en la gráfica</p>
                        </div>
                    ) : (
                        <>
                            <div className="fake-chart">
                                {monthlyData.map((data, index) => (
                                    <div
                                        key={index}
                                        className="bar"
                                        style={{ height: data.height }}
                                        title={formatCurrency(data.value)}
                                    ></div>
                                ))}
                            </div>
                            <div className="chart-labels">
                                {monthlyData.map((data, index) => (
                                    <span key={index}>{data.label}</span>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;
