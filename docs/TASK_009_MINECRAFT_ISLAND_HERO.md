# TASK_009_MINECRAFT_ISLAND_HERO

## Overview

Replace the current minimal floating island setup with a large, clearly visible Minecraft-style island hero scene. The island should be the focal point of the landing page with distinct voxel-style block layers and a prominent tree.

## Design Concept

### Minecraft Floating Island
- Large central island as the hero element
- Clearly visible terrain layers (grass, dirt, sand)
- Block-based geometry with sharp edges
- Floating animation for dynamic feel
- Voxel tree as a key visual element

### Block Terrain Layers
- **Grass Layer**: Top layer with vibrant green color (#7ED957)
- **Dirt Layers**: Middle layers with brown color (#8B5A2B) 
- **Bottom Layer**: Base layer, smaller width to create tapered effect
- Each layer should be clearly distinguishable and block-like

### Hero Scene Composition
1. **Clouds**: Background element with block cloud formations
2. **MainIsland**: Central focal point with terrain layers
3. **Hero Text**: Title and subtitle overlay
4. **Buttons**: Interactive elements
5. **Ocean**: Bottom element for depth

## Technical Implementation

### Component Structure
```
src/components/
├── MainIsland.astro     # New large island component
├── VoxelTree.astro      # Tree component (existing)
└── Hero.astro          # Updated hero layout

src/styles/
└── hero.css            # Updated styles
```

### Visual Hierarchy
- Main island should be large (400px width) and centered
- Island layers should be clearly stacked
- Tree should be prominently placed on top
- Floating animation should be subtle but noticeable

## Color Palette

- Grass: #7ED957 (vibrant Minecraft green)
- Dirt: #8B5A2B (rich Minecraft brown)
- Tree Trunk: #5D4037 (dark wood)
- Tree Leaves: #4CAF50 (forest green)

## Performance Considerations

- Single large island instead of multiple small ones
- Lightweight CSS animations
- Optimized for GitHub Pages static hosting
- Maintain responsive design

## Success Criteria

- [ ] Large Minecraft-style island is clearly visible
- [ ] Terrain layers are distinct and block-like
- [ ] Tree is prominently placed on island
- [ ] Floating animation is smooth and subtle
- [ ] Hero layout is well-composed
- [ ] Build process completes successfully
- [ ] Design is responsive across devices