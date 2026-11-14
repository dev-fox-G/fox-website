import { commitments } from "@/data/site";
import { btnPrimary, h2, sectionPad } from "@/lib/ui";
import Container from "./Container";

export default function About() {
  return (
    <section id="about" className={`dfx-section-warm ${sectionPad}`}>
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-20">
        <div>
          <h2 className={`${h2} max-w-[16ch]`}>A small team that stays close to your project.</h2>
          <p className="mt-5 max-w-144">
            DevFox is a software company based in Punjab, Pakistan, founded in 2026. We are engineers and
            designers who work directly with the people we build for, and we turn complicated problems into
            software that is simple to use.
          </p>
          <p className="mt-5 max-w-144">
            Our rule is straightforward: every line of code should have a purpose, and every design decision
            should make the product easier to use.
          </p>
          <a href="#contact" className={`${btnPrimary} mt-8`}>
            Start a project
          </a>
        </div>

        <dl>
          {commitments.map((item) => (
            <div key={item.title} className="rounded-r-2xl border-l-[3px] border-brand bg-white/70 py-6 pl-6 pr-5 [&+&]:mt-3">
              <dt className="font-head text-[1.2rem] font-semibold text-ink">{item.title}</dt>
              <dd className="mt-[0.35rem]">{item.text}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
