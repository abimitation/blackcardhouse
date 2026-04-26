import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "RefundPolicy" });

  return {
    title: `${t("title")} | BlackCardHouse`,
  };
}

export default function RefundPolicyPage() {
  const t = useTranslations("RefundPolicy");

  return (
    <>
      <Header />
      <div className="px-6 py-10">
        <section className="mx-auto prose dark:prose-invert">
          <h1>{t("title")}</h1>
          <p>{t("description")}</p>
          <p>{t("membership_info")}</p>
          <p>{t("third_party_info")}</p>
          <p>{t("operational_info")}</p>
          <p>
            {t("contact_info")}{" "}
            <a href="mailto:info@blackcardhouse.com">info@blackcardhouse.com</a>
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
