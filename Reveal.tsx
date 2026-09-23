'use client';

import { useEffect, useRef } from 'react';

/**
 * Anything wrapped in this rises into place once, the first time it is
 * reached. Reduced motion is handled in the stylesheet, so this only ever
 * flips one attribute.
 */
export default function Reveal({
  children,
  as: As = 'div',
  className = '',
}: {
  children: React.ReactNode;
  as?: 'div' | 'section';
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.seen = 'true';
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <As ref={ref as any} className={`reveal ${className}`} data-seen="false">
      {children}
    </As>
  );
}
