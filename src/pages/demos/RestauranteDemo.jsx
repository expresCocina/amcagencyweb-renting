import { useState } from 'react';
import '../SharedPageStyles.css';
import '../demos/DemoPages.css';
import '../SharedPageStyles.css';

const RestauranteDemo = () => {
    const [selectedCategory, setSelectedCategory] = useState('todo');

    const menuItems = [
        { name: 'Bife de Chorizo Premium', category: 'carnes', price: '$28.000', image: '🥩' },
        { name: 'Empanadas Artesanales', category: 'entradas', price: '$12.000', image: '🥟' },
        { name: 'Provoleta Flambeada', category: 'entradas', price: '$15.000', image: '🧀' },
        { name: 'Ojo de Bife', category: 'carnes', price: '$32.000', image: '🥩' },
        { name: 'Milanesa Napolitana', category: 'especialidades', price: '$22.000', image: '🍖' },
        { name: 'Flan con Dulce de Leche', category: 'postres', price: '$9.000', image: '🍮' },
    ];

    const categories = [
        { id: 'todo', nombre: 'Todo' },
        { id: 'entradas', nombre: 'Entradas' },
        { id: 'carnes', nombre: 'Carnes' },
        { id: 'especialidades', nombre: 'Especialidades' },
        { id: 'postres', nombre: 'Postres' }
    ];

    const filteredItems = selectedCategory === 'todo'
        ? menuItems
        : menuItems.filter(item => item.category === selectedCategory);

    return (
        <div className="demo-page restaurant-demo">
            {/* Hero Section */}
            <div className="demo-header restaurant-header">
                <div className="demo-overlay"></div>
                <div className="container">
                    <div className="demo-header-content">
                        <div className="demo-logo">🍽️</div>
                        <h1>Sabor Argentino</h1>
                        <p className="demo-tagline">Auténtica Parrilla Argentina en el Corazón de Buenos Aires</p>
                        <div className="cta-buttons">
                            <button className="btn btn-primary">Reservar Mesa</button>
                            <button className="btn btn-secondary">Ver Menú</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="stats-bar">
                <div className="container">
                    <div className="stats-row">
                        <div className="stat-item">
                            <div className="stat-number">14.7K</div>
                            <div className="stat-label">Seguidores IG</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">8.2%</div>
                            <div className="stat-label">Engagement</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">66</div>
                            <div className="stat-label">Reservas/Semana</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">+180%</div>
                            <div className="stat-label">Delivery</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="demo-content">
                <div className="container">
                    {/* About Section */}
                    <section className="about-section">
                        <div className="section-grid">
                            <div className="about-content">
                                <h2>Nuestra Historia</h2>
                                <p>
                                    Desde 2015, Sabor Argentino ha sido el hogar de la auténtica parrilla argentina
                                    en Buenos Aires. Nuestro chef, maestro parrillero con 25 años de experiencia,
                                    selecciona personalmente cada corte de carne.
                                </p>
                                <p>
                                    En 2024, decidimos llevar nuestra pasión al mundo digital. Con la ayuda de AMC Agency Web,
                                    transformamos nuestra presencia online y multiplicamos nuestras reservas por 4.
                                </p>
                                <div className="features-list">
                                    <div className="feature-item">✓ Carnes Premium Angus</div>
                                    <div className="feature-item">✓ Parrilla a Leña Tradicional</div>
                                    <div className="feature-item">✓ Carta de Vinos Selectos</div>
                                    <div className="feature-item">✓ Ambiente Familiar</div>
                                </div>
                            </div>
                            <div className="about-image">
                                <div className="image-placeholder">
                                    <div style={{ fontSize: '8rem' }}>🔥</div>
                                    <p>Parrilla Tradicional</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Menu Preview */}
                    <section className="menu-section">
                        <h2>Nuestro Menú</h2>
                        <div className="menu-categories">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(cat.id)}
                                >
                                    {cat.nombre}
                                </button>
                            ))}
                        </div>
                        <div className="menu-grid">
                            {filteredItems.map((item, index) => (
                                <div key={index} className="menu-item-card">
                                    <div className="menu-item-image">{item.image}</div>
                                    <h3>{item.name}</h3>
                                    <div className="menu-item-price">{item.price}</div>
                                    <button className="btn btn-small">Agregar</button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Social Proof */}
                    <section className="social-proof-section">
                        <h2>Lo que dicen nuestros clientes</h2>
                        <div className="reviews-grid">
                            <div className="review-card">
                                <div className="review-stars">⭐⭐⭐⭐⭐</div>
                                <p>"El mejor bife de chorizo que he probado fuera de Argentina. El ambiente es cálido y auténtico."</p>
                                <cite>— María L.</cite>
                            </div>
                            <div className="review-card">
                                <div className="review-stars">⭐⭐⭐⭐⭐</div>
                                <p>"Reservé online súper fácil. La atención fue excelente y la carne, simplemente perfecta."</p>
                                <cite>— Carlos R.</cite>
                            </div>
                            <div className="review-card">
                                <div className="review-stars">⭐⭐⭐⭐⭐</div>
                                <p>"Desde que siguen en Instagram, me muero de ganas de probar cada plato. ¡Todo se ve increíble!"</p>
                                <cite>— Ana M.</cite>
                            </div>
                        </div>
                    </section>

                    {/* Results Section */}
                    <section className="results-section">
                        <h2>Resultados de la Campaña Digital</h2>
                        <div className="results-grid">
                            <div className="result-card">
                                <div className="result-icon">📱</div>
                                <h3>+425% Seguidores</h3>
                                <p>De 2.8K a 14.7K seguidores en Instagram en solo 4 meses</p>
                            </div>
                            <div className="result-card">
                                <div className="result-icon">💬</div>
                                <h3>8.2% Engagement</h3>
                                <p>Subimos de 1.3% a 8.2% con contenido gastronómico viral</p>
                            </div>
                            <div className="result-card">
                                <div className="result-icon">📅</div>
                                <h3>+340% Reservas</h3>
                                <p>De 15 a 66 reservas online por semana</p>
                            </div>
                            <div className="result-card">
                                <div className="result-icon">🚗</div>
                                <h3>+180% Delivery</h3>
                                <p>Pedidos semanales se casi triplicaron</p>
                            </div>
                        </div>

                        <div className="testimonial-box">
                            <blockquote>
                                "AMC transformó completamente nuestra presencia digital. Ahora tenemos lista de espera
                                los fines de semana y nuestro delivery no da abasto. El ROI fue de 5.8x en 4 meses."
                                <cite>— Roberto Paz, Propietario de Sabor Argentino</cite>
                            </blockquote>
                        </div>
                    </section>

                    {/* CTA Final */}
                    <section className="demo-footer-cta">
                        <h3>¿Tienes un restaurante o negocio local?</h3>
                        <p>Podemos ayudarte a multiplicar tus reservas y ventas con marketing digital efectivo</p>
                        <a href="/#contacto" className="btn btn-primary">Solicitar Auditoría Gratuita</a>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default RestauranteDemo;
