# HAPPOTECH : site portfolio

*Vos idées, nos solutions digitales.*

Site one-page du studio HAPPOTECH (Mohamed Faye et Mouhamadou Moustapha Gueye).

- React 19 + TypeScript + Vite
- Tailwind CSS 4 (`@tailwindcss/vite`), `motion` pour les animations, `@phosphor-icons/react` pour les icônes
- Polices auto-hébergées : Archivo (titres, largeur étendue), Geist, Geist Mono
- Déploiement Vercel (`vercel.json`)

## Lancer en local

```bash
npm install
npm run dev
```

## Modifier le contenu

Tout le texte vit dans `src/data/site.ts` : services, projets, associés, contacts.

- **Lien d'un projet en ligne** : renseigner `url` dans le projet ; le bouton « Voir le site » apparaît tout seul.
- **LinkedIn / GitHub** : renseigner `contact.linkedin` et `contact.github` ; les icônes apparaissent dans le pied de page.
- **Nouveau projet** : ajouter une entrée dans `projets`, avec ses captures dans `public/projets/` (desktop 1440×900, mobile 390×844 en @2x) et son logo blanc sur fond transparent dans `public/clients/`.

## Structure

- `src/components/` : une section par fichier (Navigation, Hero, Clients, Services, Projets, APropos, Methode, Contact, Flottants)
- `src/index.css` : couleurs de la marque (tirées du logo), typographies, verre, bordure « projecteur »
- `src/lib/mouvement.ts` : courbe d'animation commune et lumière qui suit le pointeur
- `public/brand/` : logo et monogramme
- `public/projets/` : captures réelles des projets livrés
- `public/clients/` : logos des clients
