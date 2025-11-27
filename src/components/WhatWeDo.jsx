import './WhatWeDo.css';

const WhatWeDo = () => {
    const pillars = [
        {
            icon: '📈',
            title: 'Tráfico que convierte',
            description: 'SEO técnico + contenido estratégico = más clientes calificados desde Google'
        },
        {
            icon: '🌐',
            title: 'Sitios que venden',
            description: 'Desarrollo web optimizado para conversión, no solo para verse bien'
        },
        {
            icon: '⚙️',
            title: 'Automatización inteligente',
            description: 'Embudos y bots que trabajan mientras duermes'
        }
    ];

    return (
        <section className="section what-we-do" id="sobre-nosotros">
            <div className="container">
                <div className="section-header text-center">
                    <h2>Resultados medibles, no promesas vacías</h2>
                    <p className="mt-3">
                        En AMC Agency Web transformamos negocios tradicionales en sistemas digitales que venden 24/7.
                        Combinamos tecnología, estrategia y datos para generar más leads, más ventas y más crecimiento.
                    </p>
                </div>

                <div className="grid grid-3 mt-5">
                    {pillars.map((pillar, index) => (
                        <div key={index} className="card pillar-card">
                            <div className="pillar-icon">{pillar.icon}</div>
                            <h3>{pillar.title}</h3>
                            <p className="mt-2">{pillar.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatWeDo;
