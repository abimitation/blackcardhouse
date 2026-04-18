import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { currencyKeys } from "@/config/currencies";
import { services } from "@/config/services";
import { formatPrice } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Hizmet Şartları | BlackCardHouse" };

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <div className="px-6 py-10">
        <section className="mx-auto prose dark:prose-invert">
          <h1>Hizmet Şartları</h1>
          <p>
            <strong>Yürürlük Tarihi:</strong> 14/12/2025
          </p>
          <p>
            BlackCardHouse, Birleşik Krallık&apos;ta kayıtlı{" "}
            <strong>The Illustrious Company Limited</strong> tarafından
            işletilen premium bir yaşam tarzı yönetimi ve concierge hizmetidir.
            Bu şartlar, web sitemize, hizmetlerimize ve Telegram dahil iletişim
            kanallarımıza erişiminizi düzenler.
          </p>
          <p>
            Hizmetlerimizi kullanarak bu şartları okuduğunuzu, anladığınızı ve
            kabul ettiğinizi beyan edersiniz.
          </p>
          <h2>1. Hizmet Kapsamı</h2>
          <p>
            BlackCardHouse; seyahat planlama, lüks ulaşım, özel rezervasyonlar,
            etkinlik erişimi, kişisel alışveriş ve talebe özel concierge desteği
            sunar. Tüm hizmetler müsaitlik, yerel mevzuat ve üçüncü taraf
            sağlayıcı koşullarına tabidir.
          </p>
          <h2>2. Paketler ve Ödeme</h2>
          <ul>
            {services.map((service) => (
              <li key={service.id}>
                <strong>{service.title}</strong> –{" "}
                {currencyKeys.map((currency, index) => (
                  <span key={currency}>
                    {formatPrice(service.amount, currency)}
                    {index < currencyKeys.length - 1 ? " / " : ""}
                  </span>
                ))}
                {!service.isDynamic && " / ay"}
              </li>
            ))}
          </ul>
          <p>
            Tüm ücretler peşin ödenir. Üyelikler aksi açıkça belirtilmedikçe
            otomatik yenilenmez.
          </p>
          <h2>3. Uygunluk</h2>
          <p>
            Hizmetleri kullanabilmek için en az 18 yaşında olmanız ve bağlayıcı
            sözleşme yapma ehliyetine sahip olmanız gerekir.
          </p>
          <h2>4. Müşteri Yükümlülükleri</h2>
          <ul>
            <li>Doğru ve güncel iletişim bilgileri sağlamak</li>
            <li>Onay ve ek bilgi taleplerine zamanında yanıt vermek</li>
            <li>
              Rezervasyon ve düzenlemeleri nihai onaydan önce kontrol etmek
            </li>
          </ul>
          <h2>5. Üçüncü Taraf Sağlayıcılar</h2>
          <p>
            Birçok concierge hizmeti bağımsız üçüncü taraf sağlayıcılar
            aracılığıyla yerine getirilir. BlackCardHouse bu hizmetlerde aracı
            olarak hareket eder.
          </p>
          <h2>6. Kullanım Kuralları</h2>
          <p>
            Hizmetler yalnızca yasal ve etik amaçlarla kullanılabilir. Yasadışı,
            kötüye kullanım içeren veya uygunsuz talepler reddedilebilir.
          </p>
          <h2>7. Sorumluluk</h2>
          <p>
            BlackCardHouse, yürürlükteki hukukun izin verdiği en geniş ölçüde,
            dolaylı veya sonuçsal zararlardan sorumlu değildir.
          </p>
          <h2>8. Fikri Mülkiyet</h2>
          <p>
            Web sitemizde ve hizmetlerimiz kapsamında yer alan içerikler
            BlackCardHouse veya ilgili hak sahiplerine aittir.
          </p>
          <h2>9. İletişim</h2>
          <p>
            Bu şartlarla ilgili sorularınız için:{" "}
            <a href="mailto:info@blackcardhouse.com">info@blackcardhouse.com</a>
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
