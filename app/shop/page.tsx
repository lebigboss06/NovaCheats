"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../components/cart-context";
import { faqItems, products, reviews } from "../data/products";

const whyUs = [
  "Activation instantanee apres achat",
  "Mises a jour permanentes",
  "Support prioritaire 7j/7",
  "Interface premium facile a utiliser"
];

const subscriptionOptions = [
  { duration: "1 jour", price: 4.99 },
  { duration: "1 mois", price: 19.99 },
  { duration: "3 mois", price: 39.99 },
  { duration: "Lifetime", price: 79.99 }
];

export default function ShopPage() {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [selectedDurations, setSelectedDurations] = useState<Record<string, string>>({});
  const { addItem, openCart, totalItems } = useCart();

  const getSelectedSubscription = (slug: string) => {
    const selectedDuration = selectedDurations[slug] ?? subscriptionOptions[0].duration;
    return subscriptionOptions.find((option) => option.duration === selectedDuration) ?? subscriptionOptions[0];
  };

  return (
    <main className="gaming-grid shop-surface relative min-h-screen overflow-hidden">
      <div className="shop-glow-layer absolute inset-0" />
      <div className="shop-particles pointer-events-none absolute inset-0" />

      <button
        type="button"
        onClick={openCart}
        className="neon-border fixed right-4 top-4 z-40 inline-flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-sm font-semibold text-violet-100 backdrop-blur-lg transition hover:-translate-y-0.5 hover:bg-violet-500/20 sm:right-6 sm:top-6"
      >
        Panier
        <span className="rounded-full bg-violet-500/40 px-2 py-0.5 text-xs">{totalItems}</span>
      </button>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-6 sm:px-8">
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="neon-border flex items-center justify-between rounded-2xl bg-black/35 px-5 py-4 backdrop-blur-xl"
        >
          <div className="font-[var(--font-orbitron)] text-xl tracking-wide sm:text-2xl">
            <span className="text-white">Nova</span>
            <span className="neon-text text-violet-400">Cheats</span>
          </div>
          <div className="hidden items-center gap-6 text-sm text-violet-100 sm:flex">
            <a href="#products" className="transition hover:text-violet-300">
              Produits
            </a>
            <a href="#why-us" className="transition hover:text-violet-300">
              Pourquoi nous
            </a>
            <a href="#faq" className="transition hover:text-violet-300">
              FAQ
            </a>
          </div>
        </motion.nav>

        <section className="grid items-center gap-10 pb-16 pt-16 md:grid-cols-2 md:pt-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <p className="mb-4 inline-flex rounded-full border border-fuchsia-300/25 bg-fuchsia-500/10 px-4 py-1 text-sm tracking-wide text-fuchsia-200">
              STORE GAMING PREMIUM
            </p>
            <h1 className="font-[var(--font-orbitron)] text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
              La boutique la plus <span className="neon-text text-cyan-300">premium</span> pour dominer chaque lobby
            </h1>
            <p className="mt-6 max-w-lg text-lg text-violet-100/90">
              Plateforme moderne, livraison instantanee et mise a jour continue. Experience gaming futuriste sur mobile
              et PC.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#products"
                className="rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-7 py-3 font-semibold text-white shadow-[0_0_25px_rgba(56,189,248,0.45)] transition hover:scale-105"
              >
                Voir les produits
              </a>
              <a
                href="#delivery"
                className="rounded-xl border border-violet-300/35 bg-black/40 px-7 py-3 font-semibold text-violet-100 transition hover:bg-violet-500/20"
              >
                Livraison instantanee
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="neon-border relative rounded-3xl bg-black/35 p-3 backdrop-blur-md"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src="/bo7.png" alt="NovaCheats visual" fill className="object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-violet-900/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-violet-300/30 bg-black/45 p-4 backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">Performance Control Center</p>
                <p className="mt-2 font-[var(--font-orbitron)] text-xl text-violet-100">Dashboard 3D futuriste</p>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="products" className="pb-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h3 className="font-[var(--font-orbitron)] text-3xl text-white sm:text-4xl">Produits populaires</h3>
              <p className="mt-2 text-violet-100/80">Selection gaming avec glow neon et animations fluides.</p>
            </div>
          </div>

          <div className="grid gap-7 md:grid-cols-2">
            {products.map((product, index) => (
              <motion.article
                key={product.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -10, scale: 1.01 }}
                className="product-card-premium group neon-border card-pro rounded-3xl bg-black/45 p-4 backdrop-blur-xl transition sm:p-5"
              >
                <div className="product-media relative mb-5 overflow-hidden rounded-2xl">
                  <div className="aspect-[16/9] w-full">
                    {imageErrors[product.name] ? (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-900/70 via-black/80 to-cyan-900/40">
                        <span className="font-[var(--font-orbitron)] text-2xl tracking-wide text-violet-100/95 sm:text-3xl">
                          {product.game}
                        </span>
                      </div>
                    ) : (
                      <Image
                        src={product.image}
                        alt={`${product.game} preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition duration-700 group-hover:scale-110"
                        onError={() => {
                          setImageErrors((prev) => ({ ...prev, [product.name]: true }));
                        }}
                      />
                    )}
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-violet-900/35 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-violet-500/15 via-transparent to-cyan-400/15 opacity-85" />
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {product.badges.map((badge) => (
                    <span
                      key={badge}
                      className="premium-badge rounded-full border border-violet-200/30 px-3 py-1 text-[11px] font-semibold tracking-wide text-violet-100"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <h4 className="mt-4 font-[var(--font-orbitron)] text-2xl text-white sm:text-3xl">{product.name}</h4>
                <p className="mt-1 text-sm uppercase tracking-[0.22em] text-cyan-200/90">{product.game}</p>
                <p className="mt-4 min-h-16 max-w-xl text-base text-violet-100/90">{product.shortDescription}</p>

                <div className="mt-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-violet-200/85">
                    Choix abonnement
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {subscriptionOptions.map((option) => {
                      const selectedDuration = selectedDurations[product.slug] ?? subscriptionOptions[0].duration;
                      const isSelected = option.duration === selectedDuration;
                      return (
                        <button
                          key={`${product.slug}-${option.duration}`}
                          type="button"
                          onClick={() => {
                            setSelectedDurations((prev) => ({
                              ...prev,
                              [product.slug]: option.duration
                            }));
                          }}
                          className={`rounded-lg border px-3 py-2 text-left transition ${
                            isSelected
                              ? "border-cyan-300/60 bg-cyan-500/20 shadow-[0_0_18px_rgba(56,189,248,0.4)]"
                              : "border-violet-300/25 bg-black/35 hover:border-violet-300/45 hover:bg-violet-500/12"
                          }`}
                        >
                          <p className="text-sm font-semibold text-violet-100">{option.duration}</p>
                          <p className="text-xs text-cyan-200">{option.price.toFixed(2)}€</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div className="price-card rounded-2xl border border-violet-300/25 bg-black/45 px-4 py-3">
                    <p className="text-sm text-violet-200/60 line-through">
                      {(getSelectedSubscription(product.slug).price + 20).toFixed(2)}€
                    </p>
                    <span className="text-3xl font-extrabold text-violet-200 sm:text-4xl">
                      {getSelectedSubscription(product.slug).price.toFixed(2)}€
                    </span>
                  </div>

                  <div className="flex w-full flex-col gap-2 sm:w-auto">
                    <button
                      type="button"
                      onClick={() => {
                        const selectedSubscription = getSelectedSubscription(product.slug);
                        addItem(product, {
                          duration: selectedSubscription.duration,
                          price: selectedSubscription.price
                        });
                      }}
                      className="buy-now-btn rounded-xl px-6 py-3 text-base font-bold text-white sm:min-w-56"
                    >
                      Acheter maintenant
                    </button>
                    <Link
                      href={`/shop/${product.slug}`}
                      className="rounded-xl border border-violet-300/35 bg-violet-500/15 px-4 py-2 text-center font-semibold text-violet-100 transition hover:bg-violet-500/25"
                    >
                      Voir detail produit
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="why-us" className="pb-16">
          <div className="neon-border rounded-3xl bg-black/35 p-6 backdrop-blur-md sm:p-8">
            <h3 className="font-[var(--font-orbitron)] text-3xl text-white">Pourquoi nous choisir</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {whyUs.map((item) => (
                <div key={item} className="rounded-xl border border-violet-300/20 bg-violet-900/10 p-4">
                  <p className="text-violet-100">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" className="pb-16">
          <h3 className="font-[var(--font-orbitron)] text-3xl text-white">Avis clients</h3>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {reviews.map((review, index) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="neon-border rounded-2xl bg-black/40 p-5 backdrop-blur-md"
              >
                <p className="text-violet-100/90">{review.message}</p>
                <p className="mt-4 font-[var(--font-orbitron)] text-violet-200">{review.name}</p>
                <p className="text-sm text-violet-300/70">{review.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="faq" className="pb-16">
          <h3 className="font-[var(--font-orbitron)] text-3xl text-white">FAQ</h3>
          <div className="mt-6 space-y-4">
            {faqItems.map((item) => (
              <details key={item.question} className="neon-border rounded-xl bg-black/35 p-4 backdrop-blur-md">
                <summary className="cursor-pointer list-none font-semibold text-violet-100">{item.question}</summary>
                <p className="mt-3 text-violet-200/90">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="delivery" className="pb-16">
          <div className="delivery-panel rounded-3xl p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">Livraison instantanee</p>
            <h3 className="mt-3 font-[var(--font-orbitron)] text-3xl text-white sm:text-4xl">
              Acces immediat. Sans attente.
            </h3>
            <p className="mt-4 max-w-2xl text-violet-100/85">
              Paiement valide = activation directe. Vous recevez vos acces, instructions et panneau de controle sans
              delai.
            </p>
          </div>
        </section>

        <footer
          id="about"
          className="neon-border rounded-2xl bg-black/35 px-6 py-8 text-sm text-violet-100/85 backdrop-blur-md"
        >
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <p>
              <span className="font-[var(--font-orbitron)] text-violet-300">NovaCheats</span> - Le futur du gaming premium.
            </p>
            <p className="text-violet-200/90">© {new Date().getFullYear()} NovaCheats. Tous droits reserves.</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
