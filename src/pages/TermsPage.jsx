import './SharedPageStyles.css';
import './PolicyPage.css';

const TermsPage = () => {
    return (
        <div className="page policy-page">
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-content">
                        <h1>Términos y <span className="gradient-text">Condiciones</span></h1>
                        <p className="page-subtitle">
                            Última actualización: Diciembre 2024
                        </p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="policy-content glass">
                        <h2>1. Aceptación de los Términos</h2>
                        <p>
                            Al acceder y utilizar los servicios de AMC Agency Web, aceptas estar sujeto a estos Términos y Condiciones.
                            Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestros servicios.
                        </p>

                        <h2>2. Servicios Ofrecidos</h2>
                        <p>AMC Agency Web ofrece servicios de marketing digital incluyendo, pero no limitado a:</p>
                        <ul>
                            <li>Posicionamiento SEO (Search Engine Optimization)</li>
                            <li>Desarrollo y diseño de sitios web</li>
                            <li>Gestión de campañas publicitarias (Google Ads, Facebook Ads)</li>
                            <li>Creación y gestión de embudos de venta</li>
                            <li>Social Media Marketing</li>
                            <li>Consultoría y formación en marketing digital</li>
                        </ul>

                        <h2>3. Contratación de Servicios</h2>
                        <p>
                            Los servicios se contratan mediante propuesta comercial y aceptación expresa del cliente.
                            Los detalles específicos, entregables, plazos y costos se establecen en el contrato individual.
                        </p>

                        <h2>4. Pagos y Facturación</h2>
                        <ul>
                            <li>Los pagos se realizarán según lo acordado en el contrato de servicios</li>
                            <li>Generalmente se requiere un anticipo del 50% para iniciar el proyecto</li>
                            <li>Los servicios mensuales se facturan por adelantado</li>
                            <li>Los pagos se consideran vencidos si no se reciben en la fecha acordada</li>
                            <li>Nos reservamos el derecho de suspender servicios en caso de mora</li>
                        </ul>

                        <h2>5. Plazos y Entregables</h2>
                        <p>
                            Los plazos establecidos en las propuestas son estimados y pueden variar dependiendo de:
                        </p>
                        <ul>
                            <li>Complejidad del proyecto</li>
                            <li>Tiempos de respuesta del cliente</li>
                            <li>Disponibilidad de recursos necesarios</li>
                            <li>Cambios en el alcance del proyecto</li>
                        </ul>

                        <h2>6. Responsabilidades del Cliente</h2>
                        <p>El cliente se compromete a:</p>
                        <ul>
                            <li>Proporcionar información precisa y completa</li>
                            <li>Facilitar accesos necesarios (sitio web, cuentas publicitarias, analytics)</li>
                            <li>Responder a consultas en tiempos razonables</li>
                            <li>Cumplir con los pagos acordados</li>
                            <li>Proveer contenido (textos, imágenes) cuando sea requerido</li>
                        </ul>

                        <h2>7. Propiedad Intelectual</h2>
                        <p>
                            Los entregables creados específicamente para el cliente (diseños, código, contenido)
                            son propiedad del cliente una vez completado el pago total. AMC Agency Web retiene
                            el derecho de usar proyectos como parte de su portafolio.
                        </p>

                        <h2>8. Garantías y Limitaciones</h2>
                        <ul>
                            <li>Ofrecemos garantía de satisfacción de 30 días en proyectos nuevos</li>
                            <li>No garantizamos posiciones específicas en buscadores (SEO)</li>
                            <li>No garantizamos resultados específicos en campañas publicitarias</li>
                            <li>Trabajamos con best practices y datos Analytics para optimizar resultados</li>
                        </ul>

                        <h2>9. Cancelación y Reembolsos</h2>
                        <p>
                            <strong>Proyectos únicos:</strong> Cancelaciones requieren 15 días de aviso.
                            Se facturará el trabajo completado hasta la fecha.
                        </p>
                        <p>
                            <strong>Servicios mensuales:</strong> Pueden cancelarse con 30 días de aviso previo.
                            No se reembolsa el mes en curso.
                        </p>
                        <p>
                            <strong>Garantía de satisfacción:</strong> Reembolso completo disponible en primeros 30 días
                            si no estás satisfecho con el servicio.
                        </p>

                        <h2>10. Confidencialidad</h2>
                        <p>
                            Ambas partes se comprometen a mantener la confidencialidad de información sensible
                            compartida durante la prestación de servicios.
                        </p>

                        <h2>11. Limitación de Responsabilidad</h2>
                        <p>
                            AMC Agency Web no será responsable por daños indirectos, incidentales o consecuentes
                            derivados del uso de nuestros servicios. Nuestra responsabilidad total está limitada
                            al monto pagado por el servicio específico.
                        </p>

                        <h2>12. Modificaciones al Servicio</h2>
                        <p>
                            Nos reservamos el derecho de modificar o discontinuar servicios con previo aviso.
                            Los clientes actuales serán notificados con al menos 30 días de anticipación.
                        </p>

                        <h2>13. Ley Aplicable</h2>
                        <p>
                            Estos términos se rigen por las leyes de Colombia. Cualquier disputa se resolverá
                            en los tribunales competentes de Bogotá, Colombia.
                        </p>

                        <h2>14. Contacto</h2>
                        <p>
                            Para preguntas sobre estos Términos y Condiciones:
                        </p>
                        <ul>
                            <li><strong>Email:</strong> info@amcagencyweb.com</li>
                            <li><strong>Teléfono:</strong> +57 300 123 4567</li>
                            <li><strong>Dirección:</strong> Bogotá, Colombia</li>
                        </ul>

                        <div className="policy-footer">
                            <p>
                                Lee también nuestra <a href="/privacidad">Política de Privacidad</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TermsPage;
