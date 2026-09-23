import { site } from '@/content/site';
import s from './Intro.module.css';

export default function Intro() {
  return (
    <section className={`section ${s.intro}`} aria-label="about">
      <p className={s.line}>
        rap, r&amp;b and noise out of minneapolis.
        <br />
        made loud enough to move a room.
      </p>
      <figure className={s.shot}>
        <img
          src="/media/twins.webp"
          alt="RKI, mirrored, under the arch of the Minneapolis armory"
          width={1092}
          height={1094}
          loading="lazy"
        />
        <figcaption className="label">
          {site.kana} · {site.city}
        </figcaption>
      </figure>
    </section>
  );
}
