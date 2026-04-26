"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/Carousel";
import { Experience, experiences } from "@/config/experiences";
import { cn } from "@/lib/utils";

import Image from "next/image";
import { useInView } from "react-intersection-observer";

import { useTranslations } from "next-intl";

const ExperienceCard = ({ description, img, title, slug }: Experience) => {
  const t = useTranslations("Experiences");
  return (
    <div className="flex h-full flex-col" id="experiences">
      <div className="relative h-38 overflow-hidden rounded-t-2xl">
        <Image
          className="absolute top-0 left-0 size-full object-cover"
          src={img}
          alt=""
        />
      </div>
      <div className="flex grow flex-col rounded-b-2xl bg-neutral-800/50 p-8">
        <h3 className="text-2xl font-bold">{t(`${slug.replace(/-/g, '_')}.title`)}</h3>
        <p className="mt-3 text-sm font-light opacity-70">{t(`${slug.replace(/-/g, '_')}.description`)}</p>
      </div>
    </div>
  );
};

export default function Experiences() {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <Carousel
      opts={{
        align: "start",
        containScroll: "keepSnaps",
        breakpoints: {
          "(min-width: 1280px)": {
            active: false,
          },
        },
      }}
    >
      <CarouselContent className="mr-6 ml-0 xl:mx-auto xl:max-w-7xl" ref={ref}>
        {experiences.map((experience, i) => (
          <CarouselItem
            key={experience.slug}
            className={cn(
              "max-w-xs basis-4/5 pl-6",
              "transition duration-500",
              { "translate-y-5 opacity-0": !inView },
            )}
            style={{ transitionDelay: `${i * 200}ms` }}
          >
            <ExperienceCard
              title={experience.title}
              description={experience.description}
              slug={experience.slug}
              img={experience.img}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
