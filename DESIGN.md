---
name: HAPPOTECH
description: Vos idées, nos solutions digitales. A dark one-page studio portfolio lit by a single blue-to-cyan light.
colors:
  bleu-roi: "#1560f0"
  azur: "#2a9dff"
  cyan-signal: "#19d3ff"
  encre: "#04060b"
  nuit: "#080b13"
  ardoise: "#0d121c"
  texte: "#eef2f8"
  brume: "#9aa4b6"
  cendre: "#7d879a"
typography:
  display:
    fontFamily: "'Archivo Variable', 'Geist Variable', system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 118"
  headline:
    fontFamily: "'Archivo Variable', 'Geist Variable', system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 118"
  title:
    fontFamily: "'Archivo Variable', 'Geist Variable', system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 118"
  lettering:
    fontFamily: "'Archivo Variable', 'Geist Variable', system-ui, sans-serif"
    fontWeight: 800
    lineHeight: 0.92
    fontVariation: "'wdth' 125"
  body:
    fontFamily: "'Geist Variable', system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body-sm:
    fontFamily: "'Geist Variable', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.43
  label:
    fontFamily: "'Geist Mono Variable', ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  tile: "12px"
  media: "16px"
  card: "24px"
  case: "28px"
  pill: "9999px"
spacing:
  gutter: "16px"
  gutter-sm: "24px"
  grid-gap: "16px"
  card-pad: "28px"
  card-pad-lg: "32px"
  section: "96px"
  section-sm: "128px"
  container: "1152px"
components:
  button-primary:
    backgroundColor: "{colors.texte}"
    textColor: "{colors.encre}"
    rounded: "{rounded.pill}"
    padding: "16px 28px"
    typography: "{typography.body-sm}"
  button-primary-hover:
    backgroundColor: "#ffffff"
    textColor: "{colors.encre}"
  button-glass:
    backgroundColor: "rgb(255 255 255 / 0.05)"
    textColor: "{colors.texte}"
    rounded: "{rounded.pill}"
    padding: "16px 28px"
  button-glass-hover:
    backgroundColor: "rgb(255 255 255 / 0.10)"
  button-quiet:
    backgroundColor: "rgb(255 255 255 / 0.06)"
    textColor: "{colors.texte}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  tag:
    backgroundColor: "rgb(255 255 255 / 0.04)"
    textColor: "{colors.brume}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
    typography: "{typography.label}"
  icon-tile:
    backgroundColor: "rgb(255 255 255 / 0.06)"
    textColor: "{colors.texte}"
    rounded: "{rounded.tile}"
    size: "44px"
  card-glass:
    backgroundColor: "rgb(255 255 255 / 0.05)"
    textColor: "{colors.texte}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  card-case:
    backgroundColor: "{colors.nuit}"
    textColor: "{colors.texte}"
    rounded: "{rounded.case}"
    padding: "48px"
  nav-bar:
    backgroundColor: "rgb(8 11 19 / 0.75)"
    textColor: "{colors.brume}"
    rounded: "{rounded.media}"
    height: "64px"
---

# Design System: HAPPOTECH

## Overview

**Creative North Star: "The Only Light in a Black Room"**

HAPPOTECH is a near-black room with one light source: the blue-to-cyan gradient of the H monogram. The light is born behind the mark in the hero, follows the visitor's pointer, is handed to the front project card as the cases stack, draws the method line as the page scrolls, and closes the page in the full-measure wordmark. Everything else (glass, text, captures) is seen by that light rather than coloured by it.

The system is dark only, calm and product-grade: generous section rhythm, centred or 7/5 split compositions inside one 1152px container, glass panels with a one-pixel white edge, pill-shaped controls, and real project captures as the only imagery. Motion is exponential-out and slow (0.8 to 1s entrances), always tied to a cause: the pointer, the scroll position, or the moment a step is reached. With reduced motion, every one of those effects collapses to its final state.

The system refuses the purple-blob AI portfolio: no second accent hue, no invented statistics, no decorative gradients as surfaces.

**Key Characteristics:**
- Near-black ink ground (encre) with two slightly raised night tones for cards and fallbacks.
- One accent family (royal blue, azure, cyan) used as light: halos, 1px rules, focus rings, key words, status dots.
- Archivo at expanded width (118% for headings, 125% for lettering) echoes the wordmark; Geist carries reading text; Geist Mono carries small labels.
- Glass panels (translucent white gradient, 1px white edge, inner top highlight, 18px backdrop blur).
- Pill controls, 24px cards, 16px media frames.
- Light that follows cause: pointer, scroll, reached state.

## Colors

One ink ground, a cool grey text ladder, and a single blue-to-cyan light family taken from the logo.

### Primary
- **Royal Blue** (bleu-roi): the start of the logo gradient and the deepest tone of the light. Used for the big blurred halos (hero source, front project card, footer), the blue tint laid over monochrome service captures (55% in `color` blend), the WhatsApp glyph on the primary CTA, and scrollbar thumb hover.
- **Azure** (azur): the working accent. Key words in headings ("solutions digitales.", "TECH" in the wordmark, the last four letters of the closing band, the middle word of the design lettering), sector lines on project cases, check icons, the 1px light rule on the top edge of each case, and the monogram ring of the founder cards.
- **Signal Cyan** (cyan-signal): the hottest point of the light. Focus outline, text caret, availability and live-status dots with their pulse, reached method nodes, the typing cursor, and function names in the code panel.

### Neutral
- **Ink** (encre): page ground, body background, fill behind media frames, text on light pills.
- **Night** (nuit): project case surfaces, the nav bar tint (75%), the inner well of the monogram ring.
- **Slate** (ardoise): opaque fallback for glass when the user asks for reduced transparency.
- **Paper White** (texte): headings and primary text; also the fill of primary pill buttons.
- **Mist** (brume): body copy, subtitles, tag text, inactive nav links.
- **Ash** (cendre): the quietest text; roles, captions, footer legal line, file names in window chrome.
- **Hairlines** are white at low alpha, never a named grey: 7% for section dividers and inner rules, 10% for card and media edges, 15% for quiet button edges.

### Named Rules
**The One Light Rule.** The blue-to-cyan family is the only hue in the interface. It appears as light (halo, 1px rule, glow, focus, key word, dot), never as a broad flat fill of a surface. Project captures and client logos are the only other colour on the page.

**The Handed Light Rule.** A light belongs to one object at a time. In the stacked project cases, the front card holds the halo at full strength and the cards behind drop to 15%; in the hero the halo fades with scroll. Do not light several siblings at once.

**The Monochrome Capture Rule.** On hover-capable devices, service captures are shown greyscale under a royal-blue colour wash and return to true colour on hover of their card. On touch devices they stay in true colour. Project case captures are always true colour.

## Typography

**Display Font:** Archivo Variable, width axis (with Geist, system-ui)
**Body Font:** Geist Variable (with system-ui)
**Label/Mono Font:** Geist Mono Variable (with ui-monospace)

**Character:** A wide, heavy grotesque cut at 118% width with tight tracking reads like the HAPPOTECH wordmark scaled up; Geist beside it is neutral and quiet so the headings carry the voice.

### Hierarchy
- **Display** (700, 2.5rem on phones, 3.75rem sm, 4.5rem lg; line-height 1.02; -0.035em; width 118%): the hero headline only, two lines, max 17ch, centred.
- **Headline** (700, 2.25rem to 3rem, up to 4.5rem for the contact close; same metrics): section titles in sentence case.
- **Title** (700, 1.5rem to 1.875rem; same metrics): service cards, method steps, project names (up to 2.25rem).
- **Lettering** (800, width 125%, uppercase or wordmark, line-height 0.8 to 0.92): lettering moments only: the nav wordmark (tracking 0.06em, 13 to 15px), the design-service word stack, and the closing HAPPOTECH band sized to fill the container measure.
- **Body** (400, 1.125rem, line-height 1.625): section intros and paragraphs in Mist, measured at 42 to 60ch. Card body steps down to 1rem; lists at 15px.
- **Small** (500, 0.875rem): nav links, button labels in the nav, captions.
- **Label** (Geist Mono, 11px): technology and service tags, window-chrome file names. Code in the method panel runs 12.5 to 13.5px, line-height 28px.

### Named Rules
**The Sentence-Case Heading Rule.** Headings are sentence case so long French titles stay legible on two lines and on phones. Expanded capitals are reserved for lettering moments (wordmark, design stack, closing band).

**The Wordmark Width Rule.** Archivo is never set at normal width. Headings use `.titre` (118%); lettering and monograms go to 125%; card sub-headings sit at 110 to 112%.

## Layout

A single centred container (max 1152px) with 16px side gutters on phones and 24px from 640px up. Sections breathe at 96px vertical padding, 128px from 640px. Section intros are max 672px wide, left-aligned except the hero and the projects intro, which are centred.

Compositions within the container:
- **Hero:** full dynamic viewport height, centred monogram (112px, 144px sm), headline, sub, two CTAs stacked full-width on phones and side by side from 640px.
- **Services:** a 6-column bento from 1024px (4+2 over a row-spanning 2, then 2+2, then a full-width design card) with 16px gaps; single column below.
- **Projects:** from 1024px, each case is sticky at `6.5rem + 18px × index`, viewport-tall (min 640px), and stacks over the previous one, which scales down by 4.5% per layer and dims under a 95% veil. Below 1024px, cases are a plain column with 32px gaps. Inside a case, a 0.78/1.22 text-to-media split.
- **About and Contact:** 12-column split, 7 for text and 5 for cards/panel, 40px gap at desktop, 56px when stacked.
- **Method:** a vertical timeline with a 1px rail at 15px (19px at desktop) from the left edge; each step is a 0.8/1.2 text-to-visual split with 80px (112px lg) between steps.

Floating elements: glass nav fixed 12 to 16px from the top, 64px tall; a back-to-top glass pill bottom-right; an availability pill bottom-left from 1280px, shown only while the hero is on screen. Anchor scroll offset is 6rem to clear the nav.

## Elevation & Depth

Depth is light and translucency, not shadow stacks. Surfaces are either glass (lit from within by a white gradient and an inner top highlight) or night-solid cases. Shadows are long, soft and black, used to separate a raised object from the ink rather than to lift it; coloured shadows are reserved for the light family.

### Shadow Vocabulary
- **Glass lift** (`box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.08), 0 24px 60px -24px rgb(0 0 0 / 0.7)`): every glass panel, built into the glass material.
- **Media drop** (`box-shadow: 0 30px 80px -30px rgb(0 0 0 / 0.9)`): desktop capture frames in project cases; the phone frame uses `0 24px 60px -12px rgb(0 0 0 / 0.85)`.
- **Stack edge** (`box-shadow: 0 -24px 80px -40px rgb(0 0 0 / 0.9)`): project cases, so the arriving card casts upward onto the one beneath.
- **Light glow** (`box-shadow: 0 0 14px rgb(42 157 255 / 0.8)` on the method rail, `0 0 0 5px rgb(25 211 255 / 0.12), 0 0 22px rgb(25 211 255 / 0.6)` on a reached node, `0 0 12px rgb(25 211 255 / 0.9)` on status dots): only on elements that are part of the light.

### Named Rules
**The Glass Edge Rule.** Glass is always the full material: translucent white gradient (7.5% to 2.5%), 1px white edge at 10%, inner top highlight, 18px blur with 140% saturation. Under reduced transparency it becomes opaque Slate with no blur. Never a bare blur without the edge.

**The Spotlight Border Rule.** Glass cards that the visitor can explore (service cards, founder cards) carry a pointer-following border light: a 1px cyan-to-blue radial ring and a faint 9% azure wash under the pointer, fading in over 0.4s on hover or focus-within.

## Shapes

Round and soft, with radius stepping down as elements get smaller or more contained: full pills for every control, tag and status element; 28px for the project case shells; 24px for glass cards and panels; 16px for media frames, the nav bar, the mobile menu and the monogram ring; 12px for square icon tiles and menu rows. Nested radii are reduced by the inset (a 16px ring holds a 15px well). The phone mockup is a 22px frame with a 5px dark bezel. Media inside cards is often clipped at the card edge so only its top corners show (16px top radius, no bottom border).

## Components

### Buttons
Soft, weighty pills that press in.
- **Shape:** full pill.
- **Primary:** Paper White fill, Ink text, medium weight, 16px by 28px (nav version 10px by 20px, 14px text). An arrow glyph sits after the label and nudges 2px in its direction on hover.
- **Hover / Focus / Active:** fill goes to pure white; the hero primary also carries an azure under-glow that strengthens on hover. Active scales to 98%. Focus is the global 2px cyan outline at 3px offset, rounded to a pill. Transitions 300ms on the exponential-out curve.
- **Glass:** the glass material as a pill with Paper White text; hover adds a 10% white fill. Used as the second CTA and for the floating pills.
- **Quiet:** 6% white fill, 15% white edge, 14px text (e.g. "Voir le site"); hover to 10% fill.
- **Split pill:** the e-mail action is a single pill split by a 1px divider into a label segment and a 56px copy segment; the copy check turns cyan on success.

### Chips
- **Style:** tags are pills with a 4% white fill, 10% white edge, Geist Mono 11px in Mist, 4px by 12px.
- **Status:** a cyan pill at 10% fill with cyan text and a pulsing cyan dot marks live state.

### Cards / Containers
- **Corner Style:** 24px for glass cards, 28px for project cases.
- **Background:** glass for services, founders, contact and method panels; Night solid for project cases.
- **Shadow Strategy:** see Glass lift and Stack edge.
- **Border:** 1px white at 10%; project cases add a 1px azure rule fading at both ends along their top edge.
- **Internal Padding:** 28px (32px from 640px) for glass cards; 24px, 40px, 48px across breakpoints for project cases.

### Navigation
- **Style:** a floating glass bar, Night at 75%, 16px radius, 64px tall, inset 12 to 16px from the viewport. Wordmark left, four links centred, primary pill right.
- **States:** links are 14px Mist pills; the active section gets a sliding 8% white pill with a 10% white ring, text to Paper White.
- **Mobile:** a 44px icon tile opens a glass sheet below the bar with 12px-radius rows and a full-width primary action.

### Media Frames
Real captures sit in 16px frames with a 10% white edge on an Ink fill. Desktop captures wear a 32px window chrome (three 10px dots at 15% white, a centred Geist Mono file name in Ash); the phone capture overlaps the lower right corner. Captures drift a few percent with scroll parallax.

### Pointer Light Hero (signature)
The monogram is lit from behind by its own blurred copy (breathing between 55% and 95%), a fixed royal-blue halo above, and a 640px radial light that follows the pointer on a spring (skipped for touch). The monogram tilts up to 14 degrees toward the pointer. The headline enters letter by letter (28ms stagger, rising 0.55em out of a 10px blur), with the key words in Azure. Everything fades and sinks as the hero scrolls away.

### Stacked Project Cases (signature)
Sticky cases stack in depth; each gets the royal-blue halo only while it is in front (see The Handed Light Rule).

### Method Timeline (signature)
A 1px rail in a white-8% track, overdrawn by a blue-azure-cyan gradient that scales with scroll progress on a spring. Nodes are 17px rings that switch from white-20% to cyan with a glow when reached, and each step's visual plays at that moment: a chat with gradient bubbles, a code panel that types itself with a cyan caret, a checklist that ticks line by line.

### Closing Wordmark Band (signature)
HAPPOTECH at 800 weight, 125% width, sized so the nine letters fill the container measure exactly, "TECH" in Azure, each letter rising in turn.

## Do's and Don'ts

### Do:
- **Do** keep every accent inside the blue-to-cyan family (bleu-roi, azur, cyan-signal) and use it as light: halo, 1px rule, focus, key word, dot.
- **Do** build raised surfaces from the full glass material or Night solid, with 1px white edges at 7 to 15% alpha.
- **Do** use pills for all controls and tags, 24px for cards, 16px for media.
- **Do** set headings in Archivo at 118% width, 700, -0.035em, sentence case; keep expanded capitals for lettering moments.
- **Do** use Geist Mono 11px only for small labels and technical tags.
- **Do** tie motion to a cause (pointer, scroll, reached state), ease with `cubic-bezier(0.16, 1, 0.3, 1)`, and resolve to the final state under reduced motion.
- **Do** show real project captures only, framed at 16px; monochrome-and-blue under the light on hover-capable devices for services, true colour on hover and on touch.

### Don't:
- **Don't** introduce a second accent hue (no purple, no warm accent) or use the gradient as a flat fill for a panel or section.
- **Don't** light several siblings at once; the light is handed from object to object.
- **Don't** use glass without its 1px edge and inner highlight, or keep blur when reduced transparency is requested.
- **Don't** set Archivo at normal width or set long headings in capitals.
- **Don't** add square-cornered controls or hard offset shadows; shadows are long, soft and black, or part of the light.
- **Don't** add a light theme; the ground is always Ink.
