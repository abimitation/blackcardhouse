import { BadgeCheckIcon } from "lucide-react";
import { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { db } from "@/db";
import { ordersTable } from "@/db/schema";
import { PAYMENT_STATUSES } from "@/lib/validations";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Success" });

  return {
    title: `${t("title")} | BlackCardHouse`,
  };
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { orderId } = await searchParams;
  const t = await getTranslations("Success");

  if (!orderId) redirect("/");

  const [order] = await db
    .select()
    .from(ordersTable)
    .where(
      and(
        // @ts-expect-error as I cannot satisfy the type but the code works
        eq(ordersTable.id, orderId),
        eq(ordersTable.paymentStatus, PAYMENT_STATUSES.DONE),
      ),
    );

  if (!order) redirect("/");

  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

  if (new Date(order.createdAt) < tenMinutesAgo) {
    redirect("/");
  }

  return (
    <>
      <Header />
      <div className="px-6 py-10">
        <section className="mx-auto prose dark:prose-invert">
          <BadgeCheckIcon className="mx-auto mb-5 size-15 text-primary" />
          <h1 className="text-center text-primary">{t("header")}</h1>
          <p className="text-center">
            {t("thanks")}
            <br />
            {t("email_info")}
            <br />
            <br />
            {t("telegram_info")}
            <br />
            <br />
            {t("contact_info")}{" "}
            <a className="text-primary" href="mailto:info@blackcardhouse.com">
              info@blackcardhouse.com
            </a>
            .
            <br />
            <br />
            {t("order_no")}: <span className="text-primary">{orderId}</span>
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
