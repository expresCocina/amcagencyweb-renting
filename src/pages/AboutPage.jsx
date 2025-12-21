import ContactForm from '../components/ContactForm';
import './SharedPageStyles.css';
import './AboutPage.css';

const AboutPage = () => {
    const team = [
        {
            name: 'Carlos Mendoza',
            role: 'CEO & Fundador',
            emoji: '👨‍💼',
            specialty: 'Estrategia Digital',
            experience: '15 años',
            description: 'Experto en transformación digital con más de 500 proyectos exitosos.',
            linkedin: '#',
            certifications: ['MBA', 'Google Partner', 'HubSpot']
        },
        {
            name: 'Ana Rodríguez',
            role: 'Directora de SEO',
            emoji: '👩‍💻',
            specialty: 'SEO & SEM',
            experience: '12 años',
            description: 'Especialista en posicionamiento orgánico y estrategias de contenido.',
            linkedin: '#',
            certifications: ['Google Ads', 'Semrush', 'Ahrefs']
        },
        {
            name: 'Diego Silva',
            role: 'Lead Developer',
            emoji: '👨‍🔧',
            specialty: 'Desarrollo Web',
            experience: '10 años',
            description: 'Full-stack developer especializado en React, Node.js y cloud.',
            linkedin: '#',
            certifications: ['AWS', 'React', 'Node.js']
        },
        {
            name: 'María González',
            role: 'Directora Creativa',
            emoji: '👩‍🎨',
            specialty: 'Diseño UX/UI',
            experience: '9 años',
            description: 'Diseñadora de experiencias digitales centradas en el usuario.',
            linkedin: '#',
            certifications: ['Adobe', 'Figma', 'UX Design']
        },
        {
            name: 'Roberto Pérez',
            role: 'Especialista en Ads',
            emoji: '👨‍📊',
            specialty: 'Paid Media',
            experience: '8 años',
            description: 'Experto en campañas de Google Ads, Facebook Ads y remarketing.',
            linkedin: '#',
            certifications: ['Meta Blueprint', 'Google Ads', 'Analytics']
        },
        {
            name: 'Laura Martínez',
            role: 'Social Media Manager',
            emoji: '👩‍💼',
            specialty: 'Redes Sociales',
            experience: '7 años',
            description: 'Estratega de contenido para redes sociales y community management.',
            linkedin: '#',
            certifications: ['Meta', 'Hootsuite', 'Content Strategy']
        },
        {
            name: 'Javier Torres',
            role: 'Data Analyst',
            emoji: '👨‍🔬',
            specialty: 'Analytics',
            experience: '6 años',
            description: 'Análisis de datos y optimización basada en métricas.',
            linkedin: '#',
            certifications: ['Google Analytics', 'Data Studio', 'Python']
        },
        {
            name: 'Sofia Ramírez',
            role: 'Account Manager',
            emoji: '👩‍💻',
            specialty: 'Gestión de Cuentas',
            experience: '5 años',
            description: 'Relación con clientes y gestión de proyectos digitales.',
            linkedin: '#',
            certifications: ['PMP', 'Scrum', 'HubSpot CRM']
        }
    ];

    const milestones = [
        { year: '2010', title: 'Fundación', description: 'AMC Agency Web nace en Bogotá, Colombia' },
        { year: '2013', title: 'Expansión LATAM', description: 'Abrimos oficinas en México y Argentina' },
        { year: '2016', title: 'Google Partner', description: 'Certificación como Google Premier Partner' },
        { year: '2019', title: '100 Clientes', description: 'Alcanzamos 100+ clientes satisfechos' },
        { year: '2021', title: 'Meta Partner', description: 'Certificación Elite Meta Business Partner' },
        { year: '2024', title: 'Top 10 LATAM', description: 'Reconocidos entre las mejores agencias' }
    ];

    const values = [
        {
            icon: '🎯',
            title: 'Resultados',
            description: 'Nos enfocamos en métricas que importan y ROI comprobable'
        },
        {
            icon: '🤝',
            title: 'Transparencia',
            description: 'Reportes claros y comunicación constante con nuestros clientes'
        },
        {
            icon: '🚀',
            title: 'Innovación',
            description: 'Siempre a la vanguardia de las últimas tecnologías y tendencias'
        },
        {
            icon: '💡',
            title: 'Creatividad',
            description: 'Soluciones únicas y personalizadas para cada cliente'
        },
        {
            icon: '⭐',
            title: 'Excelencia',
            description: 'Estándares de calidad premium en cada proyecto'
        },
        {
            icon: '🌟',
            title: 'Compromiso',
            description: 'Tu éxito es nuestro éxito, trabajamos codo a codo contigo'
        }
    ];

    return (
        <div className="page about-page">
            {/* Hero */}
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-content">
                        <h1>Sobre <span className="gradient-text">AMC Agency Web</span></h1>
                        <p className="page-subtitle">
                            Transformando negocios en LATAM desde 2010 con estrategias digitales que generan resultados reales
                        </p>
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="section">
                <div className="container">
                    <div className="about-story glass">
                        <div className="story-content">
                            <h2>Nuestra Historia</h2>
                            <p className="mt-3">
                                En 2010, un grupo de apasionados por el marketing digital decidió crear algo diferente.
                                No queríamos ser otra agencia más, queríamos ser <strong>partners estratégicos</strong> de
                                nuestros clientes.
                            </p>
                            <p className="mt-3">
                                Hoy, después de <strong>15 años</strong>, hemos ayudado a más de <strong>200 empresas</strong> en
                                <strong> 12 países</strong> a crecer exponencialmente. Desde startups hasta empresas consolidadas,
                                nuestro enfoque siempre ha sido el mismo: <strong>resultados medibles y relaciones a largo plazo</strong>.
                            </p>
                            <div className="story-stats mt-4">
                                <div className="story-stat">
                                    <div className="story-stat-num gradient-text">500+</div>
                                    <div className="story-stat-label">Proyectos</div>
                                </div>
                                <div className="story-stat">
                                    <div className="story-stat-num gradient-text">200+</div>
                                    <div className="story-stat-label">Clientes</div>
                                </div>
                                <div className="story-stat">
                                    <div className="story-stat-num gradient-text">15</div>
                                    <div className="story-stat-label">Años</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Values */}
            <section className="section" style={{ background: 'var(--bg-container)' }}>
                <div className="container">
                    <h2 className="text-center">Nuestros Valores</h2>
                    <p className="text-center mt-3 mb-5" style={{ color: 'var(--text-secondary)' }}>
                        Los principios que guían cada decisión que tomamos
                    </p>
                    <div className="values-grid">
                        {values.map((value, index) => (
                            <div key={index} className="value-card">
                                <div className="value-icon">{value.icon}</div>
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section">
                <div className="container">
                    <h2 className="text-center">Nuestro Viaje</h2>
                    <p className="text-center mt-3 mb-5" style={{ color: 'var(--text-secondary)' }}>
                        Hitos importantes en nuestra historia
                    </p>
                    <div className="timeline">
                        {milestones.map((milestone, index) => (
                            <div key={index} className="timeline-item" style={{ '--index': index }}>
                                <div className="timeline-year">{milestone.year}</div>
                                <div className="timeline-content">
                                    <h3>{milestone.title}</h3>
                                    <p>{milestone.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="section" style={{ background: 'var(--bg-container)' }}>
                <div className="container">
                    <h2 className="text-center">Nuestro Equipo</h2>
                    <p className="text-center mt-3 mb-5" style={{ color: 'var(--text-secondary)' }}>
                        Expertos apasionados por el marketing digital
                    </p>
                    <div className="team-grid">
                        {team.map((member, index) => (
                            <div key={index} className="team-card">
                                <div className="team-avatar">{member.emoji}</div>
                                <h3>{member.name}</h3>
                                <div className="team-role">{member.role}</div>
                                <div className="team-specialty">{member.specialty} • {member.experience}</div>
                                <p className="team-description">{member.description}</p>
                                <div className="team-certifications">
                                    {member.certifications.map((cert, idx) => (
                                        <span key={idx} className="cert-badge-small">{cert}</span>
                                    ))}
                                </div>
                                <a href={member.linkedin} className="team-linkedin" target="_blank" rel="noopener noreferrer">
                                    Ver LinkedIn →
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section">
                <div className="container">
                    <div className="about-cta glass text-center">
                        <h2>¿Listo para Trabajar con Nosotros?</h2>
                        <p className="mt-3">
                            Únete a las más de 200 empresas que confían en AMC Agency Web
                        </p>
                        <div className="page-ctas mt-4">
                            <a href="#contacto" className="btn btn-primary">Solicitar Consultoría Gratuita</a>
                            <a href="/casos" className="btn btn-secondary">Ver Casos de Éxito</a>
                        </div>
                    </div>
                </div>
            </section>

            <ContactForm />
        </div>
    );
};

export default AboutPage;
