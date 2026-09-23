import { motion, useReducedMotion } from 'motion/react';
import { projets, temoignages, type Temoignage } from '../data/site.ts';
import { easeSortie, suivreProjecteur } from '../lib/mouvement.ts';

const logoDe = Object.fromEntries(projets.map((p) => [p.slug, p.logo]));

/**
 * Les trois témoignages restent visibles sans interaction : celui qui raconte l'avant/après
 * (Amsa Shop) porte la lumière en grand, les deux autres l'accompagnent.
 */
export function Temoignages() {
  const reduire = useReducedMotion();
  const vedette = temoignages.find((t) => t.projet === 'amsa-shop') ?? temoignages[0];
  const autres = temoignages.filter((t) => t !== vedette);

  return (
    <section id="temoignages" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <motion.h2
        className="titre max-w-2xl text-4xl sm:text-5xl"
        initial={reduire ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: easeSortie }}
      >
        Ce qu’en disent nos clients
      </motion.h2>

      <div className="mt-14 grid gap-4 lg:grid-cols-12">
        <Citation temoignage={vedette} vedette index={0} className="lg:col-span-7" />
        <div className="grid gap-4 lg:col-span-5">
          {autres.map((t, i) => (
            <Citation key={t.auteur} temoignage={t} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Citation({
  temoignage,
  vedette = false,
  index,
  className = '',
}: {
  temoignage: Temoignage;
  vedette?: boolean;
  index: number;
  className?: string;
}) {
  const reduire = useReducedMotion();
  return (
    <motion.figure
      onPointerMove={suivreProjecteur}
      className={`verre projecteur relative flex flex-col overflow-hidden rounded-3xl p-7 sm:p-9 ${className}`}
      initial={reduire ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: easeSortie }}
    >
      {vedette && (
        <>
          {/* La lumière du studio se pose sur le témoignage principal. */}
          <div aria-hidden className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-azur/70 to-transparent" />
          <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-72 w-[80%] -translate-x-1/2 rounded-full bg-bleu/20 blur-[100px]" />
        </>
      )}

      <img
        src={logoDe[temoignage.projet]}
        alt=""
        loading="lazy"
        className={`relative z-[3] w-auto self-start object-contain opacity-70 brightness-0 invert ${vedette ? 'h-11' : 'h-9'}`}
      />

      <blockquote
        className={`relative z-[3] mt-7 flex-1 text-texte ${
          vedette
            ? 'font-display text-2xl font-semibold leading-snug tracking-[-0.015em] sm:text-3xl'
            : 'text-lg leading-relaxed'
        }`}
        style={vedette ? { fontStretch: '108%' } : undefined}
      >
        <p>
          <span className="text-azur">«&nbsp;</span>
          {temoignage.citation}
          <span className="text-azur">&nbsp;»</span>
        </p>
      </blockquote>

      <figcaption className="relative z-[3] mt-8 border-t border-white/[0.07] pt-5">
        <p className="font-display text-base font-semibold" style={{ fontStretch: '110%' }}>
          {temoignage.auteur}
        </p>
        <p className="mt-0.5 text-sm text-cendre">{temoignage.role}</p>
      </figcaption>
    </motion.figure>
  );
}
