"use client";

import { packages } from "@/lib/packages-data";
import { RevealOnScroll } from "./RevealOnScroll";

export function PackagesSection() {
  return (
    <section id="packages" className="bg-charcoal py-24 text-cream lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <RevealOnScroll>
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-taupe">
              Packages
            </p>
            <h2 className="font-serif text-4xl md:text-5xl">
              Curated for every <span className="italic">vision</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-cream/60">
              Whether you need guidance or a full transformation, our packages
              are designed to meet you where you are.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid gap-8 md:grid-cols-3">
          {packages.map((pkg, index) => (
            <RevealOnScroll key={pkg.id} delay={index * 0.1}>
              <article
                className={`flex h-full flex-col border p-8 transition-colors duration-300 ${
                  pkg.highlight
                    ? "border-taupe/50 bg-cream/5"
                    : "border-cream/15 bg-transparent hover:border-cream/30"
                }`}
              >
                {pkg.highlight && (
                  <span className="mb-4 inline-block w-fit text-[10px] font-medium uppercase tracking-[0.25em] text-taupe">
                    Most Popular
                  </span>
                )}
                <h3 className="font-serif text-2xl">{pkg.name}</h3>
                <p className="mt-2 text-sm text-cream/55">{pkg.tagline}</p>

                <ul className="mt-8 flex flex-1 flex-col gap-4">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 text-sm leading-relaxed text-cream/75"
                    >
                      <span className="mt-1.5 h-px w-4 shrink-0 bg-taupe/60" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-10 block border py-3.5 text-center text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 ${
                    pkg.highlight
                      ? "border-cream bg-cream text-charcoal hover:bg-transparent hover:text-cream"
                      : "border-cream/40 text-cream hover:border-cream hover:bg-cream hover:text-charcoal"
                  }`}
                >
                  Enquire
                </a>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
