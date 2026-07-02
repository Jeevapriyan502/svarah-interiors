export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    id: "1",
    question: "What areas do you serve?",
    answer:
      "Svarah Interiors works with clients all over India. We offer in-person consultations in major cities and virtual consultations for projects nationwide.",
  },
  {
    id: "2",
    question: "How long does a typical project take?",
    answer:
      "A single room typically takes 6–10 weeks from concept to completion. Full-home projects may span 4–6 months depending on scope, custom furniture, and site conditions.",
  },
  {
    id: "3",
    question: "Do you work with existing furniture?",
    answer:
      "Absolutely. We love blending heirloom pieces and existing furniture with new elements to create spaces that feel personal and layered, not entirely replaced.",
  },
  {
    id: "4",
    question: "What is included in the consultation package?",
    answer:
      "Our Essence package includes a detailed site visit, mood board, colour palette, material suggestions, and a clear roadmap — ideal if you want expert direction before committing to a full project.",
  },
  {
    id: "5",
    question: "How do I get started?",
    answer:
      "Fill out the inquiry form below or call us directly. We'll schedule a discovery call to understand your space, timeline, and budget, then recommend the right package for you.",
  },
];
