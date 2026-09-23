'use client';

import { useEffect, useRef, useState } from 'react';
import { site } from '@/content/site';
import { mountZoomBlur, type ZoomBlur } from '@/lib/zoom-blur';
import Mark from './Mark';
import Status from './Status';
import s from './Hero.module.css';

// TODO: the old site opened on a video. If the original mp4 turns up, swap the
// <img> for a muted looping <video> and hand that element to mountZoomBlur
// instead: it takes any texture source, so nothing else has to change.
//
// a landscape frame for landscape screens, a portrait one for phones, so the
// picture is never cropped down to a strip of itself.
const HERO_WIDE = '/media/crowd.webp';
const HERO_TALL = '/media/mesh.webp';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [live, setLive] = useState(false);
  const [src, setSrc] = useState(HERO_WIDE);

  useEffect(() => {
    const portrait = window.matchMedia('(max-aspect-ratio: 1/1)');
    const pick = () => setSrc(portrait.matches ? HERO_TALL : HERO_WIDE);
    pick();
    portrait.addEventListener('change', pick);
    return () => portrait.removeEventListener('change', pick);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    let effect: ZoomBlur | null = null;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // the effect answers a pointer, so on a phone there is nothing for it to
    // answer. the still is sharper there anyway. leave it alone.
    const wanted = window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 760;
    if (!wanted) return;

    const start = () => {
      effect = mountZoomBlur(canvas, img, { reducedMotion: reduced });
      if (effect) setLive(true);
    };

    if (img.complete && img.naturalWidth) start();
    else img.addEventListener('load', start, { once: true });

    return () => {
      effect?.destroy();
      img.removeEventListener('load', start);
    };
  }, [src]);

  const ticker = [...site.ticker, ...site.ticker];

  return (
    <header className={s.hero} id="top">
      <div className={s.plate}>
        {/* the still is the fallback. the shader draws over it when it can. */}
        <img ref={imgRef} src={src} alt="" data-live={live} crossOrigin="anonymous" />
        <canvas ref={canvasRef} aria-hidden="true" />
      </div>
      <div className={s.scrim} />

      <div className={s.bar}>
        <div className={s.barMark}>
          <Mark />
          <span className="kana label">{site.kana}</span>
        </div>
        <nav className={s.nav} aria-label="sections">
          <a href="#music">music</a>
          <a href="#archive">archive</a>
          <a href="#visuals">visuals</a>
          <a href="#contact">contact</a>
        </nav>
        <Status />
      </div>

      <div className={s.centre}>
        <div>
          <Mark className={s.wordmark} title="RKI" />
          <div className={s.under}>
            <a href={site.links.spotify} target="_blank" rel="noreferrer">
              spotify
            </a>
            <a href={site.links.apple} target="_blank" rel="noreferrer">
              apple music
            </a>
            <a href={site.links.youtube} target="_blank" rel="noreferrer">
              youtube
            </a>
            <a href={site.links.instagram} target="_blank" rel="noreferrer">
              instagram
            </a>
          </div>
        </div>
      </div>

      <div className={s.ticker} aria-hidden="true">
        <div className={s.track}>
          {ticker.map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>
    </header>
  );
}
