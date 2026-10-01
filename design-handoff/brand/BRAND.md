# Tom Sweeney — brand kit (Logbook)

A field journal for a life spent building things.

## Logos
| File | Use |
|---|---|
| `svg/lockup.svg` | **Primary.** T·D·S signal flags + name + coordinates. Site header, email signature, title slides. |
| `svg/lockup-reverse.svg` | Same, for dark (Ink) backgrounds. |
| `svg/seal.svg` | **The mark: the Logbook Seal.** Favicon source, social avatars, footer stamp, ink stamps. |
| `svg/seal-reverse.svg` | The seal for dark (Ink) backgrounds. |
| `svg/seal-one-color.svg` | One color, for rubber stamps, embossing, engraving, book spines. |
| `svg/flags.svg` | The flags alone. |
| `svg/wordmark.svg` | Name alone, when the flags would crowd. |

All text in the SVGs is outlined, so they render the same everywhere without fonts installed.
PNG versions are in `png/` (`avatar-400.png` and `avatar-400-dark.png` are ready for LinkedIn, X and GitHub).

### The seal, decoded
A survey ring with one horizon line run straight through it. The orange square on the line is the S flag's centre square, used as a survey marker. One star above to steer by. T·D·S at the base, the same letters the flags spell.
Icons use a simplified cut (heavier strokes, no text); at 16px the star drops out too.

The flags read T, D, S in the International Code of Signals. If the coordinates change, ask for a re-export.

## Favicon
Copy everything in `favicon/` to the site root and paste `head-snippet.html` into `<head>`.

## Color
| Token | Hex | Use |
|---|---|---|
| Chart Ink | #14243A | Text, marks |
| Sailcloth | #F4F1EA | Page ground |
| Harbor Green | #2E5B4B | Secondary: italic emphasis, hover, the Life section |
| Signal | #C8461B | Rare accent: index numbers |
| Flag Gold | #E0A93B | **Inside the flags only.** Never UI or text |
| Slate | #5A6270 | Secondary text, mono labels |
| Rule | #D9D3C5 | Hairlines |

Rough balance: 80% sailcloth + ink, 15% harbor green, 5% signal.

## Type
- **Newsreader** (500, plus italic): wordmark, headlines, pull quotes. Italic in Harbor Green is the emphasis voice.
- **Instrument Sans** (400–600): body, navigation, UI.
- **IBM Plex Mono** (400): index numbers (`01 — CURRENTLY`), dates (`LOG 26.09`), coordinates. Uppercase, +0.12em tracking.

All three are free on Google Fonts. `tokens/tokens.css` loads them and sets the variables; `tokens/tokens.json` holds the same values for code or design tools.

## Layout language
Thin 1px rules instead of cards. A numbered index (01 Currently, 02 Writing, 03 Life). Coordinates and log dates as quiet metadata. Real photography over illustration.
