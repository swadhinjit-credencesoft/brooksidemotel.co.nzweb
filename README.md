# Brookside Motel — Website

Production-level Next.js rebuild of the Brookside Motel marketing site (Rolleston, NZ). 8 static pages, component-per-section architecture, zero build errors.

- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript 5 · SCSS (CSS Modules-free, single `globals.scss`)
- **Fonts:** Poppins only
- **Bookings:** all direct-booking CTAs centralised through `src/lib/site.ts` (`BOOKING_URL`) and rendered via `src/components/ui/BookingButton.tsx`

## Commands

```bash
npm install       # install dependencies
npm run dev       # dev server on http://localhost:3000
npm run build     # production build -> static export in ./out (includes type check)
npm run typecheck # standalone TypeScript check (tsc --noEmit)
```

The site is configured with `output: "export"` in `next.config.ts`, so `next build` emits a fully static, self-contained `out/` folder — 8 HTML pages plus `404.html`, `robots.txt`, `sitemap.xml`, and all images/fonts. Deploy it by uploading `out/` to any static host (or preview locally with `npx serve out`). Because it is a static export, `next start` is not used; `next dev` still works for development.

> If `next build` fails with a `validator.ts` "constraint 'never'" error, it is caused by stale dev-generated types — delete the `.next` folder and rebuild (`Remove-Item -Recurse .next; npm run build`).

There is no lint script. The import alias `@/*` maps to `src/`.

## Structure

```
src/
├── app/                  # 8 page routes (thin orchestrators) + layout.tsx
│   ├── page.tsx                  /               home
│   ├── motel-rooms/page.tsx      /motel-rooms
│   ├── amenities/page.tsx        /amenities
│   ├── brookside-residence/page.tsx
│   ├── faq/page.tsx
│   ├── local-guide/page.tsx
│   ├── about-us/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── layout/           # UtilityBar, SiteHeader, SiteFooter
│   ├── ui/               # BookingButton, ContourArt, ArrowIcon, AccentBand, Ico,
│   │                     #   PageHero, SlotImage, Placeholder, HeroMedia, RevealObserver
│   ├── home/ rooms/ residence/ guide/ amenities/ faq/ about/ contact/
│   └── ...
├── content/              # data-driven content
│   ├── rooms.tsx         # 5 motel room records (RoomData)
│   └── faqs.tsx          # FAQ categories/items (JSX answers)
├── lib/
│   ├── site.ts           # constants: BOOKING_URL, PHONE_*, EMAIL_STAY, address
│   ├── img.ts            # server-side image-existence detection
│   ├── types.ts          # shared types (IconName, RoomData, FaqCategory, ContourVariant…)
│   └── index.ts          # barrel re-export
└── app/globals.scss      # all styles (brand palette preserved)
```

## Asset status

23 JPGs in `public/images/` and 3 PNGs in `public/logos/` are present. The following are **referenced by the site but NOT yet supplied** — drop them into `public/images/` with the exact names (the code auto-detects and shows branded placeholders until then):

| File | Used by |
| --- | --- |
| `residence-hero.jpg` | /brookside-residence hero |
| `residence-bedroom.jpg` | Residence bedroom gallery |
| `residence-outdoor.jpg` | Residence outdoor spa/BBQ |
| `residence-spa.jpg` | Cross-sell (motel-rooms) |
| `residence-exterior.jpg` | Home journey section |
| `room-residence.jpg` | Home featured rooms |
| `post-dining.jpg` | Local guide — Dining post |
| `post-airport.jpg` | Local guide — Airport post |
| `Brookside-Motel-FINAL.mp4` | Home hero background video (`HeroMedia`) |

### Temporary fallbacks (currently in place)

Until the real photos arrive, the 8 image slots above are filled with copies of existing photos so the site previews with real imagery. Replace them by overwriting the same filenames (then rebuild — the image check runs at build time):

| Slot | Current fallback source |
| --- | --- |
| `residence-hero.jpg` | `hero-superior-room.jpg` |
| `residence-bedroom.jpg` | `room-super-king.jpg` |
| `residence-outdoor.jpg` | `superior-outdoor-area.jpg` |
| `residence-spa.jpg` | `welcome-detail.jpg` |
| `residence-exterior.jpg` | `about-exterior.jpg` |
| `room-residence.jpg` | `deluxe-top-floor.jpg` |
| `post-dining.jpg` | `welcome-detail.jpg` |
| `post-airport.jpg` | `rolleston-community.jpg` |

The `Brookside-Motel-FINAL.mp4` hero video has no fallback copy — `HeroMedia` already shows `hero-poster.jpg` until the video is supplied.

## Deploy

`next build` produces a fully static export in `out/` (`output: "export"` in `next.config.ts`). Upload the contents of `out/` to any static web host — the pages are plain `*.html` files with a `_next/` asset folder, so shared hosting, Netlify, GitHub Pages, Vercel, or S3/CloudFront all work without a Node server. Preview locally with `npx serve out`.
