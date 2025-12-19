# Image Optimization Guide

## Images Found in /public:
- credit-background.png
- cta-background.png  
- hero-background.jpg
- hero-background.png
- logo.png
- og-image.png
- pwa-192x192.png
- pwa-512x512.png

## Optimization Strategy:

### 1. Background Images (Large)
- hero-background.jpg/png → Compress to WebP
- credit-background.png → Compress to WebP
- cta-background.png → Compress to WebP

### 2. Logo & Icons (Small)
- logo.png → Keep PNG (small file)
- og-image.png → Compress
- pwa-*.png → Keep (required format for PWA)

## Manual Optimization Steps:

### Using Online Tools:
1. **TinyPNG** (https://tinypng.com/)
   - Upload all PNG files
   - Download compressed versions

2. **Squoosh** (https://squoosh.app/)
   - Convert JPG/PNG to WebP
   - Quality: 80%
   - Resize if needed

3. **ImageOptim** (Mac) or **FileOptimizer** (Windows)
   - Batch compress all images

## Vite Plugin Installed:
- vite-imagetools: Automatic optimization on build
- Images will be optimized during production build

## Next Steps:
1. Run `npm run build` to generate optimized images
2. Check dist/assets/ for optimized versions
3. Update image references if needed
