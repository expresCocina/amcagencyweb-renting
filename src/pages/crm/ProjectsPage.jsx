import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import KanbanBoard from '../../components/crm/KanbanBoard'; // Reusing or need to adapt?
import './ProjectsPage.css';
import { FaList, FaColumns, FaPlus, FaFileImport } from 'react-icons/fa';
// import DataImport from '../../components/crm/DataImport'; // To be implemented

const ProjectsPage = () => {
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'kanban'
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('projects')
                .select(`
                    *,
                    clients:cliente_id (nombre_empresa),
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

    const getStatusParams = (status) => {
        const statuses = {
            'planificacion': { label: 'Planificación', class: 'status-planificacion' },
            'en_progreso': { label: 'En Progreso', class: 'status-progreso' },
            'en_revision': { label: 'En Revisión', class: 'status-revision' },
            'completado': { label: 'Completado', class: 'status-completado' },
            'pausado': { label: 'Pausado', class: 'status-pausado' },
            'cancelado': { label: 'Cancelado', class: 'status-cancelado' }
        };
        return statuses[status] || { label: status, class: 'status-default' };
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

                    <button className="btn-primary" onClick={() => setShowModal(true)}>
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
                                                    <td>{project.clients?.nombre_empresa || 'Sin Cliente'}</td>
                                                    <td>
                                                        <span className={`status-badge ${statusInfo.class}`}>
                                                            {statusInfo.label}
                                                        </span>
                                                    </td>
                                                    <td>{project.fecha_fin || '-'}</td>
                                                    <td>${project.presupuesto?.toLocaleString()}</td>
                                                    <td>{project.user_profiles?.nombre_completo || 'Sin Asignar'}</td>
                                                    <td>
                                                        <button className="btn-icon">✏️</button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="kanban-placeholder">
                            {/* <KanbanBoard projects={projects} /> */}
                            <p style={{ color: '#94a3b8', textAlign: 'center', padding: '40px' }}>
                                Vista Kanban en construcción... (Usar componente Deals Kanban adaptado)
                            </p>
                        </div>
                    )}
                </>
            )}

            {/* Modals will go here */}
        </div>
    );
};

export default ProjectsPage;
