# VXA Agency Website

AI automation landing page for **vxa.agency** — built with Next.js 14, Tailwind CSS, and Claude API demos.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Add your keys to `.env.local`:

```
ANTHROPIC_API_KEY=your_key
MAKE_WEBHOOK_URL=your_webhook_url
```

4. Add your logo to `public/logo.png` (optional — site works with the default V mark).

5. Run locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Add `ANTHROPIC_API_KEY` and `MAKE_WEBHOOK_URL` in project Environment Variables
4. Point domain `vxa.agency` to Vercel

## Features

- Live WhatsApp-style chat demo (`/api/chat`)
- Listing generator demo (`/api/listing`)
- Smart contact form → Make.com webhook (`/api/contact`)
- Rate limiting (1 request / 2s per IP on AI routes)
