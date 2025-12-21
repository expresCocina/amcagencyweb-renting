import { useState } from 'react';
import '../SharedPageStyles.css';
import { Link } from 'react-router-dom';
import '../SharedPageStyles.css';
import './DemoPages.css';
import '../SharedPageStyles.css';

const ClinicaDentalDemo = () => {
    const [showAppointmentForm, setShowAppointmentForm] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const services = [
        {
            id: 1,
            name: 'Limpieza Dental Profunda',
            price: 1200,
            duration: '45 min',
            description: 'Eliminación completa de sarro y placa bacteriana. Incluye pulido y fluorización.',
            emoji: '🦷',
            benefits: ['Previene caries', 'Encías saludables', 'Aliento fresco']
        },
        {
            id: 2,
            name: 'Ortodoncia Invisible',
            price: 35000,
            duration: '12-18 meses',
            description: 'Alineadores transparentes personalizados. Resultados visibles desde el primer mes.',
            emoji: '😁',
            benefits: ['Invisible', 'Removible', 'Sin brackets metálicos']
        },
        {
            id: 3,
            name: 'Blanqueamiento LED',
            price: 3500,
            duration: '60 min',
            description: 'Tecnología LED de última generación. Dientes hasta 8 tonos más blancos.',
            emoji: '✨',
            benefits: ['Resultados inmediatos', 'Sin sensibilidad', 'Duración 1-2 años']
        },
        {
            id: 4,
            name: 'Implantes Dentales',
            price: 18000,
            duration: '2-3 meses',
            description: 'Implantes de titanio de grado médico. Solución permanente y natural.',
            emoji: '🦴',
            benefits: ['Duración de por vida', 'Aspecto natural', 'Sin afectar otros dientes']
        },
        {
            id: 5,
            name: 'Endodoncia (Tratamiento de Conducto)',
            price: 4500,
            duration: '90 min',
            description: 'Salvamos tu diente natural. Procedimiento sin dolor con sedación.',
            emoji: '💊',
            benefits: ['Salva el diente', 'Sin dolor', 'Recuperación rápida']
        },
        {
            id: 6,
            name: 'Diseño de Sonrisa',
            price: 45000,
            duration: 'Personalizado',
            description: 'Transformación completa con carillas y coronas. Sonrisa de estrella.',
            emoji: '⭐',
            benefits: ['Transformación total', 'Personalizado 100%', 'Resultados permanentes']
        }
    ];

    const beforeAfter = [
        { emoji: '😬➡️😄', label: 'Ortodoncia', description: 'Antes y después de 14 meses' },
        { emoji: '🦷➡️✨', label: 'Blanqueamiento', description: '8 tonos más blanco' },
        { emoji: '😔➡️😁', label: 'Diseño de Sonrisa', description: 'Transformación completa' },
        { emoji: '🤕➡️😊', label: 'Implantes', description: 'Recuperación total' }
    ];

    const team = [
        { name: 'Dra. Ana Martínez', specialty: 'Ortodoncista', emoji: '👩‍⚕️' },
        { name: 'Dr. Carlos Ruiz', specialty: 'Implantólogo', emoji: '👨‍⚕️' },
        { name: 'Dra. Laura Gómez', specialty: 'Endodoncista', emoji: '👩‍⚕️' }
    ];

    const handleAppointmentSubmit = (e) => {
        e.preventDefault();
        alert('¡Cita agendada! Recibirás un SMS de confirmación pronto.');
        setShowAppointmentForm(false);
    };

    return (
        <div className="demo-page">
            <div className="demo-banner">
                🎨 <strong>DEMO:</strong> Este es un ejemplo del trabajo realizado para Clínica Dental Sonrisa.
                <Link to="/casos"> Ver caso de éxito completo</Link>
            </div>

            <section className="demo-hero" style={{
                background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(6, 182, 212, 0.1))'
            }}>
                <div className="container">
                    <h1>😁 Clínica Dental Sonrisa</h1>
                    <p>Tu sonrisa perfecta está a una cita de distancia</p>
                    <div style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <div className="badge info">⭐ 4.9/5 - 67 reseñas</div>
                        <div className="badge info">🏆 15 años de experiencia</div>
                        <div className="badge info">🎁 Primera consulta GRATIS</div>
                    </div>
                    <button
                        className="btn btn-primary"
                        style={{
                            marginTop: '30px',
                            background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                            padding: '16px 40px',
                            fontSize: '1.1rem'
                        }}
                        onClick={() => setShowAppointmentForm(true)}
                    >
                        Agendar Cita Gratuita 📅
                    </button>
                </div>
            </section>

            {/* Services */}
            <section className="section">
                <div className="container">
                    <h2 className="text-center">Nuestros Servicios</h2>
                    <p className="text-center" style={{ color: 'var(--text-secondary)', marginTop: '12px', marginBottom: '40px' }}>
                        Tecnología de vanguardia y especialistas certificados
                    </p>

                    <div className="items-grid">
                        {services.map(service => (
                            <div
                                key={service.id}
                                className="item-card"
                                onClick={() => setSelectedService(service)}
                            >
                                <div className="item-image" style={{
                                    background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)'
                                }}>
                                    <span style={{ fontSize: '5rem' }}>{service.emoji}</span>
                                </div>
                                <div className="item-content">
                                    <div className="item-title">{service.name}</div>
                                    <div className="item-description">{service.description}</div>
                                    <div style={{
                                        display: 'flex',
                                        gap: '12px',
                                        marginBottom: '12px',
                                        fontSize: '0.9rem',
                                        color: 'var(--text-secondary)'
                                    }}>
                                        <span>⏱️ {service.duration}</span>
                                    </div>
                                    <div className="item-price">
                                        Desde ${service.price.toLocaleString('es-AR')} ARS
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                        style={{
                                            width: '100%',
                                            background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)'
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedService(service);
                                            setShowAppointmentForm(true);
                                        }}
                                    >
                                        Agendar cita
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Before/After Gallery */}
            <section className="section" style={{ background: 'var(--bg-container)' }}>
                <div className="container">
                    <h2 className="text-center">Casos de Éxito</h2>
                    <p className="text-center" style={{ color: 'var(--text-secondary)', marginTop: '12px', marginBottom: '40px' }}>
                        Transformaciones reales de nuestros pacientes
                    </p>

                    <div className="gallery">
                        {beforeAfter.map((item, idx) => (
                            <div key={idx} className="gallery-item">
                                <div style={{
                                    background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '16px'
                                }}>
                                    <span style={{ fontSize: '4rem' }}>{item.emoji}</span>
                                    <div style={{ textAlign: 'center', color: 'white', padding: '0 20px' }}>
                                        <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px' }}>
                                            {item.label}
                                        </div>
                                        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                                            {item.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="section">
                <div className="container">
                    <h2 className="text-center">Nuestro Equipo</h2>
                    <p className="text-center" style={{ color: 'var(--text-secondary)', marginTop: '12px', marginBottom: '40px' }}>
                        Especialistas certificados a tu servicio
                    </p>

                    <div className="grid grid-3">
                        {team.map((member, idx) => (
                            <div key={idx} className="glass" style={{
                                padding: '30px',
                                textAlign: 'center',
                                borderRadius: '16px'
                            }}>
                                <div style={{ fontSize: '4rem', marginBottom: '16px' }}>{member.emoji}</div>
                                <h3 style={{ marginBottom: '8px' }}>{member.name}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>{member.specialty}</p>
                                <div style={{ marginTop: '16px' }}>
                                    <span className="badge info">Certificado</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Promotions */}
            <section className="section" style={{ background: 'var(--bg-container)' }}>
                <div className="container">
                    <div className="glass" style={{
                        padding: '40px',
                        textAlign: 'center',
                        borderRadius: '24px',
                        border: '2px solid rgba(14, 165, 233, 0.3)'
                    }}>
                        <h2>🎉 Promoción del Mes</h2>
                        <p style={{ fontSize: '1.2rem', marginTop: '16px', marginBottom: '24px', color: 'var(--text-secondary)' }}>
                            Limpieza dental + Blanqueamiento + Consulta
                        </p>
                        <div style={{
                            fontSize: '3rem',
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '24px'
                        }}>
                            $4,200 ARS
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                            Precio regular: $6,500 ARS | <strong style={{ color: '#22c55e' }}>Ahorras $2,300</strong>
                        </p>
                        <button
                            className="btn btn-primary"
                            style={{
                                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                                padding: '16px 40px',
                                fontSize: '1.1rem'
                            }}
                            onClick={() => setShowAppointmentForm(true)}
                        >
                            Aprovechar promoción
                        </button>
                    </div>
                </div>
            </section>

            {/* Service Detail Modal */}
            {selectedService && !showAppointmentForm && (
                <div className="demo-modal" onClick={() => setSelectedService(null)}>
                    <div className="demo-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedService(null)}>
                            ×
                        </button>
                        <div className="item-image" style={{
                            background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                            height: '250px',
                            borderRadius: '0'
                        }}>
                            <span style={{ fontSize: '8rem' }}>{selectedService.emoji}</span>
                        </div>
                        <div className="modal-body">
                            <h2>{selectedService.name}</h2>
                            <p style={{ fontSize: '1.1rem', marginTop: '16px', color: 'var(--text-secondary)' }}>
                                {selectedService.description}
                            </p>
                            <div style={{
                                display: 'flex',
                                gap: '20px',
                                marginTop: '20px',
                                fontSize: '1rem',
                                color: 'var(--text-secondary)'
                            }}>
                                <span>⏱️ Duración: {selectedService.duration}</span>
                            </div>
                            <div style={{ marginTop: '24px' }}>
                                <strong style={{ display: 'block', marginBottom: '12px' }}>Beneficios:</strong>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {selectedService.benefits.map((benefit, idx) => (
                                        <div key={idx} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            color: 'var(--text-secondary)'
                                        }}>
                                            <span style={{ color: '#22c55e', fontSize: '1.2rem' }}>✓</span>
                                            {benefit}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="item-price" style={{ fontSize: '2rem', margin: '24px 0' }}>
                                Desde ${selectedService.price.toLocaleString('es-AR')} ARS
                            </div>
                            <button
                                className="btn btn-primary"
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)'
                                }}
                                onClick={() => setShowAppointmentForm(true)}
                            >
                                Agendar cita para este servicio
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Appointment Form Modal */}
            {showAppointmentForm && (
                <div className="demo-modal" onClick={() => setShowAppointmentForm(false)}>
                    <div className="demo-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowAppointmentForm(false)}>
                            ×
                        </button>
                        <div className="modal-body">
                            <h2>Agendar Cita</h2>
                            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                                {selectedService ? selectedService.name : 'Primera consulta gratuita'}
                            </p>
                            <form className="demo-form" onSubmit={handleAppointmentSubmit} style={{ marginTop: '30px' }}>
                                <div className="form-group">
                                    <label>Nombre completo *</label>
                                    <input type="text" required placeholder="María García" />
                                </div>
                                <div className="form-group">
                                    <label>Email *</label>
                                    <input type="email" required placeholder="maria@email.com" />
                                </div>
                                <div className="form-group">
                                    <label>Teléfono *</label>
                                    <input type="tel" required placeholder="+54 11 1234 5678" />
                                </div>
                                <div className="form-group">
                                    <label>Servicio de interés</label>
                                    <select defaultValue={selectedService?.name || ''}>
                                        <option value="">Consulta general</option>
                                        {services.map(s => (
                                            <option key={s.id} value={s.name}>{s.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Fecha preferida</label>
                                    <input type="date" />
                                </div>
                                <div className="form-group">
                                    <label>Horario preferido</label>
                                    <select>
                                        <option>Mañana (9:00 - 12:00)</option>
                                        <option>Tarde (14:00 - 18:00)</option>
                                        <option>Noche (18:00 - 20:00)</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Comentarios adicionales</label>
                                    <textarea placeholder="¿Alguna condición médica que debamos conocer?"></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    style={{
                                        width: '100%',
                                        padding: '16px',
                                        background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)'
                                    }}
                                >
                                    Confirmar cita
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClinicaDentalDemo;
