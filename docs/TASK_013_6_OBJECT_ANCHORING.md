# TASK_013_6_ANCHOR_OBJECTS_TO_GRASS

## Overview

Fix the placement of trees, houses, and rocks so they are always attached to the grass surface of the island.

## Problem

Currently objects appear above, below, or upside down relative to the island. The island structure must not be modified.

## Object Anchoring Strategy

### 1. Container Hierarchy
- Move all environment objects INSIDE the grass surface container
- This ensures objects are positioned relative to the grass surface, not the entire island

### 2. Grass Surface Positioning
- Make grass surface `position: relative`
- This creates a positioning context for child objects
- Objects will be positioned relative to the grass surface bounds

### 3. Object Placement Logic
- Objects must sit on top of grass using `bottom: 100%`
- This ensures objects are always anchored to the grass surface
- Prevents floating or sunken objects

## Implementation Steps

1. **Move Objects Inside Grass Surface**
   - Relocate VoxelTree, VoxelHouse, and VoxelRock components
   - Place them inside the `.grass-surface` div

2. **Make Grass Surface Relative**
   - Add `position: relative` to `.grass-surface`
   - Maintain existing width and height properties

3. **Place Objects From Bottom**
   - Change object positioning to `position: absolute`
   - Set `bottom: 100%` to anchor to grass surface

4. **Horizontal Placement**
   - Use `left`, `right`, and `transform: translateX(-50%)` for positioning
   - Maintain existing horizontal positions

5. **Prevent Upside Down Objects**
   - Remove any `scaleY(-1)` or `rotate(180deg)` transforms
   - Ensure objects maintain correct orientation

6. **Object Size Limits**
   - Set maximum heights for each object type
   - Trees: 60px, Houses: 50px, Rocks: 25px

## Expected Result

- Trees, houses, and rocks sit directly on the grass surface
- No objects appear below the island
- No objects float in the air
- The floating island scene looks correct