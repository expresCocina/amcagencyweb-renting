import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './TasksPage.css';
import { FaPlus, FaCheck, FaTrash, FaTag, FaFilter, FaCalendarAlt, FaExclamationCircle } from 'react-icons/fa';

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState({ status: 'pendiente', priority: 'all', tag: '' });

    // Form State
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        tipo: 'seguimiento',
        prioridad: 'media',
        fecha_vencimiento: '',
        relacionado_con: '', // 'lead', 'project'
        relacionado_id: '',
        asignado_a: '',
        tags: [] // Array of strings
    });
    const [tagInput, setTagInput] = useState('');

    // Relation Options
    const [leads, setLeads] = useState([]);
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadTasks();
        loadRelations();
    }, []);

    const loadTasks = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('tasks')
                .select(`
                    *,
                    user_profiles!asignado_a(nombre_completo),
                    creator:creado_por(nombre_completo)
                `)
                .order('fecha_vencimiento', { ascending: true });

            if (error) throw error;
            setTasks(data || []);
        } catch (error) {
            console.error('Error loading tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadRelations = async () => {
        const [leadsRes, projectsRes, usersRes] = await Promise.all([
            supabase.from('leads').select('id, nombre, empresa'),
            supabase.from('projects').select('id, nombre'),
            supabase.from('user_profiles').select('id, nombre_completo').eq('activo', true)
        ]);

        if (leadsRes.data) setLeads(leadsRes.data);
        if (projectsRes.data) setProjects(projectsRes.data);
        if (usersRes.data) setUsers(usersRes.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data: { user } } = await supabase.auth.getUser();

            const taskData = {
                ...formData,
                creado_por: user.id,
                asignado_a: formData.asignado_a || user.id, // Default to self if empty
                fecha_vencimiento: formData.fecha_vencimiento || null, // Fix: send null if empty
                relacionado_con: formData.relacionado_con || null,
                relacionado_id: formData.relacionado_id || null
            };

            const { error } = await supabase
                .from('tasks')
                .insert([taskData]);

            if (error) throw error;

            setShowModal(false);
            resetForm();
            loadTasks();
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Error al crear la tarea');
        }
    };

    const toggleTaskStatus = async (task) => {
        const newStatus = task.estado === 'pendiente' ? 'completada' : 'pendiente';
        const completedAt = newStatus === 'completada' ? new Date().toISOString() : null;

        try {
            const { error } = await supabase
                .from('tasks')
                .update({
                    estado: newStatus,
                    completada_en: completedAt
                })
                .eq('id', task.id);

            if (error) throw error;
            loadTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const deleteTask = async (id) => {
        if (!confirm('¿Estás seguro de eliminar esta tarea?')) return;
        try {
            const { error } = await supabase.from('tasks').delete().eq('id', id);
            if (error) throw error;
            loadTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, tagInput.trim()]
            });
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(tag => tag !== tagToRemove)
        });
    };

    const resetForm = () => {
        setFormData({
            titulo: '',
            descripcion: '',
            tipo: 'seguimiento',
            prioridad: 'media',
            fecha_vencimiento: '',
            relacionado_con: '',
            relacionado_id: '',
            asignado_a: '',
            tags: []
        });
        setTagInput('');
    };

    // Filter Logic
    const filteredTasks = tasks.filter(task => {
        const matchStatus = filter.status === 'all' || task.estado === filter.status;
        const matchPriority = filter.priority === 'all' || task.prioridad === filter.priority;
        const matchTag = !filter.tag || (task.tags && task.tags.includes(filter.tag));
        return matchStatus && matchPriority && matchTag;
    });

    // Grouping Logic (e.g. by date, but simplified list first)
    // Helper to get relation name
    const getRelationName = (type, id) => {
        if (type === 'lead') {
            const lead = leads.find(l => l.id === id);
            return lead ? `Lead: ${lead.nombre}` : 'Lead desconocido';
        }
        if (type === 'project') {
            const proj = projects.find(p => p.id === id);
            return proj ? `Proyecto: ${proj.nombre}` : 'Proyecto desconocido';
        }
        return '';
    };

    return (
        <div className="tasks-page">
            <div className="tasks-header">
                <div className="header-title">
                    <h1>Mis Tareas</h1>
                    <p>Gestiona tus actividades pendientes</p>
                </div>
                <button className="btn-primary" onClick={() => setShowModal(true)}>
                    <FaPlus /> Nueva Tarea
                </button>
            </div>

            <div className="tasks-filters">
                <div className="filter-group">
                    <button
                        className={`filter-chip ${filter.status === 'pendiente' ? 'active' : ''}`}
                        onClick={() => setFilter({ ...filter, status: 'pendiente' })}
                    >
                        Pendientes
                    </button>
                    <button
                        className={`filter-chip ${filter.status === 'completada' ? 'active' : ''}`}
                        onClick={() => setFilter({ ...filter, status: 'completada' })}
                    >
                        Completadas
                    </button>
                    <button
                        className={`filter-chip ${filter.status === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter({ ...filter, status: 'all' })}
                    >
                        Todas
                    </button>
                </div>

                <select
                    className="filter-select-sm"
                    value={filter.priority}
                    onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
                >
                    <option value="all">Todas las Prioridades</option>
                    <option value="alta">Alta 🔥</option>
                    <option value="media">Media ⚡</option>
                    <option value="baja">Baja 🟢</option>
                </select>

                <input
                    type="text"
                    placeholder="Filtrar por etiqueta..."
                    className="filter-input-sm"
                    value={filter.tag}
                    onChange={(e) => setFilter({ ...filter, tag: e.target.value })}
                />
            </div>

            <div className="tasks-list">
                {loading ? (
                    <div className="loading-state">Cargando tareas...</div>
                ) : filteredTasks.length === 0 ? (
                    <div className="empty-state">No hay tareas que coincidan con los filtros.</div>
                ) : (
                    filteredTasks.map(task => (
                        <div key={task.id} className={`task-card priority-${task.prioridad} ${task.estado === 'completada' ? 'completed' : ''}`}>
                            <div className="task-check">
                                <button
                                    className={`check-circle ${task.estado === 'completada' ? 'checked' : ''}`}
                                    onClick={() => toggleTaskStatus(task)}
                                >
                                    {task.estado === 'completada' && <FaCheck />}
                                </button>
                            </div>
                            <div className="task-content">
                                <div className="task-top">
                                    <h3 className={task.estado === 'completada' ? 'strikethrough' : ''}>
                                        {task.titulo}
                                    </h3>
                                    <div className="task-badges">
                                        <span className={`priority-badge ${task.prioridad}`}>
                                            {task.prioridad}
                                        </span>
                                        {task.tags && task.tags.map(tag => (
                                            <span key={tag} className="tag-badge">#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <p className="task-desc">{task.descripcion}</p>
                                <div className="task-meta">
                                    {task.fecha_vencimiento && (
                                        <span className={`meta-item ${new Date(task.fecha_vencimiento) < new Date() && task.estado !== 'completada' ? 'overdue' : ''}`}>
                                            <FaCalendarAlt />
                                            {new Date(task.fecha_vencimiento).toLocaleDateString()}
                                            {task.fecha_vencimiento.includes('T') ? ' ' + new Date(task.fecha_vencimiento).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                        </span>
                                    )}
                                    {task.relacionado_con && task.relacionado_id && (
                                        <span className="meta-item relation">
                                            🔗 {getRelationName(task.relacionado_con, task.relacionado_id)}
                                        </span>
                                    )}
                                    <span className="meta-item assignee">
                                        👤 {task.user_profiles?.nombre_completo || 'Sin asignar'}
                                    </span>
                                </div>
                            </div>
                            <div className="task-actions">
                                <button className="btn-icon-danger" onClick={() => deleteTask(task.id)}>
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Nueva Tarea</h2>
                            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="task-form">
                            <div className="form-group">
                                <label>Título de la Tarea</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.titulo}
                                    onChange={e => setFormData({ ...formData, titulo: e.target.value })}
                                    placeholder="Ej: Llamar a cliente..."
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Tipo</label>
                                    <select
                                        value={formData.tipo}
                                        onChange={e => setFormData({ ...formData, tipo: e.target.value })}
                                    >
                                        <option value="seguimiento">Seguimiento</option>
                                        <option value="llamada">Llamada</option>
                                        <option value="email">Email</option>
                                        <option value="reunion">Reunión</option>
                                        <option value="demo">Demo</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Prioridad</label>
                                    <select
                                        value={formData.prioridad}
                                        onChange={e => setFormData({ ...formData, prioridad: e.target.value })}
                                    >
                                        <option value="baja">Baja</option>
                                        <option value="media">Media</option>
                                        <option value="alta">Alta</option>
                                        <option value="urgente">Urgente</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Vencimiento</label>
                                    <input
                                        type="datetime-local"
                                        value={formData.fecha_vencimiento}
                                        onChange={e => setFormData({ ...formData, fecha_vencimiento: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Asignar a</label>
                                    <select
                                        value={formData.asignado_a}
                                        onChange={e => setFormData({ ...formData, asignado_a: e.target.value })}
                                    >
                                        <option value="">A mí mismo</option>
                                        {users.map(u => (
                                            <option key={u.id} value={u.id}>{u.nombre_completo}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Relacionado con</label>
                                    <select
                                        value={formData.relacionado_con}
                                        onChange={e => setFormData({ ...formData, relacionado_con: e.target.value, relacionado_id: '' })}
                                    >
                                        <option value="">Ninguno</option>
                                        <option value="lead">Lead</option>
                                        <option value="project">Proyecto</option>
                                    </select>
                                </div>
                                {formData.relacionado_con && (
                                    <div className="form-group">
                                        <label>Seleccionar {formData.relacionado_con === 'lead' ? 'Lead' : 'Proyecto'}</label>
                                        <select
                                            value={formData.relacionado_id}
                                            onChange={e => setFormData({ ...formData, relacionado_id: e.target.value })}
                                            required
                                        >
                                            <option value="">Seleccionar...</option>
                                            {formData.relacionado_con === 'lead'
                                                ? leads.map(l => <option key={l.id} value={l.id}>{l.nombre} - {l.empresa}</option>)
                                                : projects.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)
                                            }
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Etiquetas (Tags)</label>
                                <div className="tag-input-container">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={e => setTagInput(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                        placeholder="Escribe y presiona Enter..."
                                    />
                                    <button type="button" onClick={addTag} className="btn-small">Add</button>
                                </div>
                                <div className="tags-preview">
                                    {formData.tags.map(tag => (
                                        <span key={tag} className="tag-chip">
                                            #{tag}
                                            <button type="button" onClick={() => removeTag(tag)}>×</button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Notas / Descripción</label>
                                <textarea
                                    rows="3"
                                    value={formData.descripcion}
                                    onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
                                />
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                                <button type="submit" className="btn-primary">Crear Tarea</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TasksPage;
