# TASK_005_MOUSE_PARALLAX_SYSTEM

## Overview

Add a mouse-based parallax system to the hero section so floating islands move slightly with cursor movement.

The effect should create depth while maintaining good performance and compatibility with GitHub Pages static builds.

## Parallax Concept

Parallax is a visual effect where background elements move at a different speed than foreground elements when the user moves their cursor. This creates an illusion of depth and 3D space on a 2D screen.

### How It Works

1. **Mouse Tracking**: Listen for mouse movement events
2. **Position Calculation**: Calculate cursor position relative to screen center
3. **Depth Layers**: Apply different movement amounts based on depth values
4. **Transform Application**: Use CSS transforms to move elements

### Depth Layers

- **Foreground (depth: 1.0)**: Elements closest to viewer, move most
- **Midground (depth: 0.5)**: Middle layer, moderate movement
- **Background (depth: 0.2)**: Farthest layer, subtle movement

## Performance Rules

### CSS Transform Only

- Use `transform: translate()` for movement
- Avoid layout-changing properties like `top`, `left`, `margin`
- Transform operations are GPU-accelerated

### Movement Limits

- Maximum movement: 10px in any direction
- Prevents excessive motion that could be distracting
- Maintains visual stability

### Event Optimization

- Use `requestAnimationFrame` for smooth animations
- Debounce mouse events to reduce processing overhead
- Clean up event listeners on component unmount

## Mobile Safety

### Screen Size Detection

- Disable parallax on screens smaller than 768px width
- Mobile devices typically don't have mouse cursors
- Prevents unnecessary processing on touch devices

### Touch Device Considerations

- No mouse events on touch devices
- Parallax effect doesn't translate well to touch interactions
- Better to disable entirely for mobile users

## Implementation Notes

### JavaScript Requirements

- Lightweight implementation
- No external dependencies
- Compatible with static site generation
- Works with GitHub Pages deployment

### CSS Requirements

- Smooth transitions with `transition: transform 0.2s ease-out`
- Hardware acceleration where possible
- Fallback styles for older browsers

### Testing Considerations

- Test on various screen sizes
- Verify performance on lower-end devices
- Ensure smooth movement without jank
- Confirm mobile devices don't trigger parallax