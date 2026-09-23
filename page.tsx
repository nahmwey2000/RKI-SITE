import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import Music from '@/components/Music';
import Archive from '@/components/Archive';
import Visuals from '@/components/Visuals';
import Worldwide from '@/components/Worldwide';
import Reveal from '@/components/Reveal';

export default function Page() {
  return (
    <main>
      <Hero />
      <Reveal>
        <Intro />
      </Reveal>
      <Reveal>
        <Music />
      </Reveal>
      <Reveal>
        <Archive />
      </Reveal>
      <Reveal>
        <Visuals />
      </Reveal>
      <Worldwide />
    </main>
  );
}
