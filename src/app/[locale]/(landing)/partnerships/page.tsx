import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Partnerships" });

  return {
    title: `${t("title")} | BlackCardHouse`,
  };
}

export default async function PartnershipsPage() {
  const t = await getTranslations("Partnerships");
  const whyItems: string[] = t.raw("why_items");
  const focusItems: string[] = t.raw("focus_items");

  return <>
    <Header />
    <div className="px-6 py-10">
      <section className="mx-auto prose dark:prose-invert">
        <h1>{t("title")}</h1>
        <p>{t("intro")}</p>
        <p>{t("goal")}</p>
        <h2>{t("why_title")}</h2>
        <ul>{whyItems.map((item, index) => <li key={index}>{item}</li>)}</ul>
        <h2>{t("focus_title")}</h2>
        <ul>{focusItems.map((item, index) => <li key={index}>{item}</li>)}</ul>
        <p>{t("contact")} <a href="mailto:info@blackcardhouse.com">info@blackcardhouse.com</a>.</p>
      </section>
    </div>
    <Footer />
  </>;
}
