# TASK_003: Interactive Hero Effects

## Overview

Enhance the voxel hero section with interactive and atmospheric effects to create a modern game-style landing page.

## Implementation Steps

### STEP 1 — Documentation
- [ ] Create file: `docs/TASK_003_INTERACTIVE_HERO.md`
- [ ] Document: ocean background, parallax clouds, mouse parallax interaction, button glow effects

### STEP 2 — Ocean Layer
- [ ] Create component: `src/components/Ocean.astro`
- [ ] Implement ocean design with soft blue gradient
- [ ] Add subtle animated wave effect
- [ ] Position ocean below floating islands

### STEP 3 — Cloud Parallax
- [ ] Update: `src/components/Clouds.astro`
- [ ] Add multiple cloud layers
- [ ] Implement different movement speeds for each layer
- [ ] Set speeds: layer1: 90s, layer2: 120s, layer3: 150s

### STEP 4 — Mouse Parallax
- [ ] Add small parallax movement to floating islands
- [ ] Use simple JavaScript in Hero component
- [ ] Implement movement rules: foreground islands move with mouse, background islands move less
- [ ] Set max movement: 10px

### STEP 5 — Button Glow
- [ ] Update: `src/components/GameButton.astro`
- [ ] Add glow hover effect
- [ ] Implement transform scale and box-shadow effects

### STEP 6 — Hero Structure Update
- [ ] Update hero layout to: Sky, Clouds, FloatingIslands, Ocean, HeroContent

### STEP 7 — Mobile Safety
- [ ] Disable mouse parallax on mobile devices
- [ ] Check: `window.innerWidth < 768`

### STEP 8 — Build Test
- [ ] Run: `npm run build`

### STEP 9 — Commit
- [ ] Run: `git add .`
- [ ] Run: `git commit -m "Add interactive hero effects"`

### STEP 10 — Push
- [ ] Run: `git push`

## Expected Result

Landing page will include:
- Floating voxel islands
- Animated clouds
- Ocean background
- Mouse parallax effect
- Glowing game buttons

## Technical Requirements

### Ocean Animation
```css
@keyframes wave {
  0% { transform: translateX(0); }
  50% { transform: translateX(-20px); }
  100% { transform: translateX(0); }
}
```

### Button Glow Effect
```css
button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 12px rgba(126,217,87,0.6);
}
```

## Files to Create/Modify

### New Files
- `docs/TASK_003_INTERACTIVE_HERO.md`
- `src/components/Ocean.astro`

### Modified Files
- `src/components/Clouds.astro`
- `src/components/Hero.astro`
- `src/components/GameButton.astro`