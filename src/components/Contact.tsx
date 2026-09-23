import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';
import {
  ArrowUpRight,
  Check,
  Copy,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  WhatsappLogo,
} from '@phosphor-icons/react';
import { associes, contact, lienWhatsApp, navigation } from '../data/site.ts';
import { easeSortie } from '../lib/mouvement.ts';

export function Contact() {
  const reduire = useReducedMotion();
  const entree = (delai = 0) =>
    reduire
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.9, delay: delai, ease: easeSortie },
        };

  const reseaux = [
    { href: contact.linkedin, label: 'LinkedIn', Icone: LinkedinLogo },
    { href: contact.github, label: 'GitHub', Icone: GithubLogo },
  ].filter((r) => r.href);

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-white/[0.07] pt-24 sm:pt-32">
      {/* La lumière remonte du bas de page, sous le wordmark. */}
      <div aria-hidden className="pointer-events-none absolute -bottom-64 left-1/2 h-[520px] w-[min(1100px,120vw)] -translate-x-1/2 rounded-full bg-bleu/30 blur-[140px]" />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <motion.h2 className="titre text-5xl sm:text-6xl lg:text-7xl" {...entree()}>
            Parlons de votre idée.
          </motion.h2>
          <motion.p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-brume sm:text-xl" {...entree(0.08)}>
            Écrivez-nous sur WhatsApp ou par e-mail. Ce sont les fondateurs qui vous répondent.
          </motion.p>

          <motion.div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap" {...entree(0.16)}>
            {associes.map((a) => (
              <a
                key={a.nom}
                href={lienWhatsApp(a.whatsapp)}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-texte px-6 py-4 font-medium text-encre transition-[transform,background-color] duration-300 hover:bg-white active:scale-[0.98]"
              >
                <WhatsappLogo size={20} weight="fill" className="text-bleu" />
                WhatsApp {a.prenom}
                <ArrowUpRight size={15} weight="bold" className="text-encre/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </motion.div>

          <motion.div {...entree(0.22)}>
            <Email />
          </motion.div>
        </div>

        <motion.div className="lg:col-span-5" {...entree(0.12)}>
          <div className="verre rounded-3xl p-7 sm:p-8">
            <h3 className="font-display text-xl font-semibold" style={{ fontStretch: '110%' }}>
              Accès rapide
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {navigation.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-brume transition-colors hover:text-texte">
                    {label}
                  </a>
                </li>
              ))}
            </ul>


            {reseaux.length > 0 && (
              <div className="mt-6 flex gap-3">
                {reseaux.map(({ href, label, Icone }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.05] transition-colors hover:bg-white/10"
                  >
                    <Icone size={20} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <MotPleineLargeur />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 border-t border-white/[0.07] px-4 pb-24 pt-8 text-sm text-cendre sm:flex-row sm:px-6 sm:pb-8">
        <p>© {new Date().getFullYear()} HAPPOTECH. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

/** Adresse e-mail : un clic ouvre la messagerie, l'autre bouton la copie. */
function Email() {
  const [copie, setCopie] = useState<'idle' | 'ok' | 'erreur'>('idle');

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopie('ok');
    } catch {
      setCopie('erreur');
    }
    window.setTimeout(() => setCopie('idle'), 2200);
  };

  return (
    <div className="mt-4 inline-flex w-full items-stretch overflow-hidden rounded-full border border-white/15 bg-white/[0.05] sm:w-auto">
      <a
        href={`mailto:${contact.email}`}
        className="inline-flex flex-1 items-center gap-3 px-6 py-4 font-medium transition-colors hover:bg-white/[0.06]"
      >
        <EnvelopeSimple size={20} className="text-azur" />
        {contact.email}
      </a>
      <button
        type="button"
        onClick={copier}
        className="relative grid w-14 place-items-center border-l border-white/10 text-brume transition-colors hover:bg-white/[0.06] hover:text-texte"
        aria-label="Copier l'adresse e-mail"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copie}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18 }}
          >
            {copie === 'ok' ? <Check size={18} weight="bold" className="text-cyan" /> : <Copy size={18} />}
          </motion.span>
        </AnimatePresence>
        <span role="status" className="sr-only">
          {copie === 'ok' ? 'Adresse copiée' : copie === 'erreur' ? 'Copie impossible, sélectionnez l’adresse' : ''}
        </span>
      </button>
    </div>
  );
}

const lettreMot: Variants = {
  cache: { y: '105%' },
  visible: (i: number) => ({ y: '0%', transition: { delay: i * 0.045, duration: 1.1, ease: easeSortie } }),
};

/** HAPPOTECH sur toute la mesure, comme une bande d'affiche : chaque lettre monte à son tour. */
function MotPleineLargeur() {
  const reduire = useReducedMotion();
  const lettres = Array.from('HAPPOTECH');
  return (
    <div className="relative mx-auto mt-24 max-w-6xl px-4 sm:mt-32 sm:px-6" aria-hidden>
      <motion.div
        className="flex justify-between overflow-hidden font-display font-extrabold leading-[0.8]"
        // Taille calculée pour que les neuf lettres remplissent exactement la mesure (≈ 8,3 em de large).
        style={{ fontStretch: '125%', fontSize: 'calc(min(69rem, 100vw - 3rem) / 8.6)' }}
        initial={reduire ? false : 'cache'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        {lettres.map((l, i) => (
          <motion.span key={i} custom={i} variants={lettreMot} className={`inline-block pb-[0.04em] ${i >= 5 ? 'text-azur' : 'text-texte'}`}>
            {l}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
