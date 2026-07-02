import { RevealOnScroll } from "./RevealOnScroll";

export function AboutSection() {
  return (
    <section id="about" className="bg-charcoal py-24 text-cream lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <RevealOnScroll>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-taupe">
              Our Philosophy
            </p>
            <h2 className="font-serif text-4xl md:text-5xl">
              Design rooted in <span className="italic">balance</span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-cream/65">
              Svarah — meaning &ldquo;voice&rdquo; in Sanskrit — is our belief
              that every space should speak authentically. We blend timeless
              craftsmanship with contemporary sensibility to create interiors
              that feel both elevated and deeply personal.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
