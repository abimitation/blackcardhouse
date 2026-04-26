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
  const t = await getTranslations({ locale, namespace: "PrivacyPolicy" });

  return {
    title: `${t("title")} | BlackCardHouse`,
  };
}

export default function PrivacyPolicyPage() {
  const t = useTranslations("PrivacyPolicy");

  return (
    <>
      <Header />
      <div className="px-6 py-10">
        <section className="mx-auto prose dark:prose-invert">
          <h1>{t("title")}</h1>
          <p>{t("description")}</p>
          <p>{t("data_info")}</p>
          <h2>{t("how_we_use_title")}</h2>
          <ul>
            {(t.raw("how_we_use_items") as string[]).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2>{t("payment_title")}</h2>
          <p>{t("payment_info")}</p>
          <h2>{t("sharing_title")}</h2>
          <p>{t("sharing_info")}</p>
          <h2>{t("rights_title")}</h2>
          <p>{t("rights_info")}</p>
          <h2>{t("contact_title")}</h2>
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
