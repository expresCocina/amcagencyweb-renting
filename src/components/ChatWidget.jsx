import { useState } from 'react';
import './ChatWidget.css';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            text: '¡Hola! 👋 Soy el asistente virtual de AMC Agency Web. ¿En qué puedo ayudarte hoy?',
            time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [inputValue, setInputValue] = useState('');

    const quickReplies = [
        '💰 Precios',
        '📅 Agendar cita',
        '📞 Contacto',
        '🎓 Cursos'
    ];

    const botResponses = {
        'precios': 'Nuestros servicios van desde $400,000 COP. Usa nuestra calculadora de presupuesto para ver precios exactos: /calculadora',
        'precio': 'Nuestros servicios van desde $400,000 COP. Usa nuestra calculadora de presupuesto para ver precios exactos: /calculadora',
        'costo': 'Los costos varían según el servicio. Visita /calculadora para calcular tu presupuesto personalizado.',
        'cita': 'Perfecto! Puedes agendar una consultoría gratuita aquí: /calculadora o contactarnos directamente.',
        'agendar': 'Perfecto! Puedes agendar una consultoría gratuita aquí: /calculadora o contactarnos directamente.',
        'contacto': 'Puedes contactarnos:\\n📞 +57 313 853 7261\\n📧 info@amcagencyweb.com\\n📍 Neiva, Huila, Colombia\\nO usa el formulario en nuestro sitio.',
        'cursos': 'Tenemos cursos de SEO, Marketing Digital y más. Visita /cursos para ver toda la oferta de AMC Academy.',
        'seo': 'Nuestro servicio de SEO incluye auditoría, optimización, contenido y linkbuilding desde $800,000 COP/mes.',
        'web': 'Desarrollo web profesional desde $1,500,000 COP. Responsive, rápido y con CMS para que actualices fácil.',
        'hola': '¡Hola! ¿En qué servicio estás interesado? SEO, Desarrollo Web, Embudos, o Google Ads?',
        'horario': 'Nuestro horario de atención es Lunes a Viernes de 9:00 AM a 6:00 PM (COT).',
        'default': 'Gracias por tu mensaje. Un asesor te responderá pronto. ¿Quieres dejar tu email para que te contactemos?'
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
                            <div className="chat-avatar">👨‍💼</div>
                            <div>
                                <strong>AMC Agency Web</strong>
                                <div className="chat-status">
                                    <span className="status-dot"></span>
                                    En línea
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
