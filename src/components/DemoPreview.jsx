import { useState } from 'react';
import './DemoPreview.css';

const DemoPreview = ({ demoData, onRegenerate, onDownload }) => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [showActions, setShowActions] = useState(true);

    if (!demoData) {
        return (
            <div className="demo-preview-empty">
                <div className="empty-state">
                    <div className="empty-icon">🎨</div>
                    <h3>Tu Demo Aparecerá Aquí</h3>
                    <p>Completa el formulario y haz clic en "Generar Demo" para ver la vista previa de tu sitio web.</p>
                    <div className="empty-features">
                        <div className="feature-item">
                            <span className="feature-icon">⚡</span>
                            <span>Generación instantánea</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">🎯</span>
                            <span>Diseño personalizado</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">📱</span>
                            <span>100% responsive</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const handleZoomToggle = () => {
        setIsZoomed(!isZoomed);
    };

    return (
        <div className="demo-preview">
            <div className="preview-header">
                <h3>Vista Previa Generada</h3>
                <div className="preview-controls">
                    <button
                        className="control-btn"
                        onClick={handleZoomToggle}
                        title={isZoomed ? "Reducir" : "Ampliar"}
                    >
                        {isZoomed ? '🔍-' : '🔍+'}
                    </button>
                    <button
                        className="control-btn"
                        onClick={() => setShowActions(!showActions)}
                        title="Mostrar/Ocultar acciones"
                    >
                        {showActions ? '👁️' : '👁️‍🗨️'}
                    </button>
                </div>
            </div>

            <div className={`preview-container ${isZoomed ? 'zoomed' : ''}`}>
                <div className="preview-image-wrapper">
                    <img
                        src={demoData.imageUrl}
                        alt="Vista previa del sitio web generado"
                        className="preview-image"
                        onClick={handleZoomToggle}
                    />

                    {/* Disclaimer Overlay */}
                    <div className="preview-disclaimer">
                        <span className="disclaimer-icon">ℹ️</span>
                        <span className="disclaimer-text">
                            Esta es una representación aproximada. El diseño final puede variar.
                        </span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            {showActions && (
                <div className="preview-actions">
                    <div className="actions-grid">
                        <button
                            className="action-btn btn-secondary"
                            onClick={onRegenerate}
                        >
                            <span className="btn-icon">🔄</span>
                            Regenerar
                        </button>

                        <button
                            className="action-btn btn-download"
                            onClick={onDownload}
                        >
                            <span className="btn-icon">⬇️</span>
                            Descargar
                        </button>
                    </div>

                    <div className="cta-section">
                        <div className="cta-content">
                            <h4>¿Te gusta lo que ves?</h4>
                            <p>Convierte este concepto en un sitio web real y profesional</p>
                        </div>
                        <div className="cta-buttons">
                            <a href="/agendar" className="btn btn-primary">
                                <span className="btn-icon">📅</span>
                                Agendar Consulta
                            </a>
                            <a href="/calculadora" className="btn btn-secondary">
                                <span className="btn-icon">💰</span>
                                Calcular Presupuesto
                            </a>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="demo-info">
                        <div className="info-card">
                            <div className="info-icon">✨</div>
                            <div className="info-content">
                                <h5>Diseño Personalizado</h5>
                                <p>Este demo se generó basado en tu descripción única</p>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">🚀</div>
                            <div className="info-content">
                                <h5>Listo para Producción</h5>
                                <p>Podemos convertir este concepto en código real en días</p>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">🎯</div>
                            <div className="info-content">
                                <h5>Optimizado para Conversión</h5>
                                <p>Diseñado para atraer y convertir visitantes en clientes</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DemoPreview;
