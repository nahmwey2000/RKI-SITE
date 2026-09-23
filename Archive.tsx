'use client';

import { useEffect, useRef, useState } from 'react';
import { site } from '@/content/site';
import s from './Archive.module.css';

const HOLD_MS = 850;

function File({ file }: { file: (typeof site.archive.files)[number] }) {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const holding = useRef(false);
  const raf = useRef(0);

  const stop = () => {
    holding.current = false;
    cancelAnimationFrame(raf.current);
    setProgress((p) => (p >= 1 ? p : 0));
  };

  const start = () => {
    if (open || holding.current) return;
    holding.current = true;
    const t0 = performance.now();
    const step = (t: number) => {
      if (!holding.current) return;
      const p = Math.min(1, (t - t0) / HOLD_MS);
      setProgress(p);
      if (p >= 1) {
        holding.current = false;
        setOpen(true);
        return;
      }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const sealed = file.status === 'sealed';

  return (
    <li className={s.file} data-open={open} data-sealed={sealed}>
      <span className={s.fill} style={{ transform: `scaleX(${open ? 1 : progress})` }} aria-hidden="true" />

      <div className={s.head}>
        <span className={s.no}>archive // {file.no}</span>
        <span className={s.status}>{open ? file.status : sealed ? 'sealed' : 'locked'}</span>
      </div>

      <h3 className={`display ${s.name}`}>{open || !sealed ? file.title : '???????'}</h3>

      {!open && (
        <div className={s.redacted} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      )}

      <div className={s.body} hidden={!open}>
        <p className={s.note}>{file.note}</p>
        <a className={s.listen} href={file.href} target="_blank" rel="noreferrer">
          {sealed ? 'first look' : 'hear it'} ↗
        </a>
      </div>

      {!open && (
        <button
          type="button"
          className={s.hold}
          onPointerDown={start}
          onPointerUp={stop}
          onPointerLeave={stop}
          onPointerCancel={stop}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              start();
            }
          }}
          onKeyUp={stop}
          onBlur={stop}
        >
          <span aria-hidden="true">hold to open</span>
          <span className={s.sr}>
            hold to open archive file {file.no}
            {sealed ? ', sealed' : ''}
          </span>
        </button>
      )}
    </li>
  );
}

export default function Archive() {
  return (
    <section className="section" id="archive">
      <div className="sectionHead">
        <h2 className="display">archive</h2>
        <p className="label">{site.archive.lede}</p>
      </div>
      <ul className={s.grid}>
        {site.archive.files.map((f) => (
          <File key={f.no} file={f} />
        ))}
      </ul>
    </section>
  );
}
