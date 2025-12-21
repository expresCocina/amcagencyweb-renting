import { trackEvent } from '../utils/analytics';

/**
 * Tracked Link Component - Automatically tracks clicks for lead generation
 * @param {string} href - The link destination
 * @param {string} type - Type of link: 'contact', 'booking', 'calculator'
 * @param {string} source - Where the link is located (e.g., 'hero', 'navbar', 'footer')
 * @param {string} className - CSS classes
 * @param {ReactNode} children - Link content
 */
const TrackedLink = ({ href, type = 'contact', source = 'unknown', className = '', children, ...props }) => {
    const handleClick = (e) => {
        // Track the click using generic trackEvent
        trackEvent(`${type}_click`, {
            source: source,
            type: type,
            href: href
        });

        // If there's an onClick prop, call it
        if (props.onClick) {
            props.onClick(e);
        }
    };

    return (
        <a
            href={href}
            className={className}
            onClick={handleClick}
            {...props}
        >
            {children}
        </a>
    );
};

export default TrackedLink;
