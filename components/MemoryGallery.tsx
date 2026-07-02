"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { galleryMemories } from "@/lib/gallery-data";
import type { GalleryMemory } from "@/lib/types";
import { RevealOnScroll } from "./RevealOnScroll";

const GALLERY_ASPECT = "aspect-[4/5]";

const spanClasses = {
  normal: "",
  wide: "sm:col-span-2",
  tall: "",
  featured: "sm:col-span-2 lg:col-span-3",
};

function GalleryLightbox({
  memory,
  onClose,
}: {
  memory: GalleryMemory;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden bg-cream"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-charcoal/20 bg-cream/90 text-charcoal transition-colors hover:bg-charcoal hover:text-cream"
          aria-label="Close gallery"
        >
          ×
        </button>

        <div className="relative aspect-[4/5] w-full">
          <Image
            src={memory.image}
            alt={memory.title}
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-taupe">
            {memory.category} · {memory.year} · {memory.location}
          </p>
          <h3 className="mt-2 font-serif text-2xl text-charcoal sm:text-3xl">
            {memory.title}
          </h3>
          <p className="mt-4 leading-relaxed text-charcoal/65">{memory.memory}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function MemoryGallery() {
  const [activeMemory, setActiveMemory] = useState<GalleryMemory | null>(null);

  return (
    <>
      <section id="gallery" className="bg-warm-gray py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <RevealOnScroll>
            <div className="mb-16 max-w-2xl">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-taupe">
                Memory Gallery
              </p>
              <h2 className="font-serif text-4xl text-charcoal md:text-5xl">
                Spaces we&apos;ve <span className="italic">shaped</span>
              </h2>
              <p className="mt-6 leading-relaxed text-charcoal/60">
                A living archive of completed projects — each room a memory of
                collaboration, craft, and the lives that now unfold within
                these walls.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {galleryMemories.map((memory, index) => (
              <RevealOnScroll
                key={memory.id}
                className={spanClasses[memory.span]}
                delay={index * 0.05}
              >
                <button
                  type="button"
                  onClick={() => setActiveMemory(memory)}
                  className="group block w-full overflow-hidden text-left"
                >
                  <div className={`relative w-full ${GALLERY_ASPECT}`}>
                    <Image
                      src={memory.image}
                      alt={memory.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-cream/60">
                        {memory.year} · {memory.category}
                      </p>
                      <h3 className="mt-1 font-serif text-xl text-cream sm:text-2xl">
                        {memory.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-cream/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        {memory.memory}
                      </p>
                    </div>
                  </div>
                </button>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={0.2}>
            <p className="mt-12 text-center text-xs uppercase tracking-[0.2em] text-charcoal/40">
              Tap any image to view the full story
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <AnimatePresence>
        {activeMemory && (
          <GalleryLightbox
            memory={activeMemory}
            onClose={() => setActiveMemory(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
