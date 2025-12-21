import { useState } from 'react';
import '../SharedPageStyles.css';
import '../demos/DemoPages.css';
import '../SharedPageStyles.css';

const BoutiqueDemo = () => {
    const [cart, setCart] = useState([]);

    const products = [
        { id: 1, name: 'Blazer Premium Beige', price: 189000, image: '👔', category: 'Abrigos' },
        { id: 2, name: 'Vestido Coctel Negro', price: 159000, image: '👗', category: 'Vestidos' },
        { id: 3, name: 'Blusa Seda Blanca', price: 89000, image: '👚', category: 'Blusas' },
        { id: 4, name: 'Pantalón Palazzo Camel', price: 119000, image: '👖', category: 'Pantalones' },
        { id: 5, name: 'Cartera Cuero Marrón', price: 149000, image: '👜', category: 'Accesorios' },
        { id: 6, name: 'Zapatos Tacón Nude', price: 139000, image: '👠', category: 'Calzado' }
    ];

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    return (
        <div className="demo-page boutique-demo">
            {/* Hero */}
            <div className="demo-header fashion-header">
                <div className="demo-overlay"></div>
                <div className="container">
                    <div className="demo-header-content">
                        <div className="demo-logo">👗</div>
                        <h1>Boutique Eleganza</h1>
                        <p className="demo-tagline">Moda Exclusiva para la Mujer Moderna</p>
                        <button className="btn btn-primary btn-large">Ver Nueva Colección</button>
                    </div>
                </div>
            </div>

            {/* Features Bar */}
            <div className="features-bar">
                <div className="container">
                    <div className="features-row">
                        <div className="feature-item">
                            <span className="feature-icon">🎁</span>
                            <span>Regalo en tu primera compra</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">🔄</span>
                            <span>30 días para cambios</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">📦</span>
                            <span>Empaque premium</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">💬</span>
                            <span>Asesoría personalizada</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="demo-content">
                <div className="container">
                    {/* Products Section */}
                    <section className="products-section">
                        <div className="section-header-shop">
                            <h2>Productos Destacados</h2>
                            <div className="cart-indicator">
                                🛒 {cart.length} items
                            </div>
                        </div>
                        <div className="products-grid">
                            {products.map(product => (
                                <div key={product.id} className="product-card">
                                    <div className="product-badge">NUEVO</div>
                                    <div className="product-image">{product.image}</div>
                                    <div className="product-category">{product.category}</div>
                                    <h3>{product.name}</h3>
                                    <div className="product-price">${product.price.toLocaleString('es-CL')} CLP</div>
                                    <div className="product-actions">
                                        <button
                                            className="btn btn-primary btn-small"
                                            onClick={() => addToCart(product)}
                                        >
                                            Agregar al Carrito
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* About Section */}
                    <section className="brand-section">
                        <div className="section-grid">
                            <div className="brand-content">
                                <h2>Nuestra Historia</h2>
                                <p>
                                    Desde 2018, Eleganza ha sido sinónimo de estilo y calidad en Santiago.
                                    Cada pieza es cuidadosamente seleccionada por nuestros compradores en Europa.
                                </p>
                                <p>
                                    En 2024, decidimos expandir nuestra boutique física al mundo digital.
                                    Con AMC Agency Web, creamos una experiencia de compra online que refleja
                                    la misma elegancia y exclusividad de nuestra tienda.
                                </p>
                            </div>
                            <div className="brand-values">
                                <div className="value-item">
                                    <span className="value-icon">✓</span>
                                    <span>Calidad Premium</span>
                                </div>
                                <div className="value-item">
                                    <span className="value-icon">✓</span>
                                    <span>Diseños Exclusivos</span>
                                </div>
                                <div className="value-item">
                                    <span className="value-icon">✓</span>
                                    <span>Atención Personalizada</span>
                                </div>
                                <div className="value-item">
                                    <span className="value-icon">✓</span>
                                    <span>Envíos Seguros</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Results */}
                    <section className="results-section">
                        <h2>Resultados del Proyecto Digital</h2>
                        <div className="metrics-cards">
                            <div className="metric-card highlight">
                                <div className="metric-value">+520%</div>
                                <div className="metric-label">Ventas Online</div>
                                <div className="metric-desc">$8K → $49.6K/mes</div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-value">4.8x</div>
                                <div className="metric-label">ROAS</div>
                                <div className="metric-desc">Retorno en ads</div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-value">5.7%</div>
                                <div className="metric-label">Conversión</div>
                                <div className="metric-desc">Antes: 2.1%</div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-value">+45%</div>
                                <div className="metric-label">Ticket</div>
                                <div className="metric-desc">Valor promedio</div>
                            </div>
                        </div>

                        <div className="strategy-section">
                            <h3>Estrategia Implementada</h3>
                            <div className="strategy-grid">
                                <div className="strategy-card">
                                    <div className="strategy-icon">🎨</div>
                                    <h4>Branding Digital</h4>
                                    <p>Identidad visual premium que refleja la exclusividad de la boutique</p>
                                </div>
                                <div className="strategy-card">
                                    <div className="strategy-icon">🛒</div>
                                    <h4>E-commerce Optimizado</h4>
                                    <p>Checkout fluido que aumentó conversión de 2.1% a 5.7%</p>
                                </div>
                                <div className="strategy-card">
                                    <div className="strategy-icon">📱</div>
                                    <h4>Instagram + Facebook Ads</h4>
                                    <p>Campañas con segmentación precisa logrando ROAS de 4.8x</p>
                                </div>
                                <div className="strategy-card">
                                    <div className="strategy-icon">📧</div>
                                    <h4>Email Marketing</h4>
                                    <p>Automatizaciones que recuperan carritos y fidelizan clientes</p>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-box">
                            <blockquote>
                                "Nuestras ventas online se multiplicaron por 6 en solo 5 meses. El e-commerce que
                                crearon es hermoso y convierte increíble. ROI de 6.8x - totalmente rentable."
                                <cite>— Valentina Torres, Owner de Boutique Eleganza</cite>
                            </blockquote>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="demo-footer-cta">
                        <h3>¿Tienes una tienda de moda o retail?</h3>
                        <p>Creamos e-commerce que convierten visitantes en clientes</p>
                        <a href="/#contacto" className="btn btn-primary">Solicitar Demo Personalizada</a>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default BoutiqueDemo;
