# Learning Platform

## Overview

A modern learning management platform built for apprenticeship programs. The application provides learners with a centralized hub to access educational materials, track projects, manage sessions, monitor off-the-job training hours, review progress, and showcase their work through a portfolio system. The platform is designed to support the complete apprenticeship journey with features for learning content, coaching sessions, and progress tracking.

## User Preferences

Preferred communication style: Simple, everyday language.

## Q1 Prototype Narrative (Before/After)

**THE LEARNER:** Sarah, 35, data analyst, 3 months into DIBD programme. Motivated but falling behind.

**THE SITUATION:** Behind on OTJ logging. Project deadline in 2 weeks, hasn't scoped it. Lost track of where she is. Logs in to get back on track.

**"BEFORE" EXPERIENCE (the problem):**
- Sarah clicks "Ask Atlas" and types "How far behind am I on my programme?"
- Atlas gives a generic response. Can't see her progress, curriculum, deadlines, or risk signals.
- Deflects: "I don't have access to your specific progress data."
- She closes the panel. Frustration accumulates.
- Atlas can only see the page she's on — no learner context.
- No system identifies she's behind or recommends next steps.
- ~1/3 of learners are behind; 2 out of 5 withdraw.
- Withdrawal isn't one event — frictions stack up faster than recovery.

**"AFTER" EXPERIENCE (the solution):**
- ✅ FIXED PANEL: Atlas is already visible as inline panel — no clicking required (DONE)
- 🧠 GLOBAL INTELLIGENCE: Atlas knows Sarah's full curriculum, progress, deadlines, risk signals via MCP layer. Key demo: same question "How behind am I?" gets personalised, actionable response with specific OTJ hours and catch-up plan.
- 🔗 CONTEXTUAL PROMPTS: Prompts are page-specific AND learner-specific (DONE — suggestions vary per page)
- 🎯 KEY DEMO MOMENT: Before = generic deflection; After = specific, personalised, actionable. This IS the demo.
- 🚀 PROJECT SCOPING: Atlas knows curriculum, role (data analyst), company context, remaining KSBs → suggests 3 tailored project ideas.
- 🔨 BREAKING IT DOWN: Atlas breaks project into steps. Visible "thinking" shows routing to specialised project ideation sub-agent. Agentic architecture demo.
- 📝 NEW UI FEEL: Long-form workspace responses, copy/read-aloud actions. Colleague, not chatbot (DONE — After uses rich markdown rendering)
- 🎓 SOCRATIC TUTORING (stretch): Atlas asks questions, checks understanding, adapts. Learning inside Atlas.

**SARAH'S PROFILE (for After mode context):**
- Name: Sarah, Age: 35, Role: Data Analyst at mid-size company
- Programme: DIBD (Data, Intelligence, Business & Digital), 3 months in
- Status: Behind — 16 hours behind on OTJ logging, project deadline in 2 weeks (not started scoping)
- Risk signals: Falling behind, hasn't logged OTJs recently, no project submission started
- Remaining KSBs: Several still needed, tied to upcoming project work

## System Architecture

### Frontend Architecture

**Framework & Routing:**
- React 18 with TypeScript for type-safe component development
- Wouter for lightweight client-side routing
- Vite as the build tool and development server

**Design System:**
- Multiverse Stardust Design System (v4.x) provides all UI components
- Component-first approach - always use Stardust components instead of custom implementations
- Tailwind CSS configured with Stardust preset for styling
- **Critical spacing consideration:** Stardust uses 0.5rem (8px) base units vs Tailwind's standard 0.25rem (4px), meaning all spacing values are doubled (e.g., `p-4` = 32px not 16px)
- Semantic design tokens for consistent theming (bg-action, text-primary, etc.)
- Custom Saans font family loaded from Stardust

**State Management:**
- TanStack React Query (v5) for server state management
- React Hook Form with Hookform Resolvers for form handling
- Zod for runtime validation and type inference

**Component Structure:**
- Layout system with responsive grid-based wrappers
- Configurable max-width presets (default: 1024px, narrow: 800px, slim: 560px, full: 100%)
- Navigation system using Stardust NavigationRoot components
- Reusable panel grid layouts for two-column content areas

**Key Pages:**
- Home (dashboard/landing)
- Learning (educational materials)
- Projects (assignment tracking)
- My Sessions (coaching/mentorship)
- Off the Job (training hours tracking)
- Progress Reviews (achievement tracking)
- Portfolio (work showcase)

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- HTTP server creation via Node's native `http` module
- Custom middleware for request logging with response capture
- Session-based architecture prepared (express-session, connect-pg-simple)

**Authentication Strategy:**
- Passport.js with local strategy configured
- Session storage with PostgreSQL backend support via connect-pg-simple
- Memory store fallback for development

**API Design:**
- RESTful endpoints prefixed with `/api`
- JSON request/response format
- Centralized error handling middleware
- Request/response logging with duration tracking

**Development Server:**
- Vite middleware integration in development mode
- HMR (Hot Module Replacement) support
- Custom logger with error handling that exits on critical errors
- Runtime error overlay for development

### Data Layer

**ORM & Database:**
- Drizzle ORM for type-safe database operations
- PostgreSQL as the primary database (via @neondatabase/serverless)
- Drizzle-Zod for automatic schema validation generation
- Migration system configured with output to `/migrations` directory

**Schema Design:**
- Users table with id (serial primary key), username (unique), and password fields
- Type-safe insert and select types generated from schema
- Zod schemas derived from Drizzle schemas for validation

**Storage Interface:**
- Abstract IStorage interface for CRUD operations
- MemStorage implementation for in-memory development/testing
- Prepared for PostgreSQL production storage implementation
- User management methods: getUser, getUserByUsername, createUser

**Data Validation:**
- Zod schemas for runtime validation
- Type inference from Zod schemas for TypeScript types
- Drizzle-Zod integration for automatic schema-to-validation conversion

### External Dependencies

**Design System:**
- @multiverse-io/stardust (v4.0.3) - Core design tokens and Tailwind preset
- @multiverse-io/stardust-react (v4.9.1) - React component library

**Database & ORM:**
- @neondatabase/serverless - Serverless PostgreSQL driver
- drizzle-orm - Type-safe ORM
- drizzle-zod - Schema validation integration
- connect-pg-simple - PostgreSQL session store

**UI & Utilities:**
- vaul - Drawer/modal components
- react-icons - Icon library
- date-fns - Date manipulation and formatting

**Development Tools:**
- @replit/vite-plugin-cartographer - Replit-specific development tooling
- @replit/vite-plugin-runtime-error-modal - Development error overlay

**Build & Tooling:**
- esbuild - Server-side bundling for production
- tsx - TypeScript execution for development
- PostCSS with Autoprefixer - CSS processing

**Environment:**
- Designed for Replit deployment with environment indicators
- Development banner integration for Replit environments
- WebSocket support prepared (ws package included)