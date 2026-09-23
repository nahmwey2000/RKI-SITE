'use client';

import { useEffect, useState } from 'react';
import { site } from '@/content/site';
import s from './Secret.module.css';

/** Type the word anywhere on the page. */
export default function Secret() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    let buffer = '';
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-site.secret.code.length);
      if (buffer === site.secret.code) {
        setOn(true);
        window.setTimeout(() => setOn(false), 2200);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!on) return null;
  return (
    <div className={s.flash} aria-hidden="true">
      <span>{site.secret.line}</span>
    </div>
  );
}
