import { BadgeCheckIcon } from "lucide-react";
import { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { db } from "@/db";
import { ordersTable } from "@/db/schema";
import { PAYMENT_STATUSES } from "@/lib/validations";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Ödeme Başarılı | BlackCardHouse",
};

export default async function SuccessPage({
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
          <h1 className="text-center text-primary">
            Üyeliğiniz Onaylandı!
          </h1>
          <p className="text-center">
            BlackCardHouse'a katıldığınız için teşekkür ederiz.
            <br />Aktif hizmetinizin detaylarını içeren bir onay e-postası gelen kutunuza gönderildi.
            <br />
            <br />
            Concierge ekibimizden biri kısa süre içinde verdiğiniz Telegram kullanıcı adı üzerinden sizinle iletişime geçecektir. Seyahat planlaması, özel rezervasyonlar ve lüks ürün temini gibi ihtiyaçlarınız için artık destek bir mesaj uzağınızda.
            <br />
            <br />
            Ek sorularınız için destek ekibimize şu adresten ulaşabilirsiniz: 
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
