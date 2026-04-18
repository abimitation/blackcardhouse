import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Chargeback Politikası | BlackCardHouse" };

export default function ChargebackPolicyPage() {
  return <>
    <Header />
    <div className="px-6 py-10"><section className="mx-auto prose dark:prose-invert">
      <h1>Chargeback Politikası</h1>
      <p>Bu politika, BlackCardHouse tarafından sağlanan hizmetlere ilişkin chargeback başvurularının nasıl ele alındığını açıklar.</p>
      <p>Chargeback başlatmadan önce müşterilerin destek ekibimizle iletişime geçmesi gerekir. Çoğu uyuşmazlık, doğrudan iletişim yoluyla daha hızlı çözülebilir.</p>
      <p>Chargeback halinde BlackCardHouse; sipariş kaydı, ödeme kaydı, hizmet açıklamaları, kabul edilen politika metinleri ve ilgili iletişim kayıtları dahil olmak üzere gerekli belgeleri ödeme kuruluşuna sunabilir.</p>
      <p>İlk olarak bizimle iletişime geçmeden veya yanıltıcı gerekçelerle chargeback başlatılması durumunda yasal haklarımızı saklı tutarız.</p>
      <p>Destek için: <a href="mailto:info@blackcardhouse.com">info@blackcardhouse.com</a></p>
    </section></div>
    <Footer />
  </>;
}
