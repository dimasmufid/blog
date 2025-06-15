# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Start development server with Turbopack (runs on http://localhost:3000)
- `pnpm build` - Build production version
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint to check code quality

### Package Manager
This project uses **pnpm** as the package manager (pinned to version 10.3.0). Always use `pnpm` instead of npm or yarn.

## Architecture

### Technology Stack
- **Next.js 15.3.1** with App Router - Server-side rendering and static generation
- **React 19** - Latest React version with functional components
- **TypeScript** - Full type safety
- **Tailwind CSS 4** - Utility-first styling with mobile-first approach
- **shadcn/ui** + **Radix UI** - Component library built on accessible primitives

### Content Management
Blog posts are markdown files stored in `/src/content/blog/` with YAML frontmatter:
```yaml
---
title: Post Title
date: 2025-05-24
excerpt: Brief description
tag: ["mark", "ai"]
---
```

The markdown processing pipeline uses:
- `gray-matter` for frontmatter parsing
- `remark-gfm` for GitHub Flavored Markdown
- `rehype-prism-plus` for syntax highlighting
- `rehype-raw` for HTML support

### Key Directories
- `/src/app/` - Next.js App Router pages and layouts
- `/src/components/` - Reusable React components
- `/src/content/blog/` - Markdown blog posts
- `/src/lib/` - Utility functions, including `markdown.ts` for blog processing

### Code Style (from Cursor rules)
- Use functional components with Standard.js style
- 2 space indentation, single quotes, no semicolons
- Use `function` keyword for component definitions
- Prefer composition over inheritance
- Use lowercase with dashes for directories
- Follow mobile-first responsive design

### Blog Architecture
- Static generation at build time for optimal performance
- Dynamic routes at `/blog/[slug]` for individual posts
- Blog listing page with post previews
- Responsive design optimized for mobile readers

### Performance Considerations
- Minimize 'use client' usage - favor React Server Components
- Use dynamic imports for non-critical components
- Implement proper image optimization
- Static generation provides fast loading times

## Project Purpose
This is a personal blog for documenting the journey of building AI startups, specifically focused on a project called "Mark." The design emphasizes authenticity, minimalism, and growth readiness for personal brand expansion.