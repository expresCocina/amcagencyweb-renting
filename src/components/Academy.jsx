import { Link } from 'react-router-dom';
import './Academy.css';

const Academy = () => {
    const courses = [
        {
            type: 'Bootcamps intensivos',
            duration: '4-8 semanas',
            icon: '🎓'
        },
        {
            type: 'Cursos grabados',
            duration: 'A tu ritmo',
            icon: '📚'
        },
        {
            type: 'Mentorías 1 a 1',
            duration: 'Personalizado',
            icon: '👨‍🏫'
        }
    ];

    return (
        <section className="section academy" id="cursos">
            <div className="container">
                <div className="academy-content">
                    <div className="academy-text">
                        <h2>Aprende las habilidades que las empresas están buscando</h2>
                        <p className="mt-3">
                            Cursos prácticos de marketing digital, SEO y desarrollo web. Certificación profesional + acceso a comunidad + bolsa de trabajo.
                        </p>
                        <div className="course-types mt-4">
                            {courses.map((course, index) => (
                                <div key={index} className="course-type">
                                    <span className="course-icon">{course.icon}</span>
                                    <div>
                                        <strong>{course.type}</strong>
                                        <div className="course-duration">{course.duration}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="academy-ctas mt-4">
                            <Link to="/cursos" className="btn btn-primary">Explorar cursos disponibles</Link>
                            <div className="credit-badge mt-3">
                                💳 Pago a crédito disponible
                            </div>
                        </div>
                    </div>
                    <div className="academy-visual">
                        <div className="stats-box glass">
                            <div className="stat-item">
                                <div className="stat-value gradient-text">78%</div>
                                <div className="stat-desc">Consigue trabajo en 3 meses</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value gradient-text">$800-1,500</div>
                                <div className="stat-desc">Salario promedio USD/mes</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value gradient-text">+500</div>
                                <div className="stat-desc">Graduados exitosos</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Academy;
