"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectType } from "@/lib/types";
import {
  isValidGmail,
  isValidIndianPhone,
  validationMessages,
} from "@/lib/validation";
import { RevealOnScroll } from "./RevealOnScroll";

const projectTypes: ProjectType[] = [
  "Residential",
  "Commercial",
  "Hospitality",
  "Renovation",
  "Full Interior",
  "Consultation",
];

const inputClasses =
  "w-full border-b border-charcoal/20 bg-transparent py-3 text-charcoal placeholder:text-charcoal/35 outline-none transition-colors focus:border-taupe";

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = (formData.get("email") as string).trim();
    const phone_number = (formData.get("phone_number") as string).trim();

    if (!isValidGmail(email)) {
      setStatus("error");
      setErrorMessage(validationMessages.gmail);
      return;
    }

    if (!isValidIndianPhone(phone_number)) {
      setStatus("error");
      setErrorMessage(validationMessages.phone);
      return;
    }

    setStatus("loading");

    const payload = {
      client_name: formData.get("client_name") as string,
      email,
      project_type: formData.get("project_type") as ProjectType,
      phone_number,
      message: (formData.get("message") as string) || undefined,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to submit inquiry."
      );
    }
  }

  return (
    <section id="contact" className="bg-warm-gray py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <RevealOnScroll>
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-taupe">
                Get in Touch
              </p>
              <h2 className="font-serif text-4xl text-charcoal md:text-5xl">
                Begin your
                <br />
                <span className="italic">transformation</span>
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-charcoal/60">
                Share your vision with us. We&apos;ll schedule a private
                consultation to understand your space, lifestyle, and aesthetic
                aspirations.
              </p>

              <div className="mt-12 space-y-4 text-sm text-charcoal/70">
                <p>hello@svarahinteriors.com</p>
                <p>+91 90253 31605</p>
                <p>All over India</p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label
                  htmlFor="client_name"
                  className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-charcoal/50"
                >
                  Full Name
                </label>
                <input
                  id="client_name"
                  name="client_name"
                  type="text"
                  required
                  placeholder="Your name"
                  className={inputClasses}
                />
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-charcoal/50"
                  >
                    Gmail ID
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@gmail.com"
                    pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
                    title="Enter a valid Gmail address (example@gmail.com)"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone_number"
                    className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-charcoal/50"
                  >
                    Phone
                  </label>
                  <input
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="9025331605 or +91 9025331605"
                    pattern="[0-9+\s\-()]{10,15}"
                    title="Enter a valid 10-digit Indian mobile number"
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="project_type"
                  className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-charcoal/50"
                >
                  Project Type
                </label>
                <select
                  id="project_type"
                  name="project_type"
                  required
                  defaultValue=""
                  className={`${inputClasses} cursor-pointer appearance-none`}
                >
                  <option value="" disabled>
                    Select a project type
                  </option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-charcoal/50"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your project..."
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full border border-charcoal bg-charcoal px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-cream transition-all duration-300 hover:bg-transparent hover:text-charcoal disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {status === "loading" ? "Sending..." : "Send My Plans"}
                </button>

                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <motion.p
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 text-sm text-sage"
                    >
                      Thank you. We&apos;ll be in touch within 48 hours.
                    </motion.p>
                  )}
                  {status === "error" && (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 text-sm text-red-700/80"
                    >
                      {errorMessage}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
