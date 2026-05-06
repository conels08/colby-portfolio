# Prompt 04 — Testimonials Section

In `src/app/page.tsx`, add a new section **between** the "Featured Work" section and the "Services" section.

Requirements:
- Section title: "What Clients Say"
- Display 2 placeholder testimonial cards
- Each card should have: a quote, a client name, and a business name — all clearly marked with `{/* PLACEHOLDER */}` comments so they're easy to find and replace later
- Match the visual style of the existing service cards (same padding, border radius, background using `var(--card)` or `var(--background)` as appropriate)
- Use the same `motion.div` scroll-triggered animation pattern already used throughout the page
- Support both default and HUD mode (`isHud`) the same way other sections do
