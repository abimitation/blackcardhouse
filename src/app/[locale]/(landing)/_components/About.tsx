"use client";

import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";

import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("About");
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  return (
    <div className="px-6 pt-18 pb-12 xl:pt-25 xl:pb-30" id="about-us">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 lg:flex-row lg:gap-12" ref={ref}>
        <div className="lg:basis-1/2"><div className="mx-auto max-w-lg">
          <h2 className={cn("text-2xl leading-[1.2] font-bold lg:text-[32px]", "transition duration-500", { "translate-y-5 opacity-0": !inView })}>{t("title")}</h2>
          <p className={cn("mt-4 font-light opacity-70", "transition delay-300 duration-500", { "opacity-0": !inView })}>
            {t("description")}
            <br /><br />{t("description_extra")}
          </p>
        </div></div>
        <div className="lg:basis-1/2"><div className="mx-auto flex max-w-lg flex-col items-start gap-y-6">
          <div className={cn("flex items-center gap-x-4 rounded-3xl bg-neutral-800/75 px-6 py-4.5", "transition delay-300 duration-500", { "translate-x-10 opacity-0": !inView })}><span className="text-[32px] font-bold text-primary">100+</span><p className="opacity-70">{t("hotels")}</p></div>
          <div className={cn("flex items-center gap-x-4 rounded-3xl bg-neutral-800/75 px-6 py-4.5", "transition delay-[500ms] duration-500", { "translate-x-10 opacity-0": !inView })}><span className="text-[32px] font-bold text-primary">1,000+</span><p className="opacity-70">{t("events")}</p></div>
          <div className={cn("flex items-center gap-x-4 rounded-3xl bg-neutral-800/75 px-6 py-4.5", "transition delay-[700ms] duration-500", { "translate-x-10 opacity-0": !inView })}><span className="text-[32px] font-bold text-primary">50,000+</span><p className="opacity-70">{t("customers")}</p></div>
        </div></div>
      </div>
    </div>
  );
}
