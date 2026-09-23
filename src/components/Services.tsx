import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from '@phosphor-icons/react';
import { services, type Service } from '../data/site.ts';
import { easeSortie, suivreProjecteur } from '../lib/mouvement.ts';

const parId = Object.fromEntries(services.map((s) => [s.id, s])) as Record<string, Service>;

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <EnTete />

      {/*
        Grille : l'application (large) et la boutique (haute) portent la preuve ;
        landing et site d'entreprise se partagent la deuxième rangée ; le design ferme en bandeau.
        Chaque capture est propre aux services : aucune n'est reprise dans les projets.
      */}
      <div className="mt-14 grid gap-4 lg:grid-cols-6 lg:grid-rows-[minmax(390px,auto)_minmax(330px,auto)_auto]">
        <Case service={parId['full-stack']} className="lg:col-span-4" media="lg:static" etroit index={0}>
          <Capture service={parId['full-stack']} variante="inclinee" />
        </Case>
        <Case service={parId['e-commerce']} className="lg:col-span-2 lg:row-span-2" index={1}>
          <Capture service={parId['e-commerce']} variante="haute" />
        </Case>
        <Case service={parId['landing']} className="lg:col-span-2" index={2}>
          <Conversion />
        </Case>
        <Case service={parId['vitrine']} className="lg:col-span-2" index={3}>
          <Capture service={parId['vitrine']} variante="bas" />
        </Case>
        <CaseDesign service={parId['design']} />
      </div>
    </section>
  );
}

function EnTete() {
  const reduire = useReducedMotion();
  return (
    <motion.div
      className="max-w-2xl"
      initial={reduire ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.9, ease: easeSortie }}
    >
      <h2 className="titre text-4xl sm:text-5xl">Ce que nous construisons</h2>
      <p className="mt-5 text-lg leading-relaxed text-brume">
        Du site vitrine à l’application complète. Chaque projet part de votre problème, jamais d’un
        modèle tout fait.
      </p>
    </motion.div>
  );
}

function Case({
  service,
  className = '',
  media = '',
  etroit = false,
  index,
  children,
}: {
  service: Service;
  className?: string;
  media?: string;
  /** Texte limité à la moitié gauche quand la capture occupe la droite. */
  etroit?: boolean;
  index: number;
  children: ReactNode;
}) {
  const reduire = useReducedMotion();
  return (
    <motion.article
      onPointerMove={suivreProjecteur}
      className={`verre projecteur group flex min-h-[340px] flex-col overflow-hidden rounded-3xl ${className}`}
      initial={reduire ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.08, ease: easeSortie }}
    >
      <div className={`relative z-[3] p-7 sm:p-8 ${etroit ? 'lg:max-w-[46%]' : ''}`}>
        <h3 className="titre text-2xl sm:text-[1.75rem]">{service.titre}</h3>
        <p className="mt-3 max-w-md leading-relaxed text-brume">{service.texte}</p>
        <Etiquettes tags={service.tags} />
      </div>
      <div className={`relative mt-auto flex-1 ${media}`}>{children}</div>
    </motion.article>
  );
}

function Etiquettes({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {tags.map((t) => (
        <li
          key={t}
          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-brume"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

/** Une vraie capture du projet, cadrée selon la case. */
function Capture({
  service,
  variante,
}: {
  service: Service;
  variante: 'inclinee' | 'haute' | 'bas';
}) {
  if (!service.image) return null;
  const img = (
    <SousLaLumiere>
      <img
        src={service.image}
        alt={service.alt ?? ''}
        loading="lazy"
        width={1440}
        height={900}
        className="block h-full w-full object-cover object-top"
      />
    </SousLaLumiere>
  );

  if (variante === 'inclinee') {
    return (
      <div className="relative h-56 sm:h-64 lg:absolute lg:inset-0 lg:h-auto">
        <div className="absolute bottom-0 left-7 right-[-18%] top-2 origin-bottom-left overflow-hidden rounded-tl-2xl border border-white/10 shadow-[0_-20px_60px_-24px_rgb(0_0_0/0.9)] transition-transform duration-700 ease-[var(--ease-sortie)] [transform:perspective(1400px)_rotateX(10deg)_rotateY(-10deg)] group-hover:[transform:perspective(1400px)_rotateX(4deg)_rotateY(-4deg)_translateY(-6px)] sm:left-8 lg:left-[46%] lg:top-10">
          {img}
        </div>
      </div>
    );
  }

  if (variante === 'haute') {
    return (
      <div className="relative h-72 overflow-hidden lg:absolute lg:inset-x-0 lg:bottom-0 lg:top-0 lg:h-auto">
        <div className="absolute inset-x-7 bottom-0 top-0 overflow-hidden rounded-t-2xl border border-b-0 border-white/10 transition-transform duration-700 ease-[var(--ease-sortie)] group-hover:-translate-y-2 sm:inset-x-8">
          <SousLaLumiere>
            <img
              src={service.image}
              alt={service.alt ?? ''}
              loading="lazy"
              width={1440}
              height={900}
              className="block h-full w-full object-cover object-top"
            />
          </SousLaLumiere>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-48 overflow-hidden sm:h-56 lg:absolute lg:inset-0 lg:h-auto">
      <div className="absolute inset-x-7 bottom-0 top-0 overflow-hidden rounded-t-2xl border border-b-0 border-white/10 transition-transform duration-700 ease-[var(--ease-sortie)] group-hover:-translate-y-2 sm:inset-x-8">
        {img}
      </div>
    </div>
  );
}

/**
 * Les captures des services sont vues sous la lumière du studio : monochromes, teintées de bleu.
 * Au survol de la case, la lumière se retire et le projet retrouve ses vraies couleurs.
 * Sans survol possible (téléphone, tablette), les captures restent en vraies couleurs.
 */
function SousLaLumiere({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full w-full">
      <div className="h-full w-full transition-[filter] duration-700 ease-[var(--ease-sortie)] [@media(hover:hover)]:grayscale [@media(hover:hover)]:group-hover:grayscale-0">
        {children}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-bleu/55 mix-blend-color transition-opacity duration-700 ease-[var(--ease-sortie)] group-hover:opacity-0 [@media(hover:hover)]:block"
      />
    </div>
  );
}

/** Landing page : aucune capture à montrer ; la case dit ce qu'une landing fait, en une ligne d'action. */
function Conversion() {
  return (
    <div className="flex h-full min-h-[120px] items-end px-7 pb-7 sm:px-8 sm:pb-8">
      <p
        className="flex w-full items-center justify-between gap-4 border-t border-white/10 pt-5 font-display text-lg font-semibold text-texte"
        style={{ fontStretch: '112%' }}
      >
        Une offre, un bouton, un client.
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-texte text-encre transition-transform duration-500 ease-[var(--ease-sortie)] group-hover:translate-x-1">
          <ArrowRight size={18} weight="bold" />
        </span>
      </p>
    </div>
  );
}

/** Le design graphique : du lettrage, pas des vignettes. Ce que couvre une identité, en capitales étendues. */
function CaseDesign({ service }: { service: Service }) {
  const reduire = useReducedMotion();
  const mots = ['Logos', 'Flyers', 'Identité'];
  return (
    <motion.article
      onPointerMove={suivreProjecteur}
      className="verre projecteur group relative overflow-hidden rounded-3xl lg:col-span-6"
      initial={reduire ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: easeSortie }}
    >
      <div className="relative z-[3] grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h3 className="titre text-2xl sm:text-[1.75rem]">{service.titre}</h3>
          <p className="mt-3 max-w-md leading-relaxed text-brume">{service.texte}</p>
        </div>

        <ul
          aria-label="Supports"
          className="font-display font-extrabold uppercase leading-[0.92]"
          style={{ fontStretch: '125%' }}
        >
          {mots.map((m, i) => (
            <li
              key={m}
              className={`text-[2.4rem] tracking-[-0.01em] transition-colors duration-500 sm:text-6xl lg:text-[4.2rem] ${
                i === 1 ? 'text-azur' : 'text-texte/90 group-hover:text-texte'
              }`}
            >
              {m}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
