/**
 * Supports imprimés HAPPOTECH : flyer A5 et carte de visite, recto et verso.
 *
 *   node print/generer.mjs
 *
 * Produit dans print/export/ :
 *   - flyer-a5.pdf         (2 pages, fond perdu 3 mm inclus, prêt pour l'imprimeur)
 *   - carte-de-visite.pdf  (2 pages, fond perdu 3 mm inclus)
 *   - des aperçus PNG haute définition de chaque face
 *
 * QR CODE : tant que le portfolio n'est pas en ligne, le QR est provisoire.
 * Une fois le site déployé, renseigner son adresse ci-dessous et relancer la commande.
 */
const URL_PORTFOLIO = ''; // ex. 'https://happotech.vercel.app'

import { spawn } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import QRCode from 'qrcode';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { EnvelopeSimple, GithubLogo, WhatsappLogo } from '@phosphor-icons/react/dist/ssr';

const ICI = dirname(fileURLToPath(import.meta.url));
const RACINE = join(ICI, '..');
const EXPORT = join(ICI, 'export');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

/* ---------- Contenu (le même que le site) ---------- */

const associes = [
  { nom: 'Mohamed Faye', prenom: 'Mohamed', role: 'Co-fondateur', telephone: '+221 78 525 99 28' },
  { nom: 'Mouhamadou Moustapha Gueye', prenom: 'Moustapha', role: 'Co-fondateur', telephone: '+221 75 502 91 48' },
];
const email = 'happotech1@gmail.com';
const github = 'github.com/HAPPOTECH';

const services = [
  ['Applications sur mesure', 'Un outil pour votre métier, avec son back-end, ses comptes et ses données.'],
  ['Boutiques en ligne', 'Catalogue, panier et commandes, avec un espace pour gérer vos produits.'],
  ['Sites d’entreprise', 'Votre activité, vos offres et vos contacts, présentés avec soin.'],
  ['Landing pages', 'Une page qui présente une offre et pousse à passer à l’action.'],
];
const etapes = ['On vous écoute', 'On conçoit et on développe', 'On met en ligne et on vous suit'];

/* ---------- Ressources ---------- */

const f = (chemin) => pathToFileURL(join(RACINE, chemin)).href;
const icone = (Composant, props = {}) =>
  renderToStaticMarkup(createElement(Composant, { size: '100%', weight: 'fill', ...props }));

const qrProvisoire = !URL_PORTFOLIO;
const qrContenu = URL_PORTFOLIO || 'QR PROVISOIRE HAPPOTECH : à remplacer par l’adresse du portfolio.';
const qr = await QRCode.toString(qrContenu, {
  type: 'svg',
  errorCorrectionLevel: 'M',
  margin: 0,
  color: { dark: '#04060b', light: '#ffffff' },
});

/* ---------- Styles communs ---------- */

const css = /* css */ `
@font-face { font-family: 'Archivo'; src: url('${f('node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2')}') format('woff2'); font-weight: 100 900; font-stretch: 62% 125%; }
@font-face { font-family: 'Geist'; src: url('${f('node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2')}') format('woff2'); font-weight: 100 900; }
@font-face { font-family: 'Geist Mono'; src: url('${f('node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2')}') format('woff2'); font-weight: 100 900; }

:root {
  --encre: #04060b; --nuit: #080b13; --ardoise: #0d121c;
  --texte: #eef2f8; --brume: #9aa4b6; --cendre: #7d879a;
  --bleu: #1560f0; --azur: #2a9dff; --cyan: #19d3ff;
  --ligne: rgb(255 255 255 / 0.12);
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: #1a1d24; }
body { font-family: 'Geist', sans-serif; color: var(--texte); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { position: relative; overflow: hidden; background: var(--encre); break-after: page; }
.page:last-child { break-after: auto; }
.titre { font-family: 'Archivo', sans-serif; font-stretch: 118%; font-weight: 700; letter-spacing: -0.035em; line-height: 1.02; }
.lettrage { font-family: 'Archivo', sans-serif; font-stretch: 125%; font-weight: 800; text-transform: uppercase; }
.mono { font-family: 'Geist Mono', monospace; }
.azur { color: var(--azur); }
.marque { display: inline-flex; align-items: center; gap: 0.32em; }
.marque img { height: 1.25em; width: auto; }
.marque span { font-family: 'Archivo', sans-serif; font-stretch: 125%; font-weight: 800; letter-spacing: 0.06em; }
.icone { display: inline-block; width: 1.15em; height: 1.15em; vertical-align: -0.2em; color: var(--azur); }
.icone svg { display: block; width: 100%; height: 100%; }
/* Monogramme éclairé : son propre halo est la source de lumière. */
.source { position: absolute; }
.source img { position: absolute; inset: 0; width: 100%; height: auto; }
.source img.halo { filter: blur(var(--flou, 6mm)); transform: scale(1.3); opacity: 0.9; }
.qr { background: #fff; border-radius: 2.2mm; padding: 1.8mm; }
.qr svg { display: block; width: 100%; height: auto; }
.filet { height: 0.25mm; background: linear-gradient(90deg, transparent, var(--azur), transparent); }
`;

/* ---------- Carte de visite : 85 × 55 mm + 3 mm de fond perdu ---------- */

const CARTE = { l: 91, h: 61 };
const carteRecto = /* html */ `
<section class="page carte" style="width:${CARTE.l}mm;height:${CARTE.h}mm">
  <div style="position:absolute;inset:0;background:radial-gradient(38mm 30mm at 50% 38%, rgb(21 96 240 / 0.55), rgb(25 211 255 / 0.08) 55%, transparent 80%)"></div>
  <div class="source" style="--flou:4mm;left:50%;top:13.5mm;width:21mm;height:17.6mm;transform:translateX(-50%)">
    <img class="halo" src="${f('public/brand/happotech-mark.png')}" alt="">
    <img src="${f('public/brand/happotech-mark.png')}" alt="HAPPOTECH">
  </div>
  <p class="lettrage" style="position:absolute;left:0;right:0;top:36mm;text-align:center;font-size:5.4mm;letter-spacing:0.05em;line-height:1">HAPPO<span class="azur">TECH</span></p>
  <p style="position:absolute;left:0;right:0;top:43.2mm;text-align:center;font-size:2.15mm;color:var(--brume);letter-spacing:0.02em">Vos idées, nos solutions digitales</p>
  <div class="filet" style="position:absolute;left:30mm;right:30mm;bottom:8.5mm"></div>
</section>`;

const carteVerso = /* html */ `
<section class="page carte" style="width:${CARTE.l}mm;height:${CARTE.h}mm">
  <div style="position:absolute;inset:0;background:radial-gradient(34mm 26mm at 100% 100%, rgb(21 96 240 / 0.35), transparent 75%)"></div>
  <div style="position:absolute;left:8mm;top:8.6mm;font-size:2.7mm" class="marque"><img src="${f('public/brand/happotech-mark.png')}" alt=""><span>HAPPO<span class="azur">TECH</span></span></div>

  <div style="position:absolute;left:8mm;top:17mm;width:51mm;display:grid;gap:3.2mm">
    ${associes
      .map(
        (a) => `<div>
      <p class="titre" style="font-size:2.6mm;letter-spacing:-0.02em;line-height:1.15;white-space:nowrap">${a.nom}</p>
      <p style="font-size:1.95mm;color:var(--cendre);margin-top:0.5mm">${a.role}</p>
      <p class="mono" style="font-size:2.2mm;margin-top:0.9mm"><span class="icone">${icone(WhatsappLogo)}</span>&nbsp;${a.telephone}</p>
    </div>`,
      )
      .join('')}
  </div>

  <div style="position:absolute;left:8mm;bottom:7.6mm;display:grid;gap:1.1mm;font-size:2.15mm">
    <p><span class="icone">${icone(EnvelopeSimple)}</span>&nbsp;${email}</p>
    <p><span class="icone">${icone(GithubLogo)}</span>&nbsp;${github}</p>
  </div>

  <div style="position:absolute;right:8mm;top:50%;transform:translateY(-44%);width:22mm;text-align:center">
    <div class="qr">${qr}</div>
    <p style="font-size:1.95mm;color:var(--brume);margin-top:1.6mm;line-height:1.25">Nos réalisations</p>
  </div>
</section>`;

/* ---------- Flyer A5 : 148 × 210 mm + 3 mm de fond perdu ---------- */

const A5 = { l: 154, h: 216 };
const telephones = [
  { src: 'public/projets/amsa-mobile.webp', nom: 'Amsa Shop', rot: -8, x: -35, y: 5 },
  { src: 'public/projets/ngouda-mobile.webp', nom: 'N’Gouda Traiteur', rot: 8, x: 35, y: 5 },
  { src: 'public/projets/mamefary-mobile.webp', nom: 'Cabinet dentaire Mame Fary', rot: 0, x: 0, y: 0 },
];

const flyerRecto = /* html */ `
<section class="page" style="width:${A5.l}mm;height:${A5.h}mm">
  <div style="position:absolute;inset:0;background:radial-gradient(120mm 95mm at 50% 14%, rgb(21 96 240 / 0.5), rgb(25 211 255 / 0.07) 55%, transparent 78%)"></div>
  <div style="position:absolute;inset:auto 0 0 0;height:90mm;background:radial-gradient(110mm 60mm at 50% 100%, rgb(21 96 240 / 0.28), transparent 75%)"></div>

  <div class="marque" style="position:absolute;left:13mm;top:13mm;font-size:3.6mm"><img src="${f('public/brand/happotech-mark.png')}" alt=""><span>HAPPO<span class="azur">TECH</span></span></div>
  <p class="mono" style="position:absolute;right:13mm;top:14mm;font-size:2.5mm;color:var(--brume)">Studio digital</p>

  <div class="source" style="--flou:8mm;left:50%;top:25mm;width:27mm;height:22.7mm;transform:translateX(-50%)">
    <img class="halo" src="${f('public/brand/happotech-mark.png')}" alt="">
    <img src="${f('public/brand/happotech-mark.png')}" alt="HAPPOTECH">
  </div>

  <h1 class="titre" style="position:absolute;left:10mm;right:10mm;top:54mm;text-align:center;font-size:11.4mm">
    Vos idées,<br>nos <span class="azur">solutions<br>digitales.</span>
  </h1>
  <p style="position:absolute;left:22mm;right:22mm;top:93.5mm;text-align:center;font-size:3.6mm;line-height:1.5;color:var(--brume)">
    Vous nous confiez un problème, nous livrons la solution&nbsp;: site, boutique en ligne ou outil sur mesure.
  </p>

  <!-- Preuves : trois sites livrés, en vraies captures. -->
  <div style="position:absolute;left:50%;top:108mm;width:0;height:0">
    ${telephones
      .map(
        (t) => `<figure style="position:absolute;left:${t.x - 14}mm;top:${t.y}mm;width:28mm;transform:rotate(${t.rot}deg);transform-origin:50% 100%">
      <div style="border-radius:3.8mm;border:1mm solid #0b0f18;outline:0.2mm solid rgb(255 255 255 / 0.14);overflow:hidden;background:var(--encre);box-shadow:0 5mm 12mm -3mm rgb(0 0 0 / 0.9)">
        <img src="${f(t.src)}" alt="${t.nom}" style="display:block;width:100%;aspect-ratio:390/760;object-fit:cover;object-position:top">
      </div>
    </figure>`,
      )
      .join('')}
  </div>

  <div style="position:absolute;left:13mm;right:13mm;bottom:13mm;display:flex;align-items:flex-end;justify-content:space-between;gap:8mm">
    <div>
      <p class="titre" style="font-size:6.4mm">Parlons de votre idée.</p>
      <div style="margin-top:3mm;display:grid;gap:1.3mm;font-size:3mm">
        ${associes.map((a) => `<p><span class="icone">${icone(WhatsappLogo)}</span>&nbsp;<span class="mono">${a.telephone}</span>&nbsp;&nbsp;<span style="color:var(--cendre)">${a.prenom}</span></p>`).join('')}
        <p><span class="icone">${icone(EnvelopeSimple)}</span>&nbsp;${email}</p>
      </div>
    </div>
    <div style="width:25mm;text-align:center;flex-shrink:0">
      <div class="qr">${qr}</div>
      <p style="font-size:2.3mm;color:var(--brume);margin-top:1.8mm;line-height:1.3">Scannez pour voir<br>nos réalisations</p>
    </div>
  </div>
</section>`;

const flyerVerso = /* html */ `
<section class="page" style="width:${A5.l}mm;height:${A5.h}mm">
  <div style="position:absolute;inset:auto 0 0 0;height:80mm;background:radial-gradient(120mm 55mm at 50% 100%, rgb(21 96 240 / 0.42), transparent 75%)"></div>

  <div style="position:absolute;left:13mm;right:13mm;top:14mm">
    <h2 class="titre" style="font-size:8.2mm">Ce que nous construisons</h2>
    <p style="margin-top:2.4mm;font-size:3.2mm;color:var(--brume);max-width:110mm;line-height:1.5">Chaque projet part de votre problème, jamais d’un modèle tout fait.</p>

    <div style="margin-top:6mm;display:grid;grid-template-columns:1fr 1fr;gap:4mm 6mm">
      ${services
        .map(
          ([t, d]) => `<div style="padding-top:3mm;border-top:0.25mm solid var(--ligne)">
        <p class="titre" style="font-size:4.1mm;letter-spacing:-0.025em">${t}</p>
        <p style="margin-top:1.4mm;font-size:2.75mm;line-height:1.45;color:var(--brume)">${d}</p>
      </div>`,
        )
        .join('')}
    </div>

    <div style="margin-top:4.5mm;padding:4mm 5mm;border:0.25mm solid var(--ligne);border-radius:3.4mm;background:linear-gradient(180deg, rgb(255 255 255 / 0.06), rgb(255 255 255 / 0.02));display:flex;align-items:center;justify-content:space-between;gap:4mm">
      <div>
        <p class="titre" style="font-size:4.1mm;letter-spacing:-0.025em">Design graphique</p>
        <p style="margin-top:1.2mm;font-size:2.75mm;color:var(--brume);line-height:1.45">Pour que votre marque se reconnaisse partout.</p>
      </div>
      <p class="lettrage" style="font-size:5.2mm;line-height:0.95;text-align:right">Logos<br><span class="azur">Flyers</span><br>Identité</p>
    </div>

    <h2 class="titre" style="margin-top:9mm;font-size:5.6mm">De votre problème à votre solution</h2>
    <div style="position:relative;margin-top:5mm;display:grid;grid-template-columns:repeat(3,1fr);gap:4mm">
      <div style="position:absolute;left:1.7mm;right:38.3mm;top:1.55mm;height:0.3mm;background:linear-gradient(90deg,var(--bleu),var(--azur),var(--cyan));box-shadow:0 0 2mm rgb(42 157 255 / 0.8)"></div>
      ${etapes
        .map(
          (e) => `<div>
        <span style="position:relative;display:block;width:3.4mm;height:3.4mm;border-radius:50%;border:0.3mm solid var(--cyan);background:var(--encre);box-shadow:0 0 2.4mm rgb(25 211 255 / 0.7)"><span style="position:absolute;inset:0.8mm;border-radius:50%;background:var(--cyan)"></span></span>
        <p class="titre" style="margin-top:2.6mm;font-size:3.3mm;letter-spacing:-0.02em;line-height:1.2">${e}</p>
      </div>`,
        )
        .join('')}
    </div>

    <p style="margin-top:9mm;font-size:2.7mm;color:var(--cendre)">Ils nous ont confié leur projet</p>
    <div style="margin-top:3mm;display:flex;align-items:center;gap:11mm">
      <img src="${f('public/clients/amsa-shop.png')}" alt="Amsa Shop" style="height:7mm;filter:brightness(0) invert(1);opacity:0.75">
      <img src="${f('public/clients/cabinet-mame-fary.png')}" alt="Cabinet dentaire Mame Fary" style="height:11mm;filter:brightness(0) invert(1);opacity:0.75">
      <img src="${f('public/clients/ngouda-traiteur.png')}" alt="N'Gouda Traiteur" style="height:9mm;filter:brightness(0) invert(1);opacity:0.75">
    </div>
  </div>

  <div style="position:absolute;left:13mm;right:13mm;bottom:35mm;display:flex;align-items:flex-end;justify-content:space-between;gap:6mm;font-size:2.8mm">
    <div style="display:grid;gap:1.3mm">
      ${associes.map((a) => `<p><span class="icone">${icone(WhatsappLogo)}</span>&nbsp;<span class="mono">${a.telephone}</span>&nbsp;&nbsp;<span style="color:var(--cendre)">${a.nom}</span></p>`).join('')}
      <p><span class="icone">${icone(EnvelopeSimple)}</span>&nbsp;${email}&nbsp;&nbsp;&nbsp;<span class="icone">${icone(GithubLogo)}</span>&nbsp;${github}</p>
    </div>
    <div class="qr" style="width:19mm;flex-shrink:0">${qr}</div>
  </div>

  <!-- HAPPOTECH sur toute la mesure, comme la bande qui ferme le site. -->
  <p class="lettrage" style="position:absolute;left:13mm;right:13mm;bottom:13mm;display:flex;justify-content:space-between;font-size:14.6mm;line-height:0.8">
    ${Array.from('HAPPOTECH').map((l, i) => `<span${i >= 5 ? ' class="azur"' : ''}>${l}</span>`).join('')}
  </p>
</section>`;

/* ---------- Rendu ---------- */

const document = (titre, taille, pages) => `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><title>${titre}</title>
<style>${css} @page { size: ${taille.l}mm ${taille.h}mm; margin: 0; }</style></head>
<body>${pages.join('\n')}</body></html>`;

mkdirSync(EXPORT, { recursive: true });
const supports = [
  { nom: 'carte-de-visite', taille: CARTE, pages: [carteRecto, carteVerso], faces: ['recto', 'verso'] },
  { nom: 'flyer-a5', taille: A5, pages: [flyerRecto, flyerVerso], faces: ['recto', 'verso'] },
];
for (const s of supports) writeFileSync(join(ICI, `${s.nom}.html`), document(s.nom, s.taille, s.pages));

// Edge sans interface, piloté par le protocole DevTools : PDF vectoriel + aperçus PNG.
const port = 9400 + Math.floor(Math.random() * 400);
const profil = mkdtempSync(join(tmpdir(), 'happotech-print-'));
const edge = spawn(EDGE, ['--headless=new', '--disable-gpu', '--no-first-run', '--allow-file-access-from-files',
  `--remote-debugging-port=${port}`, `--user-data-dir=${profil}`, 'about:blank'], { stdio: 'ignore' });
const attendre = (ms) => new Promise((r) => setTimeout(r, ms));
let cible;
for (let i = 0; i < 60 && !cible; i++) {
  await attendre(200);
  try { cible = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page'); } catch {}
}
if (!cible) throw new Error('Edge ne répond pas');
const ws = new WebSocket(cible.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let n = 0; const attente = new Map();
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && attente.has(m.id)) { attente.get(m.id)(m.result); attente.delete(m.id); } });
const cdp = (method, params = {}) => new Promise((r) => { const id = ++n; attente.set(id, r); ws.send(JSON.stringify({ id, method, params })); });

const MM = 96 / 25.4; // px CSS par millimètre
for (const s of supports) {
  await cdp('Page.navigate', { url: pathToFileURL(join(ICI, `${s.nom}.html`)).href });
  await attendre(1500);
  await cdp('Runtime.evaluate', { expression: 'document.fonts.ready.then(() => true)', awaitPromise: true });
  const pdf = await cdp('Page.printToPDF', { printBackground: true, preferCSSPageSize: true, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 });
  writeFileSync(join(EXPORT, `${s.nom}.pdf`), Buffer.from(pdf.data, 'base64'));

  // Aperçus : environ 300 dpi, rognés au format fini (sans le fond perdu).
  const l = s.taille.l * MM, h = s.taille.h * MM;
  await cdp('Emulation.setDeviceMetricsOverride', { width: Math.ceil(l), height: Math.ceil(h * s.pages.length), deviceScaleFactor: 3.1, mobile: false });
  await attendre(600);
  for (let i = 0; i < s.pages.length; i++) {
    const png = await cdp('Page.captureScreenshot', { format: 'png', clip: { x: 3 * MM, y: i * h + 3 * MM, width: l - 6 * MM, height: h - 6 * MM, scale: 1 }, captureBeyondViewport: true });
    writeFileSync(join(EXPORT, `${s.nom}-${s.faces[i]}.png`), Buffer.from(png.data, 'base64'));
  }
  await cdp('Emulation.clearDeviceMetricsOverride');
  console.log(`${s.nom} : PDF + ${s.pages.length} aperçus`);
}
ws.close(); edge.kill();
await attendre(500);
try { rmSync(profil, { recursive: true, force: true }); } catch {}
console.log(qrProvisoire ? 'QR provisoire : renseigner URL_PORTFOLIO puis relancer.' : `QR : ${URL_PORTFOLIO}`);
