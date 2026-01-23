import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { FaSearch, FaUser, FaBuilding, FaProjectDiagram } from 'react-icons/fa';
import './GlobalSearch.css';

const GlobalSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({ leads: [], clients: [], projects: [] });
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim().length >= 2) {
                performSearch(query);
            } else {
                setResults({ leads: [], clients: [], projects: [] });
            }
        }, 300); // Debounce

        return () => clearTimeout(timer);
    }, [query]);

    const performSearch = async (searchTerm) => {
        setLoading(true);
        setIsOpen(true);
        const term = `%${searchTerm}%`;

        try {
            const [leadsRes, clientsRes, projectsRes] = await Promise.all([
                supabase.from('leads').select('id, nombre, empresa').or(`nombre.ilike.${term},empresa.ilike.${term},email.ilike.${term}`).limit(5),
                supabase.from('clients').select('id, nombre_negocio, nombre_representante').or(`nombre_negocio.ilike.${term},nombre_representante.ilike.${term},email.ilike.${term}`).limit(5),
                supabase.from('projects').select('id, nombre').ilike('nombre', term).limit(5)
            ]);

            setResults({
                leads: leadsRes.data || [],
                clients: clientsRes.data || [],
                projects: projectsRes.data || []
            });
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (type, id) => {
        setQuery('');
        setIsOpen(false);
        if (type === 'lead') {
            navigate(`/crm/leads?id=${id}`); // Uses our deep-link logic
        } else if (type === 'client') {
            navigate(`/crm/clients`); // Todo: Deep link for clients? For now just list
        } else if (type === 'project') {
            navigate(`/crm/projects`);
        }
    };

    const hasResults = results.leads.length > 0 || results.clients.length > 0 || results.projects.length > 0;

    return (
        <div className="global-search-wrapper" ref={searchRef}>
            <div className="search-input-group">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Buscar leads, clientes, proyectos..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length >= 2 && setIsOpen(true)}
                    className="global-search-input"
                />
                {loading && <div className="search-spinner"></div>}
            </div>

            {isOpen && (query.length >= 2) && (
                <div className="search-results-dropdown">
                    {!hasResults && !loading ? (
                        <div className="search-no-results">No se encontraron resultados</div>
                    ) : (
                        <>
                            {results.leads.length > 0 && (
                                <div className="search-section">
                                    <h4><FaUser /> Leads</h4>
                                    {results.leads.map(item => (
                                        <div key={item.id} className="search-result-item" onClick={() => handleSelect('lead', item.id)}>
                                            <div className="result-main">{item.nombre}</div>
                                            <div className="result-sub">{item.empresa}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {results.clients.length > 0 && (
                                <div className="search-section">
                                    <h4><FaBuilding /> Clientes</h4>
                                    {results.clients.map(item => (
                                        <div key={item.id} className="search-result-item" onClick={() => handleSelect('client', item.id)}>
                                            <div className="result-main">{item.nombre_negocio}</div>
                                            <div className="result-sub">{item.nombre_representante}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {results.projects.length > 0 && (
                                <div className="search-section">
                                    <h4><FaProjectDiagram /> Proyectos</h4>
                                    {results.projects.map(item => (
                                        <div key={item.id} className="search-result-item" onClick={() => handleSelect('project', item.id)}>
                                            <div className="result-main">{item.nombre}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default GlobalSearch;
