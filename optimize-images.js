import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');


// Images to optimize with their target configurations
const imagesToOptimize = [
    {
        input: 'hero-background.jpg',
        outputs: [
            { name: 'hero-background.webp', format: 'webp', quality: 85 },
            { name: 'hero-background.jpg', format: 'jpeg', quality: 85 }
        ]
    },
    {
        input: 'cta-background.png',
        outputs: [
            { name: 'cta-background.webp', format: 'webp', quality: 85 },
            { name: 'cta-background.png', format: 'png', quality: 90 }
        ]
    },
    {
        input: 'credit-background.png',
        outputs: [
            { name: 'credit-background.webp', format: 'webp', quality: 85 },
            { name: 'credit-background.png', format: 'png', quality: 90 }
        ]
    },
    {
        input: 'logo.png',
        outputs: [
            { name: 'logo.webp', format: 'webp', quality: 90 },
            { name: 'logo.png', format: 'png', quality: 95 }
        ]
    },
    {
        input: 'og-image.png',
        outputs: [
            { name: 'og-image.png', format: 'png', quality: 90 }
        ]
    },
    {
        input: 'pwa-192x192.png',
        outputs: [
            { name: 'pwa-192x192.png', format: 'png', quality: 90 }
        ]
    },
    {
        input: 'pwa-512x512.png',
        outputs: [
            { name: 'pwa-512x512.png', format: 'png', quality: 90 }
        ]
    }
];

async function optimizeImages() {
    console.log('🚀 Starting image optimization...\n');

    for (const imageConfig of imagesToOptimize) {
        const inputPath = path.join(publicDir, imageConfig.input);

        if (!fs.existsSync(inputPath)) {
            console.log(`⚠️  Skipping ${imageConfig.input} (not found)`);
            continue;
        }

        const inputStats = fs.statSync(inputPath);
        const inputSizeKB = (inputStats.size / 1024).toFixed(2);

        console.log(`📸 Processing: ${imageConfig.input} (${inputSizeKB} KB)`);

        for (const output of imageConfig.outputs) {
            const outputPath = path.join(publicDir, output.name);
            const isSameFile = inputPath === outputPath;
            const tempPath = isSameFile ? outputPath + '.tmp' : outputPath;

            try {
                let sharpInstance = sharp(inputPath);

                if (output.format === 'webp') {
                    await sharpInstance
                        .webp({ quality: output.quality })
                        .toFile(tempPath);
                } else if (output.format === 'jpeg') {
                    await sharpInstance
                        .jpeg({ quality: output.quality, progressive: true })
                        .toFile(tempPath);
                } else if (output.format === 'png') {
                    await sharpInstance
                        .png({ quality: output.quality, compressionLevel: 9 })
                        .toFile(tempPath);
                }

                // If we used a temp file, replace the original
                if (isSameFile) {
                    fs.unlinkSync(outputPath);
                    fs.renameSync(tempPath, outputPath);
                }

                const outputStats = fs.statSync(outputPath);
                const outputSizeKB = (outputStats.size / 1024).toFixed(2);
                const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

                console.log(`   ✅ ${output.name}: ${outputSizeKB} KB (${reduction}% reduction)`);
            } catch (error) {
                console.error(`   ❌ Error processing ${output.name}:`, error.message);
                // Clean up temp file if it exists
                if (fs.existsSync(tempPath) && tempPath !== outputPath) {
                    fs.unlinkSync(tempPath);
                }
            }
        }
        console.log('');
    }

    console.log('✨ Image optimization complete!');
}

optimizeImages().catch(console.error);
