import { useState } from 'react';
import '../SharedPageStyles.css';
import { Link } from 'react-router-dom';
import '../SharedPageStyles.css';
import './DemoPages.css';
import '../SharedPageStyles.css';

const InmobiliariaDemo = () => {
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [showContactForm, setShowContactForm] = useState(false);
    const [filters, setFilters] = useState({
        type: 'all',
        priceMax: 1000000000,
        city: 'all',
        bedrooms: 'all'
    });

    const properties = [
        {
            id: 1,
            title: 'Penthouse Vista Panorámica',
            type: 'departamento',
            price: 850000000,
            city: 'Polanco, CDMX',
            bedrooms: 3,
            bathrooms: 2.5,
            area: 180,
            description: 'Espectacular penthouse con terraza privada y vistas de 360°. Acabados de lujo, cocina italiana.',
            emoji: '🏢',
            features: ['Gimnasio', 'Alberca', 'Seguridad 24/7', 'Estacionamiento'],
            status: 'Venta'
        },
        {
            id: 2,
            title: 'Casa Moderna Residencial',
            type: 'casa',
            price: 4500000,
            city: 'Guadalajara',
            bedrooms: 4,
            bathrooms: 3,
            area: 280,
            description: 'Residencia contemporánea en privada exclusiva. Jardín amplio, alberca, y casa club.',
            emoji: '🏡',
            features: ['Alberca privada', 'Jardín', 'Casa club', '3 estacionamientos'],
            status: 'Venta'
        },
        {
            id: 3,
            title: 'Oficina Corporativa Santa Fe',
            type: 'oficina',
            price: 35000,
            city: 'Santa Fe, CDMX',
            bedrooms: 0,
            bathrooms: 2,
            area: 120,
            description: 'Moderna oficina en edificio AAA. Ideal para empresas tech. Piso completo disponible.',
            emoji: '🏢',
            features: ['Recepción', 'Sala juntas', 'Internet fibra óptica', 'Acceso controlado'],
            status: 'Renta mensual'
        },
        {
            id: 4,
            title: 'Departamento Céntrico Amueblado',
            type: 'departamento',
            price: 25000,
            city: 'Roma Norte, CDMX',
            bedrooms: 2,
            bathrooms: 1,
            area: 85,
            description: 'Totalmente equipado y amueblado. Ubicación privilegiada, a pasos del metro.',
            emoji: '🏠',
            features: ['Amueblado', 'Balcón', 'Pet friendly', 'Cerca metro'],
            status: 'Renta mensual'
        },
        {
            id: 5,
            title: 'Terreno Residencial Premium',
            type: 'terreno',
            price: 3200000,
            city: 'Valle Real, Zapopan',
            bedrooms: 0,
            bathrooms: 0,
            area: 500,
            description: 'Terreno plano en exclusivo fraccionamiento. Todos los servicios. Listo para construir.',
            emoji: '🏞️',
            features: ['Forma regular', 'Todos servicios', 'Seguridad 24/7', 'Área verde'],
            status: 'Venta'
        },
        {
            id: 6,
            title: 'Loft Industrial Condesa',
            type: 'departamento',
            price: 28000,
            city: 'Condesa, CDMX',
            bedrooms: 1,
            bathrooms: 1,
            area: 75,
            description: 'Estilo industrial moderno, techos altos, ventanales amplios. Zona hipster.',
            emoji: '🏭',
            features: ['Techos altos', 'Amueblado', 'Roof garden', 'Cocina equipada'],
            status: 'Renta mensual'
        }
    ];

    const filteredProperties = properties.filter(prop => {
        if (filters.type !== 'all' && prop.type !== filters.type) return false;
        if (prop.price > filters.priceMax) return false;
        if (filters.city !== 'all' && !prop.city.includes(filters.city)) return false;
        if (filters.bedrooms !== 'all' && prop.bedrooms !== parseInt(filters.bedrooms)) return false;
        return true;
    });

    const handleContactSubmit = (e) => {
        e.preventDefault();
        alert('¡Gracias! Un asesor se pondrá en contacto contigo pronto.');
        setShowContactForm(false);
    };

    return (
        <div className="demo-page">
            <div className="demo-banner">
                🎨 <strong>DEMO:</strong> Este es un ejemplo del trabajo realizado para Inmobiliaria Horizonte.
                <Link to="/casos"> Ver caso de éxito completo</Link>
            </div>

            <section className="demo-hero" style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))'
            }}>
                <div className="container">
                    <h1>🏢 Inmobiliaria Horizonte</h1>
                    <p>Tu próximo hogar u oficina te está esperando</p>
                    <div style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <div className="badge info">✅ +500 propiedades</div>
                        <div className="badge info">🏆 15 años de experiencia</div>
                        <div className="badge info">💼 Asesoría personalizada</div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="filters">
                        <div className="filter-group">
                            <label>Tipo de propiedad</label>
                            <select
                                value={filters.type}
                                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                            >
                                <option value="all">Todos</option>
                                <option value="casa">Casas</option>
                                <option value="departamento">Departamentos</option>
                                <option value="oficina">Oficinas</option>
                                <option value="terreno">Terrenos</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Ciudad</label>
                            <select
                                value={filters.city}
                                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                            >
                                <option value="all">Todas</option>
                                <option value="CDMX">CDMX</option>
                                <option value="Guadalajara">Guadalajara</option>
                                <option value="Zapopan">Zapopan</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Recámaras</label>
                            <select
                                value={filters.bedrooms}
                                onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                            >
                                <option value="all">Cualquiera</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4+</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Precio máximo</label>
                            <select
                                value={filters.priceMax}
                                onChange={(e) => setFilters({ ...filters, priceMax: parseInt(e.target.value) })}
                            >
                                <option value="1000000000">Sin límite</option>
                                <option value="30000">$30,000 MXN</option>
                                <option value="50000">$50,000 MXN</option>
                                <option value="5000000">$5,000,000 MXN</option>
                                <option value="10000000">$10,000,000 MXN</option>
                            </select>
                        </div>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                        Mostrando {filteredProperties.length} propiedad{filteredProperties.length !== 1 ? 'es' : ''}
                    </p>

                    <div className="items-grid">
                        {filteredProperties.map(property => (
                            <div
                                key={property.id}
                                className="item-card"
                                onClick={() => setSelectedProperty(property)}
                            >
                                <div className="item-image" style={{
                                    background: 'linear-gradient(135deg, #3b82f6, #9333ea)'
                                }}>
                                    <span style={{ fontSize: '5rem' }}>{property.emoji}</span>
                                </div>
                                <div className="item-content">
                                    <div style={{
                                        display: 'inline-block',
                                        padding: '4px 10px',
                                        background: 'rgba(59, 130, 246, 0.1)',
                                        borderRadius: '6px',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        color: '#3b82f6',
                                        marginBottom: '8px'
                                    }}>
                                        {property.status}
                                    </div>
                                    <div className="item-title">{property.title}</div>
                                    <div className="item-description">{property.description}</div>
                                    <div className="item-meta">
                                        <span>📍 {property.city}</span>
                                        {property.bedrooms > 0 && <span>🛏️ {property.bedrooms}</span>}
                                        {property.bathrooms > 0 && <span>🚿 {property.bathrooms}</span>}
                                        <span>📐 {property.area}m²</span>
                                    </div>
                                    <div className="item-price">
                                        ${property.price.toLocaleString('es-MX')} MXN
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                        style={{ width: '100%' }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedProperty(property);
                                            setShowContactForm(true);
                                        }}
                                    >
                                        Solicitar información
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Property Detail Modal */}
            {selectedProperty && !showContactForm && (
                <div className="demo-modal" onClick={() => setSelectedProperty(null)}>
                    <div className="demo-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedProperty(null)}>
                            ×
                        </button>
                        <div className="item-image" style={{
                            background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
                            height: '300px',
                            borderRadius: '0'
                        }}>
                            <span style={{ fontSize: '8rem' }}>{selectedProperty.emoji}</span>
                        </div>
                        <div className="modal-body">
                            <div style={{
                                display: 'inline-block',
                                padding: '6px 14px',
                                background: 'rgba(59, 130, 246, 0.1)',
                                borderRadius: '8px',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                color: '#3b82f6',
                                marginBottom: '16px'
                            }}>
                                {selectedProperty.status}
                            </div>
                            <h2>{selectedProperty.title}</h2>
                            <div className="item-meta" style={{ fontSize: '1rem', marginTop: '16px' }}>
                                <span>📍 {selectedProperty.city}</span>
                                {selectedProperty.bedrooms > 0 && <span>🛏️ {selectedProperty.bedrooms} recámaras</span>}
                                {selectedProperty.bathrooms > 0 && <span>🚿 {selectedProperty.bathrooms} baños</span>}
                                <span>📐 {selectedProperty.area}m²</span>
                            </div>
                            <p style={{ fontSize: '1.1rem', marginTop: '20px', color: 'var(--text-secondary)' }}>
                                {selectedProperty.description}
                            </p>
                            <div style={{ marginTop: '24px' }}>
                                <strong style={{ display: 'block', marginBottom: '12px' }}>Características:</strong>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    {selectedProperty.features.map((feature, idx) => (
                                        <span key={idx} className="badge info">✓ {feature}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="item-price" style={{ fontSize: '2rem', margin: '24px 0' }}>
                                ${selectedProperty.price.toLocaleString('es-MX')} MXN
                            </div>
                            <button
                                className="btn btn-primary"
                                style={{ width: '100%', padding: '16px' }}
                                onClick={() => setShowContactForm(true)}
                            >
                                Me interesa esta propiedad
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Contact Form Modal */}
            {showContactForm && selectedProperty && (
                <div className="demo-modal" onClick={() => setShowContactForm(false)}>
                    <div className="demo-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowContactForm(false)}>
                            ×
                        </button>
                        <div className="modal-body">
                            <h2>Solicitar información</h2>
                            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                                {selectedProperty.title}
                            </p>
                            <form className="demo-form" onSubmit={handleContactSubmit} style={{ marginTop: '30px' }}>
                                <div className="form-group">
                                    <label>Nombre completo *</label>
                                    <input type="text" required placeholder="Juan Pérez" />
                                </div>
                                <div className="form-group">
                                    <label>Email *</label>
                                    <input type="email" required placeholder="tu@email.com" />
                                </div>
                                <div className="form-group">
                                    <label>Teléfono *</label>
                                    <input type="tel" required placeholder="+52 55 1234 5678" />
                                </div>
                                <div className="form-group">
                                    <label>¿Cuándo te gustaría agendar una visita?</label>
                                    <select>
                                        <option>Esta semana</option>
                                        <option>Próxima semana</option>
                                        <option>En 2 semanas</option>
                                        <option>Solo información por ahora</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Mensaje (opcional)</label>
                                    <textarea placeholder="Cuéntanos más sobre lo que buscas..."></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>
                                    Enviar solicitud
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InmobiliariaDemo;
