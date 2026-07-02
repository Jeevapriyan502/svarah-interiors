"use client";

import { RevealOnScroll } from "./RevealOnScroll";

const PHONE = "+919025331605";
const PHONE_DISPLAY = "+91 90253 31605";

export function BottomCTA() {
  return (
    <section className="border-t border-stone/40 bg-warm-gray py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <RevealOnScroll>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-taupe">
                Call Us Today
              </p>
              <h2 className="font-serif text-3xl text-charcoal md:text-4xl">
                Let&apos;s bring your space to life
              </h2>
              <p className="mt-4 leading-relaxed text-charcoal/60">
                Speak directly with our design team. We&apos;re here to answer
                your questions and schedule your consultation.
              </p>
              <a
                href={`tel:${PHONE}`}
                className="mt-8 inline-block font-serif text-2xl tracking-wide text-charcoal transition-colors hover:text-taupe md:text-3xl"
              >
                {PHONE_DISPLAY}
              </a>
            </div>

            <div className="flex flex-col items-center justify-center border border-charcoal/15 bg-cream/50 p-10 text-center lg:items-start lg:text-left">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-taupe">
                Start Planning
              </p>
              <h3 className="font-serif text-2xl text-charcoal md:text-3xl">
                Your dream interior awaits
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-charcoal/60">
                Share your project details and we&apos;ll craft a personalised
                design proposal within 48 hours.
              </p>
              <a
                href="#contact"
                className="mt-8 border border-charcoal bg-charcoal px-10 py-4 text-xs font-medium uppercase tracking-[0.25em] text-cream transition-all duration-300 hover:bg-transparent hover:text-charcoal"
              >
                Start Planning
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
