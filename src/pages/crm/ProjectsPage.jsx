import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './CRMProjects.css';
import { FaList, FaColumns, FaPlus, FaFileImport } from 'react-icons/fa';
import DataImport from '../../components/crm/DataImport';

const ProjectsPage = () => {
    const [viewMode, setViewMode] = useState('kanban'); // Default to Kanban as requested
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);

    // Form and Edit State
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        cliente_id: '',
        estado: 'planificacion',
        fecha_fin: '',
        presupuesto: 0,
        responsable: ''
    });
    const [clients, setClients] = useState([]);
    const [users, setUsers] = useState([]);
    const [editingProject, setEditingProject] = useState(null);

    const statuses = [
        { id: 'planificacion', label: 'Planificación', color: '#64748b' },
        { id: 'en_progreso', label: 'En Progreso', color: '#0ea5e9' },
        { id: 'en_revision', label: 'En Revisión', color: '#f97316' },
        { id: 'completado', label: 'Completado', color: '#22c55e' },
        { id: 'pausado', label: 'Pausado', color: '#71717a' }
    ];

    useEffect(() => {
        loadProjects();
        loadClients();
        loadUsers();
    }, []);

    const loadProjects = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('projects')
                .select(`
                    *,
                    clients:cliente_id (nombre_negocio),
                    user_profiles:responsable (nombre_completo)
                `)
                .order('updated_at', { ascending: false });

            if (error) throw error;
            setProjects(data || []);
        } catch (error) {
            console.error('Error loading projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadClients = async () => {
        const { data } = await supabase.from('clients').select('id, nombre_negocio');
        setClients(data || []);
    };

    const loadUsers = async () => {
        const { data } = await supabase.from('user_profiles').select('id, nombre_completo').eq('activo', true);
        setUsers(data || []);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProject) {
                const { error } = await supabase
                    .from('projects')
                    .update(formData)
                    .eq('id', editingProject.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('projects')
                    .insert([formData]);
                if (error) throw error;
            }

            setShowModal(false);
            setEditingProject(null);
            resetForm();
            loadProjects();
        } catch (error) {
            console.error('Error saving project:', error);
            alert('Error al guardar el proyecto');
        }
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setFormData({
            nombre: project.nombre,
            descripcion: project.descripcion,
            cliente_id: project.cliente_id,
            estado: project.estado,
            fecha_fin: project.fecha_fin,
            presupuesto: project.presupuesto,
            responsable: project.responsable
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setFormData({
            nombre: '',
            descripcion: '',
            cliente_id: '',
            estado: 'planificacion',
            fecha_fin: '',
            presupuesto: 0,
            responsable: ''
        });
    };

    const updateProjectStatus = async (id, newStatus) => {
        try {
            const { error } = await supabase
                .from('projects')
                .update({ estado: newStatus })
                .eq('id', id);
            if (error) throw error;
            loadProjects();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const getStatusParams = (status) => {
        const currentCheck = statuses.find(s => s.id === status);
        return currentCheck ? { label: currentCheck.label, class: `status-${status}` } : { label: status, class: 'status-default' };
    };

    return (
        <div className="projects-page">
            <div className="projects-header">
                <div className="header-title">
                    <h1>Proyectos</h1>
                    <p>Gestiona y monitorea el progreso de tus proyectos</p>
                </div>
                <div className="header-actions">
                    <div className="view-toggle">
                        <button
                            className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            <FaList /> Lista
                        </button>
                        <button
                            className={`toggle-btn ${viewMode === 'kanban' ? 'active' : ''}`}
                            onClick={() => setViewMode('kanban')}
                        >
                            <FaColumns /> Tablero
                        </button>
                    </div>

                    <button className="btn-secondary" onClick={() => setShowImportModal(true)}>
                        <FaFileImport /> Importar
                    </button>

                    <button className="btn-primary" onClick={() => { setEditingProject(null); resetForm(); setShowModal(true); }}>
                        <FaPlus /> Nuevo Proyecto
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="loading-state">Cargando proyectos...</div>
            ) : (
                <>
                    {viewMode === 'list' ? (
                        <div className="projects-table-container">
                            <table className="projects-table">
                                <thead>
                                    <tr>
                                        <th>Nombre Proyecto</th>
                                        <th>Cliente</th>
                                        <th>Estado</th>
                                        <th>Fecha Fin</th>
                                        <th>Presupuesto</th>
                                        <th>Responsable</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="empty-state">No hay proyectos creados</td>
                                        </tr>
                                    ) : (
                                        projects.map(project => {
                                            const statusInfo = getStatusParams(project.estado);
                                            return (
                                                <tr key={project.id}>
                                                    <td style={{ fontWeight: '600' }}>{project.nombre}</td>
                                                    <td>{project.clients?.nombre_negocio || 'Sin Cliente'}</td>
                                                    <td>
                                                        <span className={`status-badge ${statusInfo.class}`}>
                                                            {statusInfo.label}
                                                        </span>
                                                    </td>
                                                    <td>{project.fecha_fin || '-'}</td>
                                                    <td>
                                                        {project.presupuesto
                                                            ? `$${project.presupuesto.toLocaleString()}`
                                                            : '-'}
                                                    </td>
                                                    <td>{project.user_profiles?.nombre_completo || 'Sin Asignar'}</td>
                                                    <td>
                                                        <button className="btn-icon" onClick={() => handleEdit(project)}>✏️</button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="kanban-board">
                            {statuses.map(status => (
                                <div key={status.id} className="kanban-column">
                                    <div className="column-header" style={{ borderTop: `3px solid ${status.color}`, background: '#1e293b' }}>
                                        <h3>{status.label}</h3>
                                        <span className="count">{projects.filter(p => p.estado === status.id).length}</span>
                                    </div>
                                    <div className="column-content">
                                        {projects.filter(p => p.estado === status.id).map(project => (
                                            <div key={project.id} className="kanban-card">
                                                <h4>{project.nombre}</h4>
                                                <p className="client-name">{project.clients?.nombre_negocio}</p>
                                                <div className="card-footer">
                                                    <span className="date">{project.fecha_fin}</span>
                                                    {project.user_profiles?.nombre_completo && (
                                                        <span className="avatar" title={project.user_profiles.nombre_completo}>
                                                            {project.user_profiles.nombre_completo.charAt(0)}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="card-actions">
                                                    <button onClick={() => handleEdit(project)} className="btn-icon-sm">✏️</button>
                                                    <select
                                                        value={project.estado}
                                                        onChange={(e) => updateProjectStatus(project.id, e.target.value)}
                                                        className="status-select-sm"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        {statuses.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Import Modal */}
            {showImportModal && (
                <DataImport
                    tableName="projects"
                    onClose={() => setShowImportModal(false)}
                    onImportComplete={() => {
                        loadProjects();
                        // Optional: Keep modal open or close it? Close for now.
                        // setShowImportModal(false); 
                    }}
                />
            )}

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h2>
                            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="project-form">
                            <div className="form-group">
                                <label>Nombre del Proyecto</label>
                                <input
                                    type="text"
                                    value={formData.nombre}
                                    onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Cliente</label>
                                    <select
                                        value={formData.cliente_id}
                                        onChange={e => setFormData({ ...formData, cliente_id: e.target.value })}
                                    >
                                        <option value="">Seleccionar Cliente</option>
                                        {clients.map(c => (
                                            <option key={c.id} value={c.id}>{c.nombre_negocio}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Estado</label>
                                    <select
                                        value={formData.estado}
                                        onChange={e => setFormData({ ...formData, estado: e.target.value })}
                                    >
                                        {statuses.map(s => (
                                            <option key={s.id} value={s.id}>{s.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Presupuesto</label>
                                    <input
                                        type="number"
                                        value={formData.presupuesto}
                                        onChange={e => setFormData({ ...formData, presupuesto: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Fecha Fin</label>
                                    <input
                                        type="date"
                                        value={formData.fecha_fin}
                                        onChange={e => setFormData({ ...formData, fecha_fin: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Responsable</label>
                                <select
                                    value={formData.responsable}
                                    onChange={e => setFormData({ ...formData, responsable: e.target.value })}
                                >
                                    <option value="">Sin Asignar</option>
                                    {users.map(u => (
                                        <option key={u.id} value={u.id}>{u.nombre_completo}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Descripción</label>
                                <textarea
                                    value={formData.descripcion}
                                    onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
                                    rows="3"
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                                <button type="submit" className="btn-primary">{editingProject ? 'Actualizar' : 'Crear'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectsPage;
