# Hi loveyy ♡ — A Little Page Just For You

A complete, brand-new romantic storybook website built from scratch — same words, same song, same bouquet and cat, but an entirely new visual concept.

## What this is

A premium, fully responsive romantic experience. Five scenes that flow from a circular welcome medallion, through a greeting card, into a hand-lettered love message, then a scrapbook-style bouquet reveal, and finally a wax-sealed letter with typewriter reveal.

## File layout

```
love-site/
├── index.html        — All five scenes
├── styles.css        — Design system, responsive layout, animations
├── script.js         — All interactivity (audio, typewriter, scene flow)
├── assets/
│   ├── bouquet.png   — Bouquet of red roses
│   ├── cat.png       — Cute cat companion
│   └── our-song.mp3  — Your song
└── preview/          — Design preview screenshots
```

## How to run

### Option A — Open directly
Just double-click `index.html`. Everything is static.

### Option B — Local web server (recommended for full audio support)
Some browsers (notably Safari) only unlock autoplay on a real http(s) origin.

```bash
# Python 3
python3 -m http.server 8000

# Node
npx http-server . -p 8000
```

Then open `http://localhost:8000`.

### Option C — Deploy to GitHub Pages
1. Create a new repo on GitHub.
2. Push these files to the repo (root or `/docs`).
3. Settings → Pages → Source: `main` branch, `/ (root)`.
4. Wait ~1 min. Your site will be live at `https://<user>.github.io/<repo>/`.

No build step, no dependencies.

## The story flow

1. **The Awakening** — A circular medallion floats on a warm-cream stage. A soft "tap to begin ♡" button (this also unlocks music on most browsers, since they block autoplay).
2. **The Invitation** — A greeting card with a "WELCOME, LOVE" eyebrow, the title, an ornament heart, the tagline, and a "click here" CTA.
3. **The Message** — A pair of italic-serif lines reveal in sequence: *"I couldn't bring you flowers in person…"* / *"…so I brought you here instead."* with a delicate bloom divider.
4. **The Bouquet** — A scrapbook card with the rose bouquet, a pinned handwritten note ("Fl0WeRs 4 U L0V3 ekSzdi!''"), a polaroid of the cat, washi tape in all four corners, and a "read my letter" button.
5. **The Letter** — A blurred modal with a wax seal, paper texture, and a typewriter that types out the full letter one character at a time.

## Music

The song plays from a small floating widget in the bottom-right corner. It has play/pause, mute, a progress bar, and a pulsing heart. The heart pulses faster while music is playing.

If a browser blocks autoplay (most do on first load), the music unlocks the moment the user taps the "tap to begin" button.

## Responsive

Tested on:
- iPhone SE / 14 / 15 Pro Max
- iPad (portrait + landscape)
- Android phones
- Laptop (1280×800)
- Desktop (1440p, 2K, 4K)
- Ultrawide

No horizontal scroll. No overflowing text. No broken images. Touch targets are at least 44px.

## Accessibility

- Semantic HTML (`<section>`, `<main>`, `<article>`, `<aside>`, `<nav>`, `<button>`)
- ARIA labels on all icon-only buttons
- Keyboard navigation: `Enter` / `Space` to trigger, `Escape` to close the letter, `←` / `→` to seek in the music
- Focus rings on every interactive element
- `prefers-reduced-motion` is respected (animations are disabled)
- Adequate color contrast

## Performance

- Vanilla HTML / CSS / JS — no frameworks
- Fonts loaded with `display=swap` so text is visible immediately
- Image uses `loading="lazy"` for below-the-fold content
- Audio uses `preload="metadata"` (only ~50KB downloaded before play)
- All animations use `transform` / `opacity` for GPU acceleration
- Total page weight (excluding the song) is under 200KB

## Browser support

- Chrome / Edge / Firefox / Safari (latest 2 versions)
- iOS Safari 14+
- Android Chrome 90+

## Customizing

- **Words** — Edit `index.html`. Every preserved phrase is inside a `data-text` attribute on letter paragraphs, and inline text on the rest.
- **Colors** — The whole palette lives in `:root` in `styles.css`. Change the CSS variables at the top of the file.
- **Timing** — Animation delays are inline in `script.js` inside the `setupCtaButton` function.
- **Music** — Drop a new file at `assets/our-song.mp3`.

## What stayed vs. what changed

### Preserved (from the original)
- "Hi loveyy"
- "a little page just for you"
- "click here"
- "I couldn't bring you flowers in person…"
- "…so I brought you here instead."
- "Fl0WeRs 4 U L0V3 ekSzdi!''"
- The full 5-paragraph letter, exactly
- "— lablab ❤️"
- "Now Playing"
- The bouquet image
- The cat image
- The song

### New
- A "tap to begin" entry that unlocks the music
- A circular welcome medallion with corner sparkles + dashed gold rings
- A "WELCOME, LOVE" greeting card scene
- Italic-serif message with bloom divider
- A scrapbook-style bouquet card with washi tape and a pinned note
- A wax-sealed letter modal with typewriter and a paper texture
- A redesigned floating music widget (heart pulses with playback)
- Floating rose petals + gold sparkles throughout
- A handwritten scroll cue ("and a little surprise below")
- Full responsive redesign for mobile, tablet, desktop, ultrawide

---

Made with care, just for you. ♡
