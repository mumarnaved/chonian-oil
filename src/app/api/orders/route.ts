import { NextResponse } from "next/server";
import { validateOrder, type OrderInput } from "@/lib/order";
import { product, shippingFor } from "@/lib/store";

/**
 * Receives a checkout submission.
 * Prices are recalculated here on the server, so a customer can't change them in the browser.
 *
 * Where do orders go?
 *  - Always: logged to the server console.
 *  - If ORDER_WEBHOOK_URL is set (e.g. a Google Apps Script / Make / Zapier / n8n webhook),
 *    the full order is POSTed there as JSON — use it to save to a Google Sheet, email or WhatsApp.
 *  Swap this for a database (e.g. Supabase) when the client is ready.
 */
export async function POST(req: Request) {
  let body: Partial<OrderInput>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const input: Partial<OrderInput> = {
    name: body.name?.toString().trim(),
    phone: body.phone?.toString().trim(),
    email: body.email?.toString().trim() || undefined,
    address: body.address?.toString().trim(),
    address2: body.address2?.toString().trim().slice(0, 120) || undefined,
    city: body.city?.toString().trim(),
    postalCode: body.postalCode?.toString().trim() || undefined,
    province: body.province?.toString(),
    notes: body.notes?.toString().trim().slice(0, 500) || undefined,
    quantity: Number(body.quantity),
    paymentMethod: "cod",
  };

  const errors = validateOrder(input);
  if (Object.keys(errors).length) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const subtotal = input.quantity! * product.price;
  const shippingFee = shippingFor(subtotal);
  const orderId = "CO-" + Date.now().toString(36).toUpperCase().slice(-6) + Math.floor(Math.random() * 90 + 10);

  const order = {
    orderId,
    createdAt: new Date().toISOString(),
    customer: {
      name: input.name,
      phone: input.phone,
      email: input.email,
      address: input.address,
      address2: input.address2,
      city: input.city,
      postalCode: input.postalCode,
      province: input.province,
      notes: input.notes,
    },
    items: [{ sku: product.id, name: product.name, size: product.size, unitPrice: product.price, quantity: input.quantity }],
    subtotal,
    shippingFee,
    total: subtotal + shippingFee,
    paymentMethod: "Cash on Delivery",
  };

  console.log("[new order]", JSON.stringify(order));

  const webhook = process.env.ORDER_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
    } catch (err) {
      console.error("[order webhook failed]", err);
      return NextResponse.json({ error: "We couldn't place your order right now. Please try again." }, { status: 502 });
    }
  }

  return NextResponse.json({ orderId, total: order.total });
}
