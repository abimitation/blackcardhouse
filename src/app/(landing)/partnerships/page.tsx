import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Partnerlikler | BlackCardHouse" };

export default function PartnershipsPage() {
  return <>
    <Header />
    <div className="px-6 py-10">
      <section className="mx-auto prose dark:prose-invert">
        <h1>Partnerlikler</h1>
        <p>BlackCardHouse olarak seçkin oteller, restoranlar, ulaşım sağlayıcıları, etkinlik organizatörleri ve lüks marka ortaklarıyla çalışıyoruz.</p>
        <p>Amacımız, müşterilerimize yüksek kalite, hızlı iletişim ve güvenilir operasyon sunarken partnerlerimiz için de sürdürülebilir ve değerli iş birlikleri oluşturmaktır.</p>
        <h2>Neden BlackCardHouse ile Çalışmalısınız?</h2>
        <ul><li>Seçkin ve uluslararası müşteri kitlesi</li><li>Hızlı, profesyonel ve kişiselleştirilmiş koordinasyon</li><li>Uzun vadeli ve güvene dayalı iş birliği yaklaşımı</li><li>Yüksek standartlı marka temsili</li></ul>
        <h2>İlgilendiğimiz Alanlar</h2>
        <ul><li>Lüks konaklama ve villalar</li><li>Özel transfer, havacılık ve yat hizmetleri</li><li>Fine dining ve özel etkinlikler</li><li>Moda, mücevher ve sınırlı üretim lüks ürünler</li></ul>
        <p>BlackCardHouse ile partnerlik fırsatlarını değerlendirmek isterseniz bizimle şu adresten iletişime geçebilirsiniz: <a href="mailto:info@blackcardhouse.com">info@blackcardhouse.com</a>.</p>
      </section>
    </div>
    <Footer />
  </>;
}
