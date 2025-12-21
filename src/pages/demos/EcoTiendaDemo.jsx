import { useState } from 'react';
import '../SharedPageStyles.css';
import { Link } from 'react-router-dom';
import '../SharedPageStyles.css';
import './DemoPages.css';
import '../SharedPageStyles.css';

const EcoTiendaDemo = () => {
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const products = [
        {
            id: 1,
            name: 'Bolsa Reutilizable Premium',
            category: 'bolsas',
            price: 25000,
            description: 'Bolsa de tela orgánica certificada, ideal para compras diarias. Resistente y lavable.',
            emoji: '🛍️',
            eco: 'Ahorra 500+ bolsas plásticas al año'
        },
        {
            id: 2,
            name: 'Botella Térmica Acero',
            category: 'botellas',
            price: 45000,
            description: 'Mantiene bebidas frías 24h o calientes 12h. Acero inoxidable de grado alimenticio.',
            emoji: '🍶',
            eco: 'Evita 150+ botellas plásticas al año'
        },
        {
            id: 3,
            name: 'Set Cubiertos Bambú',
            category: 'utensilios',
            price: 18000,
            description: 'Set completo con tenedor, cuchara, cuchillo y pajita. Incluye estuche de tela.',
            emoji: '🍴',
            eco: '100% biodegradable'
        },
        {
            id: 4,
            name: 'Cepillo Dental Bambú',
            category: 'higiene',
            price: 8000,
            description: 'Cerdas suaves de carbón activado. Mango de bambú sostenible.',
            emoji: '🪥',
            eco: 'Compostable al 100%'
        },
        {
            id: 5,
            name: 'Wrap Reutilizable Cera',
            category: 'cocina',
            price: 15000,
            description: 'Alternativa ecológica al plástico. Cera de abeja orgánica.',
            emoji: '🧈',
            eco: 'Reemplaza 200m de film plástico'
        },
        {
            id: 6,
            name: 'Jabón Artesanal Natural',
            category: 'higiene',
            price: 12000,
            description: 'Jabón vegano de aceites esenciales. Sin químicos ni parabenos.',
            emoji: '🧼',
            eco: 'Sin envases plásticos'
        },
        {
            id: 7,
            name: 'Taza Bambú con Tapa',
            category: 'botellas',
            price: 32000,
            description: 'Para café o té. Fibra de bambú y silicona. A prueba de fugas.',
            emoji: '☕',
            eco: 'Reemplaza vasos desechables'
        },
        {
            id: 8,
            name: 'Bolsas Malla Vegetales',
            category: 'bolsas',
            price: 20000,
            description: 'Set de 3 bolsas de malla orgánica. Perfectas para frutas y verduras.',
            emoji: '🥬',
            eco: 'Lavables y duraderas'
        }
    ];

    const categories = [
        { value: 'all', label: 'Todos los productos' },
        { value: 'bolsas', label: 'Bolsas' },
        { value: 'botellas', label: 'Botellas' },
        { value: 'utensilios', label: 'Utensilios' },
        { value: 'cocina', label: 'Cocina' },
        { value: 'higiene', label: 'Higiene' }
    ];

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    const getTotalPrice = () => {
        return cart.reduce((sum, item) => sum + item.price, 0);
    };

    return (
        <div className="demo-page" style={{
            '--demo-primary': '#22c55e',
            '--demo-secondary': '#10b981'
        }}>
            <div className="demo-banner">
                🎨 <strong>DEMO:</strong> Este es un ejemplo del trabajo realizado para EcoTienda Online.
                <Link to="/casos"> Ver caso de éxito completo</Link>
            </div>

            <section className="demo-hero" style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1))'
            }}>
                <div className="container">
                    <h1>🌿 EcoTienda Online</h1>
                    <p>Productos sostenibles para un planeta más verde</p>
                    <div style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <div className="badge success">✅ Envío gratis en compras +$50.000</div>
                        <div className="badge success">🌱 100% productos sostenibles</div>
                        <div className="badge success">♻️ Empaques biodegradables</div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="filters">
                        <div className="filter-group">
                            <label>Categoría</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {categories.map(cat => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'flex-end',
                            color: 'var(--text-secondary)',
                            fontSize: '0.95rem'
                        }}>
                            Mostrando {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
                        </div>
                    </div>

                    <div className="items-grid">
                        {filteredProducts.map(product => (
                            <div
                                key={product.id}
                                className="item-card"
                                onClick={() => setSelectedProduct(product)}
                            >
                                <div className="item-image" style={{
                                    background: 'linear-gradient(135deg, #22c55e, #10b981)'
                                }}>
                                    <span style={{ fontSize: '5rem' }}>{product.emoji}</span>
                                </div>
                                <div className="item-content">
                                    <div className="item-title">{product.name}</div>
                                    <div className="item-description">{product.description}</div>
                                    <div style={{
                                        padding: '8px 12px',
                                        background: 'rgba(34, 197, 94, 0.1)',
                                        borderRadius: '8px',
                                        fontSize: '0.85rem',
                                        color: '#22c55e',
                                        marginBottom: '12px',
                                        fontWeight: 600
                                    }}>
                                        🌍 {product.eco}
                                    </div>
                                    <div className="item-price">
                                        ${product.price.toLocaleString('es-CO')} COP
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                        style={{
                                            width: '100%',
                                            background: 'linear-gradient(135deg, #22c55e, #10b981)'
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addToCart(product);
                                        }}
                                    >
                                        Agregar al carrito
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product Modal */}
            {selectedProduct && (
                <div className="demo-modal" onClick={() => setSelectedProduct(null)}>
                    <div className="demo-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedProduct(null)}>
                            ×
                        </button>
                        <div className="item-image" style={{
                            background: 'linear-gradient(135deg, #22c55e, #10b981)',
                            height: '300px',
                            borderRadius: '0'
                        }}>
                            <span style={{ fontSize: '8rem' }}>{selectedProduct.emoji}</span>
                        </div>
                        <div className="modal-body">
                            <h2>{selectedProduct.name}</h2>
                            <p style={{ fontSize: '1.1rem', marginTop: '16px', color: 'var(--text-secondary)' }}>
                                {selectedProduct.description}
                            </p>
                            <div style={{
                                padding: '16px',
                                background: 'rgba(34, 197, 94, 0.1)',
                                borderRadius: '12px',
                                margin: '20px 0',
                                borderLeft: '4px solid #22c55e'
                            }}>
                                <strong style={{ color: '#22c55e' }}>🌍 Impacto ecológico:</strong>
                                <p style={{ marginTop: '8px' }}>{selectedProduct.eco}</p>
                            </div>
                            <div className="item-price" style={{ fontSize: '2rem', margin: '20px 0' }}>
                                ${selectedProduct.price.toLocaleString('es-CO')} COP
                            </div>
                            <button
                                className="btn btn-primary"
                                style={{
                                    width: '100%',
                                    background: 'linear-gradient(135deg, #22c55e, #10b981)',
                                    padding: '16px'
                                }}
                                onClick={() => {
                                    addToCart(selectedProduct);
                                    setSelectedProduct(null);
                                }}
                            >
                                Agregar al carrito
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cart Modal */}
            {showCart && (
                <div className="demo-modal" onClick={() => setShowCart(false)}>
                    <div className="demo-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowCart(false)}>
                            ×
                        </button>
                        <div className="modal-body">
                            <h2>🛒 Carrito de compras</h2>
                            {cart.length === 0 ? (
                                <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                                    Tu carrito está vacío
                                </p>
                            ) : (
                                <>
                                    <div style={{ marginTop: '30px' }}>
                                        {cart.map((item, index) => (
                                            <div key={index} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '16px',
                                                padding: '16px',
                                                background: 'var(--bg-primary)',
                                                borderRadius: '12px',
                                                marginBottom: '12px'
                                            }}>
                                                <span style={{ fontSize: '2rem' }}>{item.emoji}</span>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                                        ${item.price.toLocaleString('es-CO')} COP
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(index)}
                                                    style={{
                                                        background: 'rgba(239, 68, 68, 0.1)',
                                                        border: 'none',
                                                        padding: '8px 16px',
                                                        borderRadius: '8px',
                                                        color: '#ef4444',
                                                        cursor: 'pointer',
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{
                                        marginTop: '30px',
                                        padding: '24px',
                                        background: 'rgba(34, 197, 94, 0.1)',
                                        borderRadius: '12px'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                            <span>Subtotal:</span>
                                            <strong>${getTotalPrice().toLocaleString('es-CO')} COP</strong>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                            <span>Envío:</span>
                                            <strong>{getTotalPrice() >= 50000 ? 'GRATIS 🎉' : '$8.000 COP'}</strong>
                                        </div>
                                        <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)' }} />
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem' }}>
                                            <strong>Total:</strong>
                                            <strong style={{ color: '#22c55e' }}>
                                                ${(getTotalPrice() + (getTotalPrice() >= 50000 ? 0 : 8000)).toLocaleString('es-CO')} COP
                                            </strong>
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                        style={{
                                            width: '100%',
                                            marginTop: '20px',
                                            background: 'linear-gradient(135deg, #22c55e, #10b981)',
                                            padding: '16px'
                                        }}
                                    >
                                        Proceder al pago 🔒
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Cart Badge */}
            {cart.length > 0 && (
                <div
                    className="cart-badge"
                    style={{ background: 'linear-gradient(135deg, #22c55e, #10b981)' }}
                    onClick={() => setShowCart(true)}
                >
                    🛒
                    <span className="cart-count">{cart.length}</span>
                </div>
            )}
        </div>
    );
};

export default EcoTiendaDemo;
