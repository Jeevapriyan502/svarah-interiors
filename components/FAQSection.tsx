"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqItems } from "@/lib/faq-data";
import { RevealOnScroll } from "./RevealOnScroll";

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section id="faq" className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <RevealOnScroll>
          <div className="mb-14 text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-taupe">
              FAQ
            </p>
            <h2 className="font-serif text-4xl text-charcoal md:text-5xl">
              Questions, <span className="italic">answered</span>
            </h2>
          </div>
        </RevealOnScroll>

        <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
          {faqItems.map((item, index) => {
            const isOpen = openId === item.id;

            return (
              <RevealOnScroll key={item.id} delay={index * 0.06}>
                <div>
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-lg text-charcoal md:text-xl">
                      {item.question}
                    </span>
                    <span
                      className={`shrink-0 text-xl text-taupe transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 leading-relaxed text-charcoal/65">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
