import { useState } from 'react';
import './ChatWidget.css';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            text: '¡Hola! 👋 Soy el asistente virtual de AMC Agency Web.\n\n¿En qué puedo ayudarte hoy?\n\n• Conocer nuestros servicios\n• Solicitar cotización\n• Agendar una cita\n• Ver casos de éxito\n• Información de contacto',
            time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [inputValue, setInputValue] = useState('');

    const quickReplies = [
        '💰 Cotización',
        '📅 Agendar cita',
        '📞 Contacto',
        '🎯 Servicios'
    ];

    const botResponses = {
        // Precios y cotización
        'precio': '💰 **PRECIOS Y COTIZACIÓN**\n\nNuestros servicios son personalizados según tus necesidades:\n\n📊 SEO: Desde $800,000 COP/mes\n🌐 Desarrollo Web: Desde $1,500,000 COP\n🚀 Google Ads: Desde $600,000 COP/mes\n⚙️ Automatización: Desde $1,200,000 COP\n\n¿Quieres una cotización exacta?\n👉 Usa nuestra calculadora: https://localhost:5173/calculadora\n\nO escribe "agendar" para hablar con un asesor.',
        'precios': '💰 **PRECIOS Y COTIZACIÓN**\n\nNuestros servicios son personalizados según tus necesidades:\n\n📊 SEO: Desde $800,000 COP/mes\n🌐 Desarrollo Web: Desde $1,500,000 COP\n🚀 Google Ads: Desde $600,000 COP/mes\n⚙️ Automatización: Desde $1,200,000 COP\n\n¿Quieres una cotización exacta?\n👉 Usa nuestra calculadora: https://localhost:5173/calculadora\n\nO escribe "agendar" para hablar con un asesor.',
        'cotiza': '💰 **PRECIOS Y COTIZACIÓN**\n\nNuestros servicios son personalizados según tus necesidades:\n\n📊 SEO: Desde $800,000 COP/mes\n🌐 Desarrollo Web: Desde $1,500,000 COP\n🚀 Google Ads: Desde $600,000 COP/mes\n⚙️ Automatización: Desde $1,200,000 COP\n\n¿Quieres una cotización exacta?\n👉 Usa nuestra calculadora: https://localhost:5173/calculadora\n\nO escribe "agendar" para hablar con un asesor.',
        'costo': '💰 **PRECIOS Y COTIZACIÓN**\n\nNuestros servicios son personalizados según tus necesidades:\n\n📊 SEO: Desde $800,000 COP/mes\n🌐 Desarrollo Web: Desde $1,500,000 COP\n🚀 Google Ads: Desde $600,000 COP/mes\n⚙️ Automatización: Desde $1,200,000 COP\n\n¿Quieres una cotización exacta?\n👉 Usa nuestra calculadora: https://localhost:5173/calculadora\n\nO escribe "agendar" para hablar con un asesor.',

        // Agendar cita
        'cita': '📅 **AGENDAR CONSULTORÍA GRATUITA**\n\nPerfecto! Tienes 3 opciones para agendar:\n\n1️⃣ **WhatsApp Directo** (Respuesta inmediata)\n   👉 https://wa.me/573138537261?text=Hola,%20quiero%20agendar%20una%20cita\n\n2️⃣ **Formulario de Contacto** (Te llamamos en 24h)\n   👉 Scroll al final de la página o haz clic en "Contacto"\n\n3️⃣ **Calendly** (Escoge tu horario)\n   👉 https://calendly.com/salcristhi5411/30min\n\n¿Prefieres que te ayudemos por WhatsApp ahora?',
        'agendar': '📅 **AGENDAR CONSULTORÍA GRATUITA**\n\nPerfecto! Tienes 3 opciones para agendar:\n\n1️⃣ **WhatsApp Directo** (Respuesta inmediata)\n   👉 https://wa.me/573138537261?text=Hola,%20quiero%20agendar%20una%20cita\n\n2️⃣ **Formulario de Contacto** (Te llamamos en 24h)\n   👉 Scroll al final de la página o haz clic en "Contacto"\n\n3️⃣ **Calendly** (Escoge tu horario)\n   👉 https://calendly.com/salcristhi5411/30min\n\n¿Prefieres que te ayudemos por WhatsApp ahora?',
        'consulta': '📅 **AGENDAR CONSULTORÍA GRATUITA**\n\nPerfecto! Tienes 3 opciones para agendar:\n\n1️⃣ **WhatsApp Directo** (Respuesta inmediata)\n   👉 https://wa.me/573138537261?text=Hola,%20quiero%20agendar%20una%20cita\n\n2️⃣ **Formulario de Contacto** (Te llamamos en 24h)\n   👉 Scroll al final de la página o haz clic en "Contacto"\n\n3️⃣ **Calendly** (Escoge tu horario)\n   👉 https://calendly.com/salcristhi5411/30min\n\n¿Prefieres que te ayudemos por WhatsApp ahora?',
        'reunion': '📅 **AGENDAR CONSULTORÍA GRATUITA**\n\nPerfecto! Tienes 3 opciones para agendar:\n\n1️⃣ **WhatsApp Directo** (Respuesta inmediata)\n   👉 https://wa.me/573138537261?text=Hola,%20quiero%20agendar%20una%20cita\n\n2️⃣ **Formulario de Contacto** (Te llamamos en 24h)\n   👉 Scroll al final de la página o haz clic en "Contacto"\n\n3️⃣ **Calendly** (Escoge tu horario)\n   👉 https://calendly.com/salcristhi5411/30min\n\n¿Prefieres que te ayudemos por WhatsApp ahora?',

        // Contacto
        'contacto': '📞 **INFORMACIÓN DE CONTACTO**\n\n**WhatsApp:**\n📱 +57 313 853 7261\n👉 https://wa.me/573138537261\n\n**Email:**\n📧 info@amcagencyweb.com\n\n**Ubicación:**\n📍 Neiva, Huila, Colombia\n\n**Horario de Atención:**\n🕐 Lunes a Viernes: 9:00 AM - 6:00 PM (COT)\n🕐 Sábados: 9:00 AM - 1:00 PM\n\n**Formulario de Contacto:**\n👉 Scroll al final de esta página\n\n¿Te gustaría que te contactemos por WhatsApp ahora?',
        'telefono': '📞 **INFORMACIÓN DE CONTACTO**\n\n**WhatsApp:**\n📱 +57 313 853 7261\n👉 https://wa.me/573138537261\n\n**Email:**\n📧 info@amcagencyweb.com\n\n**Ubicación:**\n📍 Neiva, Huila, Colombia\n\n**Horario de Atención:**\n🕐 Lunes a Viernes: 9:00 AM - 6:00 PM (COT)\n🕐 Sábados: 9:00 AM - 1:00 PM\n\n**Formulario de Contacto:**\n👉 Scroll al final de esta página\n\n¿Te gustaría que te contactemos por WhatsApp ahora?',
        'email': '📞 **INFORMACIÓN DE CONTACTO**\n\n**WhatsApp:**\n📱 +57 313 853 7261\n👉 https://wa.me/573138537261\n\n**Email:**\n📧 info@amcagencyweb.com\n\n**Ubicación:**\n📍 Neiva, Huila, Colombia\n\n**Horario de Atención:**\n🕐 Lunes a Viernes: 9:00 AM - 6:00 PM (COT)\n🕐 Sábados: 9:00 AM - 1:00 PM\n\n**Formulario de Contacto:**\n👉 Scroll al final de esta página\n\n¿Te gustaría que te contactemos por WhatsApp ahora?',
        'ubicacion': '📞 **INFORMACIÓN DE CONTACTO**\n\n**WhatsApp:**\n📱 +57 313 853 7261\n👉 https://wa.me/573138537261\n\n**Email:**\n📧 info@amcagencyweb.com\n\n**Ubicación:**\n📍 Neiva, Huila, Colombia\n\n**Horario de Atención:**\n🕐 Lunes a Viernes: 9:00 AM - 6:00 PM (COT)\n🕐 Sábados: 9:00 AM - 1:00 PM\n\n**Formulario de Contacto:**\n👉 Scroll al final de esta página\n\n¿Te gustaría que te contactemos por WhatsApp ahora?',

        // Servicios
        'servicio': '🎯 **NUESTROS SERVICIOS**\n\nOfrecemos soluciones integrales de marketing digital:\n\n📊 **SEO Profesional**\n   • Posicionamiento orgánico en Google\n   • Auditorías y optimización\n   👉 https://localhost:5173/seo\n\n🌐 **Desarrollo Web**\n   • Sitios corporativos y e-commerce\n   • Responsive y optimizado\n   👉 https://localhost:5173/desarrollo-web\n\n🚀 **Google Ads & Meta Ads**\n   • Campañas publicitarias ROI-focused\n   • Gestión profesional de presupuesto\n\n⚙️ **Embudos + Automatización**\n   • Funnels de conversión\n   • Email marketing automatizado\n   👉 https://localhost:5173/embudos\n\n¿Sobre cuál servicio quieres más información?',
        'que hacen': '🎯 **NUESTROS SERVICIOS**\n\nOfrecemos soluciones integrales de marketing digital:\n\n📊 **SEO Profesional**\n   • Posicionamiento orgánico en Google\n   • Auditorías y optimización\n   👉 https://localhost:5173/seo\n\n🌐 **Desarrollo Web**\n   • Sitios corporativos y e-commerce\n   • Responsive y optimizado\n   👉 https://localhost:5173/desarrollo-web\n\n🚀 **Google Ads & Meta Ads**\n   • Campañas publicitarias ROI-focused\n   • Gestión profesional de presupuesto\n\n⚙️ **Embudos + Automatización**\n   • Funnels de conversión\n   • Email marketing automatizado\n   👉 https://localhost:5173/embudos\n\n¿Sobre cuál servicio quieres más información?',

        // SEO específico
        'seo': '📊 **SERVICIO SEO PROFESIONAL**\n\n✅ Incluye:\n• Auditoría SEO completa\n• Optimización on-page y técnica\n• Creación de contenido optimizado\n• Link building de calidad\n• Reportes mensuales detallados\n\n💰 Desde $800,000 COP/mes\n\n📈 Resultados promedio:\n• +287% tráfico orgánico\n• Top 3 en Google en 6-12 meses\n\n👉 Ver más: https://localhost:5173/seo\n👉 Ver casos de éxito: https://localhost:5173/casos\n\n¿Quieres una auditoría SEO gratuita?',

        // Desarrollo Web
        'web': '🌐 **DESARROLLO WEB PROFESIONAL**\n\n✅ Incluye:\n• Diseño 100% personalizado\n• Responsive (móvil, tablet, desktop)\n• CMS para gestionar contenido\n• SEO-friendly desde el inicio\n• Hosting y mantenimiento\n• Certificado SSL incluido\n\n💰 Desde $1,500,000 COP\n\n⚡ Entrega en 3-6 semanas\n\n👉 Ver más: https://localhost:5173/desarrollo-web\n👉 Ver demos: https://localhost:5173/casos\n\n¿Tienes un proyecto en mente?',
        'pagina': '🌐 **DESARROLLO WEB PROFESIONAL**\n\n✅ Incluye:\n• Diseño 100% personalizado\n• Responsive (móvil, tablet, desktop)\n• CMS para gestionar contenido\n• SEO-friendly desde el inicio\n• Hosting y mantenimiento\n• Certificado SSL incluido\n\n💰 Desde $1,500,000 COP\n\n⚡ Entrega en 3-6 semanas\n\n👉 Ver más: https://localhost:5173/desarrollo-web\n👉 Ver demos: https://localhost:5173/casos\n\n¿Tienes un proyecto en mente?',
        'sitio': '🌐 **DESARROLLO WEB PROFESIONAL**\n\n✅ Incluye:\n• Diseño 100% personalizado\n• Responsive (móvil, tablet, desktop)\n• CMS para gestionar contenido\n• SEO-friendly desde el inicio\n• Hosting y mantenimiento\n• Certificado SSL incluido\n\n💰 Desde $1,500,000 COP\n\n⚡ Entrega en 3-6 semanas\n\n👉 Ver más: https://localhost:5173/desarrollo-web\n👉 Ver demos: https://localhost:5173/casos\n\n¿Tienes un proyecto en mente?',

        // Casos de éxito
        'caso': '🏆 **CASOS DE ÉXITO**\n\nTenemos +500 clientes satisfechos en LATAM:\n\n📈 EcoTienda: +450% ventas con SEO\n🏠 Inmobiliaria Premium: 15 leads/día\n🦷 Clínica Dental: +320% pacientes nuevos\n💻 TechStart: 5.9x ROI en Google Ads\n🍕 Restaurante Gourmet: +180% reservas\n\n👉 Ver todos los casos: https://localhost:5173/casos\n👉 Ver demos interactivas con resultados reales\n\n¿Quieres resultados similares?',
        'resultado': '🏆 **CASOS DE ÉXITO**\n\nTenemos +500 clientes satisfechos en LATAM:\n\n📈 EcoTienda: +450% ventas con SEO\n🏠 Inmobiliaria Premium: 15 leads/día\n🦷 Clínica Dental: +320% pacientes nuevos\n💻 TechStart: 5.9x ROI en Google Ads\n🍕 Restaurante Gourmet: +180% reservas\n\n👉 Ver todos los casos: https://localhost:5173/casos\n👉 Ver demos interactivas con resultados reales\n\n¿Quieres resultados similares?',
        'testimonio': '🏆 **CASOS DE ÉXITO**\n\nTenemos +500 clientes satisfechos en LATAM:\n\n📈 EcoTienda: +450% ventas con SEO\n🏠 Inmobiliaria Premium: 15 leads/día\n🦷 Clínica Dental: +320% pacientes nuevos\n💻 TechStart: 5.9x ROI en Google Ads\n🍕 Restaurante Gourmet: +180% reservas\n\n👉 Ver todos los casos: https://localhost:5173/casos\n👉 Ver demos interactivas con resultados reales\n\n¿Quieres resultados similares?',

        // Cursos
        'curso': '🎓 **AMC ACADEMY - CURSOS**\n\nAprende marketing digital de la mano de expertos:\n\n📚 **Cursos Disponibles:**\n• SEO Profesional Completo\n• Google Ads desde Cero\n• Meta Ads (Facebook/Instagram)\n• Email Marketing & Automatización\n• Desarrollo Web con WordPress\n\n✅ Certificación oficial\n✅ Bolsa de trabajo exclusiva\n✅ Clases en vivo + grabadas\n✅ Proyectos reales\n\n👉 Ver cursos: https://localhost:5173/cursos\n\n¿Te interesa algún curso en particular?',
        'capacita': '🎓 **AMC ACADEMY - CURSOS**\n\nAprende marketing digital de la mano de expertos:\n\n📚 **Cursos Disponibles:**\n• SEO Profesional Completo\n• Google Ads desde Cero\n• Meta Ads (Facebook/Instagram)\n• Email Marketing & Automatización\n• Desarrollo Web con WordPress\n\n✅ Certificación oficial\n✅ Bolsa de trabajo exclusiva\n✅ Clases en vivo + grabadas\n✅ Proyectos reales\n\n👉 Ver cursos: https://localhost:5173/cursos\n\n¿Te interesa algún curso en particular?',
        'aprend': '🎓 **AMC ACADEMY - CURSOS**\n\nAprende marketing digital de la mano de expertos:\n\n📚 **Cursos Disponibles:**\n• SEO Profesional Completo\n• Google Ads desde Cero\n• Meta Ads (Facebook/Instagram)\n• Email Marketing & Automatización\n• Desarrollo Web con WordPress\n\n✅ Certificación oficial\n✅ Bolsa de trabajo exclusiva\n✅ Clases en vivo + grabadas\n✅ Proyectos reales\n\n👉 Ver cursos: https://localhost:5173/cursos\n\n¿Te interesa algún curso en particular?',

        // Financiación
        'credito': '💳 **PAGO A CRÉDITO**\n\n¡Contrata ahora, paga después!\n\n✅ Hasta 12 meses sin intereses\n✅ Aprobación en 24 horas\n✅ Sin inicial en proyectos +$2,000,000\n✅ Financiación flexible\n\n📋 Requisitos mínimos:\n• Persona natural o jurídica\n• Ingresos demostrables\n• Score crediticio básico\n\n👉 Más información: https://localhost:5173/credito\n👉 WhatsApp: https://wa.me/573138537261?text=Quiero%20info%20sobre%20financiación\n\n¿Te interesa financiar tu proyecto?',
        'financ': '💳 **PAGO A CRÉDITO**\n\n¡Contrata ahora, paga después!\n\n✅ Hasta 12 meses sin intereses\n✅ Aprobación en 24 horas\n✅ Sin inicial en proyectos +$2,000,000\n✅ Financiación flexible\n\n📋 Requisitos mínimos:\n• Persona natural o jurídica\n• Ingresos demostrables\n• Score crediticio básico\n\n👉 Más información: https://localhost:5173/credito\n👉 WhatsApp: https://wa.me/573138537261?text=Quiero%20info%20sobre%20financiación\n\n¿Te interesa financiar tu proyecto?',
        'cuotas': '💳 **PAGO A CRÉDITO**\n\n¡Contrata ahora, paga después!\n\n✅ Hasta 12 meses sin intereses\n✅ Aprobación en 24 horas\n✅ Sin inicial en proyectos +$2,000,000\n✅ Financiación flexible\n\n📋 Requisitos mínimos:\n• Persona natural o jurídica\n• Ingresos demostrables\n• Score crediticio básico\n\n👉 Más información: https://localhost:5173/credito\n👉 WhatsApp: https://wa.me/573138537261?text=Quiero%20info%20sobre%20financiación\n\n¿Te interesa financiar tu proyecto?',

        // Horario
        'horario': '🕐 **HORARIO DE ATENCIÓN**\n\n📅 **Lunes a Viernes:**\n   9:00 AM - 6:00 PM (COT)\n\n📅 **Sábados:**\n   9:00 AM - 1:00 PM (COT)\n\n📅 **Domingos:**\n   Cerrado\n\n💬 **Chat en línea:**\n   Lunes a Sábado durante horario laboral\n\n📱 **WhatsApp 24/7:**\n   Respondemos en menos de 2 horas\n   👉 https://wa.me/573138537261\n\n¿Necesitas ayuda urgente?',
        'cuando': '🕐 **HORARIO DE ATENCIÓN**\n\n📅 **Lunes a Viernes:**\n   9:00 AM - 6:00 PM (COT)\n\n📅 **Sábados:**\n   9:00 AM - 1:00 PM (COT)\n\n📅 **Domingos:**\n   Cerrado\n\n💬 **Chat en línea:**\n   Lunes a Sábado durante horario laboral\n\n📱 **WhatsApp 24/7:**\n   Respondemos en menos de 2 horas\n   👉 https://wa.me/573138537261\n\n¿Necesitas ayuda urgente?',

        // Saludos
        'hola': '¡Hola! 👋 Gracias por contactarnos.\n\n¿En qué podemos ayudarte hoy?\n\n**Opciones rápidas:**\n• Ver servicios → escribe "servicios"\n• Solicitar cotización → escribe "precios"\n• Agendar cita → escribe "agendar"\n• Ver casos de éxito → escribe "casos"\n• Contacto → escribe "contacto"',
        'buenos dias': '¡Buenos días! ☀️\n\n¿En qué podemos ayudarte hoy?\n\n**Opciones rápidas:**\n• Ver servicios → escribe "servicios"\n• Solicitar cotización → escribe "precios"\n• Agendar cita → escribe "agendar"\n• Ver casos de éxito → escribe "casos"\n• Contacto → escribe "contacto"',
        'buenas tardes': '¡Buenas tardes! 🌤️\n\n¿En qué podemos ayudarte hoy?\n\n**Opciones rápidas:**\n• Ver servicios → escribe "servicios"\n• Solicitar cotización → escribe "precios"\n• Agendar cita → escribe "agendar"\n• Ver casos de éxito → escribe "casos"\n• Contacto → escribe "contacto"',

        // Agradecimientos
        'gracias': '¡De nada! 😊\n\n¿Hay algo más en lo que pueda ayudarte?\n\nSi estás listo para dar el siguiente paso:\n👉 WhatsApp: https://wa.me/573138537261\n👉 Formulario: Scroll abajo al final de la página\n\n¡Estamos aquí para ayudarte!',

        // Default
        'default': '🤔 Interesante pregunta.\n\nPermíteme conectarte con un asesor experto que puede ayudarte mejor:\n\n📱 **WhatsApp:** +57 313 853 7261\n   👉 https://wa.me/573138537261\n\n📧 **Email:** info@amcagencyweb.com\n\n📝 **Formulario:** Scroll al final de esta página\n\nO puedes preguntarme sobre:\n• Servicios • Precios • Casos • Cursos • Contacto'
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        // Add user message
        const newMessage = {
            type: 'user',
            text: inputValue,
            time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...messages, newMessage]);
        setInputValue('');

        // Simulate bot response
        setTimeout(() => {
            const lowerText = inputValue.toLowerCase();
            let response = botResponses.default;

            // Try to find matching response
            for (const [key, value] of Object.entries(botResponses)) {
                if (lowerText.includes(key)) {
                    response = value;
                    break;
                }
            }

            const botMessage = {
                type: 'bot',
                text: response,
                time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botMessage]);
        }, 1000);
    };

    const handleQuickReply = (reply) => {
        setInputValue(reply);
        // Auto-send after selecting quick reply
        setTimeout(() => {
            const event = new KeyboardEvent('keypress', { key: 'Enter' });
            handleSend();
        }, 100);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <>
            {/* Chat Button */}
            <button
                className={`chat-button ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Chat"
            >
                {isOpen ? '✕' : '💬'}
                {!isOpen && <span className="chat-badge">1</span>}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="chat-widget">
                    <div className="chat-header">
                        <div className="chat-header-info">
                            <div className="chat-avatar">🤖</div>
                            <div>
                                <strong>AMC Virtual Assistant</strong>
                                <div className="chat-status">
                                    <span className="status-dot"></span>
                                    En línea · Responde al instante
                                </div>
                            </div>
                        </div>
                        <button
                            className="chat-close"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>
                    </div>

                    <div className="chat-messages">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`chat-message ${message.type}`}
                            >
                                <div className="message-bubble">
                                    {message.text}
                                </div>
                                <div className="message-time">{message.time}</div>
                            </div>
                        ))}
                    </div>

                    <div className="quick-replies">
                        {quickReplies.map((reply, index) => (
                            <button
                                key={index}
                                className="quick-reply-btn"
                                onClick={() => handleQuickReply(reply)}
                            >
                                {reply}
                            </button>
                        ))}
                    </div>

                    <div className="chat-input">
                        <input
                            type="text"
                            placeholder="Escribe tu mensaje..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button
                            className="send-button"
                            onClick={handleSend}
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatWidget;
