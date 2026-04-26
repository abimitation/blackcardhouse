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
  const t = await getTranslations({ locale, namespace: "Chargeback" });

  return {
    title: `${t("title")} | BlackCardHouse`,
  };
}

export default async function ChargebackPolicyPage() {
  const t = await getTranslations("Chargeback");
  return <>
    <Header />
    <div className="px-6 py-10"><section className="mx-auto prose dark:prose-invert">
      <h1>{t("title")}</h1>
      <p>{t("intro")}</p>
      <p>{t("contact_before")}</p>
      <p>{t("documentation")}</p>
      <p>{t("legal_rights")}</p>
      <p>{t("support")}: <a href="mailto:info@blackcardhouse.com">info@blackcardhouse.com</a></p>
    </section></div>
    <Footer />
  </>;
}
