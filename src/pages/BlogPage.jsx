import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SharedPageStyles.css';
import './BlogPage.css';

const BlogPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const articles = [
        {
            id: 1,
            title: '10 Estrategias SEO que Dominarán en 2024',
            excerpt: 'Descubre las últimas tendencias en SEO y cómo implementarlas para posicionar tu sitio web en los primeros lugares de Google.',
            category: 'seo',
            author: 'Ana Rodríguez',
            date: '2024-01-15',
            readTime: '8 min',
            image: '📊',
            slug: 'estrategias-seo-2024'
        },
        {
            id: 2,
            title: 'Cómo Aumentar Conversiones en tu E-commerce un 300%',
            excerpt: 'Técnicas probadas de optimización de conversiones que han transformado tiendas online en máquinas de ventas.',
            category: 'ecommerce',
            author: 'Carlos Mendoza',
            date: '2024-01-10',
            readTime: '12 min',
            image: '🛒',
            slug: 'aumentar-conversiones-ecommerce'
        },
        {
            id: 3,
            title: 'Guía Completa de Google Ads para Principiantes',
            excerpt: 'Todo lo que necesitas saber para crear campañas efectivas de Google Ads y maximizar tu ROI desde el primer día.',
            category: 'marketing',
            author: 'Roberto Pérez',
            date: '2024-01-05',
            readTime: '15 min',
            image: '🎯',
            slug: 'guia-google-ads'
        },
        {
            id: 4,
            title: 'Marketing en Redes Sociales: Best Practices 2024',
            excerpt: 'Las estrategias más efectivas para destacar en Instagram, Facebook, TikTok y LinkedIn este año.',
            category: 'social',
            author: 'Laura Martínez',
            date: '2024-01-01',
            readTime: '10 min',
            image: '📱',
            slug: 'marketing-redes-sociales'
        },
        {
            id: 5,
            title: 'Desarrollo Web: React vs Next.js en 2024',
            excerpt: 'Comparativa detallada de las dos tecnologías más populares para desarrollo web moderno.',
            category: 'desarrollo',
            author: 'Diego Silva',
            date: '2023-12-28',
            readTime: '11 min',
            image: '💻',
            slug: 'react-vs-nextjs'
        },
        {
            id: 6,
            title: 'Email Marketing: Cómo Escribir Asuntos que Convierten',
            excerpt: 'Fórmulas comprobadas para crear líneas de asunto que aumentan tus tasas de apertura hasta un 50%.',
            category: 'marketing',
            author: 'María González',
            date: '2023-12-20',
            readTime: '7 min',
            image: '✉️',
            slug: 'email-marketing-asuntos'
        },
        {
            id: 7,
            title: 'SEO Local: Domina Google Maps y Atrae Clientes Cercanos',
            excerpt: 'Estrategias para aparecer en el primer lugar de búsquedas locales y atraer clientes de tu zona.',
            category: 'seo',
            author: 'Ana Rodríguez',
            date: '2023-12-15',
            readTime: '9 min',
            image: '📍',
            slug: 'seo-local-google-maps'
        },
        {
            id: 8,
            title: 'Analytics 4: Guía para Entender tus Métricas',
            excerpt: 'Aprende a interpretar los datos de Google Analytics 4 y tomar decisiones basadas en información real.',
            category: 'analytics',
            author: 'Javier Torres',
            date: '2023-12-10',
            readTime: '14 min',
            image: '📈',
            slug: 'guia-google-analytics-4'
        }
    ];

    const categories = [
        { value: 'all', label: 'Todos los artículos', count: articles.length },
        { value: 'seo', label: 'SEO', count: articles.filter(a => a.category === 'seo').length },
        { value: 'marketing', label: 'Marketing Digital', count: articles.filter(a => a.category === 'marketing').length },
        { value: 'ecommerce', label: 'E-commerce', count: articles.filter(a => a.category === 'ecommerce').length },
        { value: 'desarrollo', label: 'Desarrollo Web', count: articles.filter(a => a.category === 'desarrollo').length },
        { value: 'social', label: 'Redes Sociales', count: articles.filter(a => a.category === 'social').length },
        { value: 'analytics', label: 'Analytics', count: articles.filter(a => a.category === 'analytics').length }
    ];

    const filteredArticles = articles.filter(article => {
        const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="page blog-page">
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-content">
                        <h1>Blog de <span className="gradient-text">Marketing Digital</span></h1>
                        <p className="page-subtitle">
                            Insights, estrategias y tendencias del mundo digital
                        </p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="blog-controls">
                        <div className="blog-search">
                            <input
                                type="text"
                                placeholder="Buscar artículos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                            <span className="search-icon">🔍</span>
                        </div>

                        <div className="blog-categories">
                            {categories.map(cat => (
                                <button
                                    key={cat.value}
                                    className={`category-btn ${selectedCategory === cat.value ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(cat.value)}
                                >
                                    {cat.label} ({cat.count})
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="blog-grid">
                        {filteredArticles.map(article => (
                            <Link to={`/blog/${article.slug}`} key={article.id} className="blog-card">
                                <div className="blog-image">
                                    <span className="blog-emoji">{article.image}</span>
                                    <div className="blog-category-badge">{categories.find(c => c.value === article.category)?.label}</div>
                                </div>
                                <div className="blog-content">
                                    <h3>{article.title}</h3>
                                    <p>{article.excerpt}</p>
                                    <div className="blog-meta">
                                        <span>👤 {article.author}</span>
                                        <span>📅 {new Date(article.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        <span>⏱️ {article.readTime}</span>
                                    </div>
                                    <div className="blog-read-more">
                                        Leer más →
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {filteredArticles.length === 0 && (
                        <div className="blog-empty">
                            <p>No se encontraron artículos que coincidan con tu búsqueda.</p>
                        </div>
                    )}
                </div>
            </section>

            <section className="section" style={{ background: 'var(--bg-container)' }}>
                <div className="container text-center">
                    <h2>¿Quieres más contenido exclusivo?</h2>
                    <p className="mt-3 mb-4" style={{ color: 'var(--text-secondary)' }}>
                        Suscríbete a nuestro newsletter y recibe las últimas tendencias directamente en tu email
                    </p>
                    <div className="newsletter-form">
                        <input type="email" placeholder="tu@email.com" />
                        <button className="btn btn-primary">Suscribirme</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogPage;
