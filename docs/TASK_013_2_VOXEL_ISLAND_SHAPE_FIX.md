# TASK_013_2_VOXEL_ISLAND_SHAPE_FIX

## Goal
Fix the visual shape of the floating island so it clearly resembles a Minecraft-style voxel island with a strong block structure, grass on top, and dirt layers below.

## Current Issues
- Blocks appear disconnected
- Island silhouette is unclear
- Lack of clear layer structure

## Documentation

### Voxel Island Shape
The island should have a clear block-based structure with:
- Grass layer on top (bright green)
- Dirt layers below (brown, tapering downward)
- Clear Minecraft-style silhouette

### Layer Structure
1. **Grass Row**: Top layer, full width, bright green
2. **Dirt Row**: Middle layer, slightly narrower
3. **Dirt Row Small**: Lower layer, more narrow
4. **Dirt Row Tip**: Bottom layer, narrowest

### Responsive Scaling
- Desktop: Full size
- Tablet: 0.9 scale
- Mobile: 0.75 scale

## Implementation Steps

### STEP 1 — Documentation
- [x] Create docs/TASK_013_2_VOXEL_ISLAND_SHAPE_FIX.md

### STEP 2 — Rebuild Island Structure
- [ ] Open src/components/VoxelIsland.astro
- [ ] Replace island structure with clear block rows

### STEP 3 — Grass Layer
- [ ] Add .grass-row styles (420px width, 50px height, #7ed957 background)

### STEP 4 — Dirt Layer
- [ ] Add .dirt-row styles (360px width, 80px height, #8b5a2b background)

### STEP 5 — Narrow Dirt Layer
- [ ] Add .dirt-row-small styles (240px width, 80px height, #7a4b24 background)

### STEP 6 — Island Tip
- [ ] Add .dirt-row-tip styles (120px width, 80px height, #6e4424 background)

### STEP 7 — Position Trees
- [ ] Place tree components on the grass row with absolute positioning

### STEP 8 — Improve Hero Scaling
- [ ] Ensure island stays centered with proper positioning

### STEP 9 — Responsive Adjustments
- [ ] Add tablet scaling (0.9)
- [ ] Add mobile scaling (0.75)

### STEP 10 — Build
- [ ] Run npm run build

### STEP 11 — Commit
- [ ] Add files to git
- [ ] Commit with message "TASK_013_2_VOXEL_ISLAND_SHAPE_FIX"

### STEP 12 — Push
- [ ] Push to remote repository

## Expected Result
The floating island will have a clear Minecraft-style block shape with:
- Grass appearing on top
- Dirt layers tapering downward forming a floating island silhouette
- Trees appearing naturally on top of the island
- The hero scene resembling a small floating Minecraft world