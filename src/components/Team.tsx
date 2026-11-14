import { team } from "@/data/site";
import { h2, sectionPad } from "@/lib/ui";
import Container from "./Container";
import TeamCard, { SliceClipDefs } from "./TeamCard";

export default function Team() {
  return (
    <section id="team" className={`dfx-section-light ${sectionPad}`}>
      <SliceClipDefs />
      <Container>
        <div className="mb-10 max-w-152 lg:mb-14">
          <h2 className={h2}>The people behind DevFox</h2>
          <p className="mt-4 text-[1.1rem]">
            You will speak to the founders directly, from your first message to the final handover.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </Container>
    </section>
  );
}
