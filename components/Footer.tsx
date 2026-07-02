const footerLinks = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Packages", href: "#packages" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-stone/40 bg-cream py-16">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
        <p className="font-serif text-sm tracking-[0.15em] uppercase text-charcoal">
          Svarah Interiors
        </p>
        <p className="mx-auto mt-3 max-w-sm text-xs leading-relaxed text-charcoal/50">
          Luxury interior design studio crafting harmonious spaces across India.
        </p>

        <nav className="mt-12">
          <ul className="flex flex-col items-center gap-5">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium uppercase tracking-[0.2em] text-charcoal transition-colors hover:text-taupe"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 border-t border-stone/30 pt-8">
          <p className="text-xs text-charcoal/50">
            &copy; {new Date().getFullYear()} Svarah Interiors. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
