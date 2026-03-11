# Task 001: Landing Page Game UI Upgrade

## Task Overview

**Title:** Landing Page Game UI Upgrade  
**Status:** In Progress  
**Created:** 2025-03-11  
**Priority:** High

## Goal

Upgrade the current Astro landing page to a voxel-inspired game website design and introduce internationalization preparation.

## Features Introduced

### Voxel Inspired Design Elements
- **Floating Islands**: Multiple layered island components with parallax effects
- **Sky Gradient**: Soft sky background with ocean elements
- **Game Style UI**: Rounded buttons with hover animations and game-like aesthetics

### Navigation & Interaction
- **Game Style Buttons**: Store, Login, Register with scale animations
- **Language Switcher UI**: Placeholder for future internationalization (EN, DE, ZH-TW)
- **Enhanced Navbar**: Logo integration with organized navigation

### Visual Effects
- **Parallax Floating Islands**: Multiple layers with different animation speeds
- **CSS Animations**: Smooth floating movements and button interactions
- **Voxel Color Palette**: Game-inspired color scheme

## Implementation Steps

### Step 1: Documentation Structure ✅
- Created `/docs` directory
- Added `PROJECT_STRUCTURE.md`
- Added `TECH_STACK.md`
- Added `TASK_001_LANDINGPAGE_UPGRADE.md`

### Step 2: Hero Section Redesign
- Modify `src/components/Hero.astro`
- Create voxel inspired hero with floating islands
- Add layered div elements for island simulation

### Step 3: Floating Islands Component
- Create `src/components/FloatingIslands.astro`
- Implement multiple floating island layers
- Add CSS animations with different speeds

### Step 4: Game Style Buttons
- Update navigation and hero buttons
- Apply rounded corners, shadows, and hover effects
- Implement scale animations on hover

### Step 5: Language Switcher UI
- Create `src/components/LanguageSwitcher.astro`
- Add language options (EN, DE, ZH-TW)
- UI-only implementation (no functional translation yet)

### Step 6: Navbar Update
- Modify `src/components/Navbar.astro`
- Add Dao-Yu-101 logo
- Organize navigation items
- Integrate language switcher

### Step 7: Landing Page Structure
- Update `src/pages/index.astro`
- Arrange components: Navbar, Hero, FloatingIslands, Footer

### Step 8: Styling Improvements
- Add sky gradient background
- Implement soft ocean colors
- Create voxel-inspired color palette
- Add floating island animations
- Implement button hover effects

### Step 9: Build Test
- Run `npm run build`
- Verify `/dist/index.html` exists

### Step 10: Commit and Push
- Commit all changes
- Push to repository

## Technical Requirements

### CSS Features
- CSS Grid and Flexbox for layout
- CSS animations for floating effects
- Transform properties for 3D-like appearance
- Responsive design principles

### Component Architecture
- Reusable floating island components
- Modular language switcher
- Consistent button styling
- Clean separation of concerns

### Performance Considerations
- Optimized CSS animations
- Minimal JavaScript usage
- Efficient image handling
- Fast loading times

## Success Criteria

- [ ] Voxel inspired hero section implemented
- [ ] Floating island parallax effect working
- [ ] Game style UI buttons functional
- [ ] Language switcher UI present
- [ ] Documentation structure complete
- [ ] Build process successful
- [ ] All components integrated properly

## Notes

This task serves as the foundation for future game-related features and internationalization support. The voxel theme will be expanded in future tasks to include more interactive game elements.