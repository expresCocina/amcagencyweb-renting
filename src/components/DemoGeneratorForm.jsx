import { useState } from 'react';
import './DemoGeneratorForm.css';

const DemoGeneratorForm = ({ onGenerate, isGenerating }) => {
    const [formData, setFormData] = useState({
        businessType: '',
        description: '',
        designStyle: 'modern',
        colors: 'cyan-magenta',
        sections: ['hero', 'services', 'contact'],
        additionalNotes: ''
    });

    const [charCount, setCharCount] = useState(0);
    const maxChars = 500;

    const examplePrompts = [
        {
            title: "Restaurante Gourmet",
            data: {
                businessType: "Restaurante de alta cocina",
                description: "Restaurante especializado en cocina mediterránea con ingredientes orgánicos. Ambiente elegante y sofisticado. Menú degustación y carta de vinos premium.",
                designStyle: "elegant",
                colors: "gold-black",
                sections: ['hero', 'menu', 'gallery', 'reservations', 'contact']
            }
        },
        {
            title: "Tienda de Moda",
            data: {
                businessType: "Boutique de moda sostenible",
                description: "Tienda online de ropa eco-friendly y accesorios artesanales. Diseños únicos y producción ética. Público joven y consciente del medio ambiente.",
                designStyle: "minimalist",
                colors: "earth-tones",
                sections: ['hero', 'products', 'about', 'sustainability', 'shop']
            }
        },
        {
            title: "Agencia Digital",
            data: {
                businessType: "Agencia de marketing digital",
                description: "Agencia especializada en SEO, redes sociales y publicidad digital. Equipo joven y creativo. Resultados medibles y estrategias personalizadas.",
                designStyle: "modern",
                colors: "cyan-magenta",
                sections: ['hero', 'services', 'portfolio', 'testimonials', 'contact']
            }
        },
        {
            title: "Clínica Dental",
            data: {
                businessType: "Clínica dental moderna",
                description: "Clínica dental con tecnología de punta. Tratamientos estéticos y preventivos. Ambiente relajante y profesional. Atención personalizada.",
                designStyle: "clean",
                colors: "blue-white",
                sections: ['hero', 'services', 'team', 'testimonials', 'booking']
            }
        }
    ];

    const designStyles = [
        { value: 'modern', label: 'Moderno', icon: '✨' },
        { value: 'minimalist', label: 'Minimalista', icon: '⚪' },
        { value: 'bold', label: 'Audaz', icon: '🔥' },
        { value: 'elegant', label: 'Elegante', icon: '💎' },
        { value: 'clean', label: 'Limpio', icon: '🎯' },
        { value: 'creative', label: 'Creativo', icon: '🎨' }
    ];

    const colorSchemes = [
        { value: 'cyan-magenta', label: 'Cyan & Magenta', preview: 'linear-gradient(135deg, #00F0FF, #A020F0)' },
        { value: 'blue-white', label: 'Azul & Blanco', preview: 'linear-gradient(135deg, #4A90E2, #FFFFFF)' },
        { value: 'gold-black', label: 'Dorado & Negro', preview: 'linear-gradient(135deg, #FFD700, #1A1A1A)' },
        { value: 'green-earth', label: 'Verde & Tierra', preview: 'linear-gradient(135deg, #2ECC71, #8B4513)' },
        { value: 'earth-tones', label: 'Tonos Tierra', preview: 'linear-gradient(135deg, #D4A574, #8B7355)' },
        { value: 'purple-pink', label: 'Púrpura & Rosa', preview: 'linear-gradient(135deg, #9B59B6, #FF69B4)' }
    ];

    const availableSections = [
        { value: 'hero', label: 'Hero/Portada' },
        { value: 'services', label: 'Servicios' },
        { value: 'products', label: 'Productos' },
        { value: 'about', label: 'Sobre Nosotros' },
        { value: 'portfolio', label: 'Portafolio' },
        { value: 'gallery', label: 'Galería' },
        { value: 'team', label: 'Equipo' },
        { value: 'testimonials', label: 'Testimonios' },
        { value: 'pricing', label: 'Precios' },
        { value: 'blog', label: 'Blog' },
        { value: 'contact', label: 'Contacto' },
        { value: 'faq', label: 'FAQ' }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (field === 'description') {
            setCharCount(value.length);
        }
    };

    const handleSectionToggle = (section) => {
        setFormData(prev => ({
            ...prev,
            sections: prev.sections.includes(section)
                ? prev.sections.filter(s => s !== section)
                : [...prev.sections, section]
        }));
    };

    const loadExample = (example) => {
        setFormData(example.data);
        setCharCount(example.data.description.length);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.businessType && formData.description) {
            onGenerate(formData);
        }
    };

    return (
        <div className="demo-generator-form">
            <div className="form-header">
                <h2 className="gradient-text">Describe Tu Negocio</h2>
                <p>Completa los campos y generaremos una vista previa de tu sitio web</p>
            </div>

            {/* Example Prompts */}
            <div className="example-prompts">
                <h4>💡 Ejemplos Rápidos</h4>
                <div className="prompts-grid">
                    {examplePrompts.map((example, index) => (
                        <button
                            key={index}
                            type="button"
                            className="prompt-card"
                            onClick={() => loadExample(example)}
                            disabled={isGenerating}
                        >
                            {example.title}
                        </button>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="generator-form">
                {/* Business Type */}
                <div className="form-group">
                    <label htmlFor="businessType">
                        Tipo de Negocio <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="businessType"
                        value={formData.businessType}
                        onChange={(e) => handleInputChange('businessType', e.target.value)}
                        placeholder="Ej: Restaurante, Tienda Online, Agencia, Clínica..."
                        required
                        disabled={isGenerating}
                    />
                </div>

                {/* Description */}
                <div className="form-group">
                    <label htmlFor="description">
                        Descripción del Negocio <span className="required">*</span>
                        <span className="char-counter">{charCount}/{maxChars}</span>
                    </label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Describe tu negocio, servicios, público objetivo, valores únicos..."
                        rows="5"
                        maxLength={maxChars}
                        required
                        disabled={isGenerating}
                    />
                </div>

                {/* Design Style */}
                <div className="form-group">
                    <label>Estilo de Diseño</label>
                    <div className="style-grid">
                        {designStyles.map(style => (
                            <button
                                key={style.value}
                                type="button"
                                className={`style-option ${formData.designStyle === style.value ? 'active' : ''}`}
                                onClick={() => handleInputChange('designStyle', style.value)}
                                disabled={isGenerating}
                            >
                                <span className="style-icon">{style.icon}</span>
                                <span className="style-label">{style.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Color Scheme */}
                <div className="form-group">
                    <label>Esquema de Colores</label>
                    <div className="color-grid">
                        {colorSchemes.map(scheme => (
                            <button
                                key={scheme.value}
                                type="button"
                                className={`color-option ${formData.colors === scheme.value ? 'active' : ''}`}
                                onClick={() => handleInputChange('colors', scheme.value)}
                                disabled={isGenerating}
                            >
                                <div
                                    className="color-preview"
                                    style={{ background: scheme.preview }}
                                />
                                <span className="color-label">{scheme.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sections */}
                <div className="form-group">
                    <label>Secciones Requeridas (mínimo 3)</label>
                    <div className="sections-grid">
                        {availableSections.map(section => (
                            <button
                                key={section.value}
                                type="button"
                                className={`section-chip ${formData.sections.includes(section.value) ? 'active' : ''}`}
                                onClick={() => handleSectionToggle(section.value)}
                                disabled={isGenerating}
                            >
                                {section.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Additional Notes */}
                <div className="form-group">
                    <label htmlFor="additionalNotes">Referencias o Notas Adicionales (Opcional)</label>
                    <textarea
                        id="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                        placeholder="Agrega cualquier detalle adicional, inspiración o requisitos específicos..."
                        rows="3"
                        disabled={isGenerating}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary btn-generate"
                    disabled={isGenerating || !formData.businessType || !formData.description || formData.sections.length < 3}
                >
                    {isGenerating ? (
                        <>
                            <span className="spinner"></span>
                            Generando Demo...
                        </>
                    ) : (
                        <>
                            <span className="icon">🚀</span>
                            Generar Demo
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default DemoGeneratorForm;
