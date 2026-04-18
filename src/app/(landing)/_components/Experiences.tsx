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

const ExperienceCard = ({ description, img, title }: Experience) => {
  return (
    <div className="flex h-full flex-col" id="experiences">
      <div className="relative h-38 overflow-hidden rounded-t-2xl">
        <Image
          className="absolute top-0 left-0 size-full object-cover"
          src={img}
          alt=""
        />
      </div>
      {/* With "Read more" add "pb-12" */}
      <div className="flex grow flex-col rounded-b-2xl bg-neutral-800/50 p-8">
        <h3 className="text-2xl font-bold">{title}</h3>
        {/* With "Read more" add "mb-7"  */}
        <p className="mt-3 text-sm font-light opacity-70">{description}</p>
        {/* <Link
          className="group mt-auto flex items-center gap-x-1.5 text-sm font-semibold text-primary"
          href={`/services/${slug}`}
        >
          Read more
          <ArrowRightIcon className="size-4 translate-y-px transition group-hover:translate-x-1" />
        </Link> */}
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
