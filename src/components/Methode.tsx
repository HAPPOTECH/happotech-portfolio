import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from 'motion/react';
import { Check } from '@phosphor-icons/react';
import { easeSortie } from '../lib/mouvement.ts';

type Etape = { titre: string; texte: string; visuel: ReactNode };

/** Vrai quand l'étape est atteinte : ses visuels se jouent à ce moment-là. */
const VisuelContexte = createContext(false);

const etapes: Etape[] = [
  {
    titre: 'On vous écoute',
    texte:
      'Vous venez vers nous, ou nous venons vers vous. Vous nous exposez votre problème avec vos mots, sans jargon.',
    visuel: <Conversation />,
  },
  {
    titre: 'On conçoit et on développe',
    texte:
      'Nous imaginons la solution adaptée, nous la dessinons avec vous, puis nous la construisons de bout en bout.',
    visuel: <Code />,
  },
  {
    titre: 'On met en ligne et on vous suit',
    texte:
      'Votre solution est publiée et testée sur téléphone comme sur ordinateur. Nous restons là pour la faire évoluer.',
    visuel: <MiseEnLigne />,
  },
];

export function Methode() {
  const reduire = useReducedMotion();
  const frise = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: frise, offset: ['start 70%', 'end 60%'] });
  const trace = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <section id="methode" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <motion.div
        className="max-w-2xl"
        initial={reduire ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: easeSortie }}
      >
        <h2 className="titre text-4xl sm:text-5xl">De votre problème à votre solution</h2>
        <p className="mt-5 text-lg leading-relaxed text-brume">
          Une méthode simple, la même pour chaque projet, quelle que soit sa taille.
        </p>
      </motion.div>

      <div className="relative mt-16 sm:mt-20">
        {/* La ligne se trace au fil du défilement. */}
        <div aria-hidden className="absolute bottom-2 left-[15px] top-2 w-px bg-white/[0.08] lg:left-[19px]" />
        <motion.div
          aria-hidden
          className="absolute bottom-2 left-[15px] top-2 w-px origin-top bg-gradient-to-b from-bleu via-azur to-cyan shadow-[0_0_14px_rgb(42_157_255/0.8)] lg:left-[19px]"
          style={{ scaleY: reduire ? 1 : trace }}
        />
        <ol ref={frise} className="relative space-y-20 lg:space-y-28">
          {etapes.map((e) => (
            <EtapeLigne key={e.titre} etape={e} reduire={!!reduire} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function EtapeLigne({ etape, reduire }: { etape: Etape; reduire: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  // Déclenchement tôt : sur mobile une étape empile titre, texte et visuel, et dépasse la hauteur d’écran.
  const atteinte = useInView(ref, { amount: 0.15, once: true });

  return (
    <li ref={ref} className="relative grid grid-cols-1 gap-8 pl-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:pl-20 [&>*]:min-w-0">
      {/* Nœud : il s'allume quand la ligne l'atteint. */}
      <span
        aria-hidden
        className={`absolute left-[7px] top-1.5 grid size-[17px] place-items-center rounded-full border transition-[border-color,box-shadow,background-color] duration-700 lg:left-[11px] ${
          atteinte || reduire
            ? 'border-cyan bg-encre shadow-[0_0_0_5px_rgb(25_211_255/0.12),0_0_22px_rgb(25_211_255/0.6)]'
            : 'border-white/20 bg-encre'
        }`}
      >
        <span className={`size-[7px] rounded-full transition-colors duration-700 ${atteinte || reduire ? 'bg-cyan' : 'bg-white/20'}`} />
      </span>

      <motion.div
        initial={reduire ? false : { opacity: 0, y: 24 }}
        animate={atteinte || reduire ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.9, ease: easeSortie }}
      >
        <h3 className="titre text-2xl sm:text-3xl">{etape.titre}</h3>
        <p className="mt-4 max-w-[42ch] text-lg leading-relaxed text-brume">{etape.texte}</p>
      </motion.div>

      <motion.div
        initial={reduire ? false : { opacity: 0, y: 36 }}
        animate={atteinte || reduire ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 1, delay: 0.12, ease: easeSortie }}
      >
        <VisuelContexte.Provider value={atteinte || reduire}>{etape.visuel}</VisuelContexte.Provider>
      </motion.div>
    </li>
  );
}

/* ---------- Visuels ---------- */

function Panneau({ entete, children, legende }: { entete: ReactNode; children: ReactNode; legende?: string }) {
  return (
    <figure>
      <div className="verre overflow-hidden rounded-3xl">
        <div className="flex h-12 items-center gap-3 border-b border-white/[0.07] px-5">{entete}</div>
        <div className="p-5 sm:p-6">{children}</div>
      </div>
      {legende && <figcaption className="mt-3 px-2 text-xs text-cendre">{legende}</figcaption>}
    </figure>
  );
}

const bulle: Variants = {
  cache: { opacity: 0, y: 14, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.35 + i * 0.9, duration: 0.55, ease: easeSortie },
  }),
};

function Conversation() {
  const actif = useContext(VisuelContexte);
  const messages = [
    { de: 'client', texte: 'Bonjour, nos demandes de devis arrivent par téléphone et c’est difficile à suivre.' },
    { de: 'nous', texte: 'On peut vous faire un formulaire de devis qui arrive directement sur votre WhatsApp.' },
    { de: 'client', texte: 'Parfait. On en parle cette semaine ?' },
  ];
  return (
    <Panneau
      legende="Exemple de premier échange"
      entete={
        <>
          <span className="grid size-7 place-items-center rounded-full bg-white/10 text-[11px] font-semibold">C</span>
          <span className="text-sm font-medium">Votre entreprise</span>
          <span className="ml-auto text-xs text-cendre">WhatsApp</span>
        </>
      }
    >
      <div className="flex min-h-[210px] flex-col gap-3">
        {messages.map((m, i) => (
          <motion.p
            key={i}
            custom={i}
            variants={bulle}
            initial="cache"
            animate={actif ? 'visible' : 'cache'}
            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] leading-snug ${
              m.de === 'nous'
                ? 'self-end rounded-br-md bg-gradient-to-br from-bleu to-azur text-white'
                : 'self-start rounded-bl-md bg-white/[0.07] text-texte'
            }`}
          >
            {m.texte}
          </motion.p>
        ))}
      </div>
    </Panneau>
  );
}

/** Code tapé caractère par caractère ; chaque segment garde sa couleur. */
// Lignes courtes (32 caractères au plus) : le panneau tient sur un téléphone sans rien couper.
const lignesCode: [string, string][][] = [
  [['// Devis envoyé sur WhatsApp', 'text-cendre']],
  [['const ', 'text-azur'], ['message', 'text-texte'], [' =', 'text-brume']],
  [['  composerDevis', 'text-cyan'], ['(formulaire);', 'text-brume']],
  [['const ', 'text-azur'], ['lien', 'text-texte'], [' =', 'text-brume']],
  [['  lienWhatsApp', 'text-cyan'], ['(numero, message);', 'text-brume']],
  [['window', 'text-texte'], ['.', 'text-brume'], ['open', 'text-cyan'], ['(lien, ', 'text-brume'], ["'_blank'", 'text-[#9fdcff]'], [');', 'text-brume']],
];
const totalCaracteres = lignesCode.flat().reduce((n, [t]) => n + t.length, 0);

function Code() {
  const actif = useContext(VisuelContexte);
  const reduire = useReducedMotion();
  const [tapes, setTapes] = useState(reduire ? totalCaracteres : 0);

  useEffect(() => {
    if (!actif || reduire) return;
    let n = 0;
    const minuteur = window.setInterval(() => {
      n += 1;
      setTapes(n);
      if (n >= totalCaracteres) window.clearInterval(minuteur);
    }, 32);
    return () => window.clearInterval(minuteur);
  }, [actif, reduire]);

  let reste = tapes;
  const fini = tapes >= totalCaracteres;

  return (
    <Panneau
      entete={
        <>
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </span>
          <span className="font-mono text-xs text-cendre">devis.ts</span>
        </>
      }
    >
      <pre className="min-h-[190px] font-mono text-[12.5px] leading-7 sm:text-[13.5px]" aria-label="Extrait de code">
        {lignesCode.map((ligne, l) => {
          const segments = ligne.map(([texte, couleur], s) => {
            const visible = texte.slice(0, Math.max(0, reste));
            reste -= texte.length;
            return (
              <span key={s} className={couleur}>
                {visible}
              </span>
            );
          });
          const curseurIci = !fini && reste < 0 && reste + ligne.reduce((n, [t]) => n + t.length, 0) >= 0;
          return (
            <div key={l} className="whitespace-pre">
              {segments}
              {curseurIci && <span className="ml-px inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-pulse bg-cyan" />}
              {'​'}
            </div>
          );
        })}
      </pre>
    </Panneau>
  );
}

/** Les vérifications avant publication, cochées une à une quand l'étape est atteinte. */
function MiseEnLigne() {
  const actif = useContext(VisuelContexte);
  const controles = [
    'Affichage sur téléphone',
    'Affichage sur ordinateur',
    'Formulaires et liens WhatsApp testés',
    'Hébergement et HTTPS',
  ];
  return (
    <Panneau
      entete={
        <>
          <span className="text-sm font-medium">Mise en ligne</span>
          <motion.span
            className="ml-auto inline-flex items-center gap-2 rounded-full bg-cyan/10 px-3 py-1 text-xs text-cyan"
            initial={{ opacity: 0 }}
            animate={{ opacity: actif ? 1 : 0 }}
            transition={{ delay: 0.3 + controles.length * 0.35, duration: 0.5 }}
          >
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 animate-pouls rounded-full bg-cyan" />
              <span className="relative size-1.5 rounded-full bg-cyan" />
            </span>
            En ligne
          </motion.span>
        </>
      }
    >
      <ul className="space-y-1">
        {controles.map((c, i) => (
          <li key={c} className="flex items-center gap-3 rounded-xl px-2 py-2.5">
            <motion.span
              className="grid size-6 shrink-0 place-items-center rounded-full border"
              initial={{ borderColor: 'rgb(255 255 255 / 0.2)', backgroundColor: 'rgb(25 211 255 / 0)' }}
              animate={
                actif
                  ? { borderColor: 'rgb(25 211 255 / 1)', backgroundColor: 'rgb(25 211 255 / 0.12)' }
                  : undefined
              }
              transition={{ delay: 0.3 + i * 0.35, duration: 0.4 }}
            >
              <motion.span
                className="grid place-items-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={actif ? { scale: 1, opacity: 1 } : undefined}
                transition={{ delay: 0.3 + i * 0.35, type: 'spring', stiffness: 420, damping: 22 }}
              >
                <Check size={13} weight="bold" className="text-cyan" />
              </motion.span>
            </motion.span>
            <span className="text-[15px] text-texte">{c}</span>
          </li>
        ))}
      </ul>
    </Panneau>
  );
}
