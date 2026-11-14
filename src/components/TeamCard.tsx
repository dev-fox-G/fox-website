import Image from "next/image";
import logo from "@/assets/DevFox-fox-512.png";
import { site, type TeamMember } from "@/data/site";
import { FACE_TARGET, SLICE_ASPECT, SLICE_CLIP_ID, slicePolygons } from "@/lib/slices";
import SocialLinks from "./SocialLinks";

/** Shared SVG clip path for the sliced photos. Render once per page. */
export function SliceClipDefs() {
  return (
    <svg width="0" height="0" className="absolute size-0 overflow-hidden" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={SLICE_CLIP_ID} clipPathUnits="objectBoundingBox">
          {slicePolygons.map((points, i) => (
            <polygon key={i} points={points} />
          ))}
        </clipPath>
      </defs>
    </svg>
  );
}

function VerifiedBadge() {
  return (
    <svg viewBox="0 0 24 24" className="size-[22px] flex-none" role="img" aria-label="Verified">
      <rect x="4" y="4" width="16" height="16" rx="3.5" fill="#2D6CF6" />
      <rect x="4" y="4" width="16" height="16" rx="3.5" fill="#2D6CF6" transform="rotate(45 12 12)" />
      <path
        d="M8.2 12.3l2.6 2.6 5-5.4"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Size and position the photo so the face lands where the design puts it. */
function photoPlacement({ photo, focus }: TeamMember) {
  const widthInBoxes = FACE_TARGET.width / focus.width; // photo width / art width
  const heightInBoxes = widthInBoxes * (photo.height / photo.width) * SLICE_ASPECT; // photo height / art height
  return {
    left: `${(FACE_TARGET.x - focus.x * widthInBoxes) * 100}%`,
    top: `${(FACE_TARGET.y - focus.y * heightInBoxes) * 100}%`,
    width: `${widthInBoxes * 100}%`,
    height: "auto",
  };
}

/** Moody grade, with the photo fading into the black base at its edges. */
const photoLook = {
  // filter: "brightness(0.74) contrast(1.18) saturate(0.82)",
  WebkitMaskImage: "radial-gradient(ellipse 58% 62% at 50% 44%, #000 42%, transparent 100%)",
  maskImage: "radial-gradient(ellipse 58% 62% at 50% 44%, #000 42%, transparent 100%)",
} as const;

/** Team card in the "signature" layout: sliced photo | divider | brand, name, role, contact. */
export default function TeamCard({ member }: { member: TeamMember }) {
  const email = member.email ?? site.email;

  return (
    <article className="grid gap-6 rounded-[20px] border border-line bg-white p-6 shadow-[0_1px_2px_rgba(21,25,52,0.04),0_14px_34px_-18px_rgba(21,25,52,0.14)] sm:grid-cols-[minmax(0,215px)_1px_minmax(0,1fr)] sm:items-center sm:gap-6 sm:p-7">
      {/* Photo cut into slanted bars, on a near-black base like the reference */}
      <div
        className="relative mx-auto w-full max-w-[300px] bg-[#06070b] sm:max-w-none"
        style={{ aspectRatio: SLICE_ASPECT, clipPath: `url(#${SLICE_CLIP_ID})` }}
      >
        <Image
          src={member.photo}
          alt={member.alt}
          sizes="(max-width: 640px) 300px, 215px"
          className="absolute max-w-none"
          style={{ ...photoPlacement(member), ...photoLook }}
        />
        {/* Shadow on the right-hand bars, as in the reference */}
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,transparent_40%,rgba(0,0,0,0.75)_78%)]"
          aria-hidden="true"
        />
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-ink/80 sm:h-full sm:min-h-[210px] sm:w-px" aria-hidden="true" />

      {/* Details */}
      <div className="min-w-0">
        <div className="flex items-center gap-2.5">
          <Image src={logo} alt="" width={36} height={36} className="size-9" />
          <span className="font-head text-[1.9rem] font-bold leading-none tracking-[-0.03em] text-ink">
            {site.name}
          </span>
        </div>

        <h3 className="mt-5 flex items-center gap-2 text-[1.45rem] font-bold leading-tight">
          {member.name}
          <VerifiedBadge />
        </h3>
        <p className="text-[0.98rem] text-muted">{member.role}</p>

        <p className="mt-4 font-head font-semibold text-ink">{site.name}</p>
        <a
          href={`mailto:${email}`}
          className="block text-[0.9rem] text-body transition-colors [overflow-wrap:anywhere] hover:text-brand-ink"
        >
          {email}
        </a>

        <SocialLinks links={member.social} who={member.name} plain className="-ml-2 mt-3" />
      </div>
    </article>
  );
}
