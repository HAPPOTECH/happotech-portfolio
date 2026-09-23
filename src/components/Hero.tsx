import { useRef, type PointerEvent } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'motion/react';
import { ArrowDown, ArrowRight } from '@phosphor-icons/react';
import { ctaContact, entreprise } from '../data/site.ts';
import { easeSortie } from '../lib/mouvement.ts';

/** Le titre, mot par mot ; `accent` passe le mot dans la lumière du logo. */
const lignes: { mot: string; accent?: boolean }[][] = [
  [{ mot: 'Vos' }, { mot: 'idées,' }],
  [{ mot: 'nos' }, { mot: 'solutions', accent: true }, { mot: 'digitales.', accent: true }],
];

const lettre: Variants = {
  cache: { opacity: 0, y: '0.55em', filter: 'blur(10px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: '0em',
    filter: 'blur(0px)',
    transition: { delay: 0.55 + i * 0.028, duration: 0.8, ease: easeSortie },
  }),
};

const apparition = (delai: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: delai, duration: 0.9, ease: easeSortie },
});

export function Hero() {
  const reduire = useReducedMotion();
  const section = useRef<HTMLElement>(null);

  // Pointeur normalisé (0 → 1) : il guide la lumière et l'inclinaison du monogramme.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.35);
  const ressort = { stiffness: 90, damping: 22, mass: 0.6 };
  const sx = useSpring(px, ressort);
  const sy = useSpring(py, ressort);
  const lumiereX = useTransform(sx, (v) => `${v * 100}%`);
  const lumiereY = useTransform(sy, (v) => `${v * 100}%`);
  const lumiere = useMotionTemplate`radial-gradient(640px circle at ${lumiereX} ${lumiereY}, rgb(21 96 240 / 0.20), rgb(25 211 255 / 0.05) 38%, transparent 68%)`;
  const inclinaisonY = useTransform(sx, [0, 1], [-14, 14]);
  const inclinaisonX = useTransform(sy, [0, 1], [10, -10]);

  // En quittant le hero, le monogramme grandit et s'éteint doucement.
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] });
  const echelle = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const fondu = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const descente = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const bouger = (e: PointerEvent<HTMLElement>) => {
    if (reduire || e.pointerType === 'touch') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const recentrer = () => {
    px.set(0.5);
    py.set(0.35);
  };

  let indexLettre = 0;

  return (
    <section
      id="haut"
      ref={section}
      onPointerMove={bouger}
      onPointerLeave={recentrer}
      className="relative flex min-h-[100dvh] items-center overflow-hidden pb-20 pt-28 sm:pt-32"
    >
      {/* La source : le halo du monogramme, qui s'éteint quand on quitte le hero. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-20rem] h-[46rem] w-[min(72rem,150vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(21_96_240/0.32),rgb(25_211_255/0.07)_55%,transparent)]"
        style={reduire ? undefined : { opacity: fondu }}
      />
      {/* La lumière qui suit la main. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: lumiere }}
      />

      <motion.div
        className="relative mx-auto w-full max-w-6xl px-4 text-center sm:px-6"
        style={reduire ? undefined : { y: descente, opacity: fondu }}
      >
        {/* Monogramme éclairé de l'intérieur : son propre halo est la source de lumière. */}
        <motion.div
          className="mx-auto mb-10 w-fit [perspective:900px] sm:mb-12"
          initial={reduire ? false : { opacity: 0, scale: 0.8, filter: 'blur(14px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.3, ease: easeSortie }}
        >
          <motion.div
            className="relative"
            style={reduire ? undefined : { rotateX: inclinaisonX, rotateY: inclinaisonY, scale: echelle }}
          >
            <motion.img
              aria-hidden
              src={entreprise.monogramme}
              alt=""
              className="absolute inset-0 h-full w-full scale-125 blur-[38px]"
              animate={reduire ? undefined : { opacity: [0.55, 0.95, 0.55] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ opacity: 0.75 }}
            />
            <img
              src={entreprise.monogramme}
              alt="Monogramme HAPPOTECH"
              width={547}
              height={459}
              className="relative h-auto w-28 drop-shadow-[0_18px_40px_rgb(21_96_240/0.45)] sm:w-36"
            />
          </motion.div>
        </motion.div>

        <h1 className="titre mx-auto max-w-[17ch] text-[2.5rem] sm:text-6xl lg:text-7xl" aria-label={`${entreprise.slogan}.`}>
          {lignes.map((ligne, l) => (
            <span key={l} className="block" aria-hidden>
              {ligne.map(({ mot, accent }, m) => (
                <span
                  key={m}
                  className={`inline-block whitespace-nowrap pb-[0.08em] ${m < ligne.length - 1 ? 'mr-[0.26em]' : ''} ${accent ? 'text-azur' : ''}`}
                >
                  {Array.from(mot).map((c, k) => {
                    const i = indexLettre++;
                    return (
                      <motion.span
                        key={k}
                        className="inline-block"
                        custom={i}
                        variants={lettre}
                        initial={reduire ? false : 'cache'}
                        animate="visible"
                      >
                        {c}
                      </motion.span>
                    );
                  })}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-brume sm:text-xl"
          {...(reduire ? {} : apparition(1.35))}
        >
          Vous nous confiez un problème, nous livrons la solution&nbsp;: site, boutique en ligne ou
          outil sur mesure.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          {...(reduire ? {} : apparition(1.5))}
        >
          <a
            href="#projets"
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-texte px-7 py-4 font-medium text-encre shadow-[0_12px_40px_-12px_rgb(42_157_255/0.55)] transition-[transform,background-color,box-shadow] duration-300 ease-[var(--ease-sortie)] hover:bg-white hover:shadow-[0_16px_48px_-12px_rgb(42_157_255/0.8)] active:scale-[0.98] sm:w-auto"
          >
            Voir nos projets
            <ArrowDown size={17} weight="bold" className="transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="verre group inline-flex w-full items-center justify-center gap-2.5 rounded-full px-7 py-4 font-medium text-texte transition-[transform,background-color] duration-300 ease-[var(--ease-sortie)] hover:bg-white/10 active:scale-[0.98] sm:w-auto"
          >
            {ctaContact}
            <ArrowRight size={17} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </motion.div>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-encre" />
    </section>
  );
}
