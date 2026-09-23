import type { PointerEvent } from 'react';

/** Courbe de sortie exponentielle, commune à toute la page. */
export const easeSortie = [0.16, 1, 0.3, 1] as const;

/**
 * Place la lumière de `.projecteur` sous le pointeur.
 * Écrit directement des variables CSS : aucun re-rendu React.
 */
export function suivreProjecteur(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}
