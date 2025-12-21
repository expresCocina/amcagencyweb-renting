import { useState } from 'react';
import DemoGeneratorForm from '../components/DemoGeneratorForm';
import DemoPreview from '../components/DemoPreview';
import { generateWebsiteMockup } from '../utils/demoGenerator';
import { trackEvent } from '../utils/analytics';
import './SharedPageStyles.css';
import './DemoGeneratorPage.css';

const DemoGeneratorPage = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedDemo, setGeneratedDemo] = useState(null);
    const [error, setError] = useState(null);

    const handleGenerate = async (formData) => {
        setIsGenerating(true);
        setError(null);

        try {
            const result = await generateWebsiteMockup(formData);
            await new Promise(resolve => setTimeout(resolve, 3000));

            const demoData = {
                imageUrl: result.imageUrl || generatePlaceholderImage(formData),
                formData: formData,
                timestamp: new Date().toISOString(),
                prompt: result.prompt
            };

            setGeneratedDemo(demoData);
            trackEvent('demo_generated', formData);

            setTimeout(() => {
                const previewElement = document.querySelector('.demo-preview');
                if (previewElement) {
                    previewElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);

        } catch (err) {
            console.error('Error generating demo:', err);
            setError('Hubo un error al generar el demo. Por favor, intenta nuevamente.');
        } finally {
            setIsGenerating(false);
        }
    };

    const generatePlaceholderImage = (formData) => {
        const canvas = document.createElement('canvas');
        canvas.width = 1920;
        canvas.height = 1080;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#0A0E17';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00F0FF';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(formData.businessType || 'Tu Negocio', canvas.width / 2, canvas.height / 2);

        ctx.fillStyle = '#B8C1CC';
        ctx.font = '24px Arial';
        ctx.fillText(formData.description?.substring(0, 50) || 'Descripción de tu negocio', canvas.width / 2, canvas.height / 2 + 60);

        return canvas.toDataURL('image/png');
    };

    const handleRegenerate = () => {
        if (generatedDemo && generatedDemo.formData) {
            handleGenerate(generatedDemo.formData);
        }
    };

    const handleDownload = () => {
        if (generatedDemo && generatedDemo.imageUrl) {
            const link = document.createElement('a');
            link.href = generatedDemo.imageUrl;
            link.download = `website-demo-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="demo-generator-page">
            <section className="demo-hero section">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="gradient-text">Generador de Demos Web</h1>
                        <p className="hero-subtitle">
                            Visualiza tu sitio web en segundos. Describe tu negocio y nuestra IA creará
                            una vista previa profesional de tu futuro sitio web.
                        </p>
                    </div>
                </div>
            </section>

            <section className="generator-section section">
                <div className="container">
                    <div className="generator-grid">
                        <div className="form-column">
                            <DemoGeneratorForm
                                onGenerate={handleGenerate}
                                isGenerating={isGenerating}
                            />
                            {error && (
                                <div className="error-message">
                                    <span className="error-icon">⚠️</span>
                                    <span>{error}</span>
                                </div>
                            )}
                        </div>

                        <div className="preview-column">
                            {isGenerating ? (
                                <div className="generating-state">
                                    <div className="generating-content">
                                        <div className="generating-spinner"></div>
                                        <h3>Generando tu demo...</h3>
                                        <p>Nuestra IA está creando un diseño único para tu negocio</p>
                                    </div>
                                </div>
                            ) : (
                                <DemoPreview
                                    demoData={generatedDemo}
                                    onRegenerate={handleRegenerate}
                                    onDownload={handleDownload}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="how-it-works section">
                <div className="container">
                    <h2 className="text-center gradient-text">¿Cómo Funciona?</h2>
                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h3>Describe tu Negocio</h3>
                            <p>Completa el formulario con información sobre tu negocio.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h3>IA Genera el Diseño</h3>
                            <p>Nuestra IA crea un mockup profesional.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h3>Convierte en Realidad</h3>
                            <p>Agenda una consulta y construyamos tu sitio web.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="final-cta section">
                <div className="container">
                    <div className="cta-box glass">
                        <h2>¿Listo para Crear tu Sitio Web Real?</h2>
                        <p>El demo es solo el comienzo.</p>
                        <div className="cta-buttons-row">
                            <a href="/agendar" className="btn btn-primary">
                                Agendar Consulta Gratis
                            </a>
                            <a href="/desarrollo-web" className="btn btn-secondary">
                                Ver Nuestros Servicios
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DemoGeneratorPage;
