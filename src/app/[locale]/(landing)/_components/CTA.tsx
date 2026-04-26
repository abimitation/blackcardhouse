"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import appScreen1Img from "@public/img/app-screen-1.webp";
import appScreen2Img from "@public/img/app-screen-2.webp";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

import { useTranslations } from "next-intl";

export default function CTA() {
  const t = useTranslations("CTA");
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  return (
    <div className="p-6">
      <div className="mx-auto flex max-w-7xl flex-col overflow-hidden rounded-3xl bg-primary px-6 py-10 lg:flex-row-reverse lg:py-35" ref={ref}>
        <div className="lg:basis-1/2"><div className="mx-auto max-w-xl lg:ms-0 lg:max-w-md">
          <h2 className={cn("text-[32px] leading-[1.2] font-bold text-neutral-100 lg:text-[40px]", "transition duration-500", { "translate-y-5 opacity-0": !inView })}>{t("title")}</h2>
          <p className={cn("mt-4 font-light text-neutral-100", "transition delay-300 duration-500", { "opacity-0": !inView })}>
            {t("description")}
          </p>
          <Button className={cn("mt-6 bg-black! text-base font-semibold text-white! hover:bg-black/70!", "transition delay-[600ms] duration-500", { "opacity-0": !inView })} size="lg" asChild>
            <Link href="/order-concierge-service">{t("button")}</Link>
          </Button>
        </div></div>
        <div className="relative h-[380px] lg:basis-1/2">
          <Image className={cn("absolute top-6 left-1/2 z-10 w-45 -translate-x-[28%] lg:-top-13 lg:w-xs lg:-translate-x-[90%]", "transition delay-[750ms] duration-500", { "opacity-0 lg:translate-y-10": !inView })} src={appScreen1Img} alt="" />
          <Image className={cn("absolute -bottom-17.5 left-1/2 w-45 -translate-x-[75%] lg:w-xs lg:-translate-x-[15%]", "transition delay-[450ms] duration-500", { "opacity-0 max-xl:translate-y-10 lg:-translate-y-20": !inView })} src={appScreen2Img} alt="" />
        </div>
      </div>
    </div>
  );
}
