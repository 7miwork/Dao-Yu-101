# Project Structure

This document explains the folder structure of the Dao-Yu-101 project.

## Directory Overview

### `src/`
Contains all source code for the website.

- **`components/`** - Reusable UI components
  - `Hero.astro` - Main hero section component
  - `Navbar.astro` - Navigation bar component
  - `Footer.astro` - Footer component
  - `FloatingIslands.astro` - Parallax floating island component
  - `LanguageSwitcher.astro` - Language selection UI

- **`layouts/`** - Layout templates
  - `Layout.astro` - Main page layout wrapper

- **`pages/`** - Page routes and content
  - `index.astro` - Landing page

### `public/`
Static assets served directly to the browser.

- **`assets/`** - Images, icons, and other media files
  - `islands/` - Island-related graphics

### `docs/`
Documentation for all project tasks and technical details.

- `PROJECT_STRUCTURE.md` - This file explaining the project structure
- `TASK_001_LANDINGPAGE_UPGRADE.md` - Documentation for landing page upgrade task
- `TECH_STACK.md` - Technology stack documentation

## File Organization Principles

- **Components**: Small, reusable pieces that can be composed together
- **Layouts**: Page structure templates that wrap content
- **Pages**: Route-specific content and logic
- **Public**: Static files that don't require processing
- **Docs**: Task documentation and technical references

## Future Considerations

As the project grows, additional directories may be added for:
- `styles/` - CSS-in-JS or styled components
- `utils/` - Helper functions and utilities
- `types/` - TypeScript type definitions
- `locales/` - Internationalization files