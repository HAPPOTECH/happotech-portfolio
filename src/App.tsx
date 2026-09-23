import { APropos } from './components/APropos.tsx';
import { Clients } from './components/Clients.tsx';
import { Contact } from './components/Contact.tsx';
import { Disponibilite, RetourHaut } from './components/Flottants.tsx';
import { Hero } from './components/Hero.tsx';
import { Methode } from './components/Methode.tsx';
import { Navigation } from './components/Navigation.tsx';
import { Projets } from './components/Projets.tsx';
import { Services } from './components/Services.tsx';
import { Temoignages } from './components/Temoignages.tsx';

/*
 * Couches (z-index) : fond -10 · contenu 0 · flottants 30 · navigation 40 · grain 50.
 */
export default function App() {
  return (
    <>
      {/* Fond : la nuit. La seule lumière vient du monogramme, dans le hero. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-encre" />
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-50" />

      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-texte focus:px-5 focus:py-3 focus:text-encre"
      >
        Aller au contenu
      </a>

      <Navigation />
      <Disponibilite />

      <main>
        <Hero />
        <Clients />
        <Services />
        <Projets />
        <Temoignages />
        <APropos />
        <Methode />
      </main>

      <Contact />
      <RetourHaut />
    </>
  );
}
