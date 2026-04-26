"use client";

import AmanResorts from "@/components/partner-logos/AmanResorts";
import BurgessYachts from "@/components/partner-logos/BurgessYachts";
import FormulaOne from "@/components/partner-logos/FormulaOne";
import FourSeasons from "@/components/partner-logos/FourSeasons";
import MichelinGuide from "@/components/partner-logos/MichelinGuide";
import NobuHotels from "@/components/partner-logos/NobuHotels";
import Rolex from "@/components/partner-logos/Rolex";
import VistaJet from "@/components/partner-logos/VistaJet";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/Carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { ReactNode } from "react";

type Partner = { logo: ReactNode; name: string };

const partners: Partner[] = [
  {
    logo: <FourSeasons className="w-30 xl:w-40" />,
    name: "Four Seasons Hotels & Resorts",
  },
  {
    logo: <AmanResorts className="w-30 xl:w-40" />,
    name: "Aman Resorts",
  },
  {
    logo: <VistaJet className="w-30 xl:w-40" />,
    name: "VistaJet",
  },
  {
    logo: <BurgessYachts className="w-30 xl:w-40" />,
    name: "Burgess Yachts",
  },
  {
    logo: <MichelinGuide className="w-10 xl:w-16" />,
    name: "Michelin Guide",
  },
  {
    logo: <NobuHotels className="w-30 xl:w-40" />,
    name: "Nobu Hotels",
  },
  {
    logo: <Rolex className="w-20 xl:w-30" />,
    name: "Rolex",
  },
  {
    logo: <FormulaOne className="w-20 xl:w-30" />,
    name: "Formula 1",
  },
];

export default function Partners() {
  return (
    <Carousel
      className="pb-12 xl:pb-30"
      opts={{
        loop: true,
        watchDrag: false,
      }}
      plugins={[AutoScroll({ speed: 1, startDelay: 0 })]}
    >
      <CarouselContent className="min-[1920px]:mx-auto min-[1920px]:max-w-[2560px]">
        {partners.map(({ logo, name }) => (
          <CarouselItem
            key={name}
            className="flex basis-[180px] min-[1920px]:!basis-[340px] xl:basis-[260px]"
          >
            {logo}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
