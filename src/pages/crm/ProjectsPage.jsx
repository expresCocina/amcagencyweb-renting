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
        selected_entity: '', // Combined ID (prefix + id)
        estado: 'planificacion',
        fecha_entrega_estimada: '',
        valor_proyecto: 0,
        responsable: '',
        organization_id: '' // Add organization_id
    });
    const [clients, setClients] = useState([]);
    const [leads, setLeads] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentUserOrg, setCurrentUserOrg] = useState(null); // Store current user's org
    const [editingProject, setEditingProject] = useState(null);

    const statuses = [
        { id: 'planificacion', label: 'Planificación', color: '#64748b' },
        { id: 'en_progreso', label: 'En Progreso', color: '#0ea5e9' },
        { id: 'en_revision', label: 'En Revisión', color: '#f97316' },
        { id: 'completado', label: 'Completado', color: '#22c55e' },
        { id: 'pausado', label: 'Pausado', color: '#71717a' }
    ];

    useEffect(() => {
        loadCurrentUserOrg(); // Load current user's org first
        loadProjects();
        loadClients();
        loadLeads();
        loadUsers();
    }, []);

    const loadCurrentUserOrg = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: profile } = await supabase
                    .from('user_profiles')
                    .select('organization_id')
                    .eq('id', user.id)
                    .single();

                if (profile) {
                    setCurrentUserOrg(profile.organization_id);
                }
            }
        } catch (error) {
            console.error('Error loading user org:', error);
        }
    };

    const loadProjects = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('projects')
                .select(`
                    *,
                    clients:cliente_id (nombre_negocio),
                    leads:lead_id (nombre, empresa),
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

    const loadLeads = async () => {
        const { data } = await supabase.from('leads').select('id, nombre, empresa');
        setLeads(data || []);
    };

    const loadUsers = async () => {
        const { data } = await supabase
            .from('user_profiles')
            .select('id, nombre_completo')
            .eq('activo', true)
            .in('rol', ['admin', 'vendedor']); // Only show staff
        setUsers(data || []);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!currentUserOrg) {
                alert('No se pudo identificar la organización del usuario. Recargue la página.');
                return;
            }

            // Parse selected entity
            let cliente_id = null;
            let lead_id = null;

            if (formData.selected_entity) {
                const [type, id] = formData.selected_entity.split(':');
                if (type === 'client') cliente_id = id;
                if (type === 'lead') lead_id = id;
            }

            // Sanitize payload: valid UUID or null
            const payload = {
                nombre: formData.nombre,
                descripcion: formData.descripcion,
                cliente_id: cliente_id,
                lead_id: lead_id,
                estado: formData.estado,
                valor_proyecto: formData.valor_proyecto || 0,
                responsable: formData.responsable || null,
                fecha_entrega_estimada: formData.fecha_entrega_estimada || null,
                organization_id: currentUserOrg // Include organization_id
            };

            if (editingProject) {
                // Don't update organization_id on edit unless intended, usually stays same
                const { organization_id, ...updatePayload } = payload;
                const { error } = await supabase
                    .from('projects')
                    .update(updatePayload)
                    .eq('id', editingProject.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('projects')
                    .insert([payload]);
                if (error) throw error;
            }

            setShowModal(false);
            setEditingProject(null);
            resetForm();
            loadProjects();
        } catch (error) {
            console.error('Error saving project:', error);
            alert('Error al guardar el proyecto: ' + error.message);
        }
    };

    const handleEdit = (project) => {
        setEditingProject(project);

        // Determine selected entity string
        let selected = '';
        if (project.cliente_id) selected = `client:${project.cliente_id}`;
        else if (project.lead_id) selected = `lead:${project.lead_id}`;

        setFormData({
            nombre: project.nombre,
            descripcion: project.descripcion,
            selected_entity: selected,
            estado: project.estado,
            fecha_entrega_estimada: project.fecha_entrega_estimada,
            valor_proyecto: project.valor_proyecto,
            responsable: project.responsable
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setFormData({
            nombre: '',
            descripcion: '',
            selected_entity: '',
            estado: 'planificacion',
            fecha_entrega_estimada: '',
            valor_proyecto: 0,
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

    // Helper to get display name
    const getEntityName = (project) => {
        if (project.clients?.nombre_negocio) return project.clients.nombre_negocio;
        if (project.leads?.empresa) return `${project.leads.empresa} (Lead)`;
        if (project.leads?.nombre) return `${project.leads.nombre} (Lead)`;
        return 'Sin Asignar';
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
                                        <th>Cliente / Lead</th>
                                        <th>Estado</th>
                                        <th>Fecha Fin (Est.)</th>
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
                                                    <td>{getEntityName(project)}</td>
                                                    <td>
                                                        <span className={`status-badge ${statusInfo.class}`}>
                                                            {statusInfo.label}
                                                        </span>
                                                    </td>
                                                    <td>{project.fecha_entrega_estimada || '-'}</td>
                                                    <td>
                                                        {project.valor_proyecto
                                                            ? `$${project.valor_proyecto.toLocaleString()}`
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
                                                <p className="client-name">{getEntityName(project)}</p>
                                                <div className="card-footer">
                                                    <span className="date">{project.fecha_entrega_estimada}</span>
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
                                    <label>Cliente / Lead</label>
                                    <select
                                        value={formData.selected_entity}
                                        onChange={e => setFormData({ ...formData, selected_entity: e.target.value })}
                                    >
                                        <option value="">Seleccionar...</option>
                                        <optgroup label="Clientes">
                                            {clients.map(c => (
                                                <option key={c.id} value={`client:${c.id}`}>{c.nombre_negocio}</option>
                                            ))}
                                        </optgroup>
                                        <optgroup label="Leads">
                                            {leads.map(l => (
                                                <option key={l.id} value={`lead:${l.id}`}>{l.empresa || l.nombre} (Lead)</option>
                                            ))}
                                        </optgroup>
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
                                    <label>Valor Proyecto (Presupuesto)</label>
                                    <input
                                        type="number"
                                        value={formData.valor_proyecto}
                                        onChange={e => setFormData({ ...formData, valor_proyecto: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Fecha Entrega Estimada</label>
                                    <input
                                        type="date"
                                        value={formData.fecha_entrega_estimada}
                                        onChange={e => setFormData({ ...formData, fecha_entrega_estimada: e.target.value })}
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
