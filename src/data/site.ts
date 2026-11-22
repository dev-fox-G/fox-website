import type { StaticImageData } from "next/image";
import assamPhoto from "@/assets/assam.jpg";
import izrarPhoto from "@/assets/izrar.jpeg";
import type { ProjectIconName, ServiceIconName } from "@/components/icons";

/* ==========================================================
   All editable content lives here.
   Search for the YOUR-... / XXXX placeholders and replace them.
   ========================================================== */

export type SocialLinks = {
  linkedin: string;
  whatsapp: string;
  instagram: string;
};

export const site = {
  name: "DevFox",
  email: "devfoxglobal@gmail.com",
  phoneDisplay: "+92 316 7519007", // TODO: replace with your real number
  phoneHref: "tel:+923167519007", // TODO: replace with your real number
  location: "Punjab, Pakistan",
  social: {
    linkedin: "https://www.linkedin.com/company/YOUR-COMPANY-PAGE",
    whatsapp: "https://wa.me/92 316 7519007", // digits only, international format
    instagram: "https://www.instagram.com/YOUR-COMPANY-HANDLE",
  } satisfies SocialLinks,
};

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Technology" },
  { href: "#about", label: "About" },
  { href: "#team", label: "Team" },
] as const;

/** Section ids used by the nav highlight. */
export const sectionIds = ["home", "services", "work", "stack", "about", "team", "contact"] as const;

export const heroFacts = [
  { label: "Based in", value: "Punjab, Pakistan" },
  { label: "We reply within", value: "24 hours" },
  { label: "NDA", value: "Signed on request" },
];

export const services: { title: string; text: string; icon: ServiceIconName }[] = [
  {
    title: "Web development",
    icon: "code",
    text: "Fast, secure websites and web applications that grow with your business, built on modern, well-supported technology.",
  },
  {
    title: "Mobile apps",
    icon: "mobile",
    text: "iOS and Android apps from a single codebase, designed to feel natural on every phone your customers use.",
  },
  {
    title: "UI/UX design",
    icon: "design",
    text: "Interfaces that are clear to use and easy on the eye, shaped by how your customers actually behave.",
  },
  {
    title: "Cloud and DevOps",
    icon: "cloud",
    text: "Reliable hosting, automated deployments and monitoring, so your product stays online and updates ship safely.",
  },
  {
    title: "AI and automation",
    icon: "ai",
    text: "Chatbots, recommendation features and workflow automation that take repetitive work off your team.",
  },
  {
    title: "Custom software",
    icon: "layers",
    text: "ERP, CRM and internal tools built around the way your company really works, not the other way round.",
  },
];

export type ProjectTone = "blue" | "teal" | "violet" | "slate";

/* NOTE: these four projects are sample entries. Replace them with your real projects. */
export const projects: {
  sector: string;
  title: string;
  text: string;
  stack: string;
  tone: ProjectTone;
  icon: ProjectIconName;
  /** Live website of the project. Clicking the project image opens it in a new tab. */
  url: string;
}[] = [
  {
    sector: "Finance",
    title: "POS web app",
    text: "Digital Khata,Inventory management system,Billings and Sales.",
    stack: "React Native, Node.js, PostgreSQL, AWS",
    tone: "blue",
    url: "https://YOUR-NEXABANK-WEBSITE.com",
    icon: "phone",
  },
  {
    sector: "Healthcare",
    title: "MediCare patient portal",
    text: "Patient records, appointment booking and video consultations in one secure system.",
    stack: "Next.js, Python, MongoDB, GCP",
    tone: "teal",
    url: "https://YOUR-MEDICARE-WEBSITE.com",
    icon: "pulse",
  },
  {
    sector: "Education",
    title: "LearnSphere platform",
    text: "An e-learning platform with adaptive lessons, live classes and progress tracking.",
    stack: "React, Django, Redis, Azure",
    tone: "violet",
    url: "https://YOUR-LEARNSPHERE-WEBSITE.com",
    icon: "book",
  },
  {
    sector: "Logistics",
    title: "LogiTrack fleet management",
    text: "Live vehicle tracking, route planning and delivery reports for dispatch teams.",
    stack: "Vue.js, Go, Kafka, Docker",
    tone: "slate",
    url: "https://YOUR-LOGITRACK-WEBSITE.com",
    icon: "truck",
  },
];

export const stack = [
  { title: "Frontend", items: "React, Vue.js, Next.js, Angular, TypeScript" },
  { title: "Backend", items: "Node.js, Python, Go, Java, PHP" },
  { title: "Mobile", items: "React Native, Flutter, Swift, Kotlin" },
  { title: "Cloud and DevOps", items: "AWS, Google Cloud, Azure, Docker, Kubernetes" },
];

export const commitments = [
  {
    title: "Regular, visible progress",
    text: "We work in two-week sprints and show you a working version at the end of each one.",
  },
  {
    title: "Your ideas stay private",
    text: "We are happy to sign an NDA before you share any details of your project.",
  },
  {
    title: "Support after launch",
    text: "We stay on after go-live to fix issues and keep your system running smoothly.",
  },
  {
    title: "Honest timelines",
    text: "We agree realistic dates up front, and tell you early if anything changes.",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  photo: StaticImageData;
  alt: string;
  /**
   * Where the face is in the photo, as fractions of the photo:
   * x, y = middle of the eye line, width = cheek to cheek.
   * The card uses this to place the face exactly where the design needs it.
   */
  focus: { x: number; y: number; width: number };
  /** Optional personal email. Falls back to the company email. */
  email?: string;
  social: SocialLinks;
};

/* To add a team member, copy one entry below. Cards appear automatically. */
export const team: TeamMember[] = [
  {
    name: "SM Assam",
    role: "Founder and CEO",
    photo: assamPhoto,
    focus: { x: 0.51, y: 0.33, width: 0.285 },
    alt: "SM Assam, Founder and CEO of DevFox",
    social: {
      linkedin: "https://www.linkedin.com/in/ASSAM-PROFILE",
      whatsapp: "https://wa.me/923167519007",
      instagram: "https://www.instagram.com/ASSAM-HANDLE",
    },
  },
  {
    name: "Izrar Shahzad",
    role: "Co-founder and COO",
    photo: izrarPhoto,
    focus: { x: 0.509, y: 0.259, width: 0.343 },
    alt: "Izrar Shahzad, Co-founder and COO of DevFox",
    social: {
      linkedin: "https://www.linkedin.com/in/izrar-shahzad-a47533405/",
      whatsapp: "https://wa.me/923419171351",
      instagram: "https://www.instagram.com/IZRAR-HANDLE",
    },
  },
];

export const serviceOptions = [
  "Web development",
  "Mobile app",
  "UI/UX design",
  "Cloud and DevOps",
  "AI and automation",
  "Custom software",
   "Custom Website Building",
   "API Integration",
  "Something else",

];

export const budgetOptions = ["Under $5k", "$5k to $15k", "$15k to $50k", "$50k and above", "Not sure yet"];
