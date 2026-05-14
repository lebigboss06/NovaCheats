"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useCart } from "../../components/cart-context";
import { products } from "../../data/products";

const productFaq = [
  {
    question: "Combien de temps pour activer le produit ?",
    answer: "L'activation est instantanee apres paiement avec acces guide dans votre espace client."
  },
  {
    question: "Le produit est-il mis a jour regulierement ?",
    answer: "Oui, chaque pack recoit des mises a jour frequentes pour rester compatible avec les derniers patches."
  },
  {
    question: "Le support peut-il aider a la configuration ?",
    answer: "Oui, le support premium vous accompagne sur l'installation et les reglages optimaux."
  }
];

const customerReviews = [
  {
    name: "Skarn",
    role: "Joueur Competitif",
    message: "Activation rapide et performance stable. Le rendu premium inspire confiance."
  },
  {
    name: "ZeroAim",
    role: "Streamer FPS",
    message: "Configuration propre, updates frequentes et support reactif."
  },
  {
    name: "NovaOne",
    role: "Team Ranked",
    message: "Excellent rapport qualite-prix, interface claire et workflow pro."
  }
];

const benefitCards = [
  {
    title: "Acces instantane",
    description: "Activation immediate apres achat, sans attente."
  },
  {
    title: "Configuration optimisee",
    description: "Profils pre-configures pour des resultats rapides."
  },
  {
    title: "Mises a jour permanentes",
    description: "Compatible avec les dernieres versions du jeu."
  },
  {
    title: "Dashboard premium",
    description: "Interface moderne et simple a prendre en main."
  },
  {
    title: "Mode discret",
    description: "Fonctionnement optimise pour des sessions stables."
  },
  {
    title: "Support prioritaire",
    description: "Assistance rapide 7j/7 avec suivi personnalise."
  }
];

const subscriptionOptions = [
  { duration: "1 jour", price: 4.99 },
  { duration: "1 mois", price: 19.99 },
  { duration: "3 mois", price: 39.99 },
  { duration: "Lifetime", price: 79.99 }
];

function StarRow() {
  return (
    <div className="flex items-center gap-1 text-cyan-200">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={`star-${index}`} viewBox="0 0 24 24" className="h-4 w-4 fill-current">
          <path d="M12 2.3 14.9 8l6.2.9-4.5 4.4 1.1 6.2L12 16.5l-5.7 3 1.1-6.2L2.9 8.9 9.1 8z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const product = products.find((item) => item.slug === params.slug);
  const { addItem, openCart, totalItems } = useCart();
  const [selectedDuration, setSelectedDuration] = useState(subscriptionOptions[0].duration);

  const selectedSubscription = useMemo(
    () => subscriptionOptions.find((option) => option.duration === selectedDuration) ?? subscriptionOptions[0],
    [selectedDuration]
  );

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
      <div className="detail-noise pointer-events-none absolute inset-0" />

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
            className="detail-media-wrap neon-border card-pro relative rounded-3xl bg-black/45 p-4 backdrop-blur-md"
          >
            <div className="detail-glow-orb absolute -left-12 top-1/4 h-44 w-44 rounded-full bg-violet-500/35 blur-3xl" />
            <div className="detail-glow-orb absolute -right-8 bottom-10 h-36 w-36 rounded-full bg-cyan-400/28 blur-3xl" />
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
              <span className="rounded-full border border-cyan-300/30 bg-cyan-500/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-cyan-100">
                Offre limitee
              </span>
              {product.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-violet-300/30 bg-violet-500/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-violet-200"
                >
                  {badge}
                </span>
              ))}
            </div>

            <h1 className="mt-4 font-[var(--font-orbitron)] text-4xl leading-tight text-white sm:text-5xl">
              {product.name} - Domination immediate
            </h1>
            <p className="mt-2 text-fuchsia-200">{product.game}</p>
            <p className="mt-3 text-sm text-cyan-200">Deja achete par +1200 clients</p>
            <p className="mt-5 text-violet-100/90">{product.fullDescription}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-violet-300/20 bg-violet-500/10 p-3 text-sm text-violet-100">
                Activation instantanee
              </div>
              <div className="rounded-xl border border-cyan-300/20 bg-cyan-500/10 p-3 text-sm text-cyan-100">Compatible PC</div>
              <div className="rounded-xl border border-fuchsia-300/20 bg-fuchsia-500/10 p-3 text-sm text-fuchsia-100">
                Support rapide
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-violet-200/85">
                Choix d&apos;abonnement
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {subscriptionOptions.map((option) => {
                  const isSelected = option.duration === selectedDuration;
                  return (
                    <button
                      key={option.duration}
                      type="button"
                      onClick={() => {
                        setSelectedDuration(option.duration);
                      }}
                      className={`rounded-xl border px-4 py-3 text-left transition ${
                        isSelected
                          ? "border-cyan-300/60 bg-cyan-500/20 shadow-[0_0_24px_rgba(56,189,248,0.45)]"
                          : "border-violet-300/25 bg-black/35 hover:border-violet-300/50 hover:bg-violet-500/15"
                      }`}
                    >
                      <p className="font-semibold text-violet-100">{option.duration}</p>
                      <p className="text-sm text-cyan-200">{option.price.toFixed(2)}€</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm text-violet-200/60 line-through">{(selectedSubscription.price + 20).toFixed(2)}€</p>
                <p className="text-4xl font-bold text-violet-300">{selectedSubscription.price.toFixed(2)}€</p>
                <p className="mt-1 text-sm text-cyan-200">{product.delivery}</p>
              </div>

              <div className="flex w-full flex-col gap-2 sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    addItem(product, { duration: selectedSubscription.duration, price: selectedSubscription.price });
                    openCart();
                  }}
                  className="detail-buy-btn rounded-xl px-7 py-3.5 text-base font-bold text-white sm:min-w-60"
                >
                  Acheter maintenant
                </button>
                <button
                  type="button"
                  onClick={() => {
                    addItem(product, { duration: selectedSubscription.duration, price: selectedSubscription.price });
                  }}
                  className="rounded-xl border border-violet-300/35 bg-violet-500/15 px-6 py-2.5 font-semibold text-violet-100 transition hover:bg-violet-500/25"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        <section className="mt-10">
          <div className="neon-border rounded-3xl bg-black/35 p-6 backdrop-blur-md sm:p-8">
            <h2 className="font-[var(--font-orbitron)] text-3xl text-white">Ce que tu obtiens</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {benefitCards.map((benefit, index) => (
                <motion.article
                  key={benefit.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="detail-benefit-card rounded-2xl p-4"
                >
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-500/15 text-cyan-100">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                      <path d="M12 2.8 3.7 7.6v8.8L12 21.2l8.3-4.8V7.6L12 2.8Zm0 2.3 6.3 3.6v6.6L12 19l-6.3-3.7V8.7L12 5.1Zm-1.1 2.5v4h-2l3.1 4.8h.2v-4h2l-3.1-4.8h-.2Z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-violet-100">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-violet-200/80">{benefit.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Securite",
              text: "Modules optimises avec bonnes pratiques de stabilite et sessions protegees."
            },
            {
              title: "Livraison",
              text: "Acces immediat apres commande avec guide d'installation clair."
            },
            {
              title: "Mise a jour",
              text: "Maintenance continue pour rester performant a chaque patch."
            }
          ].map((item) => (
            <div key={item.title} className="neon-border rounded-2xl bg-black/35 p-5 backdrop-blur-md">
              <h3 className="font-[var(--font-orbitron)] text-xl text-violet-100">{item.title}</h3>
              <p className="mt-2 text-violet-200/85">{item.text}</p>
            </div>
          ))}
        </section>

        <section className="mt-10">
          <h2 className="font-[var(--font-orbitron)] text-3xl text-white">Avis clients</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {customerReviews.map((review, index) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="neon-border rounded-2xl bg-black/40 p-5 backdrop-blur-md"
              >
                <StarRow />
                <p className="mt-3 text-violet-100/90">{review.message}</p>
                <p className="mt-4 font-semibold text-violet-100">{review.name}</p>
                <p className="text-sm text-violet-300/70">{review.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-10 pb-10">
          <h2 className="font-[var(--font-orbitron)] text-3xl text-white">FAQ produit</h2>
          <div className="mt-5 space-y-4">
            {productFaq.map((item) => (
              <details key={item.question} className="neon-border rounded-xl bg-black/35 p-4 backdrop-blur-md">
                <summary className="cursor-pointer list-none font-semibold text-violet-100">{item.question}</summary>
                <p className="mt-3 text-violet-200/90">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
