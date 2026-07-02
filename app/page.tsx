import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { MemoryGallery } from "@/components/MemoryGallery";
import { AboutSection } from "@/components/AboutSection";
import { ContactForm } from "@/components/ContactForm";
import { PackagesSection } from "@/components/PackagesSection";
import { FAQSection } from "@/components/FAQSection";
import { BottomCTA } from "@/components/BottomCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PortfolioGrid />
        <MemoryGallery />
        <AboutSection />
        <ContactForm />
        <PackagesSection />
        <FAQSection />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
