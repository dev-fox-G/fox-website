import { stack } from "@/data/site";
import { h2, sectionPad } from "@/lib/ui";
import Container from "./Container";

export default function Stack() {
  return (
    <section id="stack" className={`dfx-section-dark ${sectionPad}`}>
      <Container>
        <div className="mb-10 grid gap-5 lg:mb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
          <h2 className={`${h2} text-white`}>Technology we work with</h2>
          <p className="max-w-104 text-[1.1rem] text-[#C3CADB]">
            We choose tools based on your project, your team and your budget, not on what is fashionable.
          </p>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((group) => (
            <div key={group.title} className="rounded-[20px] border border-white/10 border-t-brand bg-white/[0.04] p-6 [border-top-width:2px]">
              <dt className="font-head text-[1.15rem] font-semibold text-white">{group.title}</dt>
              <dd className="mt-4 flex flex-wrap gap-2">
                {group.items.split(", ").map((item) => (
                  <span key={item} className="rounded-lg bg-white/8 px-3 py-1.5 text-[0.9rem] text-white/85">
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
