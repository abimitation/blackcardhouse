import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = { title: "İade ve İptal Politikası | BlackCardHouse" };

export default function RefundPolicyPage() {
  return <>
    <Header />
    <div className="px-6 py-10"><section className="mx-auto prose dark:prose-invert">
      <h1>İade ve İptal Politikası</h1>
      <p>Bu politika, BlackCardHouse üzerinden satın alınan hizmetler için uygulanacak iade ve iptal esaslarını açıklar.</p>
      <p>Concierge üyelikleri ve erişim paketleri, etkinleştirildikten sonra kural olarak iade edilmez. Hizmet süresi içinde kullanılmayan erişimler ayrıca telafi veya kredi doğurmaz.</p>
      <p>Belirli rezervasyonlar, etkinlikler veya üçüncü taraf hizmetleri için ek iptal şartları geçerli olabilir. Böyle durumlarda ilgili sağlayıcının koşulları uygulanır.</p>
      <p>BlackCardHouse'un iç operasyonel nedenlerle bir hizmeti yerine getirememesi halinde, duruma göre tam veya kısmi iade ya da kredi değerlendirmesi yapılabilir.</p>
      <p>İade talepleri için bizimle şu adresten iletişime geçin: <a href="mailto:info@blackcardhouse.com">info@blackcardhouse.com</a></p>
    </section></div>
    <Footer />
  </>;
}
