import { site } from "@/data/site";
import { h2 } from "@/lib/ui";
import Container from "./Container";
import ContactForm from "./ContactForm";
import SocialLinks from "./SocialLinks";

const valueClass = "font-head text-[1.25rem] font-medium text-white [overflow-wrap:anywhere]";
const labelClass = "text-[0.92rem] text-[#9AA3B8]";

export default function Contact() {
  return (
    <section id="contact" className="dfx-contact py-18 text-[#C3CADB] lg:py-26">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-20">
        <div>
          <h2 className={`${h2} max-w-[14ch] text-white`}>Tell us what you are building.</h2>
          <p className="mt-5 max-w-112 text-[1.1rem]">
            Share a few details and we will reply within 24 hours with questions, ideas and a rough idea of cost
            and timeline.
          </p>

          <ul className="mt-10 grid gap-6">
            <li className="grid gap-[0.15rem]">
              <span className={labelClass}>Email</span>
              <a href={`mailto:${site.email}`} className={`${valueClass} underline-offset-4 hover:underline`}>
                {site.email}
              </a>
            </li>
            <li className="grid gap-[0.15rem]">
              <span className={labelClass}>Phone and WhatsApp</span>
              <a href={site.phoneHref} className={`${valueClass} underline-offset-4 hover:underline`}>
                {site.phoneDisplay}
              </a>
            </li>
            <li className="grid gap-[0.15rem]">
              <span className={labelClass}>Location</span>
              <span className={valueClass}>{site.location}</span>
            </li>
          </ul>

          <SocialLinks links={site.social} who="DevFox" onDark className="mt-10" />
        </div>

        <ContactForm />
      </Container>
    </section>
  );
}
