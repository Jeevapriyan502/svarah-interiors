"use client";

import { motion } from "framer-motion";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const navLinks = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Packages", href: "#packages" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const isScrolled = useScrollPosition(40);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-cream/90 backdrop-blur-md shadow-sm border-b border-stone/30"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10 lg:py-7">
        <a
          href="#"
          className={`mr-10 shrink-0 font-serif text-xl tracking-[0.2em] uppercase transition-colors duration-300 lg:mr-16 ${
            isScrolled ? "text-charcoal" : "text-cream"
          }`}
        >
          Svarah Interiors
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-300 hover:text-taupe ${
                  isScrolled ? "text-charcoal/80" : "text-cream/90"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
