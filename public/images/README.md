# School images

Drop the school's real image files into this folder (`public/images/`).
Anything here is copied to the site as-is and can be referenced from code as
`asset('images/<filename>')` (see `src/data/constants.js`).

Vite serves this folder at the site root, so `public/images/logo.png` is
available in the built site and the components below pick it up automatically.

## Required now

| File | Used by | Notes |
| ---- | ------- | ----- |
| `logo.png` | Navbar + Footer logo (`src/components/Logo.jsx`) | The horizontal **Apple Valley Creative School** logo. Transparent PNG works best. Until this file exists, the site shows a text logo instead. |

## Recommended (optional) — real campus photos

Add real photos to make the site fully yours. Suggested names:

```
images/
  logo.png                 <- main logo (required)
  favicon.png              <- optional browser-tab icon
  campus/
    hero.jpg               <- big homepage background (wide, ~1600x1000)
    building-front.jpg     <- school entrance
    classroom-1.jpg
    students-group.jpg
  gallery/
    01.jpg 02.jpg 03.jpg ...  <- gallery photos
  faculty/
    teacher-1.jpg ...      <- staff photos (optional)
```

### How to switch a photo from the stock placeholder to a real one

The site currently uses tasteful stock placeholders (via `photo(...)`). To use
a real file instead, change the `src` in the relevant data file / component to
use `asset(...)`. Example:

```js
// before (stock placeholder)
src: photo('classroom', 900, 640)

// after (your real file at public/images/gallery/01.jpg)
src: asset('images/gallery/01.jpg')
```

Both `photo` and `asset` are exported from `src/data/constants.js`.

> Tip: keep photos under ~300 KB each (resize/compress) so the site stays fast.
> Send me the files (or commit them here) and I can wire them into the gallery,
> homepage and facilities pages for you.
