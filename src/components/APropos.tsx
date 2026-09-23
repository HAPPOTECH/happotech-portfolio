import { motion, useReducedMotion } from 'motion/react';
import { ChatsCircle, Handshake, RocketLaunch, WhatsappLogo } from '@phosphor-icons/react';
import { associes, engagements, lienWhatsApp, type Associe } from '../data/site.ts';
import { easeSortie, suivreProjecteur } from '../lib/mouvement.ts';

const icones = [ChatsCircle, Handshake, RocketLaunch];

export function APropos() {
  const reduire = useReducedMotion();
  const entree = (delai = 0) =>
    reduire
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 0.9, delay: delai, ease: easeSortie },
        };

  return (
    <section id="a-propos" className="relative py-24 sm:py-32">
      <div className="relative mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <motion.h2 className="titre text-[2rem] sm:text-5xl lg:text-[3.4rem]" {...entree()}>
            Deux étudiants entrepreneurs, engagés et motivés.
          </motion.h2>

          <motion.div className="mt-8 max-w-[60ch] space-y-5 text-lg leading-relaxed text-brume" {...entree(0.1)}>
            <p>
              HAPPOTECH, c’est Mohamed et Moustapha. Nous allons à la rencontre des entreprises, ou
              elles viennent à nous, et elles nous confient ce qui les bloque.
            </p>
            <p>
              À partir de là, nous cherchons la solution qui leur correspond vraiment, puis nous la
              construisons de bout en bout&nbsp;: design, développement, mise en ligne.
            </p>
          </motion.div>

          <ul className="mt-10 space-y-4">
            {engagements.map((texte, i) => {
              const Icone = icones[i];
              return (
                <motion.li key={texte} className="flex items-center gap-4" {...entree(0.15 + i * 0.07)}>
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-azur/25 bg-azur/10 text-azur">
                    <Icone size={20} />
                  </span>
                  <span className="text-texte">{texte}</span>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-5 lg:pt-3">
          {associes.map((a, i) => (
            <CarteAssocie key={a.nom} associe={a} delai={0.1 + i * 0.12} reduire={!!reduire} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CarteAssocie({ associe, delai, reduire }: { associe: Associe; delai: number; reduire: boolean }) {
  return (
    <motion.article
      onPointerMove={suivreProjecteur}
      className="verre projecteur group rounded-3xl p-6 sm:p-7"
      initial={reduire ? false : { opacity: 0, x: 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, delay: delai, ease: easeSortie }}
    >
      <div className="relative z-[3] flex items-center gap-5">
        {/* Initiales dans un anneau de lumière : pas de photo, un monogramme. */}
        <div className="relative grid size-[72px] shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-bleu via-azur to-cyan p-px">
          <div className="grid size-full place-items-center rounded-[15px] bg-nuit">
            <span className="font-display text-2xl font-extrabold tracking-wide" style={{ fontStretch: '125%' }}>
              {associe.initiales}
            </span>
          </div>
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold leading-snug sm:text-xl" style={{ fontStretch: '110%' }}>
            {associe.nom}
          </h3>
          <p className="mt-0.5 text-sm text-cendre">{associe.role}</p>
        </div>
      </div>

      <div className="relative z-[3] mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-5">
        <a href={`tel:+${associe.whatsapp}`} className="font-mono text-sm text-brume transition-colors hover:text-texte">
          {associe.telephone}
        </a>
        <a
          href={lienWhatsApp(associe.whatsapp)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-medium transition-[background-color,transform] duration-300 hover:bg-white/10 active:scale-[0.98]"
        >
          <WhatsappLogo size={17} weight="fill" className="text-azur" />
          Écrire à {associe.prenom}
        </a>
      </div>
    </motion.article>
  );
}
