export const site = {
  name: "Aditya Alok",
  handle: "AdityaAlok",
  tagline: "Systems Builder & Sec Ops_",
  title: "Aditya Alok | Systems Builder & Sec Ops",
  description:
    "Portfolio of Aditya Alok. Focused on the intersection of Cyber Security, IoT, and Machine Learning. Building robust, attack-resistant systems.",
  resumeUrl:
    "https://drive.google.com/file/d/14RKoHgdZ83goGyE3wfzkb8RsEy-d3r-6/view?usp=drivesdk",
  email: "adityaalok.0088@gmail.com",
  github: "https://github.com/Adi2329002",
  githubHandle: "Adi2329002",
  linkedin: "https://www.linkedin.com/in/adityaalok0088",
  linkedinHandle: "adityaalok0088",
  node: "Bhubaneswar, IN",
  year: 2026,
};

export const navLinks = [
  { href: "#about", label: "01_About", mobile: "./about" },
  { href: "#skills", label: "02_Stack", mobile: "./stack" },
  { href: "#projects", label: "03_Projects", mobile: "./projects" },
  { href: "#contacts", label: "Execute_Contact()", mobile: "./contact" },
];

export const terminalBoot = `> system.boot()
> initializing core_modules...
  [██████████████████] 100%
> identity: student @ KIIT
> target_lock: [cyber_sec, iot, ml]
> rust_compiler: online
> establishing secure connection...
> root@aditya:~# `;

export const heroTags = [
  {
    label: "[ CYBER_SECURITY ]",
    className: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400 shadow-[0_0_10px_var(--color-emerald-500)]/10",
  },
  {
    label: "[ IoT_HARDWARE ]",
    className: "border-blue-500/30 bg-blue-500/5 text-blue-400 shadow-[0_0_10px_var(--color-blue-500)]/10",
  },
  {
    label: "[ AI/ML ]",
    className: "border-purple-500/30 bg-purple-500/5 text-purple-400 shadow-[0_0_10px_var(--color-purple-500)]/10",
  },
];

export const skillModules = [
  {
    category: "Languages",
    items: ["Rust", "C/C++", "Python", "Java", "JavaScript", "Bash Scripting"],
  },
  {
    category: "Hardware & Embedded",
    items: ["ESP32", "Raspberry Pi (4B/Zero 2W)", "Arduino", "Embedded C++"],
  },
  {
    category: "Infra & DevOps",
    items: ["Proxmox VE", "TrueNAS", "Docker", "Linux Admin", "Git", "Cloud Foundations"],
  },
  {
    category: "Domains",
    items: ["Cybersecurity", "IoT", "AI/ML", "Cloud Computing"],
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
    accent: "emerald",
  },
  {
    title: "National Univ. of Singapore",
    year: "2025",
    role: "> Global Immersion Intern",
    description:
      "Collaborated on advanced data science and Machine Learning projects, specifically leading a team to build an AI model for health insurance cross-sell predictions.",
    accent: "blue",
  },
] as const;

export type Project = {
  title: string;
  type: string;
  description: string;
  stack: string[];
  repo: string | null;
};

export const projects: Project[] = [
  {
    title: "Search and Rescue Bot",
    type: "SIH 2024 / Robotics",
    description:
      "Runner-up project at the Smart India Hackathon 2024 (Hardware Edition). Engineered a hardware-based search and rescue robot designed to navigate hazardous environments and assist in disaster recovery operations.",
    stack: ["Robotics", "IoT", "Hardware Design", "Microcontrollers"],
    repo: null,
  },
  {
    title: "Health Insurance Cross-Sell",
    type: "Machine Learning (NUS)",
    description:
      "Developed during the NUS Global Immersion program. Led a team to build an AI model analyzing customer data to predict cross-selling opportunities for health insurance using advanced data science techniques.",
    stack: ["Python", "Scikit-Learn", "Data Analytics"],
    repo: null,
  },
  {
    title: "Rust TCP Packet Sniffer",
    type: "Systems / Security",
    description:
      "A high-performance network packet sniffer built from scratch in Rust. Intercepts and logs TCP traffic for deep packet inspection and network security monitoring.",
    stack: ["Rust", "TCP/IP", "Libpcap", "Networking"],
    repo: "https://github.com/Adi2329002/Rust-TCP-packet-Sniffer",
  },
  {
    title: "AI Virtual Mouse",
    type: "Computer Vision",
    description:
      "A production-ready application for real-time hand tracking and gesture recognition, allowing users to control their system interface entirely through a webcam feed.",
    stack: ["Python", "MediaPipe", "PyQt6", "OpenCV"],
    repo: "https://github.com/Adi2329002/AI_Virtual_Mouse",
  },
  {
    title: "BharatDocs",
    type: "Full-Stack Web App",
    description:
      "A cloud-first word processor reimagined for Indian linguistic diversity. Features real-time multilingual translation, voice typing tuned for Indian accents, and AI-assisted academic summarization.",
    stack: ["Next.js", "Convex", "Clerk Auth", "Tailwind CSS"],
    repo: "https://github.com/Adi2329002/Indian_Word_Prossecor",
  },
  {
    title: "Market Analysis & Nash Eq.",
    type: "Game Theory / ML",
    description:
      "An analytical model applying Game Theory and Nash Equilibrium concepts to market analysis. Uses data-driven techniques to simulate competitive market strategies.",
    stack: ["Python", "Game Theory", "Data Analysis", "Pandas"],
    repo: "https://github.com/Adi2329002/Market-analysis-Nash-equilibrium-",
  },
  {
    title: "Proxmox Virtualized Server",
    type: "Infrastructure / DevOps",
    description:
      "Engineered a bare-metal home server using Proxmox VE and TrueNAS. Hosted virtual machines and containers for cybersecurity deployment, network testing, and self-hosted services.",
    stack: ["Proxmox", "TrueNAS", "Linux", "Networking"],
    repo: null,
  },
];
