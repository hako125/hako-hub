export const site = {
  name: "Hako",
  handle: "Hako",
  tagline: "Fullstack Developer & AI Enthusiast",
  title: "Hako Hub",
  description: "Personal",
  email: "adityaalok.0088@gmail.com",
  github: "https://github.com/Adi2329002",
  githubHandle: "Adi2329002",
  linkedin: "https://www.linkedin.com/in/adityaalok0088",
  linkedinHandle: "adityaalok0088",
  node: "Bhubaneswar, IN",
  year: 2026,
};

export const navLinks = [
  { href: "/articles", label: "Articles" },
  { href: "/categories", label: "Categories" },
  { href: "/projects", label: "Projects" },
];

/**
 * Contact points rendered in the footer. `icon` is a 24x24 SVG path so the
 * component stays data-driven instead of hardcoding one block per service.
 */
export const socials = [
  {
    label: "GitHub",
    href: site.github,
    handle: site.githubHandle,
    icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
  },
  {
    label: "LinkedIn",
    href: site.linkedin,
    handle: site.linkedinHandle,
    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Email",
    href: `mailto:${site.email}`,
    handle: site.email,
    icon: "M1.5 6.75A2.25 2.25 0 013.75 4.5h16.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 17.25V6.75zm1.9-.75l8.6 5.733L20.6 6H3.4zm17.1 1.62l-8.03 5.353a1.5 1.5 0 01-1.666 0L2.5 7.62V17.25c0 .69.56 1.25 1.25 1.25h16.5c.69 0 1.25-.56 1.25-1.25V7.62z",
  },
];

export const terminalBoot = `> phoebe.chubi("★")
> initializing core_modules...
  [██████████████████] 100%
> complete...
 `;

export const heroTags = [
  {
    label: "[ MUSIC ]",
    className:
      "border-tag-b/35 bg-tag-b/10 text-tag-b shadow-[0_0_10px_var(--tag-b)]/10",
  },
  {
    label: "[ CODING ]",
    className:
      "border-tag-a/35 bg-tag-a/10 text-tag-a shadow-[0_0_10px_var(--tag-a)]/10",
  },
  {
    label: "[ GAMES ]",
    className:
      "border-tag-c/35 bg-tag-c/10 text-tag-c shadow-[0_0_10px_var(--tag-c)]/10",
  },
];

export const profile = {
  name: "Aditya Alok",
  education: "B.Tech CSCE @ KIIT University",
  baseLocation: "Patna, Bihar -> Bhubaneswar",
  currentFocus: [
    "Offensive/Defensive Security",
    "Hardware Level Optimization",
    "Machine Learning Models",
  ],
  offlineInterests: ["Riding Bikes", "Rock Music", "Cars", "Books"],
};

export const experiences = [
  {
    title: "Smart India Hackathon",
    year: "2024",
    role: "> Runner-Up (Hardware Edition)",
    description:
      "Designed and engineered a hardware-based Search and Rescue Bot to navigate hazardous environments and assist in complex disaster recovery operations.",
    accent: "brand",
  },
  {
    title: "National Univ. of Singapore",
    year: "2025",
    role: "> Global Immersion Intern",
    description:
      "Collaborated on advanced data science and Machine Learning projects, specifically leading a team to build an AI model for health insurance cross-sell predictions.",
    accent: "soft",
  },
] as const;

export type ProjectTrack = "hardware" | "ai" | "systems" | "web" | "infra";

export type Project = {
  /** Stable identifier, also used as the anchor on /projects. */
  slug: string;
  title: string;
  type: string;
  description: string;
  stack: string[];
  repo: string | null;
  /** Grouping used for the filter chips on /projects. */
  track: ProjectTrack;
  year: number;
  /** The two headline pieces surfaced on the landing page. */
  featured?: boolean;
};

/** Display metadata per track, shared by the filter chips and card badges. */
export const projectTracks: {
  id: ProjectTrack;
  label: string;
  abbr: string;
}[] = [
  { id: "hardware", label: "Hardware & Robotics", abbr: "HW" },
  { id: "ai", label: "AI & Data", abbr: "AI" },
  { id: "systems", label: "Systems & Security", abbr: "SYS" },
  { id: "web", label: "Full-Stack Web", abbr: "WEB" },
  { id: "infra", label: "Infrastructure", abbr: "INFRA" },
];

export const projects: Project[] = [
  {
    slug: "search-and-rescue-bot",
    title: "Search and Rescue Bot",
    type: "SIH 2024 / Robotics",
    description:
      "Runner-up project at the Smart India Hackathon 2024 (Hardware Edition). Engineered a hardware-based search and rescue robot designed to navigate hazardous environments and assist in disaster recovery operations.",
    stack: ["Robotics", "IoT", "Hardware Design", "Microcontrollers"],
    repo: null,
    track: "hardware",
    year: 2024,
    featured: true,
  },
  {
    slug: "health-insurance-cross-sell",
    title: "Health Insurance Cross-Sell",
    type: "Machine Learning (NUS)",
    description:
      "Developed during the NUS Global Immersion program. Led a team to build an AI model analyzing customer data to predict cross-selling opportunities for health insurance using advanced data science techniques.",
    stack: ["Python", "Scikit-Learn", "Data Analytics"],
    repo: null,
    track: "ai",
    year: 2025,
    featured: true,
  },
  {
    slug: "rust-tcp-packet-sniffer",
    title: "Rust TCP Packet Sniffer",
    type: "Systems / Security",
    description:
      "A high-performance network packet sniffer built from scratch in Rust. Intercepts and logs TCP traffic for deep packet inspection and network security monitoring.",
    stack: ["Rust", "TCP/IP", "Libpcap", "Networking"],
    repo: "https://github.com/Adi2329002/Rust-TCP-packet-Sniffer",
    track: "systems",
    year: 2025,
  },
  {
    slug: "ai-virtual-mouse",
    title: "AI Virtual Mouse",
    type: "Computer Vision",
    description:
      "A production-ready application for real-time hand tracking and gesture recognition, allowing users to control their system interface entirely through a webcam feed.",
    stack: ["Python", "MediaPipe", "PyQt6", "OpenCV"],
    repo: "https://github.com/Adi2329002/AI_Virtual_Mouse",
    track: "ai",
    year: 2025,
  },
  {
    slug: "bharatdocs",
    title: "BharatDocs",
    type: "Full-Stack Web App",
    description:
      "A cloud-first word processor reimagined for Indian linguistic diversity. Features real-time multilingual translation, voice typing tuned for Indian accents, and AI-assisted academic summarization.",
    stack: ["Next.js", "Convex", "Clerk Auth", "Tailwind CSS"],
    repo: "https://github.com/Adi2329002/Indian_Word_Prossecor",
    track: "web",
    year: 2025,
  },
  {
    slug: "market-analysis-nash-equilibrium",
    title: "Market Analysis & Nash Eq.",
    type: "Game Theory / ML",
    description:
      "An analytical model applying Game Theory and Nash Equilibrium concepts to market analysis. Uses data-driven techniques to simulate competitive market strategies.",
    stack: ["Python", "Game Theory", "Data Analysis", "Pandas"],
    repo: "https://github.com/Adi2329002/Market-analysis-Nash-equilibrium-",
    track: "ai",
    year: 2025,
  },
  {
    slug: "proxmox-virtualized-server",
    title: "Proxmox Virtualized Server",
    type: "Infrastructure / DevOps",
    description:
      "Engineered a bare-metal home server using Proxmox VE and TrueNAS. Hosted virtual machines and containers for cybersecurity deployment, network testing, and self-hosted services.",
    stack: ["Proxmox", "TrueNAS", "Linux", "Networking"],
    repo: null,
    track: "infra",
    year: 2024,
  },
];

/** The headline projects shown on the landing page, newest first. */
export const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((a, b) => b.year - a.year);
