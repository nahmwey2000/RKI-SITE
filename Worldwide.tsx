import { site } from '@/content/site';
import Mark from './Mark';
import s from './Worldwide.module.css';

const socials = [
  ['instagram', site.links.instagram],
  ['youtube', site.links.youtube],
  ['spotify', site.links.spotify],
  ['apple music', site.links.apple],
  ['twitter', site.links.twitter],
  ['facebook', site.links.facebook],
] as const;

export default function Worldwide() {
  const { contact } = site;
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(contact.subject)}`;

  return (
    <footer className={s.foot} id="contact">
      <img className={s.globe} src="/media/globe.webp" alt="" aria-hidden="true" width={900} height={900} />

      <div className={s.inner}>
        <p className="label">{site.label}</p>
        <h2 className={`display ${s.big}`}>worldwide</h2>

        <a className={s.contact} href={mailto}>
          contact
        </a>
        <p className={s.who}>
          all inquiries: {contact.name} at {contact.org}
        </p>

        <nav className={s.socials} aria-label="elsewhere">
          {socials.map(([name, href]) => (
            <a key={name} href={href} target="_blank" rel="noreferrer">
              {name}
            </a>
          ))}
        </nav>

        <div className={s.base}>
          <Mark className={s.markSmall} />
          <span className="kana">{site.kana}</span>
          <span>{site.city}</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
