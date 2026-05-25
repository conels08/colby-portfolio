export interface Project {
  id: string;
  title: string;
  description: string;
  liveUrl: string;
  repoUrl: string;
  status: "shipped" | "in-progress";
  category: "client" | "full-stack" | "both";
  techStack: string[];
  role: string;
  image: string;
  thumbnailSrc?: string;
  previewSrc?: string;
  previewGallery?: string[];
  achievements: string[];
  overview: {
    whatItIs: string;
    whatIDid: string;
  };
}

export const projects: Project[] = [
  {
    id: "urlray",
    title: "URLRay.com",
    description: "AI-powered website auditing app that scans pages, surfaces UX and technical issues, and generates prioritized fixes.",
    liveUrl: "https://urlray.com",
    repoUrl: "#",
    status: "shipped",
    category: "full-stack",
    techStack: ["Next.js", "TypeScript", "Supabase", "AI Workflows"],
    role: "Full-Stack Developer",
    image: "/projects/URLRay.com/urlray-carousel-1-hero.png",
    thumbnailSrc: "/projects/URLRay.com/urlray-carousel-1-hero.png",
    previewSrc: "/projects/URLRay.com/urlray-carousel-1-hero.png",
    previewGallery: [
      "/projects/URLRay.com/urlray-carousel-1-hero.png",
      "/projects/URLRay.com/urlray-carousel-2-before-after.png",
      "/projects/URLRay.com/urlray-carousel-3-scan-summary.png",
      "/projects/URLRay.com/urlray-carousel-4-fix-plan.png",
      "/projects/URLRay.com/urlray-carousel-5-monitoring.png",
      "/projects/URLRay.com/urlray-carousel-6-rendered-evidence.png",
    ],
    achievements: [
      "Built an AI-assisted audit workflow that turns a URL into actionable website fixes",
      "Designed a results experience that organizes scan findings into prioritized sections",
      "Created side-by-side evidence views to help users validate issues quickly",
      "Shipped a productized UX around website analysis, recommendations, and comparison"
    ],
    overview: {
      whatItIs: "A website review platform that scans live pages, identifies UX and technical issues, and presents fix recommendations with supporting evidence.",
      whatIDid: "Designed and built the product experience end to end, including the scan flow, results dashboard, issue breakdowns, evidence views, and polished presentation of recommendations."
    }
  },
  {
    id: "minute-maids",
    title: "Minute Maids",
    description: "Professional cleaning service website with modern design and client portal integration.",
    liveUrl: "https://minutemaidsclean.com",
    repoUrl: "https://github.com/conels08/minute-maids-landing",
    status: "shipped",
    category: "client",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    role: "Full-Stack Developer",
    image: "/projects/Minute-Maids/minute-maids.png",
    thumbnailSrc: "/projects/Minute-Maids/minute-maids.png",
    previewSrc: "/projects/Minute-Maids/minute-maids.png",
    previewGallery: [
      "/projects/Minute-Maids/minute-maids-carousel-1.png",
      "/projects/Minute-Maids/minute-maids-carousel-2.png",
      "/projects/Minute-Maids/minute-maids-carousel-3.png",
      "/projects/Minute-Maids/minute-maids-carousel-4.png",
      "/projects/Minute-Maids/minute-maids-carousel-5.png",
      "/projects/Minute-Maids/minute-maids-carousel-6.png",
      "/projects/Minute-Maids/minute-maids-carousel-7.png",
      "/projects/Minute-Maids/minute-maids-carousel-8.png",
      "/projects/Minute-Maids/minute-maids-carousel-9.png",
    ],
    achievements: [
      "Gave the business its first professional web presence — clients can now find and refer the service online",
      "Built a conversion-focused layout that turns visitors into direct booking inquiries",
      "Built responsive design that works flawlessly across all devices",
      "Implemented SEO best practices for local search visibility"
    ],
    overview: {
      whatItIs: "A complete digital presence for a professional cleaning service, featuring service showcases, pricing, and a direct contact and booking flow.",
      whatIDid: "Developed the full website from concept to deployment, including responsive design, performance optimization, and a conversion-focused layout. Gave the business a credible online presence it could grow from."
    }
  },
  {
    id: "quit-smoking",
    title: "Quit Smoking Tracker",
    description: "Progressive web app to help users track their smoking cessation journey with analytics and motivation.",
    liveUrl: "https://cto-playground.vercel.app/",
    repoUrl: "https://github.com/conels08/CTO-playground",
    status: "shipped",
    category: "full-stack",
    techStack: ["Next.js", "TypeScript", "Prisma", "Supabase", "NextAuth"],
    role: "Full-Stack Developer",
    image: "/projects/Quit-Smoking-Tracker/quit-smoking-tracker.png",
    thumbnailSrc: "/projects/Quit-Smoking-Tracker/quit-smoking-tracker.png",
    previewSrc: "/projects/Quit-Smoking-Tracker/quit-smoking-tracker.png",
    previewGallery: [
      "/projects/Quit-Smoking-Tracker/quit-smoking-carousel-1.png",
      "/projects/Quit-Smoking-Tracker/quit-smoking-carousel-2.png",
      "/projects/Quit-Smoking-Tracker/quit-smoking-carousel-3.png",
      "/projects/Quit-Smoking-Tracker/quit-smoking-carousel-4.png",
      "/projects/Quit-Smoking-Tracker/quit-smoking-carousel-5.png",
      "/projects/Quit-Smoking-Tracker/quit-smoking-carousel-6.png",
      "/projects/Quit-Smoking-Tracker/quit-smoking-carousel-7.png",
      "/projects/Quit-Smoking-Tracker/quit-smoking-carousel-8.png",
    ],
    achievements: [
      "Built full auth system with NextAuth and Supabase Postgres — sign up, sign in, session management",
      "Implemented smart demo mode that shows real sample data without requiring sign-up",
      "Designed daily check-in system tracking cravings, mood, and notes with per-user data scoping",
      "Built milestone engine computing days smoke-free, money saved, and health recovery markers"
    ],
    overview: {
      whatItIs: "A smoke-cessation tracking web app where users log their quit date, track daily check-ins, and watch milestones unlock over time. Includes a demo mode so anyone can explore the experience without signing up.",
      whatIDid: "Built the full stack — auth with NextAuth, Prisma ORM against Supabase Postgres, protected API routes, daily check-in system, milestone calculations, demo mode with sample data, and email list capture with Kit integration."
    }
  },
  {
    id: "posh",
    title: "Posh",
    description: "Boutique website for luxury salon with appointment booking and service showcase.",
    liveUrl: "https://poshnewberg.com",
    repoUrl: "https://github.com/conels08/posh-site",
    status: "shipped",
    category: "client",
    techStack: ["HTML", "CSS", "JavaScript", "Netlify"],
    role: "Full-Stack Developer",
    image: "/projects/Posh/posh.png",
    thumbnailSrc: "/projects/Posh/posh.png",
    previewSrc: "/projects/Posh/posh.png",
    previewGallery: [
      "/projects/Posh/posh-carousel-1.png",
      "/projects/Posh/posh-carousel-2.png",
      "/projects/Posh/posh-carousel-3.png",
      "/projects/Posh/posh-carousel-4.png",
      "/projects/Posh/posh-carousel-5.png",
      "/projects/Posh/posh-carousel-6.png",
    ],
    achievements: [
      "Created elegant, luxury-focused brand presentation",
      "Built artist directory with dynamic filtering by service type",
      "Achieved 98+ Lighthouse performance score",
      "Built mobile-first responsive experience"
    ],
    overview: {
      whatItIs: "A sophisticated website for a high-end salon, showcasing services, stylists, and linking visitors to each artist's individual booking system.",
      whatIDid: "Designed and developed the complete site in vanilla HTML, CSS, and JavaScript — no framework, no build tooling. Focused on luxury aesthetics, fast load times, and a clean artist directory experience."
    }
  },
  {
    id: "collections-autopilot",
    title: "Collections Autopilot",
    description: "Automated collections management system for small businesses with invoice tracking and payment automation.",
    liveUrl: "https://collections-autopilot.vercel.app",
    repoUrl: "https://github.com/conels08/collections-autopilot",
    status: "in-progress",
    category: "full-stack",
    techStack: ["Next.js", "TypeScript", "Prisma", "Stripe", "PostgreSQL"],
    role: "Full-Stack Developer",
    image: "/images/collections.jpg",
    achievements: [
      "Built invoice tracking system with automated follow-up email sequences via Resend",
      "Implemented snooze and mark-paid workflows to manage collections without manual effort",
      "Designed a clean dashboard giving business owners a real-time view of outstanding invoices",
      "Architected full auth flow, Supabase backend, and server-side data layer in Next.js"
    ],
    overview: {
      whatItIs: "An invoice and collections management tool that automates follow-up emails, tracks payment status, and gives small business owners a clear view of what they're owed.",
      whatIDid: "Built the full application — auth, invoice CRUD, automated follow-up email system, snooze/mark-paid workflows, and a business owner dashboard. Integrated Resend for transactional email and Supabase for the backend."
    }
  },
  {
    id: "chorespace",
    title: "ChoreSpace",
    description: "Family chore management platform with task assignments, point systems, and progress tracking.",
    liveUrl: "#",
    repoUrl: "https://github.com/conels08/chores-for-the-fam",
    status: "in-progress",
    category: "full-stack",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    role: "Full-Stack Developer",
    image: "/images/chorespace.jpg",
    achievements: [
      "Designed family-centric user experience",
      "Built flexible point and reward system",
      "Implemented collaborative features for family coordination",
      "Created admin dashboard for parents"
    ],
    overview: {
      whatItIs: "A family-oriented task management system that gamifies household responsibilities, encouraging participation through points, rewards, and progress tracking.",
      whatIDid: "Developing the complete platform with focus on family dynamics, engagement, and seamless task management. Building collaborative features and administrative controls."
    }
  }
];

export const services = [
  {
    title: "Business Websites",
    description: "Professional, conversion-focused websites that establish credibility and drive results for your business.",
    features: [
      "Modern, responsive design",
      "SEO optimization",
      "Fast loading performance",
      "Mobile-first approach",
      "Contact form integration"
    ]
  },
  {
    title: "AI & Automation",
    description: "Custom AI agents and automations that eliminate repetitive work and plug directly into your tools and workflows.",
    features: [
      "AI-powered workflows",
      "Custom agent development",
      "API and tool integrations",
      "Process automation",
      "ChatGPT / Claude integration"
    ]
  },
  {
    title: "Full-Stack MVPs",
    description: "Complete web applications built to validate your ideas and scale with your business growth.",
    features: [
      "Custom backend architecture",
      "Database design and implementation",
      "API development",
      "Authentication systems",
      "Admin dashboards"
    ]
  },
  {
    title: "Fixes & UX Polish",
    description: "Enhance existing applications with performance improvements, new features, and user experience refinements.",
    features: [
      "Performance optimization",
      "Bug fixes and stability improvements",
      "Feature additions",
      "UI/UX enhancements",
      "Code refactoring"
    ]
  }
];
