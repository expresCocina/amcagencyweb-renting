import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './ReportsPage.css';
import { FaChartLine, FaUsers, FaMoneyBillWave, FaPercentage } from 'react-icons/fa';

const ReportsPage = () => {
    const [stats, setStats] = useState({
        totalLeads: 0,
        convertedLeads: 0,
        totalSalesVolume: 0,
        wonDeals: 0,
        lostDeals: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        setLoading(true);
        try {
            // Get Leads
            const { data: leads, error: leadsError } = await supabase
                .from('leads')
                .select('estado');

            if (leadsError) throw leadsError;

            // Get Deals
            const { data: deals, error: dealsError } = await supabase
                .from('deals')
                .select('valor, etapa');

            if (dealsError) throw dealsError;

            // Calculate Metrics
            const totalLeads = leads.length;
            const convertedLeads = leads.filter(l => ['ganado', 'cliente'].includes(l.estado)).length;

            const wonDealsList = deals.filter(d => d.etapa === 'cerrado_ganado');
            const totalSalesVolume = wonDealsList.reduce((sum, d) => sum + (d.valor || 0), 0);
            const wonDeals = wonDealsList.length;
            const lostDeals = deals.filter(d => d.etapa === 'cerrado_perdido').length;

            setStats({
                totalLeads,
                convertedLeads,
                totalSalesVolume,
                wonDeals,
                lostDeals,
            });

        } catch (error) {
            console.error('Error loading stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const conversionRate = stats.totalLeads ? ((stats.convertedLeads / stats.totalLeads) * 100).toFixed(1) : 0;

    // Formatting currency
    const formatCurrency = (value) =>
        new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);

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
                            <span className="kpi-sub">+ Nuevos este mes</span>
                        </div>
                    </div>

                    <div className="kpi-card">
                        <div className="kpi-icon bg-green">
                            <FaMoneyBillWave />
                        </div>
                        <div className="kpi-content">
                            <h3>Ventas Totales</h3>
                            <p className="kpi-value">{formatCurrency(stats.totalSalesVolume)}</p>
                            <span className="kpi-sub">Deals ganados</span>
                        </div>
                    </div>

                    <div className="kpi-card">
                        <div className="kpi-icon bg-purple">
                            <FaPercentage />
                        </div>
                        <div className="kpi-content">
                            <h3>Tasa Conversión</h3>
                            <p className="kpi-value">{conversionRate}%</p>
                            <span className="kpi-sub">Leads a Clientes</span>
                        </div>
                    </div>

                    <div className="kpi-card">
                        <div className="kpi-icon bg-orange">
                            <FaChartLine />
                        </div>
                        <div className="kpi-content">
                            <h3>Deals Ganados</h3>
                            <p className="kpi-value">{stats.wonDeals}</p>
                            <span className="kpi-sub">vs {stats.lostDeals} perdidos</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Placeholder for future Charts */}
            <div className="charts-section">
                <div className="chart-container">
                    <h3>Rendimiento de Ventas (Demo)</h3>
                    <div className="fake-chart">
                        <div className="bar" style={{ height: '40%' }}></div>
                        <div className="bar" style={{ height: '60%' }}></div>
                        <div className="bar" style={{ height: '35%' }}></div>
                        <div className="bar" style={{ height: '80%' }}></div>
                        <div className="bar" style={{ height: '55%' }}></div>
                    </div>
                    <div className="chart-labels">
                        <span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span><span>May</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;
