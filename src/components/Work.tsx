"use client";

import { useState, type KeyboardEvent } from "react";
import { projects, type ProjectTone } from "@/data/site";
import { h2, sectionPad } from "@/lib/ui";
import Container from "./Container";
import { ProjectIcon } from "./icons";

const tones: Record<ProjectTone, { bg: string; fg: string }> = {
  blue: { bg: "#DCE7FF", fg: "#2349A8" },
  teal: { bg: "#D5F0EA", fg: "#176B5A" },
  violet: { bg: "#E8DEFC", fg: "#5B2DB0" },
  slate: { bg: "#DDE1EE", fg: "#2F3A66" },
};

const chartBars = [
  [40, 65, 50, 80, 60, 90, 70],
  [55, 45, 75, 60, 85, 50, 95],
  [30, 60, 45, 70, 55, 80, 65],
  [50, 70, 40, 85, 60, 45, 75],
];

/** A simple product-screen mockup, tinted with the project's colour. */
function Screen({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const { bg, fg } = tones[project.tone];
  const bars = chartBars[index % chartBars.length];
  const soft = `${fg}26`;

  return (
    <div className="relative aspect-[16/11] overflow-hidden sm:aspect-[16/10]" style={{ background: bg, color: fg }}>
      <div className="absolute inset-y-0 left-0 hidden w-[13%] flex-col items-center gap-3 bg-white/55 py-5 sm:flex" aria-hidden="true">
        <span className="size-6 rounded-lg" style={{ background: fg }} />
        {[0, 1, 2, 3].map((n) => (
          <span key={n} className="size-5 rounded-md" style={{ background: soft }} />
        ))}
      </div>

      <div className="absolute inset-0 flex flex-col gap-3 p-4 sm:pl-[calc(13%+1.5rem)] sm:pr-6 sm:py-6" aria-hidden="true">
        <div className="flex items-center justify-between pl-24 sm:pl-28">
          <span className="h-3 w-28 rounded-full" style={{ background: soft }} />
          <span className="size-7 rounded-full" style={{ background: fg }} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((n) => (
            <div key={n} className="rounded-xl bg-white/75 p-3">
              <span className="block h-2 w-10 rounded-full" style={{ background: soft }} />
              <span className="mt-2 block h-4 rounded-full" style={{ background: fg, width: `${48 + n * 14}%` }} />
            </div>
          ))}
        </div>
        <div className="flex min-h-0 flex-1 items-end gap-2 rounded-xl bg-white/75 p-3 sm:gap-3 sm:p-4">
          {bars.map((height, n) => (
            <span
              key={n}
              className="flex-1 rounded-t-md"
              style={{ height: `${height}%`, background: n === bars.length - 2 ? fg : soft }}
            />
          ))}
        </div>
      </div>

      <ProjectIcon name={project.icon} className="absolute left-4 top-3 size-12 sm:left-[calc(13%+1.5rem)] sm:top-5" />
    </div>
  );
}

export default function Work() {
  const [active, setActive] = useState(0);
  const project = projects[active];

  const select = (index: number) => {
    setActive(index);
    document.getElementById(`project-tab-${index}`)?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const last = projects.length - 1;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      select(active === last ? 0 : active + 1);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      select(active === 0 ? last : active - 1);
    }
  };

  return (
    <section id="work" className={`dfx-section-white ${sectionPad}`}>
      <Container>
        <div className="mb-10 max-w-152 lg:mb-14">
          <h2 className={h2}>Selected work</h2>
          <p className="mt-4 text-[1.1rem]">
            The kinds of products we build, across finance, healthcare, education and logistics. Click an image to
            visit the live website.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-12">
          {/* Project list: a row of chips on phones, a vertical list on desktop */}
          <div
            role="tablist"
            aria-label="Projects"
            onKeyDown={onKeyDown}
            className="-mx-[1.15rem] flex gap-2 overflow-x-auto px-[1.15rem] pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {projects.map((item, index) => {
              const isActive = index === active;
              return (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  id={`project-tab-${index}`}
                  aria-selected={isActive}
                  aria-controls="project-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(index)}
                  className={`shrink-0 rounded-xl border px-4 py-3 text-left transition-colors lg:rounded-none lg:border-0 lg:border-l-[3px] lg:px-6 lg:py-5 ${
                    isActive
                      ? "border-ink bg-ink text-white lg:border-brand lg:bg-brand/8 lg:text-ink"
                      : "border-line text-body hover:border-ink lg:border-line lg:hover:bg-paper"
                  }`}
                >
                  <span className={`block text-[0.85rem] ${isActive ? "text-white/70 lg:text-brand-ink" : "text-muted"}`}>
                    {item.sector}
                  </span>
                  <span className="block whitespace-nowrap font-head text-[1.05rem] font-semibold lg:whitespace-normal lg:text-[1.15rem]">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            key={active}
            role="tabpanel"
            id="project-panel"
            aria-labelledby={`project-tab-${active}`}
            className="min-w-0 motion-safe:animate-showcase"
          >
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit the ${project.title} website (opens in a new tab)`}
              className="group block overflow-hidden rounded-[18px] border border-ink/10 bg-[#1c2029] shadow-[0_30px_60px_-34px_rgba(18,20,26,0.55)]"
            >
              <div className="flex items-center gap-3 px-4 py-3" aria-hidden="true">
                <span className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-white/25" />
                  <span className="size-2.5 rounded-full bg-white/25" />
                  <span className="size-2.5 rounded-full bg-white/25" />
                </span>
                <span className="min-w-0 flex-1 truncate rounded-md bg-white/10 px-3 py-1 text-[0.8rem] text-white/70">
                  {project.url.replace(/^https?:\/\//, "")}
                </span>
              </div>

              <div className="relative">
                <Screen project={project} index={active} />
                <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-ink px-[0.9rem] py-[0.45rem] text-[0.88rem] font-semibold text-white transition-colors group-hover:bg-brand group-hover:text-ink">
                  Visit website
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17L17 7M8 7h9v9" />
                  </svg>
                </span>
              </div>
            </a>

            <p className="mt-6 text-[0.95rem] font-semibold text-brand-ink">{project.sector}</p>
            <h3 className="mt-1 text-[1.6rem] font-semibold">{project.title}</h3>
            <p className="mt-2 max-w-xl">{project.text}</p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technology used">
              {project.stack.split(", ").map((tech) => (
                <li key={tech} className="rounded-full border border-line bg-white px-3 py-1 text-[0.88rem] text-body">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
