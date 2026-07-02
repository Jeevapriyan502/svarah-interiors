"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { featuredProjects } from "@/lib/portfolio-data";
import { RevealOnScroll } from "./RevealOnScroll";

const CARD_ASPECT = "aspect-[4/5]";
const CARD_WIDTH = "w-[72vw] sm:w-[40vw] lg:w-[28vw]";

const loopedProjects = [...featuredProjects, ...featuredProjects];

export function PortfolioGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    pausedRef.current = true;
    const amount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });

    window.setTimeout(() => {
      pausedRef.current = false;
    }, 1200);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let animationId = 0;

    const tick = () => {
      if (!pausedRef.current && container) {
        container.scrollLeft += 0.5;

        const loopPoint = container.scrollWidth / 2;
        if (container.scrollLeft >= loopPoint) {
          container.scrollLeft -= loopPoint;
        }
      }

      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);

    const pause = () => {
      pausedRef.current = true;
    };

    const resume = () => {
      pausedRef.current = false;
    };

    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", resume);
    container.addEventListener("touchstart", pause, { passive: true });
    container.addEventListener("touchend", resume);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", resume);
      container.removeEventListener("touchstart", pause);
      container.removeEventListener("touchend", resume);
    };
  }, []);

  return (
    <section id="portfolio" className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <RevealOnScroll>
          <div className="mb-12 flex flex-col gap-8 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-taupe">
                Selected Work
              </p>
              <h2 className="font-serif text-4xl text-charcoal md:text-5xl">
                Featured Projects
              </h2>
              <p className="mt-6 leading-relaxed text-charcoal/60">
                A curated collection of spaces designed with intention — where
                materiality meets emotion.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <p className="mr-2 hidden text-[10px] uppercase tracking-[0.2em] text-charcoal/40 sm:block">
                Auto-scroll · hover to pause
              </p>
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Scroll projects left"
                className="flex h-11 w-11 items-center justify-center border border-charcoal/20 text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-cream"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Scroll projects right"
                className="flex h-11 w-11 items-center justify-center border border-charcoal/20 text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-cream"
              >
                →
              </button>
            </div>
          </div>
        </RevealOnScroll>

        <div className="relative -mx-6 lg:-mx-10">
          <div
            ref={scrollRef}
            className="scrollbar-hide flex gap-6 overflow-x-auto px-6 pb-2 lg:gap-8 lg:px-10"
          >
            {loopedProjects.map((project, index) => (
              <motion.article
                key={`${project.id}-${index}`}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: (index % featuredProjects.length) * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative shrink-0 overflow-hidden ${CARD_WIDTH}`}
              >
                <div className={`relative ${CARD_ASPECT} overflow-hidden`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 35vw"
                    draggable={false}
                  />

                  <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/30" />

                  <div className="absolute inset-x-0 bottom-0 translate-y-full p-6 transition-transform duration-500 ease-out group-hover:translate-y-0">
                    <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-cream/70">
                      {project.category} · {project.location}
                    </p>
                    <h3 className="mt-1 font-serif text-2xl text-cream">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-cream to-transparent lg:w-12" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-cream to-transparent lg:w-12" />
        </div>
      </div>
    </section>
  );
}
