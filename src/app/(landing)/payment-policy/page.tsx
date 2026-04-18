import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { currencyKeys } from "@/config/currencies";
import { services } from "@/config/services";
import { formatPrice } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Ödeme Politikası | BlackCardHouse" };

export default function PaymentPolicyPage() {
  return <>
    <Header />
    <div className="px-6 py-10"><section className="mx-auto prose dark:prose-invert">
      <h1>Ödeme Politikası</h1>
      <p>Bu politika, BlackCardHouse tarafından sunulan hizmetler için yapılan ödemelere ilişkin temel kuralları açıklar.</p>
      <p>BlackCardHouse şu anda {services.length} farklı concierge hizmet paketi sunmaktadır:</p>
      <ul>{services.map((service) => <li key={service.id}><strong>{service.title}</strong> – {currencyKeys.map((currency, index) => <span key={currency}>{formatPrice(service.amount, currency)}{index < currencyKeys.length - 1 ? " / " : ""}</span>)}{!service.isDynamic && " / ay"}</li>)}</ul>
      <p>Tüm ücretler peşin tahsil edilir. Ödemeler Visa ve Mastercard ile yapılabilir.</p>
      <p>Desteklenen para birimleri:</p>
      <ul>{currencyKeys.map((currency) => <li key={currency}>{currency}</li>)}</ul>
      <p>Ödeme başarıyla tamamlandıktan sonra tarafınıza onay e-postası gönderilir ve ekibimiz sizinle iletişime geçer.</p>
      <p>Herhangi bir sorunuz olursa bizimle şu adresten iletişime geçebilirsiniz: <a href="mailto:info@blackcardhouse.com">info@blackcardhouse.com</a>.</p>
    </section></div>
    <Footer />
  </>;
}
