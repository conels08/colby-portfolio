# Colby Portfolio

Next.js App Router portfolio site for showcasing work, services, and contact flow.

## Tech Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React
- Resend
- Vercel Analytics + Speed Insights

## Scripts

```bash
npm run dev    # start local dev server
npm run build  # production build
npm run start  # run production server
npm run lint   # run ESLint
```

## Routes

- `/` -> home / featured work
- `/work` -> full project listing + filters
- `/services` -> services detail page
- `/about` -> about page
- `/contact` -> contact page + form UI
- `/privacy` -> privacy policy
- `/terms` -> terms of service

## Project Structure

```text
.
├── src/
│   ├── app/
│   │   ├── layout.tsx              # root layout, metadata, global shell
│   │   ├── globals.css             # design tokens, global styles, HUD mode styles
│   │   ├── page.tsx                # home page
│   │   ├── about/page.tsx          # about page
│   │   ├── contact/page.tsx        # contact page + client-side form state
│   │   ├── api/contact/route.ts    # validated contact form endpoint
│   │   ├── api/newsletter/route.ts # newsletter subscription endpoint
│   │   ├── services/page.tsx       # services page
│   │   ├── work/page.tsx           # work page with filters + drawer
│   │   └── sitemap.ts              # generated sitemap route
│   ├── components/
│   │   ├── ThemeProvider.tsx       # theme and HUD mode context/provider
│   │   ├── Navbar.tsx              # navigation, mobile menu, toggles, command palette trigger
│   │   ├── Footer.tsx              # footer/social links
│   │   ├── CommandPalette.tsx      # Cmd/Ctrl+K command palette
│   │   ├── ProjectCard.tsx         # reusable project card
│   │   └── ProjectDrawer.tsx       # right-side project details drawer
│   └── data/
│       └── projects.ts             # typed project + services content source
├── public/
│   ├── robots.txt
│   ├── site.webmanifest
│   ├── icon.svg
│   └── favicon/app icon assets
├── package.json
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
└── README.md
```

## Notes

- Content is primarily driven from `src/data/projects.ts`.
- Theme state and HUD mode are controlled in `src/components/ThemeProvider.tsx`.
- Contact form submissions are handled by `src/app/api/contact/route.ts`.
- Newsletter signups are handled by `src/app/api/newsletter/route.ts`.
- Site metadata, icons, and structured data are defined in `src/app/layout.tsx`.
