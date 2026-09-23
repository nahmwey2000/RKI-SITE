'use client';

import { useRef, useState } from 'react';
import { releases, site } from '@/content/site';
import s from './Music.module.css';

function Featured() {
  const [playing, setPlaying] = useState(false);
  const f = site.featured;

  return (
    <div className={s.featured}>
      <div className={s.sleeve}>
        {/* the disc behind the sleeve. it turns while the embed plays. */}
        <span className={s.disc} data-spin={playing} aria-hidden="true" />
        <img src={f.cover} alt={`${f.title} cover art`} width={720} height={720} />
      </div>

      <div className={s.meta}>
        <p className="label">out now</p>
        <h3 className={`display ${s.title}`}>{f.title}</h3>
        <p className={s.sub}>
          {f.kind} · {f.year} · {site.label}
        </p>
        <p className={s.note}>{f.note}</p>

        <div className={s.actions}>
          <button type="button" className={s.play} onClick={() => setPlaying((p) => !p)}>
            {playing ? 'close player' : 'play here'}
          </button>
          <a href={f.spotify} target="_blank" rel="noreferrer">
            spotify
          </a>
          <a href={f.apple} target="_blank" rel="noreferrer">
            apple music
          </a>
          <a href={f.video} target="_blank" rel="noreferrer">
            visualizer
          </a>
        </div>

        {playing && (
          <div className={s.embed}>
            {/* nothing is requested from spotify until this point. */}
            <iframe
              src={f.embed}
              title={`${f.title} on Spotify`}
              width="100%"
              height="152"
              frameBorder="0"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function Discography() {
  const [hover, setHover] = useState<number | null>(null);
  const coverRef = useRef<HTMLDivElement>(null);

  // the raised still rides with the cursor, the way the index does on a
  // catalogue. it is positioned directly, never through react state.
  const move = (e: React.MouseEvent) => {
    const el = coverRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${e.clientX + 24}px, ${e.clientY - 120}px, 0)`;
  };

  return (
    <div className={s.list} onMouseMove={move}>
      {releases.map((r, i) => {
        const href = r.spotify ?? r.apple;
        return (
          <a
            key={r.title + r.year}
            className={s.row}
            href={href}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
          >
            <span className={s.year}>{r.year}</span>
            <span className={s.name}>
              {r.title}
              {r.with ? <em> {r.guest ? `on ${r.with}` : `with ${r.with}`}</em> : null}
            </span>
            <span className={s.kind}>{r.guest ? 'feature' : 'single'}</span>
            <span className={s.go} aria-hidden="true">
              ↗
            </span>
          </a>
        );
      })}

      <div className={s.cursorCover} ref={coverRef} aria-hidden="true">
        {releases.map((r, i) =>
          r.cover ? (
            <img key={r.title} src={r.cover} alt="" data-on={hover === i} loading="lazy" />
          ) : null,
        )}
      </div>
    </div>
  );
}

export default function Music() {
  return (
    <section className="section" id="music">
      <div className="sectionHead">
        <h2 className="display">music</h2>
        <p className="label">{releases.length} releases</p>
      </div>
      <Featured />
      <Discography />
    </section>
  );
}
