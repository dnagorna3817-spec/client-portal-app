# AKC Client Portal Intro

A standalone, public presentation and onboarding site for AKC Client Portal. This is not the Client Portal, does not share its authentication or PWA configuration, and can be deployed independently.

## Routes

- `/` redirects to `/app`
- `/app` contains the four-section public landing page: Hero, About, Functions, and Download

## Local development

```bash
npm install
npm run dev
```

## Required public URLs

Copy `.env.example` to `.env.local` and configure:

- `NEXT_PUBLIC_APP_STORE_URL`
- `NEXT_PUBLIC_GOOGLE_PLAY_URL`
- `NEXT_PUBLIC_CLIENT_PORTAL_URL` (defaults to the existing `https://client-portal-akc.com` URL supplied in the brief)

Empty store URLs are intentionally rendered as unavailable rather than linked to invented destinations.

## Screenshots

See `public/screenshots/README.md`. The site uses real portal exports for the phone, laptop, and function-card visuals. The supplied full-page design reference is not bundled or rendered by the website.
