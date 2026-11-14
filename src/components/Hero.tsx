import Image from "next/image";
import fox from "@/assets/DevFox-fox-512.png";
import { heroFacts } from "@/data/site";
import { btnGhostDark, btnPrimary, cn } from "@/lib/ui";
import Container from "./Container";

export default function Hero() {
  return (
    <section id="home" className="dfx-hero pb-16 pt-12 lg:pb-22 lg:pt-18">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-stretch lg:gap-18">
        <div>
          <h1 className="max-w-[18ch] text-[clamp(2.5rem,5.4vw,4.25rem)] font-bold leading-[1.04] tracking-[-0.035em] text-white motion-safe:animate-rise lg:max-w-[14ch]">
            Software that helps your business run better.
          </h1>
          <p className="mt-6 max-w-136 text-[1.2rem] leading-[1.6] text-[#C3CADB] motion-safe:animate-rise-2">
            DevFox designs and builds websites, mobile apps and custom software for companies in Pakistan and
            around the world.
          </p>
          <div className="mt-9 flex flex-wrap gap-[0.85rem] motion-safe:animate-rise-3">
            <a href="#contact" className={cn(btnPrimary, "max-sm:flex-[1_1_100%]")}>
              Start a project
            </a>
            <a href="#work" className={cn(btnGhostDark, "max-sm:flex-[1_1_100%]")}>
              See our work
            </a>
          </div>
          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-5 border-t border-white/10 pt-7 motion-safe:animate-rise-4 sm:mt-14 sm:gap-x-12">
            {heroFacts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-[0.9rem] text-[#9AA3B8]">{fact.label}</dt>
                <dd className="font-head text-[1.1rem] font-semibold text-white">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside
          aria-label="DevFox"
          className="relative isolate flex min-h-[380px] flex-col justify-end overflow-hidden rounded-[22px] border border-white/10 bg-ink/55 p-6 text-white backdrop-blur-sm motion-safe:animate-rise-visual sm:min-h-[460px] sm:rounded-[28px] sm:p-8 lg:min-h-130"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_42%,rgba(255,122,26,0.28),transparent_62%)]"
          />
          <Image
            src={fox}
            alt=""
            priority
            className="absolute left-1/2 top-[44%] -z-10 h-auto w-[44%] max-w-56 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_18px_40px_rgba(255,122,26,0.35)]"
          />
          <p className="max-w-76 font-head text-[1.2rem] font-semibold leading-[1.25] tracking-[-0.02em] sm:max-w-120 sm:text-[1.45rem] lg:max-w-76">
            Engineers and designers working side by side with you, from the{" "}
            <span className="text-brand">first sketch to launch day.</span>
          </p>
        </aside>
      </Container>
    </section>
  );
}
