import { SocialIcon, type SocialName } from "@/components/icons";
import type { SocialLinks as Links } from "@/data/site";
import { cn } from "@/lib/ui";

/** Fixed order everywhere on the site: LinkedIn, WhatsApp, Instagram. */
const items: { name: SocialName; label: (who: string) => string }[] = [
  { name: "linkedin", label: (who) => `${who} on LinkedIn` },
  { name: "whatsapp", label: (who) => `Message ${who} on WhatsApp` },
  { name: "instagram", label: (who) => `${who} on Instagram` },
];

export default function SocialLinks({
  links,
  who,
  onDark = false,
  plain = false,
  className,
}: {
  links: Links;
  who: string;
  onDark?: boolean;
  /** Bare icons without the circle (used in the team cards). */
  plain?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn("mt-[1.4rem] flex flex-wrap gap-[0.6rem]", className)} aria-label={`${who} on social media`}>
      {items.map(({ name, label }) => (
        <li key={name}>
          <a
            href={links[name]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label(who)}
            className={cn(
              plain
                ? "grid size-9 place-items-center rounded-lg text-ink transition-colors hover:text-brand-ink"
                : "grid size-[42px] place-items-center rounded-full border-[1.5px] transition-colors",
              !plain &&
                (onDark
                ? "border-white/28 text-white hover:border-white hover:bg-brand hover:text-ink hover:border-brand"
                  : "border-line text-ink hover:border-brand hover:bg-brand hover:text-ink"),
            )}
          >
            <SocialIcon name={name} className={plain ? "size-5" : "size-[18px]"} />
          </a>
        </li>
      ))}
    </ul>
  );
}
