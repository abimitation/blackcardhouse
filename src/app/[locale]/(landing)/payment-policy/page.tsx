import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { currencyKeys } from "@/config/currencies";
import { services } from "@/config/services";
import { formatPrice } from "@/lib/utils";
import { Metadata } from "next";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PaymentPolicy" });

  return {
    title: `${t("title")} | BlackCardHouse`,
  };
}

export default async function PaymentPolicyPage() {
  const t = await getTranslations("PaymentPolicy");
  return <>
    <Header />
    <div className="px-6 py-10"><section className="mx-auto prose dark:prose-invert">
      <h1>{t("title")}</h1>
      <p>{t("intro")}</p>
      <p>{t("services_info", { count: services.length })}</p>
      <ul>{services.map((service) => <li key={service.id}><strong>{service.title}</strong> – {currencyKeys.map((currency, index) => <span key={currency}>{formatPrice(service.amount, currency)}{index < currencyKeys.length - 1 ? " / " : ""}</span>)}{!service.isDynamic && ` / ${t("per_month")}`}</li>)}</ul>
      <p>{t("payment_info")}</p>
      <p>{t("currencies_title")}</p>
      <ul>{currencyKeys.map((currency) => <li key={currency}>{currency}</li>)}</ul>
      <p>{t("confirmation_info")}</p>
      <p>{t("contact_info")} <a href="mailto:info@blackcardhouse.com">info@blackcardhouse.com</a>.</p>
    </section></div>
    <Footer />
  </>;
}
