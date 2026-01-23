import { useState } from 'react';
import * as XLSX from 'xlsx';
import { supabase } from '../../supabaseClient';
import { FaUpload, FaFileExcel, FaCheck, FaTimes } from 'react-icons/fa';
import './DataImport.css';

const DataImport = ({ tableName, onClose, onImportComplete }) => {
    const [step, setStep] = useState(1); // 1: Upload, 2: Preview & Map, 3: Importing
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [mapping, setMapping] = useState({});
    const [importing, setImporting] = useState(false);
    const [results, setResults] = useState(null);

    // DB Schema definition for mapping options
    const schemas = {
        leads: [
            { field: 'nombre', label: 'Nombre Completo', required: true },
            { field: 'empresa', label: 'Empresa', required: false },
            { field: 'email', label: 'Email', required: false },
            { field: 'telefono', label: 'Teléfono', required: false },
            { field: 'estado', label: 'Estado', required: false, default: 'nuevo' },
            { field: 'fuente', label: 'Fuente', required: false, default: 'importado' },
            { field: 'notas', label: 'Notas', required: false },
        ],
        clients: [
            { field: 'nombre_negocio', label: 'Nombre Negocio', required: true },
            { field: 'contacto_principal', label: 'Contacto Principal', required: false },
            { field: 'email', label: 'Email', required: false },
            { field: 'telefono', label: 'Teléfono', required: false },
            { field: 'direccion', label: 'Dirección', required: false },
        ],
        projects: [
            { field: 'nombre', label: 'Nombre Proyecto', required: true },
            { field: 'descripcion', label: 'Descripción', required: false },
            { field: 'estado', label: 'Estado', required: false, default: 'planificacion' },
            { field: 'presupuesto', label: 'Presupuesto', required: false },
            { field: 'fecha_inicio', label: 'Fecha Inicio', required: false },
            { field: 'fecha_fin', label: 'Fecha Fin', required: false },
        ]
    };

    const currentSchema = schemas[tableName] || [];

    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        if (!uploadedFile) return;

        setFile(uploadedFile);
        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

            if (jsonData.length > 0) {
                const headers = jsonData[0];
                const rows = jsonData.slice(1);

                setColumns(headers);
                setData(rows);
                setStep(2);

                // Auto-map based on similar names
                const newMapping = {};
                currentSchema.forEach(schemaField => {
                    const match = headers.find(h =>
                        h.toLowerCase().includes(schemaField.field) ||
                        h.toLowerCase().includes(schemaField.label.toLowerCase())
                    );
                    if (match) newMapping[schemaField.field] = match;
                });
                setMapping(newMapping);
            }
        };
        reader.readAsBinaryString(uploadedFile);
    };

    const handleMappingChange = (dbField, excelHeader) => {
        setMapping(prev => ({
            ...prev,
            [dbField]: excelHeader
        }));
    };

    const processImport = async () => {
        setImporting(true);
        let successCount = 0;
        let errorCount = 0;

        try {
            const recordsToInsert = data.map(row => {
                const record = {};
                currentSchema.forEach(field => {
                    const mappedHeader = mapping[field.field];
                    if (mappedHeader) {
                        const colIndex = columns.indexOf(mappedHeader);
                        if (colIndex !== -1) {
                            record[field.field] = row[colIndex];
                        }
                    }
                    // Apply defaults if empty
                    if (!record[field.field] && field.default) {
                        record[field.field] = field.default;
                    }
                });
                return record;
            }).filter(r => {
                // Filter out empty rows based on required fields
                return currentSchema.every(f => !f.required || r[f.field]);
            });

            if (recordsToInsert.length === 0) {
                alert('No hay datos válidos para importar según el mapeo.');
                setImporting(false);
                return;
            }

            // Batch insert
            const { error } = await supabase
                .from(tableName)
                .insert(recordsToInsert);

            if (error) throw error;
            successCount = recordsToInsert.length;

        } catch (error) {
            console.error('Import error:', error);
            errorCount = data.length; // Assume all failed on batch error
        }

        setResults({ success: successCount, error: errorCount });
        setStep(3);
        setImporting(false);
        if (onImportComplete) onImportComplete();
    };

    return (
        <div className="import-modal">
            <div className="import-content">
                <div className="import-header">
                    <h2>Importar {tableName}</h2>
                    <button onClick={onClose} className="close-btn"><FaTimes /></button>
                </div>

                <div className="import-body">
                    {step === 1 && (
                        <div className="upload-step">
                            <div className="drop-zone">
                                <FaFileExcel className="excel-icon" />
                                <p>Arrastra tu archivo Excel (.xlsx) o CSV aquí</p>
                                <input
                                    type="file"
                                    accept=".xlsx, .xls, .csv"
                                    onChange={handleFileUpload}
                                />
                            </div>
                            <div className="template-info">
                                <p>Columnas esperadas:</p>
                                <div className="tags">
                                    {currentSchema.map(f => (
                                        <span key={f.field} className={f.required ? 'tag required' : 'tag'}>
                                            {f.label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="mapping-step">
                            <p className="step-desc">Asocia las columnas de tu Excel con los campos del CRM</p>
                            <div className="mapping-grid">
                                {currentSchema.map(field => (
                                    <div key={field.field} className="mapping-row">
                                        <div className="db-field">
                                            {field.label} {field.required && <span className="req">*</span>}
                                        </div>
                                        <div className="arrow">→</div>
                                        <div className="excel-field">
                                            <select
                                                value={mapping[field.field] || ''}
                                                onChange={(e) => handleMappingChange(field.field, e.target.value)}
                                            >
                                                <option value="">-- Ignorar --</option>
                                                {columns.map(col => (
                                                    <option key={col} value={col}>{col}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="preview-info">
                                <p>Se importarán <strong>{data.length}</strong> registros.</p>
                            </div>
                        </div>
                    )}

                    {step === 3 && results && (
                        <div className="result-step">
                            <div className="success-icon-large">
                                <FaCheck />
                            </div>
                            <h3>¡Importación Completada!</h3>
                            <p>Se importaron {results.success} registros correctamente.</p>
                            {results.error > 0 && <p className="error-text">Hubo problemas con {results.error} registros.</p>}
                        </div>
                    )}
                </div>

                <div className="import-footer">
                    {step === 1 && (
                        <button className="btn-secondary" onClick={onClose}>Cancelar</button>
                    )}
                    {step === 2 && (
                        <>
                            <button className="btn-secondary" onClick={() => setStep(1)}>Atrás</button>
                            <button
                                className="btn-primary"
                                onClick={processImport}
                                disabled={importing}
                            >
                                {importing ? 'Importando...' : 'Comenzar Importación'}
                            </button>
                        </>
                    )}
                    {step === 3 && (
                        <button className="btn-primary" onClick={onClose}>Finalizar</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DataImport;
