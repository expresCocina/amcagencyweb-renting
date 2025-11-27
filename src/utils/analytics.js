import ReactGA from 'react-ga4';
import ReactPixel from 'react-facebook-pixel';
import { v4 as uuidv4 } from 'uuid';

// In production (Vercel), this points to the serverless function
const CAPI_ENDPOINT = '/api/events';

export const initAnalytics = () => {
    const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
    const PIXEL_ID = import.meta.env.VITE_FACEBOOK_PIXEL_ID;

    if (GA_ID) {

        if (PIXEL_ID) {
            ReactPixel.init(PIXEL_ID);
            ReactPixel.pageView();
            console.log('Pixel Initialized');
        }

        if (!GA_ID && !PIXEL_ID) {
            console.log('Analytics: No IDs provided in .env, running in mock mode');
        }
    };

    export const trackEvent = async (eventName, params = {}, userData = {}) => {
        const eventId = uuidv4();
        const eventSourceUrl = window.location.href;

        // 1. Google Analytics 4
        if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
            ReactGA.event({
                category: params.category || 'User Interaction',
                action: eventName,
                label: params.label,
                value: params.value,
            });
        }

        // 2. Facebook Pixel (Browser)
        if (import.meta.env.VITE_FACEBOOK_PIXEL_ID) {
            ReactPixel.track(eventName, { ...params, eventID: eventId });
        }

        // 3. Facebook CAPI (Server)
        // Only send to CAPI if we have a backend to talk to
        try {
            await fetch(CAPI_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    eventName,
                    eventId,
                    eventSourceUrl,
                    userData, // { email, phone, fbp, fbc }
                    customData: params,
                }),
            });
            console.log(`Event ${eventName} sent to CAPI`);
        } catch (error) {
            // Silent fail in dev if server not running
            console.warn('CAPI Send Error (Server might be down):', error);
        }
    };

    export const trackPageView = () => {
        if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
            ReactGA.send({ hitType: "pageview", page: window.location.pathname });
        }
        if (import.meta.env.VITE_FACEBOOK_PIXEL_ID) {
            ReactPixel.pageView();
        }
    };
