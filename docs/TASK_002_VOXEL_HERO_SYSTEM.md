# Voxel Hero System

## Overview

This document outlines the implementation of a voxel-inspired hero section for the Dao-Yu-101 project, creating a modern game website aesthetic similar to Minecraft and Nintendo.

## Design Concept

### Voxel Hero Concept
- CSS-only voxel blocks using layered div elements
- No image assets for easier animation and maintenance
- Bright, game-like color palette
- Floating island layers with parallax effect

### Floating Island Layers
Three distinct layers create depth and parallax movement:

1. **Foreground Layer**
   - 2 islands maximum
   - Fastest animation speed
   - Brightest colors
   - Most detailed shapes

2. **Midground Layer**
   - 3 islands maximum
   - Medium animation speed
   - Medium color saturation
   - Medium detail level

3. **Background Layer**
   - 3 islands maximum
   - Slowest animation speed
   - Muted colors
   - Simplified shapes

### Game UI Buttons
- Rounded corners with soft shadows
- Scale transform on hover
- Game-style appearance
- Reusable component with props

### Parallax Animation
- Different animation speeds for each layer
- Creates depth perception
- Smooth, continuous movement
- Performance optimized with transform-based animations

## Technical Implementation

### Color Palette
- Sky top: #87CEEB
- Sky bottom: #E6F6FF
- Ocean: #4FB3FF
- Grass: #7ED957
- Sand: #F4D19B
- Shadow: #2E2E2E

### Performance Requirements
- Maximum 8 islands total (2 foreground + 3 midground + 3 background)
- CSS-only implementation (no image assets)
- Transform-based animations only
- No animating top, left, width, height properties

### Responsive Design
- Mobile adjustments for smaller screens
- Reduced island sizes on mobile
- Vertical stacking of title and buttons
- Touch-friendly button sizes

### File Structure
```
src/
├── components/
│   ├── Hero.astro
│   ├── FloatingIslands.astro
│   ├── Clouds.astro
│   └── GameButton.astro
└── styles/
    └── hero.css
```

## Component Specifications

### Hero Component
- min-height: 100vh
- overflow-x: hidden
- Sky gradient background
- Contains title, subtitle, and buttons
- Responsive layout

### FloatingIslands Component
- Three island layers
- CSS voxel blocks
- Floating animations
- Performance optimized

### Clouds Component
- Large soft cloud shapes
- Slow horizontal movement
- Positioned behind islands

### GameButton Component
- Props: label, href (optional)
- Rounded corners
- Shadow effects
- Scale hover animation

## Animation Specifications

### Island Floating Animation
- 20-30 second float cycle
- transform: translateY()
- Different speeds per layer
- Smooth, continuous loop

### Cloud Movement
- 60-90 second horizontal cycle
- Very slow movement
- transform: translateX()
- Behind island layers

### Parallax Speeds
- Foreground: 1.0x (base speed)
- Midground: 0.6x (60% of base)
- Background: 0.3x (30% of base)

## Mobile Considerations
- Reduced island sizes
- Fewer islands if needed
- Vertical button stacking
- Touch-friendly interactions
- Optimized for GitHub Pages

## Build Process
1. Create documentation
2. Create shared CSS styles
3. Implement components
4. Update landing page
5. Test responsiveness
6. Build and deploy