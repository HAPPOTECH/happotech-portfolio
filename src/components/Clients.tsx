import { motion, useReducedMotion } from 'motion/react';
import { projets, type Projet } from '../data/site.ts';
import { easeSortie } from '../lib/mouvement.ts';

/** Les logos de ceux qui nous ont confié leur projet, en blanc, sur une bande qui défile. */
export function Clients() {
  const reduire = useReducedMotion();
  // Assez de répétitions pour couvrir les grands écrans ; la piste est doublée pour boucler sans raccord.
  const serie = [...projets, ...projets, ...projets];

  return (
    <motion.section
      aria-label="Ils nous ont confié leur projet"
      className="border-y border-white/[0.07] py-12 sm:py-14"
      initial={reduire ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1, ease: easeSortie }}
    >
      <p className="mb-9 text-center text-sm text-cendre">Ils nous ont confié leur projet</p>

      {reduire ? (
        <ul className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-16 gap-y-8 px-4">
          {projets.map((p) => (
            <li key={p.slug}>
              <Logo projet={p} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="masque-bords group relative overflow-hidden">
          <ul className="flex w-max animate-defile items-center group-hover:[animation-play-state:paused]">
            {[0, 1].map((piste) =>
              serie.map((p, i) => (
                <li
                  key={`${piste}-${i}`}
                  className="px-10 sm:px-16"
                  aria-hidden={piste === 1 || i >= projets.length}
                >
                  <Logo projet={p} />
                </li>
              )),
            )}
          </ul>
        </div>
      )}
    </motion.section>
  );
}

/** Hauteurs ajustées à l'œil : les trois logos doivent peser le même poids visuel. */
const hauteurs: Record<string, string> = {
  'amsa-shop': 'h-8 sm:h-10',
  'cabinet-mame-fary': 'h-14 sm:h-[4.5rem]',
  'ngouda-traiteur': 'h-11 sm:h-14',
};

function Logo({ projet }: { projet: Projet }) {
  return (
    <img
      src={projet.logo}
      alt={projet.nom}
      loading="lazy"
      className={`${hauteurs[projet.slug] ?? 'h-12'} w-auto max-w-[200px] object-contain opacity-60 brightness-0 invert transition-opacity duration-500 hover:opacity-100`}
    />
  );
}
