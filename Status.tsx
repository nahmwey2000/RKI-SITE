'use client';

import { useEffect, useState } from 'react';
import { site } from '@/content/site';
import s from './Status.module.css';

/**
 * The label is LTE Worldwide, so the corner of the site is a signal reading:
 * four bars and the local time where he actually is. It is the one live
 * thing on the page that is not decoration.
 */
export default function Status() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: site.timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className={s.status} title={`${site.label} · ${site.city}`}>
      <span className={s.bars} aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className={s.lte}>LTE</span>
      <span className={s.clock}>
        {/* nothing renders until the client knows the time, so the markup matches */}
        MPLS {time ?? '--:--:--'}
      </span>
    </div>
  );
}
