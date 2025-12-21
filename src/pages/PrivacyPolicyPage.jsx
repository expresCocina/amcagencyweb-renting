import './SharedPageStyles.css';
import './PolicyPage.css';

const PrivacyPolicyPage = () => {
    return (
        <div className="page policy-page">
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-content">
                        <h1>Política de <span className="gradient-text">Privacidad</span></h1>
                        <p className="page-subtitle">
                            Última actualización: Diciembre 2024
                        </p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="policy-content glass">
                        <h2>1. Información que Recopilamos</h2>
                        <p>
                            En AMC Agency Web recopilamos información que nos proporcionas directamente cuando te pones en contacto con nosotros,
                            solicitas nuestros servicios o te suscribes a nuestro newsletter.
                        </p>
                        <ul>
                            <li>Nombre completo</li>
                            <li>Correo electrónico</li>
                            <li>Número de teléfono</li>
                            <li>Empresa o negocio</li>
                            <li>Información sobre tus necesidades de marketing digital</li>
                        </ul>

                        <h2>2. Cómo Usamos tu Información</h2>
                        <p>Utilizamos la información recopilada para:</p>
                        <ul>
                            <li>Responder a tus consultas y solicitudes de información</li>
                            <li>Proporcionar nuestros servicios de marketing digital</li>
                            <li>Enviarte actualizaciones sobre nuestros servicios (con tu consentimiento)</li>
                            <li>Mejorar nuestro sitio web y servicios</li>
                            <li>Cumplir con obligaciones legales</li>
                        </ul>

                        <h2>3. Protección de Datos</h2>
                        <p>
                            Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales contra
                            acceso no autorizado, pérdida, destrucción o alteración.
                        </p>
                        <ul>
                            <li>Certificado SSL en todo el sitio web</li>
                            <li>Servidores seguros y encriptados</li>
                            <li>Acceso restringido a datos personales</li>
                            <li>Políticas internas de protección de datos</li>
                        </ul>

                        <h2>4. Compartir Información</h2>
                        <p>
                            No vendemos, alquilamos ni compartimos tu información personal con terceros para fines de marketing.
                            Solo compartimos información cuando:
                        </p>
                        <ul>
                            <li>Tienes tu consentimiento explícito</li>
                            <li>Es necesario para proporcionar nuestros servicios (p. ej., plataformas de email marketing)</li>
                            <li>Es requerido por ley</li>
                        </ul>

                        <h2>5. Cookies y Tecnologías Similares</h2>
                        <p>
                            Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio web,
                            analizar el tráfico y personalizar el contenido.
                        </p>
                        <p>
                            Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.
                        </p>

                        <h2>6. Tus Derechos</h2>
                        <p>Tienes derecho a:</p>
                        <ul>
                            <li>Acceder a tus datos personales</li>
                            <li>Rectificar datos inexactos</li>
                            <li>Solicitar la eliminación de tus datos</li>
                            <li>Oponerte al procesamiento de tus datos</li>
                            <li>Retirar tu consentimiento en cualquier momento</li>
                            <li>Solicitar la portabilidad de tus datos</li>
                        </ul>

                        <h2>7. Retención de Datos</h2>
                        <p>
                            Conservamos tu información personal solo durante el tiempo necesario para cumplir con los
                            propósitos para los que fue recopilada, incluyendo requisitos legales, contables o de reporte.
                        </p>

                        <h2>8. Enlaces a Terceros</h2>
                        <p>
                            Nuestro sitio web puede contener enlaces a sitios de terceros. No somos responsables de las
                            prácticas de privacidad de estos sitios. Te recomendamos leer sus políticas de privacidad.
                        </p>

                        <h2>9. Cambios a Esta Política</h2>
                        <p>
                            Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos sobre cambios
                            significativos publicando la nueva política en esta página con una nueva fecha de "última actualización".
                        </p>

                        <h2>10. Contacto</h2>
                        <p>
                            Si tienes preguntas sobre esta Política de Privacidad o deseas ejercer tus derechos, contáctanos:
                        </p>
                        <ul>
                            <li><strong>Email:</strong> info@amcagencyweb.com</li>
                            <li><strong>Teléfono:</strong> +57 300 123 4567</li>
                            <li><strong>Dirección:</strong> Bogotá, Colombia</li>
                        </ul>

                        <div className="policy-footer">
                            <p>
                                Al usar nuestros servicios, aceptas esta Política de Privacidad y nuestros
                                <a href="/terminos"> Términos y Condiciones</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicyPage;
