# TASK_019_ARCHIPELAGO_MAP_SECTION

## Purpose

Redesign the Archipelago Map section to visually look like an island instead of simple boxes, and update the learning structure to reflect the current platform launch plan.

## Learning Structure Representation

The archipelago map visually demonstrates the initial learning structure of Dao-Yu-101:

- **Programming Archipelago** - The first learning world of Dao-Yu-101
- **Minecraft MakeCode Island** - The initial island focusing on programming fundamentals

This metaphor helps users understand that learning is structured as interconnected topics that build upon each other, much like islands in an archipelago.

## Visual Design

The section will feature:
- A title explaining the concept
- A description of the archipelago learning system
- A visual grid of island nodes representing different topics
- Responsive design that works on both desktop and mobile

## Implementation Details

### Component Structure
- `ArchipelagoMap.astro` - Main component
- Simple div-based island visualization
- CSS-in-JS styling for island nodes
- Flexible grid layout using flexbox

### Styling
- Island nodes as rounded rectangles with gradient backgrounds
- Consistent spacing and alignment
- Mobile-responsive layout with flex-wrap

### Integration
- Added to the main landing page below the ArchipelagoSystem component
- Maintains visual consistency with existing design system