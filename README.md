# STRYV365 Website

Static rebuild of stryv365.org. Plain HTML, CSS, and JavaScript, no
build step and no dependencies.

## Structure

```
stryv365-site/
├── index.html          home page
├── css/
│   └── style.css       all styles
├── js/
│   └── main.js         header shadow, banner, story carousel
├── images/             drop photos and logos here
└── README.md
```

## Running it

Open `index.html` in a browser, or in VS Code right-click the file and
choose "Open with Live Server" (extension: Live Server by Ritwick Dey).
Live Server reloads on save, which is worth the install.

## Fonts

Headings use Futura PT Bold, body copy uses Futura PT Condensed Medium.
Futura PT comes from Adobe Fonts, so it needs a web project:

1. fonts.adobe.com, search Futura PT
2. Add to Web Project, include Bold and Condensed Medium
3. Copy the `<link>` tag Adobe gives you
4. Paste it into the marked spot in the `<head>` of each page

Without it the page falls back to Century Gothic and Arial Narrow, which
is the approved no-install pairing. The webfont tier after that only
exists so the layout holds up on a machine with neither.

## Brand colors

Defined once at the top of `style.css` under `:root`. Change them there
and the whole site follows.

| Token | Hex | Use |
|---|---|---|
| `--red` | `#ED1C24` | primary |
| `--black` | `#231F20` | text, dark sections |
| `--light-gray` | `#F1F1F2` | section fills, image slots |
| `--warm-gray` | `#76706E` | secondary text only |
| `--white` | `#FFFFFF` | default background |

## Images

Every gray hatched box is a slot. The label inside is the filename it
expects. To fill one, replace the div with an img:

```html
<!-- before -->
<div class="ph"><span>banner-01.jpg &nbsp;·&nbsp; 2400&times;1080</span></div>

<!-- after -->
<img src="images/banner-01.jpg" alt="Students at a peak team session">
```

Sizes:

| Slot | Ratio | Minimum |
|---|---|---|
| Banner | 20:9 | 2400 × 1080 |
| Mission portrait | 4:5 | 1200 × 1500 |
| Program cards | 4:3 | 1200 × 900 |
| Story photos | 4:3 | 1200 × 900 |
| Photo feed | 4:3 | 900 × 675 |
| Partner logos | any | transparent PNG or SVG |

Alt text on every image. Screen readers need it and it helps search.

## Components

**Banner** holds five slides and rotates every six seconds. Arrows and
dots both work. Nothing is overlaid, so any photo can go in without
worrying about where the subject sits in the frame. To add a slide, copy
a `.slide` div and add one more dot button.

**Success stories** rotate every 7.5 seconds with arrows on either side.
Copy a `.story-slide` div to add one. No dots to keep in sync.

**Partner marquee** scrolls continuously and pauses on hover so the
logos stay clickable. The logo set is listed twice in the markup, which
is what makes the loop seamless. Keep both halves identical.

**Photo feed** in News & Events scrolls independently. Add as many
images as you want.

## Casing

Two program names do not follow normal title case:

- `peak team` is lowercase, deliberately
- `STRYVtime` capitalizes STRYV only

Both carry `class="exact"`, which blocks the uppercase transform applied
to headings site-wide. Do not remove it.

## Open items

- Real figures for the four stat bar numbers
- Real quotes and photos for success stories
- Confirm whether it is "Resilience in Sports" or "Resiliency in Sports"
  (both spellings appear in existing STRYV materials)
- Guidestar transparency seal embed in the footer
- Remaining pages: Who We Are, What We Do, Programs, News & Events,
  Resources
