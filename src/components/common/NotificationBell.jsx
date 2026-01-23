import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationContext';
import { FaBell, FaCheckDouble } from 'react-icons/fa';
import './NotificationBell.css';

const NotificationBell = () => {
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navigate = useNavigate();

    const handleItemClick = (notification) => {
        if (!notification.read) {
            markAsRead(notification.id);
        }
        setIsOpen(false);
        if (notification.link) {
            navigate(notification.link);
        }
    };

    // Date formatter
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = Math.floor((now - date) / 1000); // seconds

        if (diff < 60) return 'Hace un momento';
        if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`;
        if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} h`;
        return date.toLocaleDateString();
    };

    return (
        <div className="notification-wrapper" ref={dropdownRef}>
            <button
                className="notification-btn"
                onClick={() => setIsOpen(!isOpen)}
                title="Notificaciones"
            >
                <FaBell />
                {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
                )}
            </button>

            {isOpen && (
                <div className="notification-dropdown">
                    <div className="notification-header">
                        <h3>Notificaciones</h3>
                        {unreadCount > 0 && (
                            <button className="mark-read-btn" onClick={markAllAsRead} title="Marcar todas como leídas">
                                <FaCheckDouble /> Leídas
                            </button>
                        )}
                    </div>

                    <div className="notification-list">
                        {notifications.length === 0 ? (
                            <div className="notification-empty">
                                <p>No tienes notificaciones</p>
                            </div>
                        ) : (
                            notifications.map(notif => (
                                <div
                                    key={notif.id}
                                    className={`notification-item ${!notif.read ? 'unread' : ''} type-${notif.type}`}
                                    onClick={() => handleItemClick(notif)}
                                >
                                    <div className="notif-icon">
                                        {notif.type === 'success' && '✅'}
                                        {notif.type === 'warning' && '⚠️'}
                                        {notif.type === 'error' && '❌'}
                                        {notif.type === 'info' && '🔵'}
                                    </div>
                                    <div className="notif-content">
                                        <h4>{notif.title}</h4>
                                        <p>{notif.message}</p>
                                        <span className="notif-time">{formatTime(notif.created_at)}</span>
                                    </div>
                                    {!notif.read && <div className="unread-dot"></div>}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
