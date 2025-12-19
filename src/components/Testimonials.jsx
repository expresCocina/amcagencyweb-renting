import { useState, useEffect } from 'react';
import './Testimonials.css';

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const testimonials = [
        {
            quote: "Triplicamos nuestras ventas online en 4 meses",
            author: "María González",
            role: "Fundadora de EcoTienda",
            country: "Colombia",
            text: "AMC nos ayudó a posicionar nuestra tienda en Google. Pasamos de 200 a 2,500 visitas mensuales y nuestras ventas se dispararon.",
            flag: "🇨🇴",
            avatar: "👩‍💼",
            rating: 5,
            color: "rgba(139, 92, 246, 0.6)"
        },
        {
            quote: "El embudo automatizado nos ahorra 15 horas semanales",
            author: "Carlos Ramírez",
            role: "CEO de Inmobiliaria Horizonte",
            country: "México",
            text: "Ahora los leads se califican solos y nuestro equipo solo habla con clientes listos para comprar.",
            flag: "🇲🇽",
            avatar: "👨‍💼",
            rating: 5,
            color: "rgba(236, 72, 153, 0.6)"
        },
        {
            quote: "ROI del 6.2x en solo 4 meses",
            author: "Roberto Silva",
            role: "Director de Marketing",
            country: "Chile",
            text: "La estrategia de Google Ads que implementaron superó todas nuestras expectativas. Vale cada peso invertido.",
            flag: "🇨🇱",
            avatar: "👨‍💻",
            rating: 5,
            color: "rgba(34, 197, 94, 0.6)"
        }
    ];

    const nextSlide = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToSlide = (index) => {
        setIsFlipped(false);
        setCurrentIndex(index);
    };

    const toggleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const getItemClass = (index) => {
        if (index === currentIndex) return 'active';
        if (index === (currentIndex + 1) % testimonials.length) return 'next';
        if (index === (currentIndex - 1 + testimonials.length) % testimonials.length) return 'prev';
        return '';
    };

    const renderStars = (rating) => {
        return '⭐'.repeat(rating);
    };

    return (
        <section className="section testimonials-3d" id="testimonios">
            <div className="container">
                <div className="section-header text-center">
                    <h2>Lo que dicen nuestros clientes</h2>
                    <p className="subtitle mt-3">
                        +100 reseñas verificadas con calificación promedio de 4.9/5
                    </p>
                </div>

                <div className="carousel-3d-container">
                    <div className="carousel-3d">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className={`carousel-item ${getItemClass(index)}`}
                                style={{ '--service-color': testimonial.color }}
                            >
                                <div className={`service-box-3d ${isFlipped && index === currentIndex ? 'flipped' : ''}`} onClick={toggleFlip}>
                                    {/* Front Face */}
                                    <div className="box-face front">
                                        <div className="testimonial-avatar-3d">{testimonial.avatar}</div>
                                        <h3 className="testimonial-quote-3d">"{testimonial.quote}"</h3>
                                        <div className="testimonial-rating-3d">
                                            {renderStars(testimonial.rating)}
                                        </div>
                                        <div className="testimonial-author-3d">
                                            <strong>{testimonial.author}</strong>
                                            <div className="author-role-3d">{testimonial.role}</div>
                                            <div className="testimonial-country-3d">
                                                {testimonial.flag} {testimonial.country}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Back Face */}
                                    <div className="box-face back">
                                        <div className="testimonial-detail">
                                            <div className="detail-icon">💬</div>
                                            <h4>Testimonio Completo</h4>
                                            <p className="mt-3">{testimonial.text}</p>
                                            <div className="verified-badge-3d mt-4">
                                                ✓ Cliente Verificado
                                            </div>
                                        </div>
                                    </div>

                                    {/* Side Faces */}
                                    <div className="box-face left">
                                        <div className="side-pattern"></div>
                                    </div>
                                    <div className="box-face right">
                                        <div className="side-pattern"></div>
                                    </div>

                                    {/* Top and Bottom */}
                                    <div className="box-face top">
                                        <div className="top-glow"></div>
                                    </div>
                                    <div className="box-face bottom">
                                        <div className="bottom-shadow"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Controls */}
                    <button className="carousel-control prev-btn" onClick={prevSlide} aria-label="Previous">
                        ←
                    </button>
                    <button className="carousel-control next-btn" onClick={nextSlide} aria-label="Next">
                        →
                    </button>

                    {/* Dots Navigation */}
                    <div className="carousel-dots">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="testimonials-cta text-center mt-5">
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '20px' }}>
                        ¿Quieres ser nuestro próximo caso de éxito?
                    </p>
                    <a href="#contacto" className="btn btn-primary">Comenzemos a Trabajar</a>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
