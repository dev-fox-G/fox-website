import { services } from "@/data/site";
import { h2, sectionPad } from "@/lib/ui";
import Container from "./Container";
import { ServiceIcon } from "./icons";

const headerGrid = "mb-10 grid gap-5 lg:mb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16";

export default function Services() {
  return (
    <>
      {/* What we build: light section, card grid (no sticky columns, so scrolling stays smooth) */}
      <section id="services" className={`dfx-section-light ${sectionPad}`}>
        <Container>
          <div className={headerGrid}>
            <h2 className={h2}>What we build</h2>
            <div>
              <p className="max-w-104 text-[1.1rem]">
                Design, development and hosting under one roof, so you deal with one team from start to finish.
              </p>
              <a
                href="#contact"
                className="mt-4 inline-block border-b-[1.5px] border-current pb-px font-semibold text-brand-ink transition-colors hover:text-ink"
              >
                Talk to us about your idea
              </a>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li
                key={service.title}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-[20px] border border-line bg-white p-6 transition-[border-color,box-shadow] duration-200 hover:border-brand/60 hover:shadow-[0_18px_40px_-26px_rgba(18,20,26,0.4)] sm:p-7"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-brand text-ink">
                  <ServiceIcon name={service.icon} className="size-[22px]" />
                </span>
                <h3 className="text-[1.25rem] font-semibold">{service.title}</h3>
                <p>{service.text}</p>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100"
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* What we serve: dark section, two-column rows */}
      <section id="serve" className={`dfx-section-dark ${sectionPad}`}>
        <Container>
          <div className={headerGrid}>
            <h2 className={`${h2} text-white`}>What we Serve</h2>
            <div>
              <p className="max-w-104 text-[1.1rem] text-[#C3CADB]">IT Support & Services.</p>
              <a
                href="#contact"
                className="mt-4 inline-block border-b-[1.5px] border-current pb-px font-semibold text-brand transition-colors hover:text-white"
              >
                Talk to us about your problem
              </a>
            </div>
          </div>

          <ul className="grid border-b border-white/10 sm:grid-cols-2 sm:gap-x-12">
            {services.map((service) => (
              <li key={service.title} className="flex gap-5 border-t border-white/10 py-6 sm:py-7">
                <span className="grid size-12 flex-none place-items-center rounded-xl border border-brand/50 bg-brand/10 text-brand">
                  <ServiceIcon name={service.icon} className="size-[22px]" />
                </span>
                <div>
                  <h3 className="text-[1.2rem] font-semibold text-white">{service.title}</h3>
                  <p className="mt-1.5 text-[#A9B1C3]">{service.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
