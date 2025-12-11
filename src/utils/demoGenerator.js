/**
 * Generate a website demo mockup using AI image generation
 * @param {Object} formData - The form data from the demo generator
 * @returns {Promise<string>} - URL of the generated image
 */
export const generateWebsiteMockup = async (formData) => {
    const styleDescriptions = {
        modern: 'modern and sleek with clean lines and contemporary elements',
        minimalist: 'minimalist with lots of white space and simple, elegant design',
        bold: 'bold and eye-catching with strong typography and vibrant elements',
        elegant: 'elegant and sophisticated with refined details and luxury feel',
        clean: 'clean and professional with organized layouts and clear hierarchy',
        creative: 'creative and artistic with unique layouts and innovative design elements'
    };

    const colorDescriptions = {
        'cyan-magenta': 'cyan and magenta gradient color scheme with neon accents',
        'blue-white': 'blue and white color palette with professional feel',
        'gold-black': 'gold and black luxury color scheme',
        'green-earth': 'green and earth tones with natural, organic feel',
        'earth-tones': 'warm earth tones with brown, beige, and tan colors',
        'purple-pink': 'purple and pink gradient with modern vibrant feel'
    };

    const sectionsText = formData.sections.join(', ');

    const prompt = `Create a stunning, professional website homepage mockup for a ${formData.businessType}. 
  
Business Description: ${formData.description}

Design Style: ${styleDescriptions[formData.designStyle] || formData.designStyle}

Color Scheme: ${colorDescriptions[formData.colors] || formData.colors}

Required Sections: The website should include these sections: ${sectionsText}

${formData.additionalNotes ? `Additional Requirements: ${formData.additionalNotes}` : ''}

The design should be:
- Modern and visually stunning with premium aesthetics
- Fully responsive and mobile-friendly layout
- Optimized for user engagement and conversions
- Include a hero section with compelling headline
- Professional typography and spacing
- High-quality visual hierarchy
- Clear call-to-action buttons
- Cohesive color scheme throughout
- Professional and polished appearance

Create a full-page website mockup showing the complete homepage design from top to bottom, including all requested sections in a single scrollable view. The mockup should look like a real, functional website screenshot.`;

    // In a real implementation, this would call your backend API
    // which would then use the generate_image tool
    // For now, we'll return a placeholder

    // This is where you'd integrate with your backend:
    // const response = await fetch('/api/generate-demo', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ prompt })
    // });
    // const data = await response.json();
    // return data.imageUrl;

    return {
        prompt,
        // Placeholder - in production this would be the actual generated image URL
        imageUrl: null
    };
};

/**
 * Download an image from a URL
 * @param {string} imageUrl - URL of the image to download
 * @param {string} filename - Desired filename for the download
 */
export const downloadImage = (imageUrl, filename = 'website-demo.png') => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
