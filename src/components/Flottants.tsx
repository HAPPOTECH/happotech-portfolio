import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { ArrowUp, ArrowUpRight } from '@phosphor-icons/react';
import { easeSortie } from '../lib/mouvement.ts';

/** Disponibilité réelle du studio : le seul point lumineux « d'état » de la page. */
export function Disponibilite() {
  const reduire = useReducedMotion();
  const { scrollY } = useScroll();
  // Visible pendant le hero seulement : ensuite, elle masquerait le contenu.
  const [dansHero, setDansHero] = useState(true);
  useMotionValueEvent(scrollY, 'change', (y) => {
    const doit = y < 420;
    if (doit !== dansHero) setDansHero(doit);
  });
  return (
    <AnimatePresence>
      {dansHero && (
        <motion.a
          href="#contact"
          className="verre group fixed bottom-6 left-6 z-30 hidden items-center gap-3 rounded-full py-3 pl-4 pr-5 text-sm font-medium text-texte transition-colors hover:bg-white/10 xl:inline-flex"
          initial={reduire ? false : { opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16, transition: { duration: 0.35, ease: easeSortie } }}
          transition={{ delay: 1.6, duration: 0.9, ease: easeSortie }}
        >
          <span className="relative flex size-2.5">
            <span className="absolute inset-0 animate-pouls rounded-full bg-cyan" />
            <span className="relative size-2.5 rounded-full bg-cyan shadow-[0_0_12px_rgb(25_211_255/0.9)]" />
          </span>
          Disponibles pour vos projets
          <ArrowUpRight
            size={15}
            weight="bold"
            className="text-brume transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

export function RetourHaut() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => {
    const doit = y > 900;
    if (doit !== visible) setVisible(doit);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#haut"
          aria-label="Revenir en haut de la page"
          className="verre fixed bottom-5 right-5 z-30 grid size-12 place-items-center rounded-full text-texte transition-colors hover:bg-white/15 sm:bottom-7 sm:right-7 sm:size-14"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.94 }}
        >
          <ArrowUp size={20} weight="bold" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
