# Onion & Mustard Hair Oil — Sister company by Chonions

Single-product store for the Organic Onions & Mustard Hair Oil. Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## Pages

| Route | What it does |
|---|---|
| `/` | Landing + product page: hero with Add to cart / Buy now, "same oil as Chonions" story, seed-to-oil process, benefits, ingredients, how to use, FAQ |
| `/cart` | Full cart page |
| `/checkout` | Delivery form (Pakistan phone + province validation), Cash on Delivery |
| `/order-confirmed` | Thank-you page with order number and WhatsApp button |
| `POST /api/orders` | Validates the order, recalculates prices on the server, creates an order ID |

The cart is saved in the browser (localStorage) and opens as a slide-out drawer from the header.

## Before going live: fill in the placeholders

Everything is in **`src/lib/store.ts`**:

- `product.size`, `product.price`, `product.compareAtPrice` (set to `null` to hide the crossed-out price)
- `shipping.flatFee`, `shipping.freeAbove`
- `contact.whatsapp`, `contact.email`, `contact.instagram`
- `chonionsSiteUrl`: link to the Chonions snacks website

Images live in `public/images/` (`bottle.jpg`, `chonions-pouch.jpg`, `chonions-logo.jpg`). Replace them with the final product photos when they're ready, keeping the same file names.

## Where orders go

Right now every order is printed to the server log. To receive orders, set an environment variable:

```
ORDER_WEBHOOK_URL=https://your-webhook-url
```

Each order is POSTed there as JSON. A Google Apps Script web app writing to a Google Sheet works well for this, as do Make, Zapier or n8n (email or WhatsApp alerts). For a proper admin panel later, replace the webhook in `src/app/api/orders/route.ts` with a database insert (e.g. Supabase).

Online payments (card / JazzCash / Easypaisa) are shown as "Coming soon" on the checkout page and are ready to wire up once the client picks a gateway.

## Deploy

Push to GitHub and import the repo on Vercel. Add `ORDER_WEBHOOK_URL` under Project → Settings → Environment Variables.
