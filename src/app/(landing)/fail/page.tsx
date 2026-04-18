import { BadgeXIcon } from "lucide-react";
import { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { db } from "@/db";
import { ordersTable } from "@/db/schema";
import { PAYMENT_STATUSES } from "@/lib/validations";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Ödeme Başarısız | BlackCardHouse",
};

export default async function FailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { orderId } = await searchParams;

  if (!orderId) redirect("/");

  const [order] = await db
    .select()
    .from(ordersTable)

    .where(
      and(
        // @ts-expect-error as I cannot satisfy the type but the code works
        eq(ordersTable.id, orderId),
        eq(ordersTable.paymentStatus, PAYMENT_STATUSES.CANCELLED),
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
          <BadgeXIcon className="mx-auto mb-5 size-15 text-red-600" />
          <h1 className="text-center text-red-600">Ödeme Başarısız</h1>
          <p className="text-center">
            Ne yazık ki ödemeniz şu anda işlenemedi.
            <br />
            <br />
            Sorun devam ederse destek ekibimize şu adresten ulaşın: 
            <a className="text-primary" href="mailto:info@blackcardhouse.com">
              info@blackcardhouse.com
            </a>
            .
            <br />
            <br />
            Sipariş No: <span className="text-primary">{orderId}</span>
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
