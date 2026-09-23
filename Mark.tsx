import { MARK_PATH, MARK_VIEWBOX } from '@/lib/mark';

/**
 * The wordmark. Always the real vector, never retyped in a font.
 * Colour comes from the element it sits in.
 */
export default function Mark({
  className,
  title = 'RKI',
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      className={className}
      viewBox={MARK_VIEWBOX}
      role="img"
      aria-label={title}
      focusable="false"
    >
      <path d={MARK_PATH} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
