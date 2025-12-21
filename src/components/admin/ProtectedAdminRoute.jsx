import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    const loginTime = localStorage.getItem('adminLoginTime');

    // Check if session is still valid (24 hours)
    const isSessionValid = () => {
        if (!loginTime) return false;
        const twentyFourHours = 24 * 60 * 60 * 1000;
        return (Date.now() - parseInt(loginTime)) < twentyFourHours;
    };

    if (!isAuthenticated || !isSessionValid()) {
        // Clear invalid session
        localStorage.removeItem('adminAuthenticated');
        localStorage.removeItem('adminLoginTime');
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedAdminRoute;
