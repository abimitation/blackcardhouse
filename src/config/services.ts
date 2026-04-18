export const services = [
  {
    id: "signature_30",
    title: "Signature 30",
    amount: 149.99,
    features: [
      "Ayda 30 talebe kadar",
      "7/24 concierge erişimi",
      "Seyahat planlama ve rota desteği",
      "Yaşam tarzı yönetimi (hedefler, planlar vb.)",
    ],
    isDynamic: false,
  },
  {
    id: "signature_75",
    title: "Signature 75",
    amount: 249.49,
    features: [
      "Ayda 75 talebe kadar",
      "7/24 concierge erişimi",
      "Seyahat planlama ve rota desteği",
      "Yaşam tarzı yönetimi (hedefler, planlar vb.)",
    ],
    isDynamic: false,
  },
  {
    id: "signature_100",
    title: "Signature 100",
    amount: 349.45,
    features: [
      "Ayda 100 talebe kadar",
      "Öncelikli yanıt süreleri",
      "7/24 concierge erişimi",
      "Seyahat ve konaklama koordinasyonu",
      "Yaşam tarzı planlaması (hedefler, deneyimler, etkinlikler)",
    ],
    isDynamic: false,
  },
  {
    id: "premier",
    title: "Premier",
    amount: 499.99,
    features: [
      "Garanti restoran ve etkinlik rezervasyonları",
      "Seçkin mekanlara VIP erişim",
      "Gelişmiş seyahat ve kişisel lojistik desteği",
      "7/24 concierge erişimi",
    ],
    isDynamic: false,
  },
  {
    id: "jet_setter",
    title: "Jet Setter",
    amount: 749.49,
    features: [
      "Lüks seyahat concierge hizmeti (uçuşlar, jetler, oteller)",
      "VIP havalimanı hizmetleri ve lounge erişimi",
      "100+ beş yıldızlı otelde özel fiyatlar",
      "Gelişmiş seyahat ve kişisel lojistik desteği",
      "7/24 concierge erişimi",
    ],
    isDynamic: false,
  },
  {
    id: "executive_elite",
    title: "Executive Elite",
    amount: 999.45,
    features: [
      "Ultra öncelikli concierge erişimi",
      "Kurumsal ve kişisel yaşam tarzı yönetimi",
      "Etkinlik planlama ve iş seyahati desteği",
      "Nadir lüks ürün temini",
      "7/24 concierge erişimi",
    ],
    isDynamic: false,
  },
  {
    id: "daily_access",
    title: "Daily Access",
    amount: 20.49,
    features: [
      "Seçilen günler için tam concierge erişimi",
      "Tatil, etkinlik veya yoğun haftalar için ideal",
      "Aktif günlerde tüm deneyimlere erişim",
      "Sürekli bağlılık yok",
    ],
    isDynamic: true,
  },
  {
    id: "request_access",
    title: "Request Access",
    amount: 10,
    features: [
      "Talep başına ödeme esnekliği",
      "Tüm deneyimlere erişim",
      "Seyrek kullanım veya özel ihtiyaçlar için ideal",
      "Sürekli bağlılık yok",
    ],
    isDynamic: true,
  },
] as const;

export const serviceIds = services.map((s) => s.id);
export const serviceAmounts = services.map((s) => s.amount);

export type Hizmet = (typeof services)[number];
export type HizmetId = (typeof serviceIds)[number];
type HizmetAmount = (typeof serviceAmounts)[number];

export const serviceMap = serviceIds as [HizmetId, ...HizmetId[]];

export const servicePricing = Object.fromEntries(
  services.map((s) => [s.id, s.amount]),
) as Record<HizmetId, HizmetAmount>;
