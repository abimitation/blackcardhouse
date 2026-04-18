import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Gizlilik Politikası | BlackCardHouse" };

export default function PrivacyPolicyPage() {
  return <>
    <Header />
    <div className="px-6 py-10"><section className="mx-auto prose dark:prose-invert">
      <h1>Gizlilik Politikası</h1>
      <p>Bu politika, BlackCardHouse'un kişisel verilerinizi nasıl topladığını, kullandığını ve koruduğunu açıklar.</p>
      <p>Toplayabileceğimiz bilgiler arasında ad, soyad, e-posta adresi, telefon numarası, Telegram kullanıcı adı, fatura ve teslimat bilgileri ile bize ilettiğiniz diğer bilgiler yer alabilir.</p>
      <h2>Verileri Nasıl Kullanıyoruz?</h2>
      <ul><li>Hizmet sunmak ve taleplerinizi yönetmek</li><li>Ödeme ve sipariş süreçlerini yürütmek</li><li>Sizinle iletişim kurmak</li><li>Yasal yükümlülüklere uymak</li></ul>
      <h2>Ödeme Bilgileri</h2>
      <p>BlackCardHouse kredi kartı bilgilerini saklamaz veya işlemez; ödemeler yetkili üçüncü taraf ödeme sağlayıcıları aracılığıyla gerçekleştirilir.</p>
      <h2>Veri Paylaşımı</h2>
      <p>Gerekli olduğu ölçüde, hizmetlerin sağlanabilmesi için verileriniz üçüncü taraf oteller, taşıma şirketleri, etkinlik sağlayıcıları veya ödeme ortaklarıyla paylaşılabilir.</p>
      <h2>Haklarınız</h2>
      <p>Geçerli mevzuata tabi olarak verilerinize erişim, düzeltme veya silme talebinde bulunabilirsiniz.</p>
      <h2>İletişim</h2>
      <p>Gizlilikle ilgili sorularınız için: <a href="mailto:info@blackcardhouse.com">info@blackcardhouse.com</a></p>
    </section></div>
    <Footer />
  </>;
}
