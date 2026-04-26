import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";
import About from "./_components/About";
import Chat from "./_components/Chat";
import CTA from "./_components/CTA";
import Experiences from "./_components/Experiences";
import Hero from "./_components/Hero";
import Partners from "./_components/Partners";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("home_title"),
    description: t("home_description"),
  };
}

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
