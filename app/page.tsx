"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type Particle = {
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
};

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, index) => ({
    left: `${(index * 17) % 100}%`,
    top: `${(index * 29) % 100}%`,
    size: (index % 4) + 2,
    duration: 4 + (index % 6),
    delay: (index % 10) * 0.2
  }));
}

export default function Home() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const particles = useMemo(() => createParticles(34), []);

  const handleEnterShop = async () => {
    setIsNavigating(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 650);
    });
    router.push("/shop");
  };

  return (
    <main className="entry-surface relative min-h-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isNavigating ? 1 : 0 }}
        transition={{ duration: 0.45 }}
        className="pointer-events-none fixed inset-0 z-50 bg-black"
      />

      <div className="entry-bg-motion absolute inset-0" />

      {particles.map((particle, index) => (
        <motion.span
          key={`particle-${index}`}
          className="entry-particle absolute rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: `${particle.size * 2}px`,
            height: `${particle.size * 2}px`
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.25, 0.9, 0.25],
            scale: [1, 1.45, 1]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-5 py-12 md:grid-cols-2 md:py-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-5 inline-flex rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-1 text-xs tracking-[0.32em] text-violet-200/85 sm:text-sm"
          >
            N O V A C H E A T S
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.7 }}
            className="entry-logo font-[var(--font-orbitron)] text-5xl leading-[1.1] text-white sm:text-6xl md:text-7xl"
          >
            Dominez chaque lobby.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.65 }}
            className="founder-neon mt-3 text-sm font-semibold tracking-wide sm:text-base"
          >
            Fondateur : MiniHack
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.7 }}
            className="mt-5 max-w-xl text-lg text-violet-100/90 sm:text-2xl"
          >
            Experience ecommerce gaming futuriste, animations premium et performance maximale sur chaque session.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52, duration: 0.7 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <button
              type="button"
              onClick={handleEnterShop}
              className="entry-button-primary rounded-xl px-7 py-3 text-base font-semibold text-white transition"
            >
              Entrer dans la boutique
            </button>
            <button
              type="button"
              onClick={handleEnterShop}
              className="entry-button-secondary rounded-xl px-7 py-3 text-base font-semibold text-violet-100 transition"
            >
              Voir les best sellers
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24, rotateY: -6 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="entry-panel relative overflow-hidden rounded-3xl p-4 sm:p-6"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src="/bo7.png" alt="Visual premium NovaCheats" fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-violet-900/30 to-transparent" />
          </div>
          <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-violet-300/30 bg-black/45 p-5 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/90">3D Gaming Visual</p>
            <p className="mt-2 font-[var(--font-orbitron)] text-xl text-violet-100 sm:text-2xl">
              Interface futuriste ultra premium
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
