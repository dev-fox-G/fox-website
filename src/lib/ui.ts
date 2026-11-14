/** Small class-name joiner (keeps the project dependency-free). */
export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/* Shared Tailwind class strings for repeated patterns */
const btn =
  "inline-flex items-center justify-center gap-2.5 rounded-[10px] px-6 py-[0.85rem] text-base font-semibold leading-tight transition-colors";

export const btnPrimary = `${btn} bg-brand text-ink hover:bg-brand-dark`;
export const btnGhost = `${btn} border-[1.5px] border-[#C9CDE3] text-ink hover:border-ink`;

export const btnGhostDark = `${btn} border-[1.5px] border-white/25 text-white hover:border-white hover:bg-white/5`;

export const sectionPad = "py-18 lg:py-26";
export const h2 = "text-[clamp(1.9rem,3.6vw,2.75rem)] font-[650]";
