// One static film-grain plate. Not animated: moving grain reads as an effect,
// still grain reads as a surface.
export default function Grain() {
  return (
    <svg className="grain" aria-hidden="true" focusable="false">
      <filter id="rki-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#rki-grain)" />
    </svg>
  );
}
