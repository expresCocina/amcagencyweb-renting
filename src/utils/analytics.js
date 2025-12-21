// Facebook Pixel & Google Analytics Tracking Utilities

// Track custom events
export const trackEvent = (eventName, params = {}) => {
    try {
        // Facebook Pixel
        if (window.fbq) {
            window.fbq('trackCustom', eventName, params);
        }

        // Google Analytics 4
        if (window.gtag) {
            window.gtag('event', eventName, params);
        }

        // Console log for debugging
        console.log('📊 Event Tracked:', eventName, params);
    } catch (error) {
        console.error('Error tracking event:', error);
    }
};

// Track Lead Generation
export const trackLead = (source, details = {}) => {
    trackEvent('Lead', {
        event_category: 'Lead Generation',
        event_label: source,
        value: 1,
        currency: 'COP',
        ...details
    });

    // Facebook Pixel Lead Event
    if (window.fbq) {
        window.fbq('track', 'Lead', {
            content_name: source,
            ...details
        });
    }
};

// Track Contact Attempt
export const trackContact = (method, source, details = {}) => {
    trackEvent('Contact', {
        event_category: 'Contact',
        event_label: `${method} - ${source}`,
        contact_method: method,
        source: source,
        ...details
    });

    // Facebook Pixel Contact Event
    if (window.fbq) {
        window.fbq('track', 'Contact', {
            content_name: source,
            method: method,
            ...details
        });
    }
};

// Track WhatsApp Click
export const trackWhatsAppClick = (source, message, details = {}) => {
    trackEvent('WhatsApp_Click', {
        event_category: 'WhatsApp',
        event_label: source,
        message_preview: message.substring(0, 50),
        source: source,
        ...details
    });

    trackLead(`WhatsApp - ${source}`, {
        method: 'WhatsApp',
        message: message,
        ...details
    });
};

// Track Design Selection
export const trackDesignSelection = (designName, category, details = {}) => {
    trackEvent('Design_Selected', {
        event_category: 'Catalog',
        event_label: designName,
        design_name: designName,
        design_category: category,
        ...details
    });

    trackLead(`Design Selection - ${designName}`, {
        design: designName,
        category: category,
        ...details
    });
};

// Track Form Submission
export const trackFormSubmission = (formName, formData = {}) => {
    trackEvent('Form_Submission', {
        event_category: 'Forms',
        event_label: formName,
        form_name: formName,
        ...formData
    });

    trackLead(`Form - ${formName}`, {
        form_type: formName,
        ...formData
    });

    // Facebook Pixel CompleteRegistration
    if (window.fbq) {
        window.fbq('track', 'CompleteRegistration', {
            content_name: formName,
            status: 'completed'
        });
    }
};

// Track Button Click
export const trackButtonClick = (buttonName, location, details = {}) => {
    trackEvent('Button_Click', {
        event_category: 'Engagement',
        event_label: `${buttonName} - ${location}`,
        button_name: buttonName,
        button_location: location,
        ...details
    });
};

// Track Page View
export const trackPageView = (pageName, pageData = {}) => {
    trackEvent('Page_View', {
        event_category: 'Navigation',
        event_label: pageName,
        page_name: pageName,
        ...pageData
    });

    // Facebook Pixel PageView
    if (window.fbq) {
        window.fbq('track', 'PageView', {
            content_name: pageName
        });
    }
};

// Track CTA Click
export const trackCTAClick = (ctaText, section, destination, details = {}) => {
    trackEvent('CTA_Click', {
        event_category: 'CTA',
        event_label: `${ctaText} - ${section}`,
        cta_text: ctaText,
        section: section,
        destination: destination,
        ...details
    });

    trackLead(`CTA - ${section}`, {
        cta_text: ctaText,
        destination: destination,
        ...details
    });
};

// Track Service Interest
export const trackServiceInterest = (serviceName, action, details = {}) => {
    trackEvent('Service_Interest', {
        event_category: 'Services',
        event_label: `${serviceName} - ${action}`,
        service_name: serviceName,
        action: action,
        ...details
    });
};

// Track Scroll Depth
export const trackScrollDepth = (percentage, pageName) => {
    trackEvent('Scroll_Depth', {
        event_category: 'Engagement',
        event_label: `${percentage}% - ${pageName}`,
        scroll_percentage: percentage,
        page_name: pageName
    });
};

// Track Video Play (if applicable)
export const trackVideoPlay = (videoName, location) => {
    trackEvent('Video_Play', {
        event_category: 'Media',
        event_label: videoName,
        video_name: videoName,
        location: location
    });
};

// Track External Link Click
export const trackExternalLink = (url, linkText, location) => {
    trackEvent('External_Link_Click', {
        event_category: 'Outbound',
        event_label: url,
        url: url,
        link_text: linkText,
        location: location
    });
};

// Track Error
export const trackError = (errorType, errorMessage, location) => {
    trackEvent('Error', {
        event_category: 'Errors',
        event_label: errorType,
        error_type: errorType,
        error_message: errorMessage,
        location: location
    });
};

// Initialize tracking on page load
export const initializeTracking = () => {
    // Track initial page view
    const pageName = window.location.pathname;
    trackPageView(pageName);

    // Set up scroll depth tracking
    let scrollDepthTracked = {
        25: false,
        50: false,
        75: false,
        100: false
    };

    window.addEventListener('scroll', () => {
        const scrollPercentage = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );

        Object.keys(scrollDepthTracked).forEach(depth => {
            if (scrollPercentage >= parseInt(depth) && !scrollDepthTracked[depth]) {
                scrollDepthTracked[depth] = true;
                trackScrollDepth(parseInt(depth), pageName);
            }
        });
    });

    console.log('📊 Analytics initialized');
};

export default {
    trackEvent,
    trackLead,
    trackContact,
    trackWhatsAppClick,
    trackDesignSelection,
    trackFormSubmission,
    trackButtonClick,
    trackPageView,
    trackCTAClick,
    trackServiceInterest,
    trackScrollDepth,
    trackVideoPlay,
    trackExternalLink,
    trackError,
    initializeTracking
};
