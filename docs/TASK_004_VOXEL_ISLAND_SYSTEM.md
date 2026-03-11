# TASK_004: Real Voxel Island System

## Overview

Upgrade the landing page hero with a real voxel island system that visually resembles a game world. This system will replace the current abstract floating islands with proper voxel-style blocks that create a more game-like aesthetic.

## Components

### 1. VoxelBlock Component
- **Location**: `src/components/VoxelBlock.astro`
- **Purpose**: Reusable cube-style block component
- **Block Types**:
  - `grass`: Green top with darker sides
  - `dirt`: Brown color scheme
  - `sand`: Yellow/tan color scheme
- **Implementation**: CSS shading to create 3D cube effect

### 2. VoxelIsland Component
- **Location**: `src/components/VoxelIsland.astro`
- **Purpose**: Composite component that stacks VoxelBlock components
- **Structure Example**:
  ```
  Grass (top layer)
  Dirt (3 blocks)
  Sand (bottom layer)
  ```

### 3. FloatingIslands System
- **Location**: `src/components/FloatingIslands.astro` (update existing)
- **Purpose**: Container for multiple voxel islands
- **Layers**:
  - Foreground
  - Midground  
  - Background
- **Limit**: Maximum 8 total islands

### 4. Ocean Component
- **Location**: `src/components/Ocean.astro`
- **Purpose**: Animated ocean background
- **Features**:
  - Blue gradient
  - Subtle wave animation
  - Full width placement

### 5. Cloud System
- **Location**: `src/components/Clouds.astro` (update existing)
- **Purpose**: Multi-layered animated clouds
- **Layers**: 3 cloud layers with different speeds
- **Animation Speeds**: 90s, 120s, 150s

## Technical Implementation

### CSS Shading for Voxel Blocks
```css
/* Example cube styling */
.cube {
  position: relative;
  transform-style: preserve-3d;
}

.cube .top {
  transform: rotateX(-90deg);
  background: linear-gradient(to bottom, #4ade80, #22c55e);
}

.cube .front {
  transform: rotateY(90deg);
  background: linear-gradient(to bottom, #16a34a, #15803d);
}
```

### Parallax Interaction
- **Implementation**: JavaScript mouse tracking
- **Rules**:
  - Foreground islands move more (up to 10px)
  - Background islands move less
  - Disabled on mobile devices
- **Method**: CSS transform translate based on mouse position

### Performance Considerations
- **Animation Method**: Only transform animations (GPU-accelerated)
- **Island Limit**: Maximum 8 islands total
- **CSS Optimization**: Use will-change for animated elements

## Hero Layout Structure

```
Hero (min-height: 100vh, overflow-x: hidden)
├── Sky
├── Clouds
├── FloatingIslands
├── Ocean
└── HeroContent
```

## Files to Create/Modify

### New Files
- `docs/TASK_004_VOXEL_ISLAND_SYSTEM.md` ✅
- `src/components/VoxelBlock.astro`
- `src/components/VoxelIsland.astro`
- `src/components/Ocean.astro`

### Modified Files
- `src/components/FloatingIslands.astro`
- `src/components/Clouds.astro`
- `src/components/Hero.astro`

## Testing Requirements

1. **Visual Testing**: Verify voxel blocks render correctly
2. **Animation Testing**: Check parallax and cloud animations
3. **Performance Testing**: Ensure smooth 60fps animations
4. **Mobile Testing**: Verify parallax is disabled on mobile
5. **Build Testing**: Confirm `npm run build` succeeds

## Success Criteria

- [ ] Voxel island system visually resembles a game world
- [ ] All components render correctly and performantly
- [ ] Parallax interaction works smoothly on desktop
- [ ] Mobile experience is optimized (no parallax)
- [ ] Build process completes without errors
- [ ] Git commit and push successful