import './KPICards.css';

const KPICards = ({ kpis }) => {
    const cards = [
        {
            title: 'Ingreso Mensual Recurrente',
            value: `$${kpis.mrr.toLocaleString('es-CO')}`,
            subtitle: 'COP/mes',
            icon: '💰',
            color: 'green',
        },
        {
            title: 'Clientes Activos',
            value: kpis.activeClients,
            subtitle: 'suscripciones',
            icon: '👥',
            color: 'blue',
        },
        {
            title: 'Pagos Atrasados',
            value: kpis.overduePayments,
            subtitle: 'clientes en mora',
            icon: '⚠️',
            color: 'red',
        },
        {
            title: 'Tasa de Retención',
            value: `${kpis.retentionRate}%`,
            subtitle: 'clientes activos',
            icon: '📈',
            color: 'purple',
        },
    ];

    return (
        <div className="kpi-cards-grid">
            {cards.map((card, index) => (
                <div key={index} className={`kpi-card kpi-${card.color}`}>
                    <div className="kpi-header">
                        <span className="kpi-icon">{card.icon}</span>
                        <h3 className="kpi-title">{card.title}</h3>
                    </div>
                    <div className="kpi-value">{card.value}</div>
                    <div className="kpi-subtitle">{card.subtitle}</div>
                </div>
            ))}
        </div>
    );
};

export default KPICards;
