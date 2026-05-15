import { NextResponse } from "next/server";
import Stripe from "stripe";

type CheckoutCartItem = {
  name: string;
  duration: string;
  unitPrice: number;
  quantity: number;
};

export async function POST(request: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    if (!secretKey) {
      return NextResponse.json({ error: "STRIPE_SECRET_KEY is missing." }, { status: 500 });
    }
    if (!siteUrl) {
      return NextResponse.json({ error: "NEXT_PUBLIC_SITE_URL is missing." }, { status: 500 });
    }

    const body = (await request.json()) as { items?: CheckoutCartItem[] };
    const items = Array.isArray(body.items) ? body.items : [];

    if (items.length === 0) {
      return NextResponse.json({ error: "Votre panier est vide." }, { status: 400 });
    }

    const stripe = new Stripe(secretKey, {
      apiVersion: "2026-04-22.dahlia"
    });

    const lineItems = items.map((item) => ({
      quantity: Math.max(1, Math.floor(item.quantity)),
      price_data: {
        currency: "eur",
        product_data: {
          name: `${item.name} (${item.duration})`
        },
        unit_amount: Math.round(item.unitPrice * 100)
      }
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${siteUrl}/shop?checkout=success`,
      cancel_url: `${siteUrl}/shop?checkout=cancel`
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Checkout error."
      },
      { status: 500 }
    );
  }
}
