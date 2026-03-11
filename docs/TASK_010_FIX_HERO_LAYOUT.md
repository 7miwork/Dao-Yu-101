# TASK_010_FIX_HERO_LAYOUT

## Overview

Fix the hero layout so the floating Minecraft-style island does not overlap the title and buttons. The island should float above the text while the text remains clearly visible.

## Hero Layering System

The hero section uses a layered approach with different z-index values to create depth:

1. **Background Layer (z-index: 1)**: Clouds and ocean elements
2. **Island Layer (z-index: 2)**: Floating Minecraft-style island
3. **Content Layer (z-index: 10)**: Title, text, and buttons

## Z-Index Structure

```css
.hero {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  text-align: center;
}

.clouds {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.main-island {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 15%;
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 10;
  margin-top: 380px;
}
```

## Floating Island Placement

The island is positioned:
- Horizontally centered using `left: 50%` and `transform: translateX(-50%)`
- Vertically at 15% from the top
- With a floating animation that moves it up and down
- Above the background but below the content layer

## Implementation Steps

1. Update Hero.astro structure
2. Fix CSS positioning and z-index values
3. Ensure floating animation works correctly
4. Test layout and build
5. Commit and push changes