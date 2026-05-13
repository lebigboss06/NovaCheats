"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <main className="loading-wrap flex min-h-screen items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="neon-border rounded-2xl bg-black/35 px-8 py-9 text-center backdrop-blur-md"
      >
        <div className="loading-ring mx-auto h-12 w-12" />
        <p className="mt-4 font-[var(--font-orbitron)] text-lg text-violet-200">NovaCheats</p>
        <p className="mt-1 text-sm text-violet-100/75">Chargement de la boutique...</p>
      </motion.div>
    </main>
  );
}
