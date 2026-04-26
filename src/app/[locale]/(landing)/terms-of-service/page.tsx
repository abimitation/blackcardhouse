import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { currencyKeys } from "@/config/currencies";
import { services } from "@/config/services";
import { formatPrice } from "@/lib/utils";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TermsOfService" });

  return {
    title: `${t("title")} | BlackCardHouse`,
  };
}

export default function TermsOfServicePage() {
  const t = useTranslations("TermsOfService");
  const tServices = useTranslations("Services");

  return (
    <>
      <Header />
      <div className="px-6 py-10">
        <section className="mx-auto prose dark:prose-invert">
          <h1>{t("title")}</h1>
          <p>
            <strong>{t("date_label")}:</strong> {t("date_value")}
          </p>
          <p>{t("intro")}</p>
          <p>{t("agreement")}</p>

          {(t.raw("sections") as any[]).map((section, index) => (
            <div key={index}>
              <h2>{section.title}</h2>
              {section.content && <p>{section.content}</p>}
              {section.items && (
                <ul>
                  {section.items.map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {index === 0 && (
                <ul>
                  {services.map((service) => (
                    <li key={service.id}>
                      <strong>{tServices(`${service.id}.title`)}</strong> –{" "}
                      {currencyKeys.map((currency, i) => (
                        <span key={currency}>
                          {formatPrice(service.amount, currency)}
                          {i < currencyKeys.length - 1 ? " / " : ""}
                        </span>
                      ))}
                      {!service.isDynamic && " / month"}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      </div>
      <Footer />
    </>
  );
}
