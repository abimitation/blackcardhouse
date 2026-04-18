import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";
import About from "./_components/About";
import Chat from "./_components/Chat";
import CTA from "./_components/CTA";
import Experiences from "./_components/Experiences";
import Hero from "./_components/Hero";
import Partners from "./_components/Partners";

export const metadata: Metadata = {
  title: "Lüks Concierge Hizmetleri | BlackCardHouse",
  description: "BlackCardHouse ile seyahat, lüks ulaşım, seçkin restoran rezervasyonları ve özel yaşam tarzı çözümlerine erişin.",
};

export default function HomePage() {
  return <>
      <Header />
      <Hero />
      <About />
      <Experiences />
      <Chat />
      <Partners />
      <CTA />
      <Footer />
    </>;
}
