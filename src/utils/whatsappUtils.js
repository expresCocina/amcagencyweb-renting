/**
 * WhatsApp Utility Functions
 */

/**
 * Clean phone number and ensure it has country code
 * Defaults to Colombia (+57) if no country code detected
 */
export const formatWhatsAppNumber = (phone) => {
    if (!phone) return null;

    // Remove all non-numeric characters
    let cleanPhone = phone.replace(/\D/g, '');

    // If empty after cleaning
    if (!cleanPhone) return null;

    // If number starts with 57 (Colombia) and is long enough, assume it's full format
    if (cleanPhone.startsWith('57') && cleanPhone.length >= 12) {
        return cleanPhone;
    }

    // If number seems to be a valid mobile socket (3xx...) but no country code
    if (cleanPhone.startsWith('3') && cleanPhone.length === 10) {
        return `57${cleanPhone}`;
    }

    // Fallback: return as is (might be international)
    return cleanPhone;
};

/**
 * Generate WhatsApp URL
 */
export const getWhatsAppUrl = (phone, message = '') => {
    const formattedPhone = formatWhatsAppNumber(phone);
    if (!formattedPhone) return null;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
};

/**
 * Get default greeting message based on context
 */
export const getWhatsAppMessage = (type, name) => {
    const greetings = {
        lead: `Hola ${name}, te contacto de AMC Agency. ¿Cómo estás?`,
        client: `Hola ${name}, me gustaría conversar sobre tu cuenta.`,
        deal: `Hola ${name}, te escribo para revisar nuestra propuesta.`,
        default: `Hola ${name}, te contacto de AMC Agency.`
    };

    return greetings[type] || greetings.default;
};
