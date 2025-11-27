import './Testimonials.css';

const Testimonials = () => {
    const testimonials = [
        {
            quote: "Triplicamos nuestras ventas online en 4 meses",
            author: "María González",
            role: "Fundadora de EcoTienda",
            country: "Colombia",
            text: "AMC nos ayudó a posicionar nuestra tienda en Google. Pasamos de 200 a 2,500 visitas mensuales y nuestras ventas se dispararon.",
            flag: "🇨🇴"
        },
        {
            quote: "El embudo automatizado nos ahorra 15 horas semanales",
            author: "Carlos Ramírez",
            role: "CEO de Inmobiliaria Horizonte",
            country: "México",
            text: "Ahora los leads se califican solos y nuestro equipo solo habla con clientes listos para comprar.",
            flag: "🇲🇽"
        },
        {
            quote: "Conseguí trabajo remoto gracias al bootcamp",
            author: "Ana Martínez",
            role: "Estudiante AMC Academy",
            country: "Argentina",
            text: "En 2 meses aprendí SEO profesional y conseguí mi primer cliente pagando $800 USD mensuales.",
            flag: "🇦🇷"
        }
    ];

    return (
        <section className="section testimonials" id="casos">
            <div className="container">
                <div className="section-header text-center">
                    <h2>Lo que dicen nuestros clientes</h2>
                </div>

                <div className="grid grid-3">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="card testimonial-card">
                            <div className="testimonial-flag">{testimonial.flag}</div>
                            <h3 className="testimonial-quote">"{testimonial.quote}"</h3>
                            <p className="testimonial-text mt-3">{testimonial.text}</p>
                            <div className="testimonial-author mt-4">
                                <strong>{testimonial.author}</strong>
                                <div className="author-role">{testimonial.role} ({testimonial.country})</div>
                            </div>
                            <div className="verified-badge mt-3">
                                ✅ Cliente verificado
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
