import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

/**
 * AnalyticsTracker Component
 * Automatically tracks page views when the route changes
 */
const AnalyticsTracker = () => {
    const location = useLocation();

    useEffect(() => {
        // Track page view on route change
        trackPageView();
    }, [location]);

    return null; // This component doesn't render anything
};

export default AnalyticsTracker;
