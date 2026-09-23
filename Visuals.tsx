'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { site } from '@/content/site';
import s from './Visuals.module.css';

const frames = site.visuals.frames;

export default function Visuals() {
  const strip = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  // drag to pan. the strip is still a normal scroller, so trackpads,
  // touch and the keyboard all keep working.
  const onDown = (e: React.PointerEvent) => {
    const el = strip.current;
    if (!el || e.pointerType === 'touch') return;
    // no pointer capture here: capturing would retarget the click away from
    // the frame you pressed, and clicking a frame is the whole point.
    drag.current = { x: e.clientX, left: el.scrollLeft, moved: false };
  };

  const onMove = (e: React.PointerEvent) => {
    const el = strip.current;
    if (!el || !drag.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.left - dx;
  };

  const onUp = () => {
    // the click fires after this, so the flag has to outlive the tick
    window.setTimeout(() => {
      drag.current = null;
    }, 0);
  };

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') setOpen((i) => ((i ?? 0) + 1) % frames.length);
      if (e.key === 'ArrowLeft') setOpen((i) => ((i ?? 0) - 1 + frames.length) % frames.length);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <section className="section" id="visuals">
      <div className="sectionHead">
        <h2 className="display">visuals</h2>
        <p className="label">
          {site.visuals.lede} drag →
        </p>
      </div>

      <div
        className={s.strip}
        ref={strip}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        {frames.map((f, i) => (
          <figure className={s.frame} key={f.src}>
            <button
              type="button"
              className={s.shot}
              onClick={() => {
                if (!drag.current?.moved) setOpen(i);
              }}
            >
              <img src={f.src} alt={f.alt} loading="lazy" draggable={false} />
              <span className={s.no} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
            </button>
          </figure>
        ))}
      </div>

      <p className={s.credit}>{site.visuals.credit}</p>

      {open !== null && (
        <div
          className={s.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={frames[open].alt}
          onClick={close}
        >
          <img src={frames[open].src} alt={frames[open].alt} />
          <div className={s.lightbar} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen((i) => ((i ?? 0) - 1 + frames.length) % frames.length)}
            >
              ← prev
            </button>
            <span>
              {String(open + 1).padStart(2, '0')} / {String(frames.length).padStart(2, '0')}
            </span>
            <button type="button" onClick={() => setOpen((i) => ((i ?? 0) + 1) % frames.length)}>
              next →
            </button>
            <button type="button" onClick={close} autoFocus>
              close ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
