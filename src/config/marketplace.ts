export const MARKETPLACE_CATEGORIES = {
  DAILY_SERVICES: {
    ID: "daily_services",
  },
  BESPOKE_EXPERIENCES: {
    ID: "bespoke_experiences",
  },
  PREMIUM_SERVICES: {
    ID: "premium_services",
  },
} as const;

export const MARKETPLACE_PACKAGES = {
  [MARKETPLACE_CATEGORIES.DAILY_SERVICES.ID]: [
    {
      id: "food_delivery",
      title: "Yemek Teslimatı",
      amount: 15,
      features: ["Hızlı teslimat", "Güvenilir hizmet"],
    },
    {
      id: "medicine_delivery",
      title: "İlaç Teslimatı",
      amount: 20,
      features: ["Reçeteli ve reçetesiz ilaçlar", "Gizli teslimat"],
    },
    {
      id: "errand_running",
      title: "Günlük İş Takibi",
      amount: 25,
      features: ["Kişisel iş takibi", "Zaman kazandıran destek"],
    },
    {
      id: "gift_shopping",
      title: "Hediye Alışverişi",
      amount: 30,
      features: ["Her durum için ürün temini", "Teslimat dahil"],
    },
    {
      id: "transportation_booking",
      title: "Ulaşım Rezervasyonu",
      amount: 10,
      features: ["Hızlı ulaşım rezervasyonu", "Verimli lojistik"],
    },
    {
      id: "cleaning_services",
      title: "Cleaning Hizmets",
      amount: 60,
      features: ["Profesyonel ev ve ofis temizliği", "Kusursuz sonuçlar"],
    },
  ],
  [MARKETPLACE_CATEGORIES.BESPOKE_EXPERIENCES.ID]: [
    {
      id: "restaurant_reservations",
      title: "Restoran Rezervasyonları",
      amount: 100,
      features: ["Seçkin restoranlarda masa ayırtma", "Sorunsuz rezervasyon"],
    },
    {
      id: "travel_arrangements",
      title: "Seyahat Düzenlemeleri",
      amount: 200,
      features: ["Uçuş ve konaklama rezervasyonu", "Rota planlaması"],
    },
    {
      id: "event_tickets",
      title: "Etkinlik Biletleri",
      amount: 150,
      features: ["Özel etkinliklere erişim", "VIP oturma seçenekleri"],
    },
    {
      id: "stays_and_accommodations",
      title: "Konaklama Seçenekleri",
      amount: 300,
      features: ["Lüks otel rezervasyonları", "Kişiselleştirilmiş konaklama deneyimleri"],
    },
    {
      id: "car_rentals",
      title: "Araç Kiralama",
      amount: 120,
      features: ["Premium araç seçenekleri", "Kolay teslim alma ve bırakma"],
    },
    {
      id: "private_chef_services",
      title: "Private Chef Hizmets",
      amount: 250,
      features: [
        "Evde gurme yemek",
        "Özel menüler",
        "Profesyonel hizmet",
      ],
    },
  ],
  [MARKETPLACE_CATEGORIES.PREMIUM_SERVICES.ID]: [
    {
      id: "premium_travel_package",
      title: "Premium Seyahat Paketi",
      amount: 1000,
      features: [
        "Kişiselleştirilmiş seyahat planı",
        "Lüks konaklama ve ulaşım",
        "Özel deneyimler ve aktiviteler",
      ],
    },
    {
      id: "luxury_suite_booking",
      title: "Lüks Suit Rezervasyonu",
      amount: 800,
      features: [
        "5 yıldızlı suit rezervasyonları",
        "VIP hizmetler ve ayrıcalıklar",
        "Kişisel concierge desteği",
      ],
    },
    {
      id: "event_organisation",
      title: "Etkinlik Organizasyonu",
      amount: 700,
      features: [
        "Kapsamlı etkinlik koordinasyonu",
        "Tedarikçi yönetimi",
        "Yerinde destek",
      ],
    },
    {
      id: "personal_shopper",
      title: "Kişisel Alışveriş Danışmanı",
      amount: 400,
      features: [
        "Kişiye özel alışveriş deneyimi",
        "Seçkin markalara erişim",
        "Stil danışmanlığı",
      ],
    },
    {
      id: "private_jet_charter",
      title: "Özel Jet Kiralama",
      amount: 5000,
      features: [
        "Global seyahat esnekliği",
        "VIP terminal erişimi",
        "Lüks uçuş içi hizmet",
      ],
    },
    {
      id: "yacht_charter",
      title: "Yat Kiralama",
      amount: 3500,
      features: [
        "Özel deniz deneyimleri",
        "Profesyonel mürettebat",
        "Özel rotalar",
      ],
    },
  ],
} as const;

export type MarketplacePackage =
  (typeof MARKETPLACE_PACKAGES)[keyof typeof MARKETPLACE_PACKAGES][number];

export const marketplacePackageIds = Object.values(MARKETPLACE_PACKAGES)
  .flat()
  .map((pkg) => pkg.id);

export type MarketplacePackageId = (typeof marketplacePackageIds)[number];

export const marketplacePackageIdsMap = marketplacePackageIds as [
  MarketplacePackageId,
  ...MarketplacePackageId[],
];

export const marketplacePackagePricing = Object.fromEntries(
  Object.values(MARKETPLACE_PACKAGES)
    .flat()
    .map((pkg) => [pkg.id, pkg.amount]),
) as Record<MarketplacePackageId, number>;
