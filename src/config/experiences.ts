import fineDiningImg from "@public/img/fine-dining.webp";
import luxuryGoodsImg from "@public/img/luxury-goods.webp";
import luxuryTransportationImg from "@public/img/luxury-transportation.webp";
import travelImg from "@public/img/travel.webp";
import { StaticImageData } from "next/image";

export type Experience = {
  description: string;
  slug: string;
  img: StaticImageData;
  title: string;
};

export const experiences: Experience[] = [
  {
    title: "Seyahat",
    description:
      "İster lüks bir otel, ister özel ada kaçamağı ya da büyüleyici bir sahil destinasyonu olsun; seyahat ekibimiz size özel kusursuz bir plan hazırlar.",
    slug: "travel",
    img: travelImg,
  },
  {
    title: "Lüks Ulaşım",
    description:
      "Birinci sınıf uçuşlardan özel jetlere ve lüks yatlara kadar kişiselleştirilmiş ulaşım çözümleriyle en üst düzey konforu yaşayın.",
    slug: "luxury-transportation",
    img: luxuryTransportationImg,
  },
  {
    title: "Fine Dining ve Gece Hayatı",
    description:
      "Seçkin restoranlara, Michelin yıldızlı mekanlara ve özel etkinliklere ayrıcalıklı erişimin keyfini çıkarın.",
    slug: "fine-dining-and-nightlife",
    img: fineDiningImg,
  },
  {
    title: "Lüks Ürünler",
    description:
      "Nadir ve özel lüks ürünler dahil olmak üzere aradığınız parçaların teminini uzman ekibimize bırakın.",
    slug: "luxury-goods",
    img: luxuryGoodsImg,
  },
];
