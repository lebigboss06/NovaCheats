"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "../../components/cart-context";
import { products } from "../../data/products";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const product = products.find((item) => item.slug === params.slug);
  const { addItem, openCart, totalItems } = useCart();

  if (!product) {
    return (
      <main className="shop-surface flex min-h-screen items-center justify-center px-6">
        <div className="neon-border rounded-2xl bg-black/40 p-8 text-center">
          <p className="font-[var(--font-orbitron)] text-2xl text-violet-100">Produit introuvable</p>
          <Link href="/shop" className="mt-4 inline-block text-violet-300 underline">
            Retourner a la boutique
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="shop-surface relative min-h-screen overflow-hidden">
      <div className="shop-glow-layer absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/shop"
            className="rounded-full border border-violet-300/35 bg-black/40 px-4 py-2 text-sm text-violet-100 transition hover:bg-violet-500/20"
          >
            Retour boutique
          </Link>
          <button
            type="button"
            onClick={openCart}
            className="neon-border rounded-full bg-black/45 px-4 py-2 text-sm font-semibold text-violet-100"
          >
            Panier ({totalItems})
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="neon-border card-pro rounded-3xl bg-black/40 p-4 backdrop-blur-md"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-violet-950/35 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="neon-border rounded-3xl bg-black/35 p-6 backdrop-blur-md"
          >
            <div className="flex flex-wrap gap-2">
              {product.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-violet-300/30 bg-violet-500/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-violet-200"
                >
                  {badge}
                </span>
              ))}
            </div>

            <h1 className="mt-4 font-[var(--font-orbitron)] text-4xl text-white">{product.name}</h1>
            <p className="mt-2 text-fuchsia-200">{product.game}</p>
            <p className="mt-5 text-violet-100/90">{product.fullDescription}</p>

            <ul className="mt-6 space-y-2 text-violet-100/90">
              {product.features.map((feature) => (
                <li key={feature}>+ {feature}</li>
              ))}
            </ul>

            <div className="mt-8 flex items-end justify-between">
              <div>
                <p className="text-sm text-violet-200/60 line-through">{product.oldPrice}</p>
                <p className="text-4xl font-bold text-violet-300">{product.price}</p>
                <p className="mt-1 text-sm text-cyan-200">{product.delivery}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  addItem(product);
                }}
                className="rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-[0_0_25px_rgba(56,189,248,0.45)] transition hover:scale-105"
              >
                Acheter
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
