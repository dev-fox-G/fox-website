import Image from "next/image";
import logo from "@/assets/DevFox-fox-512.png";
import { services, site } from "@/data/site";
import Container from "./Container";
import SocialLinks from "./SocialLinks";

const linkClass = "transition-colors hover:text-white";
const headingClass = "mb-2 text-[1.05rem] font-semibold text-white";
const colClass = "flex flex-col items-start gap-[0.55rem]";

export default function Footer() {
  return (
    <footer className="dfx-footer pt-18 text-[#A9B1C3]">
      <Container className="grid gap-9 pb-14 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
        <div>
          <a href="#home" className="inline-flex items-center gap-[0.65rem]" aria-label="DevFox home">
            <Image src={logo} alt="" width={36} height={36} className="h-auto w-9" />
            <span className="font-head text-[1.4rem] font-bold tracking-[-0.03em] text-white">Dev<span className="text-brand">Fox</span></span>
          </a>
          <p className="mt-[1.1rem] max-w-88">
            A software company in Punjab, Pakistan, building web, mobile and custom software for clients worldwide.
          </p>
        </div>

        <nav className={colClass} aria-label="Services">
          <h4 className={headingClass}>Services</h4>
          {services.slice(0, 5).map((service) => (
            <a key={service.title} href="#services" className={linkClass}>
              {service.title}
            </a>
          ))}
        </nav>

        <nav className={colClass} aria-label="Company">
          <h4 className={headingClass}>Company</h4>
          <a href="#about" className={linkClass}>About us</a>
          <a href="#team" className={linkClass}>Our team</a>
          <a href="#work" className={linkClass}>Selected work</a>
          <a href="#contact" className={linkClass}>Contact</a>
        </nav>

        <div className={colClass}>
          <h4 className={headingClass}>Follow us</h4>
          <SocialLinks links={site.social} who="DevFox" onDark className="mt-0" />
        </div>
      </Container>

      <Container className="relative py-6 text-[0.93rem]">
        <span className="absolute inset-x-[1.15rem] top-0 h-px bg-white/10 sm:inset-x-6" aria-hidden="true" />
        <p>&copy; {new Date().getFullYear()} DevFox. All rights reserved.</p>
      </Container>
    </footer>
  );
}
