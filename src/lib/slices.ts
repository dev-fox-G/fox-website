/**
 * Geometry of the sliced photo in the team cards.
 *
 * Measured directly from the reference design (a 185 x 200 px crop):
 * four parallelograms that all lean the same way, separated by thin gaps.
 * Values below are in pixels of that reference crop. They are converted to
 * fractions of the shape's bounding box, so the clip path scales to any size.
 */
const SLOPE = 0.61; // horizontal shift per unit of height (about 31 degrees)

type Strip = {
  cx: number; // x of the strip's centre line at height `atY`
  atY: number;
  w: number; // width
  yt: number; // top edge
  yb: number; // bottom edge
};

const strips: Strip[] = [
  { cx: 116.75, atY: 103.25, w: 37.5, yt: 32.0, yb: 174.5 }, // tall bar, top right
  { cx: 69.4, atY: 114.5, w: 37.5, yt: 44.5, yb: 184.5 }, // long bar (face and jacket)
  { cx: 50.75, atY: 92.5, w: 22.5, yt: 58.5, yb: 126.5 }, // small bar, top left
  { cx: 128.25, atY: 139.75, w: 24.5, yt: 103.5, yb: 176.0 }, // small bar, lower right
];

type Point = [number, number];

function corners({ cx, atY, w, yt, yb }: Strip): Point[] {
  const centre = (y: number) => cx - SLOPE * (y - atY);
  return [
    [centre(yt) - w / 2, yt],
    [centre(yt) + w / 2, yt],
    [centre(yb) + w / 2, yb],
    [centre(yb) - w / 2, yb],
  ];
}

const shapes = strips.map(corners);
const all = shapes.flat();
const minX = Math.min(...all.map((p) => p[0]));
const maxX = Math.max(...all.map((p) => p[0]));
const minY = Math.min(...all.map((p) => p[1]));
const maxY = Math.max(...all.map((p) => p[1]));

/** Width divided by height of the whole shape. */
export const SLICE_ASPECT = (maxX - minX) / (maxY - minY);

/** SVG `points` strings in 0..1 bounding-box units. */
export const slicePolygons = shapes.map((shape) =>
  shape
    .map(([x, y]) => `${((x - minX) / (maxX - minX)).toFixed(4)},${((y - minY) / (maxY - minY)).toFixed(4)}`)
    .join(" "),
);

/**
 * Where the face should sit inside the shape (fractions of its bounding box),
 * measured from the reference: the middle of the eye line and the cheek-to-cheek width.
 */
export const FACE_TARGET = {
  x: (97 - minX) / (maxX - minX),
  y: (86 - minY) / (maxY - minY),
  width: 41 / (maxX - minX),
};

export const SLICE_CLIP_ID = "team-slices";
