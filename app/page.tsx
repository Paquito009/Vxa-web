import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ChatDemo from "@/components/ChatDemo";
import ListingDemo from "@/components/ListingDemo";
import ContactForm from "@/components/ContactForm";
import TechStack from "@/components/TechStack";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent-primary focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <Navbar />

      <main className="overflow-x-hidden">
        <Hero />
        <Services />
        <ChatDemo />
        <ListingDemo />
        <ContactForm />
        <TechStack />
        <About />
      </main>

      <Footer />
    </>
  );
}
