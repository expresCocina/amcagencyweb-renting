import { useEffect, useState } from 'react';
import { useActivities } from '../../hooks/useActivities';
import './ActivityTimeline.css';
import { FaPhone, FaEnvelope, FaStickyNote, FaCheck, FaExchangeAlt, FaUserPlus, FaCalendar } from 'react-icons/fa';

const ActivityTimeline = ({ relationType, relationId }) => {
    const { activities, loading, fetchActivities, logActivity } = useActivities(relationType, relationId);
    const [newNote, setNewNote] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchActivities();
    }, [fetchActivities]);

    const handleAddNote = async (e) => {
        e.preventDefault();
        if (!newNote.trim()) return;

        setIsSubmitting(true);
        await logActivity({
            type: 'nota',
            title: 'Nota agregada',
            description: newNote
        });
        setNewNote('');
        setIsSubmitting(false);
    };

    const getIcon = (type) => {
        switch (type) {
            case 'llamada': return <FaPhone className="timeline-icon bg-blue" />;
            case 'email': return <FaEnvelope className="timeline-icon bg-green" />;
            case 'nota': return <FaStickyNote className="timeline-icon bg-yellow" />;
            case 'cambio_estado': return <FaExchangeAlt className="timeline-icon bg-purple" />;
            case 'tarea': return <FaCheck className="timeline-icon bg-teal" />;
            case 'creacion': return <FaUserPlus className="timeline-icon bg-gray" />;
            case 'reunion': return <FaCalendar className="timeline-icon bg-orange" />;
            default: return <FaStickyNote className="timeline-icon bg-gray" />;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'hace un momento';
        if (diffInSeconds < 3600) return `hace ${Math.floor(diffInSeconds / 60)} min`;
        if (diffInSeconds < 86400) return `hace ${Math.floor(diffInSeconds / 3600)} horas`;
        if (diffInSeconds < 604800) return `hace ${Math.floor(diffInSeconds / 86400)} días`;

        return date.toLocaleDateString();
    };

    return (
        <div className="activity-timeline">
            {/* Note Input */}
            <div className="timeline-input">
                <form onSubmit={handleAddNote}>
                    <textarea
                        placeholder="Escribe una nota rápida..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        rows="3"
                    />
                    <div className="timeline-actions">
                        <button type="submit" className="btn-save-note" disabled={isSubmitting}>
                            {isSubmitting ? 'Guardando...' : 'Agregar Nota'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Timeline List */}
            <div className="timeline-list">
                {loading ? (
                    <div className="timeline-loading">Cargando historial...</div>
                ) : activities.length === 0 ? (
                    <div className="timeline-empty">No hay actividades registradas aún.</div>
                ) : (
                    activities.map((activity) => (
                        <div key={activity.id} className="timeline-item">
                            <div className="timeline-marker">
                                {getIcon(activity.tipo)}
                                <div className="timeline-line"></div>
                            </div>
                            <div className="timeline-content">
                                <div className="timeline-header">
                                    <span className="activity-title">{activity.titulo}</span>
                                    <span className="activity-date">{formatDate(activity.created_at)}</span>
                                </div>
                                <p className="activity-desc">{activity.descripcion}</p>
                                <div className="activity-meta">
                                    <span className="activity-user">
                                        Por: {activity.user?.nombre_completo || 'Usuario'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ActivityTimeline;
