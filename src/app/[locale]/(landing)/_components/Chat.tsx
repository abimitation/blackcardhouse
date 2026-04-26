"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import messagesImg from "@public/img/messages.webp";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

import { useTranslations } from "next-intl";

export default function Chat() {
  const t = useTranslations("Chat");
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  return (
    <div className="px-6 pt-18 pb-12 xl:pt-25 xl:pb-30">
      <div className="mx-auto flex max-w-5xl flex-col-reverse gap-6 lg:flex-row lg:items-center lg:gap-12" ref={ref}>
        <div className="lg:basis-1/2"><div className="mx-auto max-w-sm">
          <h2 className={cn("text-2xl leading-[1.2] font-bold lg:text-[32px]", "transition duration-500", { "translate-y-5 opacity-0": !inView })}>{t("title")}</h2>
          <p className={cn("mt-4 max-w-lg font-light opacity-70", "transition delay-300 duration-500", { "opacity-0": !inView })}>
            {t("description")}
          </p>
          <Button className={cn("mt-8 text-base font-semibold", "transition delay-[600ms] duration-500", { "opacity-0": !inView })} size="lg" asChild>
            <Link className="group flex items-center gap-x-1.5" href="/order-concierge-service">{t("button")}<ArrowRightIcon className="size-4 translate-y-px transition group-hover:translate-x-1" /></Link>
          </Button>
        </div></div>
        <div className="lg:basis-1/2"><Image className={cn("mx-auto w-full max-w-md lg:max-w-none", "transition duration-500 lg:delay-[600ms]", { "scale-95 opacity-0": !inView })} src={messagesImg} alt="" /></div>
      </div>
    </div>
  );
}
