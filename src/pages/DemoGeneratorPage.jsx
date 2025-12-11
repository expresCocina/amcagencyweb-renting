import { useState } from 'react';
import DemoGeneratorForm from '../components/DemoGeneratorForm';
import DemoPreview from '../components/DemoPreview';
import { generateWebsiteMockup } from '../utils/demoGenerator';
import './DemoGeneratorPage.css';

const DemoGeneratorPage = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedDemo, setGeneratedDemo] = useState(null);
    const [error, setError] = useState(null);

    const handleGenerate = async (formData) => {
        setIsGenerating(true);
        setError(null);

        try {
            // Generate the mockup using AI
            const result = await generateWebsiteMockup(formData);

            // Note: In production, you would call your backend API here
            // Example:
            // const response = await fetch('/api/generate-demo', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ prompt: result.prompt, formData })
            // });
            // const data = await response.json();

            // For demonstration purposes, we'll simulate the generation
            // In production, replace this with actual API call
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Create demo data
            // In production, this would come from your API response
            const demoData = {
                imageUrl: result.imageUrl || generatePlaceholderImage(formData),
                formData: formData,
                timestamp: new Date().toISOString(),
                prompt: result.prompt
            };

            setGeneratedDemo(demoData);

            // Scroll to preview
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

    // Helper function to generate a professional placeholder image
    const generatePlaceholderImage = (formData) => {
        const canvas = document.createElement('canvas');
        canvas.width = 1920;
        canvas.height = 3200;
        const ctx = canvas.getContext('2d');

        // Color schemes with professional palettes
        const colorSchemes = {
            'cyan-magenta': {
                primary: '#00F0FF',
                secondary: '#A020F0',
                accent: '#1FFF9D',
                bg: '#0A0E17',
                cardBg: '#151923',
                text: '#FFFFFF',
                textSecondary: '#B8C1CC'
            },
            'blue-white': {
                primary: '#2563EB',
                secondary: '#3B82F6',
                accent: '#60A5FA',
                bg: '#F8FAFC',
                cardBg: '#FFFFFF',
                text: '#1E293B',
                textSecondary: '#64748B'
            },
            'gold-black': {
                primary: '#F59E0B',
                secondary: '#D97706',
                accent: '#FBBF24',
                bg: '#0F0F0F',
                cardBg: '#1A1A1A',
                text: '#FFFFFF',
                textSecondary: '#A3A3A3'
            },
            'green-earth': {
                primary: '#10B981',
                secondary: '#059669',
                accent: '#34D399',
                bg: '#F0FDF4',
                cardBg: '#FFFFFF',
                text: '#064E3B',
                textSecondary: '#6B7280'
            },
            'earth-tones': {
                primary: '#C2410C',
                secondary: '#EA580C',
                accent: '#FB923C',
                bg: '#FFF7ED',
                cardBg: '#FFFFFF',
                text: '#431407',
                textSecondary: '#78716C'
            },
            'purple-pink': {
                primary: '#A855F7',
                secondary: '#EC4899',
                accent: '#F472B6',
                bg: '#1E1B4B',
                cardBg: '#312E81',
                text: '#FFFFFF',
                textSecondary: '#C4B5FD'
            }
        };

        const colors = colorSchemes[formData.colors] || colorSchemes['cyan-magenta'];
        const isDark = ['cyan-magenta', 'gold-black', 'purple-pink'].includes(formData.colors);

        // Background with subtle gradient
        const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGradient.addColorStop(0, colors.bg);
        bgGradient.addColorStop(1, adjustColor(colors.bg, isDark ? 10 : -10));
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add subtle pattern overlay
        if (isDark) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
            for (let i = 0; i < canvas.width; i += 40) {
                for (let j = 0; j < canvas.height; j += 40) {
                    ctx.fillRect(i, j, 1, 1);
                }
            }
        }

        let yPos = 0;

        // Modern Header/Navbar
        const headerHeight = 100;
        ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.9)';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetY = 2;
        ctx.fillRect(0, 0, canvas.width, headerHeight);
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;

        // Logo
        ctx.fillStyle = colors.primary;
        ctx.font = 'bold 42px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial';
        ctx.fillText(formData.businessType.substring(0, 20), 80, 62);

        // Navigation
        ctx.fillStyle = colors.text;
        ctx.font = '20px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial';
        const navItems = ['Inicio', 'Servicios', 'Portafolio', 'Nosotros', 'Contacto'];
        navItems.forEach((item, i) => {
            ctx.fillText(item, 1300 + (i * 140), 62);
        });

        yPos = headerHeight + 120;

        // Hero Section - Modern and Spacious
        const heroHeight = 700;

        // Hero gradient background
        const heroGradient = ctx.createRadialGradient(
            canvas.width / 2, yPos + heroHeight / 2, 100,
            canvas.width / 2, yPos + heroHeight / 2, 800
        );
        heroGradient.addColorStop(0, colors.primary + '30');
        heroGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = heroGradient;
        ctx.fillRect(0, yPos, canvas.width, heroHeight);

        // Hero badge/tag
        ctx.fillStyle = colors.primary + '20';
        roundRect(ctx, canvas.width / 2 - 150, yPos + 40, 300, 50, 25, true, false);
        ctx.fillStyle = colors.primary;
        ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial';
        ctx.textAlign = 'center';
        ctx.fillText('✨ ' + formData.designStyle.toUpperCase(), canvas.width / 2, yPos + 72);

        // Hero Title - Large and Bold
        ctx.fillStyle = colors.text;
        ctx.font = 'bold 96px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial';
        ctx.textAlign = 'center';

        const titleWords = formData.businessType.split(' ');
        const line1 = titleWords.slice(0, Math.ceil(titleWords.length / 2)).join(' ');
        const line2 = titleWords.slice(Math.ceil(titleWords.length / 2)).join(' ');

        ctx.fillText(line1, canvas.width / 2, yPos + 200);
        if (line2) {
            // Gradient text for second line
            const textGradient = ctx.createLinearGradient(
                canvas.width / 2 - 400, yPos + 280,
                canvas.width / 2 + 400, yPos + 280
            );
            textGradient.addColorStop(0, colors.primary);
            textGradient.addColorStop(1, colors.secondary);
            ctx.fillStyle = textGradient;
            ctx.fillText(line2, canvas.width / 2, yPos + 300);
        }

        // Hero Subtitle
        ctx.fillStyle = colors.textSecondary;
        ctx.font = '32px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial';
        const subtitle = formData.description.substring(0, 90) + '...';
        wrapText(ctx, subtitle, canvas.width / 2, yPos + 380, 1000, 45);

        // CTA Buttons
        const btn1X = canvas.width / 2 - 280;
        const btn2X = canvas.width / 2 + 40;
        const btnY = yPos + 520;
        const btnWidth = 240;
        const btnHeight = 70;

        // Primary button with gradient
        const btnGradient = ctx.createLinearGradient(btn1X, btnY, btn1X + btnWidth, btnY + btnHeight);
        btnGradient.addColorStop(0, colors.primary);
        btnGradient.addColorStop(1, colors.secondary);
        ctx.fillStyle = btnGradient;
        ctx.shadowColor = colors.primary + '60';
        ctx.shadowBlur = 30;
        ctx.shadowOffsetY = 10;
        roundRect(ctx, btn1X, btnY, btnWidth, btnHeight, 35, true, false);
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial';
        ctx.fillText('Comenzar', btn1X + btnWidth / 2, btnY + 45);

        // Secondary button
        ctx.strokeStyle = colors.primary;
        ctx.lineWidth = 3;
        roundRect(ctx, btn2X, btnY, btnWidth, btnHeight, 35, false, true);
        ctx.fillStyle = colors.text;
        ctx.fillText('Saber Más', btn2X + btnWidth / 2, btnY + 45);

        yPos += heroHeight + 150;

        // Sections
        const selectedSections = formData.sections.slice(0, 5);
        selectedSections.forEach((section, index) => {
            const sectionNames = {
                hero: 'Bienvenida',
                services: 'Nuestros Servicios',
                products: 'Productos Destacados',
                about: 'Sobre Nosotros',
                portfolio: 'Portafolio',
                gallery: 'Galería',
                team: 'Nuestro Equipo',
                testimonials: 'Lo Que Dicen Nuestros Clientes',
                pricing: 'Planes y Precios',
                blog: 'Últimas Noticias',
                contact: 'Contáctanos',
                faq: 'Preguntas Frecuentes'
            };

            const sectionHeight = 500;

            // Alternating background
            if (index % 2 === 1) {
                ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)';
                ctx.fillRect(0, yPos - 50, canvas.width, sectionHeight + 100);
            }

            // Section title
            ctx.fillStyle = colors.text;
            ctx.font = 'bold 56px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial';
            ctx.textAlign = 'center';
            ctx.fillText(sectionNames[section] || section, canvas.width / 2, yPos + 40);

            // Accent line under title
            const lineGradient = ctx.createLinearGradient(
                canvas.width / 2 - 100, yPos + 60,
                canvas.width / 2 + 100, yPos + 60
            );
            lineGradient.addColorStop(0, 'transparent');
            lineGradient.addColorStop(0.5, colors.primary);
            lineGradient.addColorStop(1, 'transparent');
            ctx.fillStyle = lineGradient;
            ctx.fillRect(canvas.width / 2 - 100, yPos + 70, 200, 4);

            // Content cards
            const cardWidth = 480;
            const cardHeight = 280;
            const cardSpacing = 60;
            const totalWidth = cardWidth * 3 + cardSpacing * 2;
            const startX = (canvas.width - totalWidth) / 2;

            for (let i = 0; i < 3; i++) {
                const cardX = startX + (cardWidth + cardSpacing) * i;
                const cardY = yPos + 140;

                // Card shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
                ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
                ctx.shadowBlur = 40;
                ctx.shadowOffsetY = 20;
                roundRect(ctx, cardX, cardY, cardWidth, cardHeight, 20, true, false);
                ctx.shadowBlur = 0;
                ctx.shadowOffsetY = 0;

                // Card background
                ctx.fillStyle = colors.cardBg;
                roundRect(ctx, cardX, cardY, cardWidth, cardHeight, 20, true, false);

                // Card border
                ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
                ctx.lineWidth = 1;
                roundRect(ctx, cardX, cardY, cardWidth, cardHeight, 20, false, true);

                // Icon circle
                const iconSize = 80;
                const iconX = cardX + cardWidth / 2;
                const iconY = cardY + 70;

                const iconGradient = ctx.createLinearGradient(
                    iconX - iconSize / 2, iconY - iconSize / 2,
                    iconX + iconSize / 2, iconY + iconSize / 2
                );
                iconGradient.addColorStop(0, colors.primary + '30');
                iconGradient.addColorStop(1, colors.secondary + '30');
                ctx.fillStyle = iconGradient;
                ctx.beginPath();
                ctx.arc(iconX, iconY, iconSize / 2, 0, Math.PI * 2);
                ctx.fill();

                // Icon
                ctx.fillStyle = colors.primary;
                ctx.font = 'bold 40px Arial';
                ctx.textAlign = 'center';
                const icons = ['★', '◆', '●'];
                ctx.fillText(icons[i], iconX, iconY + 15);

                // Card title
                ctx.fillStyle = colors.text;
                ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial';
                ctx.fillText('Característica ' + (i + 1), iconX, cardY + 160);

                // Card description
                ctx.fillStyle = colors.textSecondary;
                ctx.font = '18px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial';
                ctx.fillText('Descripción de la característica', iconX, cardY + 195);
                ctx.fillText('y sus beneficios principales', iconX, cardY + 220);
            }

            yPos += sectionHeight + 100;
        });

        // Footer
        const footerHeight = 200;
        ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.9)';
        ctx.fillRect(0, yPos, canvas.width, footerHeight);

        ctx.fillStyle = colors.primary;
        ctx.font = 'bold 32px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial';
        ctx.textAlign = 'center';
        ctx.fillText(formData.businessType, canvas.width / 2, yPos + 70);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = '20px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial';
        ctx.fillText('© 2024 Todos los derechos reservados', canvas.width / 2, yPos + 110);

        ctx.fillStyle = colors.textSecondary;
        ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial';
        ctx.fillText('Diseñado con ❤️ por AMC Agency Web', canvas.width / 2, yPos + 145);

        return canvas.toDataURL('image/png');
    };

    // Helper function to wrap text
    function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';
        let lines = [];

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && n > 0) {
                lines.push(line);
                line = words[n] + ' ';
            } else {
                line = testLine;
            }
        }
        lines.push(line);

        lines.forEach((line, i) => {
            ctx.fillText(line, x, y + (i * lineHeight));
        });
    }

    // Helper function to adjust color brightness
    function adjustColor(color, amount) {
        const num = parseInt(color.replace('#', ''), 16);
        const r = Math.min(255, Math.max(0, (num >> 16) + amount));
        const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
        const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
        return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
    }

    // Helper function to draw rounded rectangles
    function roundRect(ctx, x, y, width, height, radius, fill = true, stroke = false) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        if (fill) ctx.fill();
        if (stroke) ctx.stroke();
    }

    const handleRegenerate = () => {
        if (generatedDemo && generatedDemo.formData) {
            handleGenerate(generatedDemo.formData);
        }
    };

    const handleDownload = () => {
        if (generatedDemo && generatedDemo.imageUrl) {
            // Create a temporary link and trigger download
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
            {/* Hero Section */}
            <section className="demo-hero section">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="gradient-text">Generador de Demos Web</h1>
                        <p className="hero-subtitle">
                            Visualiza tu sitio web en segundos. Describe tu negocio y nuestra IA creará
                            una vista previa profesional de tu futuro sitio web.
                        </p>
                        <div className="hero-stats">
                            <div className="stat-item">
                                <div className="stat-number">⚡ Instantáneo</div>
                                <div className="stat-label">Generación en segundos</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">🎨 Personalizado</div>
                                <div className="stat-label">Diseño único para ti</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">💯 Gratis</div>
                                <div className="stat-label">Sin costo ni compromiso</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Generator Section */}
            <section className="generator-section section">
                <div className="container">
                    <div className="generator-grid">
                        {/* Form Column */}
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

                        {/* Preview Column */}
                        <div className="preview-column">
                            {isGenerating ? (
                                <div className="generating-state">
                                    <div className="generating-content">
                                        <div className="generating-spinner"></div>
                                        <h3>Generando tu demo...</h3>
                                        <p>Nuestra IA está creando un diseño único para tu negocio</p>
                                        <div className="generating-steps">
                                            <div className="step active">
                                                <span className="step-icon">✓</span>
                                                <span>Analizando descripción</span>
                                            </div>
                                            <div className="step active">
                                                <span className="step-icon">⏳</span>
                                                <span>Generando diseño</span>
                                            </div>
                                            <div className="step">
                                                <span className="step-icon">○</span>
                                                <span>Optimizando resultado</span>
                                            </div>
                                        </div>
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

            {/* How It Works Section */}
            <section className="how-it-works section">
                <div className="container">
                    <h2 className="text-center gradient-text">¿Cómo Funciona?</h2>
                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <div className="step-icon-large">📝</div>
                            <h3>Describe tu Negocio</h3>
                            <p>Completa el formulario con información sobre tu negocio, estilo preferido y secciones que necesitas.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <div className="step-icon-large">🤖</div>
                            <h3>IA Genera el Diseño</h3>
                            <p>Nuestra inteligencia artificial crea un mockup profesional basado en tus especificaciones.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <div className="step-icon-large">🚀</div>
                            <h3>Convierte en Realidad</h3>
                            <p>¿Te gusta el resultado? Agenda una consulta y convertiremos el concepto en un sitio web real.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="final-cta section">
                <div className="container">
                    <div className="cta-box glass">
                        <h2>¿Listo para Crear tu Sitio Web Real?</h2>
                        <p>El demo es solo el comienzo. Trabajemos juntos para construir tu presencia digital profesional.</p>
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
