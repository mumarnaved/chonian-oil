// ─────────────────────────────────────────────────────────────
//  STORE SETTINGS — edit prices, size, shipping and contact here.
//  Everything marked PLACEHOLDER still needs the client's real value.
// ─────────────────────────────────────────────────────────────

export const product = {
  id: "onion-mustard-hair-oil",
  name: "Organic Onions & Mustard Hair Oil",
  shortName: "Onion & Mustard Hair Oil",
  tagline: "Premium nourishing hair oil",
  size: "200 ml", // PLACEHOLDER — confirm bottle size with client
  price: 1200, // PLACEHOLDER — PKR
  compareAtPrice: 1500, // PLACEHOLDER — set to null to hide the strike-through price
  image: "/images/bottle.jpg",
  cutout: "/images/bottle-cutout.webp",
};

export const shipping = {
  flatFee: 250, // PLACEHOLDER — PKR
  freeAbove: 3000, // PLACEHOLDER — orders at or above this ship free
};

export const contact = {
  whatsapp: "923000000000", // PLACEHOLDER — international format, no "+"
  email: "hello@example.com", // PLACEHOLDER
  instagram: "https://instagram.com/", // PLACEHOLDER
};

// Link to the Chonions snacks website (your friend's build).
export const chonionsSiteUrl = "#"; // PLACEHOLDER

export function formatPKR(amount: number) {
  return "Rs " + amount.toLocaleString("en-PK");
}

export function shippingFor(subtotal: number) {
  if (subtotal === 0) return 0;
  return subtotal >= shipping.freeAbove ? 0 : shipping.flatFee;
}
