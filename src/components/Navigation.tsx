import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react';
import { ArrowRight, List, X } from '@phosphor-icons/react';
import { ctaContact, navigation } from '../data/site.ts';
import { easeSortie } from '../lib/mouvement.ts';
import { Marque } from './Marque.tsx';

export function Navigation() {
  const reduire = useReducedMotion();
  const { scrollY } = useScroll();
  const [cachee, setCachee] = useState(false);
  const [ouvert, setOuvert] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // La barre s'efface quand on descend, revient dès qu'on remonte.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const precedent = scrollY.getPrevious() ?? 0;
    const doitCacher = y > 480 && y > precedent;
    if (doitCacher !== cachee) setCachee(doitCacher);
    if (y < 300 && active !== null) setActive(null);
  });

  // Section courante, pour la pastille qui glisse sous le lien actif.
  useEffect(() => {
    const cibles = navigation
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const entree of entrees) {
          if (entree.isIntersecting) setActive(entree.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    cibles.forEach((c) => observateur.observe(c));
    return () => observateur.disconnect();
  }, []);

  useEffect(() => {
    if (!ouvert) return;
    const fermer = (e: KeyboardEvent) => e.key === 'Escape' && setOuvert(false);
    window.addEventListener('keydown', fermer);
    return () => window.removeEventListener('keydown', fermer);
  }, [ouvert]);

  return (
    <motion.header
      className="fixed inset-x-0 top-3 z-40 px-3 sm:top-4 sm:px-4"
      initial={reduire ? false : { y: -24, opacity: 0 }}
      animate={{ y: cachee && !ouvert ? -110 : 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: easeSortie, delay: reduire ? 0 : cachee ? 0 : 0.15 }}
    >
      <nav
        aria-label="Navigation principale"
        className="verre relative mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl bg-nuit/75 pl-4 pr-2.5 sm:pl-5"
      >
        <a href="#haut" aria-label="HAPPOTECH, retour en haut" className="rounded-lg">
          <Marque />
        </a>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {navigation.map(({ id, label }) => (
            <li key={id} className="relative">
              {active === id && (
                <motion.span
                  layoutId="nav-actif"
                  className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-white/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <a
                href={`#${id}`}
                className={`relative block rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                  active === id ? 'text-texte' : 'text-brume hover:text-texte'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="group hidden items-center gap-2 rounded-full bg-texte px-5 py-2.5 text-sm font-medium text-encre transition-[transform,background-color] duration-300 ease-[var(--ease-sortie)] hover:bg-white active:scale-[0.98] md:inline-flex"
        >
          {ctaContact}
          <ArrowRight
            size={16}
            weight="bold"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </a>

        <button
          type="button"
          onClick={() => setOuvert((v) => !v)}
          aria-expanded={ouvert}
          aria-controls="menu-mobile"
          aria-label={ouvert ? 'Fermer le menu' : 'Ouvrir le menu'}
          className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-texte transition-colors hover:bg-white/10 md:hidden"
        >
          {ouvert ? <X size={20} /> : <List size={20} />}
        </button>

        <AnimatePresence>
          {ouvert && (
            <motion.div
              id="menu-mobile"
              className="verre absolute inset-x-0 top-[calc(100%+0.5rem)] rounded-2xl p-3 md:hidden"
              initial={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
              transition={{ duration: 0.35, ease: easeSortie }}
              style={{ background: 'rgb(8 11 19 / 0.92)' }}
            >
              <ul className="flex flex-col">
                {navigation.map(({ id, label }, i) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.35, ease: easeSortie }}
                  >
                    <a
                      href={`#${id}`}
                      onClick={() => setOuvert(false)}
                      className="block rounded-xl px-4 py-3.5 text-base text-brume transition-colors hover:bg-white/5 hover:text-texte"
                    >
                      {label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={() => setOuvert(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-texte px-5 py-3.5 font-medium text-encre active:scale-[0.98]"
              >
                {ctaContact}
                <ArrowRight size={16} weight="bold" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
