# Brookside Motel — Website

Production-level Next.js rebuild of the Brookside Motel marketing site (Rolleston, NZ). 8 static pages + 6 room detail pages + in-site booking flow, component-per-section architecture, zero build errors.

- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript 5 · SCSS (CSS Modules-free, single `globals.scss`)
- **Fonts:** Poppins only
- **Bookings:** every booking CTA redirects to the STAAH SwiftBook engine via `bookingEngineUrl()` in `src/lib/site.ts`. Room-specific CTAs deep-link with the room's `RoomID`, e.g.
  `https://www.swiftbook.io/inst/#home?propertyId=223NTUD2eB2ox9GXf4NTU=&RoomID=225758&JDRN=Y`
  CTAs without a mapped room open the full availability list.

## Commands

```bash
npm install       # install dependencies
npm run dev       # dev server on http://localhost:3000
npm run build     # production build -> static export in ./out (includes type check)
npm run typecheck # standalone TypeScript check (tsc --noEmit)
```

The site is configured with `output: "export"` in `next.config.ts`, so `next build` emits a fully static, self-contained `out/` folder — page HTML plus `404.html`, `robots.txt`, `sitemap.xml`, and all images/fonts. Deploy it by uploading `out/` to any static host (or preview locally with `npx serve out`). Because it is a static export, `next start` is not used; `next dev` still works for development.

> If `next build` fails with a `validator.ts` "constraint 'never'" error, it is caused by stale dev-generated types — delete the `.next` folder and rebuild (`Remove-Item -Recurse .next; npm run build`).

There is no lint script. The import alias `@/*` maps to `src/`.

## Structure

```
src/
├── app/                          # thin orchestrators + layout.tsx
│   ├── page.tsx                  /               home
│   ├── motel-rooms/page.tsx      /motel-rooms    room list
│   ├── motel-rooms/[id]/page.tsx /motel-rooms/<room-id>   room detail (SSG via generateStaticParams)
│   ├── book/page.tsx             /book           in-site booking flow (SwiftBook embed)
│   ├── amenities/page.tsx        /amenities
│   ├── brookside-residence/page.tsx
│   ├── faq/page.tsx
│   ├── local-guide/page.tsx
│   ├── about-us/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── layout/             # UtilityBar, SiteHeader, SiteFooter
│   ├── ui/                 # BookingButton, ContourArt, ArrowIcon, AccentBand, Ico,
│   │                       #   PageHero, SlotImage, Placeholder, HeroMedia, RevealObserver
│   ├── home/ rooms/ residence/ guide/ amenities/ faq/ about/ contact/ booking/
│   └── ...
├── content/
│   ├── rooms.tsx           # 6 motel room records (RoomData) incl. per-room amenities + getRoom()
│   └── faqs.tsx            # FAQ categories/items (JSX answers)
├── lib/
│   ├── site.ts             # constants: BOOKING_URL / BOOK_PAGE / SWIFTBOOK_ROOM_IDS, phone/email/address,
│   │                       #   bookingEngineUrl(extraParams)
│   ├── img.ts              # server-side image-existence detection + listRoomGallery(roomId)
│   ├── types.ts            # shared types (RoomData, GalleryImage, FaqCategory…)
│   └── index.ts            # barrel re-export
└── app/globals.scss        # all styles (brand palette preserved)
```

## Room detail pages & gallery images

Every room record in `src/content/rooms.tsx` automatically gets a detail page at `/motel-rooms/<id>` (hero, overview + booking card, gallery, room amenities, standard amenities, other rooms, booking band).

**To add gallery photos for a room**, drop them into:

```
public/images/rooms/<room-id>/          e.g. public/images/rooms/superior-outdoor/
```

Any `*.jpg / *.jpeg / *.png / *.webp / *.avif` files are picked up at build time (sorted by filename — name them `01.jpg`, `02.jpg`, … for ordering). Until a folder has images, the gallery falls back to the room's main image. Room ids: `superior-outdoor`, `superior-interconnected`, `deluxe-two-doubles`, `deluxe-top-floor`, `accessible-superking`, `deluxe-one-double`. Remember to rebuild after adding files (the image scan runs at build time).

## Booking flow

All Book buttons are plain anchors to the SwiftBook engine built by `bookingEngineUrl(roomId?, stay?)`:

- Base URL: `https://www.swiftbook.io/inst/#home?propertyId=223NTUD2eB2ox9GXf4NTU=&JDRN=Y`
- With room: appends `&RoomID=<swiftbook-id>` before `JDRN=Y`
- With stay: appends `&checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD` (lowercase names, matching the engine's own deep-link builder). Occupancy is not passable via URL — the engine opens at its default and the guest adjusts it there.

The home search bar redirects same-tab into the engine with the chosen dates prefilled (verified against the live engine: its availability call receives exactly those dates). Invalid/past dates fall back to defaults (+7/+9 days) so the redirect never dead-ends.

**Room → RoomID mapping** lives in `SWIFTBOOK_ROOM_IDS` (`src/lib/site.ts`). To deep-link more rooms, get each room type's `RoomID` from the STAAH/SwiftBook dashboard and add a line:

```ts
export const SWIFTBOOK_ROOM_IDS: Record<string, string> = {
  "superior-outdoor": "225755",
  "superior-interconnected": "225756",
  "deluxe-two-doubles": "225757",
  "deluxe-top-floor": "225758",
  "accessible-superking": "225759",
  "deluxe-one-double": "232836",
};
```

Unmapped rooms automatically fall back to the full availability list — nothing breaks while IDs are missing.

## Asset status

23 JPGs in `public/images/` and 3 PNGs in `public/logos/` are present. The following are **referenced by the site but NOT yet supplied** — drop them into `public/images/` with the exact names (the code auto-detects and shows branded placeholders until then):

| File | Used by |
| --- | --- |
| `Brookside-Motel-FINAL.mp4` | Home hero background video (`HeroMedia` — currently streams from `bookonelocal.in` CDN with poster fallback) |

The `Brookside-Motel-FINAL.mp4` hero video has no local copy — `HeroMedia` shows `hero-poster.jpg` until the video is supplied.

## Deploy

`next build` produces a fully static export in `out/` (`output: "export"` in `next.config.ts`). Upload the contents of `out/` to any static web host — the pages are plain `*.html` files with a `_next/` asset folder, so shared hosting, Netlify, GitHub Pages, Vercel, or S3/CloudFront all work without a Node server. Preview locally with `npx serve out`.
