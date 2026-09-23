import { entreprise } from '../data/site.ts';

/** Monogramme + nom, comme sur le logo : HAPPO en blanc, TECH en bleu. */
export function Marque({ taille = 'md' }: { taille?: 'md' | 'sm' }) {
  const petit = taille === 'sm';
  return (
    <span className="inline-flex items-center gap-2.5">
      <img
        src={entreprise.monogramme}
        alt=""
        width={547}
        height={459}
        className={petit ? 'h-6 w-auto' : 'h-7 w-auto'}
      />
      <span
        className={`font-display font-extrabold tracking-[0.06em] ${petit ? 'text-[13px]' : 'text-[15px]'}`}
        style={{ fontStretch: '125%' }}
      >
        HAPPO<span className="text-azur">TECH</span>
      </span>
    </span>
  );
}
