"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/DevFox-fox-512.png";
import { navLinks, sectionIds } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/ui";
import Container from "./Container";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const active = useActiveSection(sectionIds);

  // Thin border under the header once the page has scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const linkBase =
    "border-b border-white/10 py-[0.95rem] text-[1.05rem] font-medium text-white/75 transition-colors hover:text-white " +
    "lg:border-0 lg:py-0 lg:text-[0.97rem]";

  return (
    <header
      id="siteHeader"
      className={cn(
        "sticky top-0 z-[100] h-18 border-b bg-ink/90 backdrop-blur-md transition-colors",
        scrolled ? "border-white/10" : "border-transparent",
      )}
    >
      <Container className="flex h-full items-center justify-between gap-8">
        <a href="#home" className="inline-flex items-center gap-[0.65rem]" aria-label="DevFox home">
          <Image src={logo} alt="" width={36} height={36} priority className="h-auto w-9" />
          <span className="font-head text-[1.4rem] font-bold tracking-[-0.03em] text-white">Dev<span className="text-brand">Fox</span></span>
        </a>

        <nav
          id="nav"
          aria-label="Main"
          className={cn(
            "absolute inset-x-0 top-18 flex flex-col border-b border-white/10 bg-ink px-[1.15rem] pb-6 pt-2 sm:px-6",
            "shadow-[0_18px_30px_-18px_rgba(0,0,0,0.6)] transition-[opacity,transform,visibility] duration-200",
            open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1.5 opacity-0",
            "lg:visible lg:static lg:translate-y-0 lg:flex-row lg:items-center lg:gap-8 lg:border-0 lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none",
          )}
        >
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  linkBase,
                  isActive && "text-brand lg:text-white lg:shadow-[0_2px_0_var(--color-brand)]",
                )}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 rounded-[10px] bg-brand p-[0.9rem] text-center font-semibold text-ink transition-colors hover:bg-brand-dark lg:mt-0 lg:px-[1.1rem] lg:py-[0.55rem] lg:text-[0.97rem]"
          >
            Contact us
          </a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="flex size-11 flex-col items-center justify-center gap-[5px] rounded-[10px] lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={cn("block h-0.5 w-[22px] bg-white transition", open && "translate-y-[7px] rotate-45")} />
          <span className={cn("block h-0.5 w-[22px] bg-white transition", open && "opacity-0")} />
          <span className={cn("block h-0.5 w-[22px] bg-white transition", open && "-translate-y-[7px] -rotate-45")} />
        </button>
      </Container>
    </header>
  );
}
