# Product Requirements Document (PRD)

## Project
- Name: Colby Portfolio
- Type: Marketing and lead-generation website for freelance web development services
- Repository root: `/Users/colbynelsen/Documents/Web_Dev_Projects/My_Businesses/colby-portfolio`
- Primary domain: `https://colbynelsen.com`
- Current stack baseline: Next.js 16.1.6, React 19.2.3, TypeScript, Tailwind CSS v4

## 1. Purpose and Context
This project is Colby Nelsen's personal portfolio website. It is designed to:
- Showcase shipped and in-progress projects
- Explain available services
- Build trust via polished UI/UX and technical credibility
- Capture inbound leads through a contact form
- Capture newsletter subscribers for future outreach

It functions as both a brand site and a conversion surface for project inquiries.

## 2. Product Goals
- Generate qualified inbound leads for website and full-stack client work
- Present portfolio projects with clear business and technical outcomes
- Provide multiple contact entry points (contact form, email, Calendly, social links)
- Maintain strong SEO and social sharing metadata coverage
- Offer a distinctive UI theme system (standard + HUD/Fallout mode) without breaking usability

## 3. Non-Goals
- User authentication and logged-in dashboards
- CMS-backed content editing (content is code-driven)
- Internal admin panel for leads/newsletter management
- E-commerce checkout on this site

## 4. Target Users
- Small business owners seeking websites or app development
- Startup founders needing MVP/full-stack builds
- Prospects comparing developers via work samples and service clarity
- Returning visitors subscribing for updates

## 5. Core Value Proposition
- "I build polished websites and full-stack web apps fast"
- Emphasis on conversion-focused UX, performance, and clean engineering
- Rapid credibility through visual quality, project depth, and clear process

## 6. Functional Scope (By Route)

### `/` Home
Primary conversion and brand page with:
- Hero headline, CTA buttons (`/contact`, Calendly)
- Featured projects (first 3 shipped items from data source)
- Services summary cards
- 4-step process section
- Newsletter subscription form
- Project detail drawer integration

### `/work`
Portfolio listing page with:
- Filter chips: all, shipped, in-progress, client, full-stack
- Card grid from shared project dataset
- Project detail drawer with tabs (overview, preview carousel, results, code)

### `/services`
Service detail page with:
- 3 service pillars from shared data source
- Feature lists
- CTA to contact

### `/about`
Personal positioning page with:
- Approach narrative
- Skills list
- Values list
- Conversion CTA block

### `/contact`
Lead capture page with:
- Contact details (mail link + Calendly)
- Expectation setting for response and next steps
- Contact form posting to `/api/contact`

## 7. Conversion and Messaging Flows

### 7.1 Contact Form Flow
Client:
- Source: `src/app/contact/page.tsx`
- Fields submitted: `name`, `email`, `message`, optional honeypot `honey`
- UI states: `idle`, `sending`, `sent`, `error`

Server:
- Endpoint: `POST /api/contact`
- Source: `src/app/api/contact/route.ts`
- Validation: required `name`, `email`, `message`
- Anti-bot: honeypot (`honey`)
- Delivery: sends plain-text email through Resend
- Recipient: `CONTACT_TO_EMAIL` env var, fallback `colbynelsen@gmail.com`

Failure behavior:
- Missing fields -> 400
- Missing Resend key -> 500
- Resend send error -> 502
- Unexpected error -> 500

### 7.2 Newsletter Flow
Client:
- Source: `src/app/page.tsx`
- Fields submitted: `email`, optional `source`, honeypot `honey`
- UI states: `idle`, `sending`, `success`, `error`
- Handles duplicate subscriber state (`alreadySubscribed`)

Server:
- Endpoint: `POST /api/newsletter`
- Source: `src/app/api/newsletter/route.ts`
- Validation: Zod schema (`email` required/normalized; optional `source`)
- Anti-bot: honeypot (`honey`)
- Persistence: insert into Supabase table `newsletter_subscribers`
- Notification: sends "New Newsletter Subscriber" email through Resend when configured

Failure behavior:
- Invalid JSON -> 400
- Invalid email payload -> 400
- Missing Supabase config -> 500
- Supabase unique violation code `23505` -> success response with `alreadySubscribed: true`
- Generic insert failure -> 500
- Notification email failure does not fail subscription response

## 8. Supabase and Resend Integration Boundaries
- Supabase is currently used for newsletter persistence only (table: `newsletter_subscribers`)
- Resend is used for:
  - Contact form delivery to inbox
  - Newsletter signup notification email
- Contact submissions are not currently persisted in Supabase in this codebase

## 9. API Contracts

### `POST /api/contact`
Request JSON:
- `name: string` (required)
- `email: string` (required)
- `message: string` (required)
- `company?: string` (optional, currently not collected by UI)
- `website?: string` (optional, currently not collected by UI)
- `honey?: string` (honeypot)

Response JSON:
- Success: `{ "ok": true }`
- Error: `{ "ok": false, "error": string }`

### `POST /api/newsletter`
Request JSON:
- `email: string` (required, valid email)
- `source?: string` (optional)
- `honey?: string` (honeypot)

Response JSON:
- Success new: `{ "ok": true }`
- Success duplicate: `{ "ok": true, "alreadySubscribed": true }`
- Error: `{ "ok": false, "error": string }`

## 10. Content Model
Source of truth: `src/data/projects.ts`

### `Project` interface
- `id`, `title`, `description`
- `liveUrl`, `repoUrl`
- `status`: `shipped | in-progress`
- `category`: `client | full-stack | both`
- `techStack[]`, `role`
- Image fields: `image`, optional `thumbnailSrc`, `previewSrc`, `previewGallery[]`
- `achievements[]`
- `overview.whatItIs`, `overview.whatIDid`

### Services content
- Array of services with `title`, `description`, `features[]`

## 11. UX and UI System

### Theming
Source: `src/components/ThemeProvider.tsx`, `src/app/globals.css`
- Theme modes: `light` and `dark`
- Additional display mode: `hud` (Fallout-inspired green terminal aesthetic)
- Persisted in `localStorage` keys: `theme`, `mode`
- HUD mode enforces custom CSS variables and visual effects (scanlines, vignette, glow)

### Motion
- Framer Motion used for page reveals, drawer transitions, overlays, and element animations

### Navigation UX
Source: `src/components/Navbar.tsx`
- Desktop and mobile nav
- Command palette trigger (`Cmd/Ctrl + K`)
- Theme toggle and HUD toggle
- Global quote CTA

### Command Palette
Source: `src/components/CommandPalette.tsx`
- Includes grouped commands for navigation, project links, external links, and settings
- Supports query filtering and keyboard close (`Escape`)

## 12. SEO and Metadata

### Metadata architecture
- Root metadata in `src/app/layout.tsx`
- Route-specific metadata in each route layout file (`about`, `services`, `work`, `contact`)
- Canonicals set per route
- Open Graph and Twitter metadata configured

### Structured data
Injected in root layout:
- `Person` schema
- `WebSite` schema

### Indexing assets
- `src/app/sitemap.ts` generates sitemap entries for key routes
- `public/robots.txt` allows crawl and points to sitemap

### Social images
- Dynamic OG/Twitter image routes:
  - `src/app/opengraph-image.tsx`
  - `src/app/twitter-image.tsx`
- Shared rendering in `src/app/_socialCard.tsx`

## 13. Project File and Folder Map (Operational)

### Root
- `README.md`: setup summary (partially outdated; says contact form is simulated)
- `SEO.md`: SEO implementation notes and milestones
- `package.json`: scripts and dependencies
- `next.config.ts`: minimal Next config
- `tsconfig.json`: strict TS + `@/*` path alias

### `src/app`
- `layout.tsx`: root shell, metadata, structured data, ThemeProvider, Navbar/Footer, Vercel Speed Insights
- `page.tsx`: home page + newsletter form and submission logic
- `work/page.tsx`: filtered project list
- `services/page.tsx`: services details
- `about/page.tsx`: profile and value proposition
- `contact/page.tsx`: contact form and status handling
- `api/contact/route.ts`: Resend-driven contact endpoint
- `api/newsletter/route.ts`: Supabase + Resend newsletter endpoint
- `sitemap.ts`: sitemap generator
- `opengraph-image.tsx`, `twitter-image.tsx`, `_socialCard.tsx`: social card generation

### `src/components`
- `ThemeProvider.tsx`: theme/mode context and DOM class management
- `Navbar.tsx`: global header + controls + command palette
- `Footer.tsx`: social links/footer
- `CommandPalette.tsx`: modal command launcher
- `ProjectCard.tsx`: reusable project tile
- `ProjectDrawer.tsx`: project detail side panel with tabs and image carousel

### `src/data`
- `projects.ts`: projects and services data content source

### `public`
- Favicons + web manifest icons
- Route-independent static assets
- Project preview image folders for Minute Maids, Posh, Quit Smoking Tracker
- `robots.txt`

## 14. Dependencies (Key Runtime)
- `next`, `react`, `react-dom`
- `framer-motion`
- `lucide-react`
- `@supabase/supabase-js`
- `resend`
- `zod`
- `@vercel/speed-insights`

## 15. Environment Variables
Required for full production behavior:
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL` (optional; defaults to `colbynelsen@gmail.com`)
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEWSLETTER_NOTIFY_TO` (optional for notification email)
- `NEXT_PUBLIC_SITE_URL` (optional; default `https://colbynelsen.com` for sitemap)

## 16. Non-Functional Requirements
- Responsive behavior across mobile/tablet/desktop
- Fast perceived performance via lightweight pages and optimized media usage
- Basic anti-spam protection for forms (honeypot)
- Graceful error handling and user feedback for network failures
- SEO crawlability and share-friendly metadata

## 17. Known Gaps and Risks
- README includes outdated note that contact form is simulated
- Contact endpoint currently does minimal validation beyond required fields
- Contact submissions are emailed but not persisted in database
- No automated test suite is present in repository
- Some in-progress projects reference placeholder image paths/repo links (`#`)

## 18. Suggested Future Enhancements
- Add Supabase persistence for contact submissions and inquiry status tracking
- Add stronger validation/sanitization/rate limiting for contact endpoint
- Add analytics and conversion event tracking
- Add automated tests for API endpoints and key UI flows
- Add admin visibility for newsletter and inquiry management

## 19. Local Development and Commands
Scripts from `package.json`:
- `npm run dev`: start dev server
- `npm run build`: production build
- `npm run start`: run production server
- `npm run lint`: ESLint

## 20. AI Handoff Notes
If another AI agent continues work on this project, prioritize reading these files first:
1. `src/app/layout.tsx`
2. `src/app/page.tsx`
3. `src/app/api/newsletter/route.ts`
4. `src/app/api/contact/route.ts`
5. `src/data/projects.ts`
6. `src/components/ThemeProvider.tsx`
7. `src/components/ProjectDrawer.tsx`

Quick orientation summary:
- Content is code-defined, not CMS-backed
- Main business logic is in two API routes
- Supabase currently powers newsletter storage; Resend powers outbound email delivery
- Primary product goal is lead capture and credibility building
