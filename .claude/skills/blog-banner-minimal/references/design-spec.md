# Design spec: minimal black/red/white blog banner

Canvas 1920 x 1080 (16:9), exported as PNG, typically 180 to 260 KB.

## Background

Three layers, listed top to bottom as CSS paints them:

1. Red glow: `radial-gradient(ellipse 1100px 760px at 78% 112%, rgba(238,7,18,.22) 0%, rgba(238,7,18,0) 65%)`.
   Centred below the bottom edge on the right so only the upper half of the
   ellipse is visible. It should read as a faint warmth, never as a red shape.
2. Top lift: `radial-gradient(ellipse 1400px 900px at 50% -20%, #1a1a1a 0%, rgba(26,26,26,0) 70%)`.
   Keeps the top of the frame from being pure black so the logo has depth.
3. Base: `linear-gradient(180deg, #0a0a0a 0%, #000 100%)`.

No grid, no noise, no borders, no illustration. If the design feels empty,
that is correct.

## Grid and spacing

- Left margin 120px for every element.
- Brand lockup (logo 54px + "Swarms" at 30px/600) at top 84px.
- Copy block vertically centred (`top:50%; transform:translateY(-50%)`), width 1500px.
- Footer at bottom 84px.
- Eyebrow to title: 34px. Title to subtitle: 40px.

## Type

Font stack: `-apple-system, "SF Pro Display", Inter, system-ui, sans-serif`.
On macOS this renders in SF Pro, which gives the Apple feel; Inter is the
cross-platform fallback and is loaded from Google Fonts.

| Element | Size | Weight | Colour | Tracking | Leading |
|---|---|---|---|---|---|
| Brand | 30px | 600 | #ffffff | -0.01em | |
| Eyebrow | 26px | 500 | #ee0712 | +0.01em | |
| Title | 104px (92 for long titles) | 600 | #ffffff | -0.045em | 1.04 |
| Title muted tail | inherits | 600 | #6e6e73 | inherits | |
| Subtitle | 32px | 400 | #a1a1a6 | -0.005em | 1.4, width 1340px |
| Footer | 22px | 500 | #d2d2d7 | -0.005em | |

The grays are Apple's system grays (#6e6e73 secondary label, #a1a1a6
tertiary, #d2d2d7 separator) so the palette reads as one family.

## Colour

Only four: black (background), white (headline), the brand red `#ee0712`
(eyebrow and glow) and the gray family above. Red appears exactly twice, as
a small label and a faint glow. Adding a third red element breaks the
restraint that defines the series.

## Composition rules

- Headline on two lines, left aligned, sentence case, ending in a period.
- The gray tail is part of the headline sentence, on the second line.
- One sentence of subtitle; no second paragraph, no bullets.
- The right 40% of the frame stays empty apart from the glow. This is also
  what makes the 4:5 mobile card crop safe.

## Variations that stay on-brand

- Square or 4:5 social crop: keep the left margin at 120px, move the copy
  block to `width: 840px`, drop the title to 84px and re-break into three
  lines. Keep the glow bottom right.
- Series without a command: omit `--footer`; do not replace it with a URL
  in prose.
- Announcement with a date: put the date in the eyebrow ("November 2026"),
  never in the title.
