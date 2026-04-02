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
    image: "/projects/URLRay.com/urlray-carousel-1-scan-section.png",
    thumbnailSrc: "/projects/URLRay.com/urlray-carousel-1-scan-section.png",
    previewSrc: "/projects/URLRay.com/urlray-carousel-1-scan-section.png",
    previewGallery: [
      "/projects/URLRay.com/urlray-carousel-1-scan-section.png",
      "/projects/URLRay.com/urlray-carousel-2-fix-plan-section.png",
      "/projects/URLRay.com/urlray-carousel-3-issues-found-section.png",
      "/projects/URLRay.com/urlray-carousel-4-possible-improvements-section.png",
      "/projects/URLRay.com/urlray-carousel-5-rendered-evidence-section.png",
      "/projects/URLRay.com/urlray-carousel-6-footer-section.png",
      "/projects/URLRay.com/urlray-carousel-7-dahboard-overview.png",
      "/projects/URLRay.com/urlray-carousel-8-dashboard-comparison.png",
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
      "Increased client inquiries by 40% with optimized conversion funnel",
      "Built responsive design that works flawlessly across all devices",
      "Integrated client portal for seamless service management",
      "Implemented SEO best practices for local search visibility"
    ],
    overview: {
      whatItIs: "A complete digital presence for a professional cleaning service, featuring service showcases, booking integration, and client management portal.",
      whatIDid: "Developed the full website from concept to deployment, including responsive design, performance optimization, and client portal integration. Focused on conversion optimization and user experience."
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
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
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
      "Integrated Stripe payments for premium service bookings",
      "Achieved 98+ Lighthouse performance score",
      "Built mobile-first responsive experience"
    ],
    overview: {
      whatItIs: "A sophisticated website for a high-end salon, showcasing services, stylists, and facilitating online appointment bookings with premium user experience.",
      whatIDid: "Designed and developed the complete digital experience, emphasizing luxury aesthetics and seamless booking flow. Integrated payment processing and optimized for conversions."
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
    techStack: ["Next.js", "TypeScript", "PWA", "Chart.js"],
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
      "Built complete PWA with offline functionality",
      "Implemented progress tracking and analytics dashboard",
      "Created engaging gamification elements",
      "Achieved installable PWA with native app feel"
    ],
    overview: {
      whatItIs: "A comprehensive smoking cessation tracking application that helps users monitor their progress, set goals, and maintain motivation through data visualization and achievements.",
      whatIDid: "Architected and built the complete application including PWA features, data persistence, analytics dashboard, and engaging user interface. Focused on user retention and motivation."
    }
  },
  {
    id: "collections-autopilot",
    title: "Collections Autopilot",
    description: "Automated collections management system for small businesses with invoice tracking and payment automation.",
    liveUrl: "#",
    repoUrl: "#",
    status: "in-progress",
    category: "full-stack",
    techStack: ["Next.js", "TypeScript", "Prisma", "Stripe", "PostgreSQL"],
    role: "Full-Stack Developer",
    image: "/images/collections.jpg",
    achievements: [
      "Designed robust data model for complex financial workflows",
      "Implemented automated payment retry logic",
      "Built comprehensive dashboard for business owners",
      "Created API integrations with accounting software"
    ],
    overview: {
      whatItIs: "A comprehensive collections management platform that automates invoice follow-ups, payment tracking, and customer communication for small businesses.",
      whatIDid: "Currently developing the full-stack application with focus on automation, reliability, and user experience. Building robust backend systems and intuitive management interfaces."
    }
  },
  {
    id: "chorespace",
    title: "ChoreSpace",
    description: "Family chore management platform with task assignments, point systems, and progress tracking.",
    liveUrl: "#",
    repoUrl: "#",
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
