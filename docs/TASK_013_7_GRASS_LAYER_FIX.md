# TASK_013_7_GRASS_LAYER_FIX

## Goal

Restore the grass layer visibility on the floating island while keeping trees, houses, and rocks correctly positioned.

The island structure must remain unchanged.

## Documentation

### Grass Layer Rendering

The grass layer is the topmost visible surface of the floating island. It should be rendered as a distinct green surface that provides the foundation for all island objects (trees, houses, rocks).

**Key Requirements:**
- Must be visible and not hidden by other elements
- Should have a fixed height to maintain consistent appearance
- Must serve as the base layer for object placement

### Object Stacking Order

Objects on the island (trees, houses, rocks) must be positioned correctly relative to the grass layer:

1. **Grass Surface**: Base layer (z-index: 3)
2. **Objects**: Positioned above grass (z-index: 4)
3. **Dirt Layers**: Behind grass (z-index: 1)

**Critical Rule**: Objects should render above grass but not cover it completely.

## Implementation Steps

### STEP 1 — Documentation

Create this documentation file.

### STEP 2 — Fix Grass Container Height

Ensure the grass surface has a fixed height in CSS:

```css
.grass-surface {
  position: relative;
  width: 320px;
  height: 40px;
  margin: 0 auto;
  background: #7ed957;
  border-bottom: 6px solid #5da63e;
  z-index: 3;
}
```

### STEP 3 — Prevent Objects Covering Grass

Objects should render above grass but not hide it:

```css
.tree,
.house,
.rock {
  position: absolute;
  bottom: 100%;
  z-index: 4;
}
```

### STEP 4 — Ensure Dirt Layers Are Behind

Dirt layers must be positioned behind the grass:

```css
.dirt-layer-1,
.dirt-layer-2,
.dirt-layer-3 {
  position: relative;
  z-index: 1;
}
```

### STEP 5 — Prevent Grass Collapse

Ensure the grass container is NOT empty. Keep the structure:

```html
<div class="grass-surface">
  <VoxelTree />
  <VoxelHouse />
  <VoxelRock />
</div>
```

### STEP 6 — Verify Colors

- Grass color: `#7ed957`
- Grass edge: `#5da63e`

### STEP 7 — Build

Run: `npm run build`

### STEP 8 — Commit

```bash
git add .
git commit -m "TASK_013_7_GRASS_LAYER_FIX"
```

### STEP 9 — Push

```bash
git push
```

## Expected Result

- The grass layer becomes visible again
- Trees, houses, and rocks remain correctly positioned
- The island appears visually correct with grass on top and dirt layers below

## Files Modified

- `src/components/VoxelIsland.astro` - CSS fixes for grass layer visibility
- `docs/TASK_013_7_GRASS_LAYER_FIX.md` - This documentation file