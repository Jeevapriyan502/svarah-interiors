"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-charcoal">
      <Image
        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=85"
        alt="Luxury interior living space by Svarah Interiors"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/30 to-charcoal/70" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-cream/80"
        >
          Interior Design Studio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="font-serif text-5xl leading-[1.1] text-cream sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Spaces that
          <br />
          <span className="italic">breathe harmony</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-cream/75 sm:text-lg"
        >
          Curating refined interiors where every texture, tone, and detail
          reflects your story.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="mt-12"
        >
          <a
            href="#contact"
            className="inline-block border border-cream/60 bg-cream/10 px-10 py-4 text-xs font-medium uppercase tracking-[0.25em] text-cream backdrop-blur-sm transition-all duration-300 hover:bg-cream hover:text-charcoal"
          >
            Book a Consultation
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-cream/50">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="h-10 w-px bg-cream/40"
          />
        </div>
      </motion.div>
    </section>
  );
}
