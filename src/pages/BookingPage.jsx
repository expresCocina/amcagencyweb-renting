import { useState } from 'react';
import './SharedPageStyles.css';
import './BookingPage.css';

const BookingPage = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [consultationType, setConsultationType] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
    });

    const consultationTypes = [
        {
            id: 'audit',
            name: 'Auditoría SEO Gratuita',
            duration: '30 min',
            description: 'Análisis completo del SEO de tu sitio web',
            icon: '🔍',
            price: 'Gratis'
        },
        {
            id: 'strategy',
            name: 'Consultoría Estratégica',
            duration: '60 min',
            description: 'Plan personalizado de marketing digital',
            icon: '📊',
            price: 'Gratis'
        },
        {
            id: 'review',
            name: 'Revisión de Proyecto',
            duration: '45 min',
            description: 'Revisión de tu proyecto actual y mejoras',
            icon: '🎯',
            price: 'Gratis'
        }
    ];

    const timeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
        '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
        '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
    ];

    // Generate next 14 days (excluding weekends)
    const getAvailableDates = () => {
        const dates = [];
        const today = new Date();
        let count = 0;
        let daysAdded = 0;

        while (daysAdded < 14) {
            const date = new Date(today);
            date.setDate(today.getDate() + count);
            const dayOfWeek = date.getDay();

            // Skip weekends (0 = Sunday, 6 = Saturday)
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                dates.push(date);
                daysAdded++;
            }
            count++;
        }

        return dates;
    };

    const formatDate = (date) => {
        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        return date.toLocaleDateString('es-ES', options);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!consultationType || !selectedDate || !selectedTime) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }

        alert(`¡Cita agendada exitosamente!\n\nTipo: ${consultationTypes.find(c => c.id === consultationType)?.name}\nFecha: ${selectedDate}\nHora: ${selectedTime}\n\nRecibirás un email de confirmación a ${formData.email}`);

        // Reset form
        setSelectedDate('');
        setSelectedTime('');
        setConsultationType('');
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    };

    const availableDates = getAvailableDates();

    return (
        <div className="page booking-page">
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-content">
                        <h1>Agenda tu <span className="gradient-text">Consultoría</span></h1>
                        <p className="page-subtitle">
                            Primera consultoría 100% gratuita sin compromiso
                        </p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="booking-layout">
                        {/* Left Side - Selection */}
                        <div className="booking-selection">
                            {/* Step 1: Type */}
                            <div className="booking-step">
                                <div className="step-header">
                                    <div className="step-number">1</div>
                                    <h3>Tipo de Consultoría</h3>
                                </div>
                                <div className="consultation-types">
                                    {consultationTypes.map(type => (
                                        <div
                                            key={type.id}
                                            className={`consultation-card ${consultationType === type.id ? 'selected' : ''}`}
                                            onClick={() => setConsultationType(type.id)}
                                        >
                                            <div className="consultation-icon">{type.icon}</div>
                                            <div className="consultation-info">
                                                <h4>{type.name}</h4>
                                                <p>{type.description}</p>
                                                <div className="consultation-meta">
                                                    <span>⏱️ {type.duration}</span>
                                                    <span className="price-tag">{type.price}</span>
                                                </div>
                                            </div>
                                            <div className="consultation-check">
                                                {consultationType === type.id ? '✓' : ''}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Step 2: Date */}
                            {consultationType && (
                                <div className="booking-step">
                                    <div className="step-header">
                                        <div className="step-number">2</div>
                                        <h3>Selecciona Fecha</h3>
                                    </div>
                                    <div className="date-picker">
                                        {availableDates.map((date, index) => {
                                            const dateStr = date.toISOString().split('T')[0];
                                            return (
                                                <button
                                                    key={index}
                                                    className={`date-button ${selectedDate === dateStr ? 'selected' : ''}`}
                                                    onClick={() => setSelectedDate(dateStr)}
                                                >
                                                    <div className="date-day">{formatDate(date).split(',')[0]}</div>
                                                    <div className="date-date">{date.getDate()}</div>
                                                    <div className="date-month">{formatDate(date).split(' ')[2]}</div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Time */}
                            {selectedDate && (
                                <div className="booking-step">
                                    <div className="step-header">
                                        <div className="step-number">3</div>
                                        <h3>Selecciona Hora</h3>
                                    </div>
                                    <div className="time-slots">
                                        {timeSlots.map((slot, index) => (
                                            <button
                                                key={index}
                                                className={`time-slot ${selectedTime === slot ? 'selected' : ''}`}
                                                onClick={() => setSelectedTime(slot)}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Side - Form */}
                        <div className="booking-form-container">
                            <div className="booking-summary glass">
                                <h3>Resumen de tu Cita</h3>

                                {!consultationType ? (
                                    <div className="summary-empty">
                                        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📅</div>
                                        <p>Selecciona el tipo de consultoría para continuar</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="summary-details">
                                            <div className="summary-item">
                                                <strong>Consultoría:</strong>
                                                <span>{consultationTypes.find(c => c.id === consultationType)?.name}</span>
                                            </div>
                                            <div className="summary-item">
                                                <strong>Duración:</strong>
                                                <span>{consultationTypes.find(c => c.id === consultationType)?.duration}</span>
                                            </div>
                                            {selectedDate && (
                                                <div className="summary-item">
                                                    <strong>Fecha:</strong>
                                                    <span>{new Date(selectedDate + 'T00:00:00').toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                                </div>
                                            )}
                                            {selectedTime && (
                                                <div className="summary-item">
                                                    <strong>Hora:</strong>
                                                    <span>{selectedTime}</span>
                                                </div>
                                            )}
                                        </div>

                                        <form onSubmit={handleSubmit} className="booking-form">
                                            <h4>Tus Datos</h4>

                                            <div className="form-group">
                                                <label>Nombre Completo *</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>Email *</label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>Teléfono *</label>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>Empresa</label>
                                                <input
                                                    type="text"
                                                    value={formData.company}
                                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>¿Algo que debamos saber?</label>
                                                <textarea
                                                    rows="3"
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    placeholder="Opcional..."
                                                ></textarea>
                                            </div>

                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                style={{ width: '100%', padding: '16px' }}
                                                disabled={!selectedDate || !selectedTime}
                                            >
                                                Confirmar Cita Gratuita
                                            </button>

                                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '12px' }}>
                                                Recibirás un email de confirmación
                                            </p>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BookingPage;
