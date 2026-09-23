import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { ArrowUpRight, CheckCircle } from '@phosphor-icons/react';
import { projets, type Projet } from '../data/site.ts';
import { easeSortie } from '../lib/mouvement.ts';

export function Projets() {
  const reduire = useReducedMotion();
  const pile = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: pile, offset: ['start start', 'end end'] });

  return (
    <section id="projets" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={reduire ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: easeSortie }}
      >
        <h2 className="titre text-4xl sm:text-5xl">Nos réalisations</h2>
        <p className="mt-5 text-lg leading-relaxed text-brume">
          Des projets livrés et en service, dans des métiers très différents.
        </p>
      </motion.div>

      <div ref={pile} className="mt-14 flex flex-col gap-8 lg:mt-20 lg:gap-0">
        {projets.map((p, i) => (
          <CarteProjet
            key={p.slug}
            projet={p}
            index={i}
            total={projets.length}
            progression={scrollYProgress}
            reduire={!!reduire}
          />
        ))}
      </div>
    </section>
  );
}

function CarteProjet({
  projet,
  index,
  total,
  progression,
  reduire,
}: {
  projet: Projet;
  index: number;
  total: number;
  progression: MotionValue<number>;
  reduire: boolean;
}) {
  // Quand la carte suivante arrive, celle-ci recule et s'assombrit : la pile se lit en profondeur.
  const debut = index / total;
  const echelleCible = 1 - (total - 1 - index) * 0.045;
  const echelle = useTransform(progression, [debut, 1], [1, echelleCible]);
  // Bornes gardées dans [0, 1] et croissantes : l'animation liée au défilement (WAAPI) refuse le reste.
  const pas = 1 / total;
  const borne = (v: number) => Math.min(1, Math.max(0, v));
  // Le voile tombe pendant que la carte suivante arrive, pour qu'aucun contenu ne dépasse derrière elle.
  const voile = useTransform(
    progression,
    [borne(debut + pas * 0.25), borne(debut + pas * 0.999)],
    [0, index === total - 1 ? 0 : 0.95],
  );
  // La lumière passe de carte en carte : seule celle du premier plan est éclairée.
  const lumiere = useTransform(
    progression,
    index === 0 ? [0, pas] : [borne(debut - pas), debut, borne(debut + pas * 0.999)],
    index === 0 ? [1, 0.15] : [0.15, 1, 0.15],
  );

  const carte = useRef<HTMLDivElement>(null);
  const { scrollYProgress: passage } = useScroll({ target: carte, offset: ['start end', 'end start'] });
  const glissement = useTransform(passage, [0, 1], ['-4%', '4%']);
  const telephone = useTransform(passage, [0, 1], [50, -40]);

  return (
    <div ref={carte} className="lg:sticky lg:h-[calc(100dvh-7rem)] lg:min-h-[640px]" style={{ top: `calc(6.5rem + ${index * 18}px)` }}>
      <motion.article
        className="relative h-full origin-top overflow-hidden rounded-[28px] border border-white/10 bg-nuit shadow-[0_-24px_80px_-40px_rgb(0_0_0/0.9)]"
        style={reduire ? undefined : { scale: echelle }}
        initial={reduire ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1, ease: easeSortie }}
      >
        {/* Filet de lumière sur l'arête haute. */}
        <div aria-hidden className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-azur/70 to-transparent" />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-48 left-1/2 h-[420px] w-[80%] -translate-x-1/2 rounded-full bg-bleu/25 blur-[110px]"
          style={reduire ? undefined : { opacity: lumiere }}
        />

        <div className="relative grid h-full gap-10 p-6 sm:p-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-12 lg:p-12">
          <div className="flex flex-col">
            <img src={projet.logo} alt="" className="h-12 w-auto max-w-[160px] self-start object-contain opacity-80 brightness-0 invert" loading="lazy" />
            <h3 className="titre mt-7 text-3xl sm:text-4xl">{projet.nom}</h3>
            <p className="mt-2 text-sm text-azur">{projet.secteur}</p>
            <p className="mt-6 max-w-[46ch] leading-relaxed text-brume">{projet.objectif}</p>

            <h4 className="mt-7 text-sm font-medium text-texte">Ce que nous avons livré</h4>
            <ul className="mt-3 space-y-2.5">
              {projet.livre.map((l) => (
                <li key={l} className="flex items-start gap-3 text-[15px] text-brume">
                  <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-azur" />
                  {l}
                </li>
              ))}
            </ul>

            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Technologies">
              {projet.technologies.map((t) => (
                <li key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-brume">
                  {t}
                </li>
              ))}
            </ul>

            {projet.url && (
              <a
                href={projet.url}
                target="_blank"
                rel="noreferrer"
                className="group mt-8 inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/10"
              >
                Voir le site
                <ArrowUpRight size={15} weight="bold" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
          </div>

          {/* Captures réelles : ordinateur, et téléphone qui passe devant. */}
          <div className="relative pb-10 sm:pb-14 lg:pb-0">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-encre shadow-[0_30px_80px_-30px_rgb(0_0_0/0.9)]">
              <div className="flex h-8 items-center gap-1.5 border-b border-white/[0.07] bg-white/[0.04] px-3.5">
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="mx-auto truncate pr-8 font-mono text-[11px] text-cendre">{projet.nom}</span>
              </div>
              <div className="aspect-[16/10] overflow-hidden">
                <motion.img
                  src={projet.capture}
                  alt={`Page d'accueil du site ${projet.nom}`}
                  loading="lazy"
                  width={1440}
                  height={900}
                  className="h-[108%] w-full object-cover object-top"
                  style={reduire ? undefined : { y: glissement }}
                />
              </div>
            </div>

            <motion.div
              className="absolute -bottom-2 right-3 w-[27%] min-w-[92px] max-w-[190px] overflow-hidden rounded-[22px] border-[5px] border-[#0b0f18] bg-encre shadow-[0_24px_60px_-12px_rgb(0_0_0/0.85)] ring-1 ring-white/10 sm:right-6 lg:-bottom-8 lg:-right-4"
              style={reduire ? undefined : { y: telephone }}
            >
              <img
                src={projet.mobile}
                alt={`Le site ${projet.nom} sur téléphone`}
                loading="lazy"
                width={780}
                height={1688}
                className="block aspect-[390/844] w-full object-cover object-top"
              />
            </motion.div>
          </div>
        </div>

        <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-encre" style={reduire ? { opacity: 0 } : { opacity: voile }} />
      </motion.article>
    </div>
  );
}
