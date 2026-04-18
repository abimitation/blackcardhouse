"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

export default function Hero() {
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <div className="px-6 pb-6">
      <div className={cn("relative mx-auto max-w-7xl overflow-hidden rounded-3xl px-6 py-26 xl:py-30", "transition delay-300 duration-500", { "opacity-0": !inView })}>
        <video ref={ref} className={cn("absolute top-0 left-0 size-full object-cover", "transition delay-300 duration-500", { "opacity-0": !inView })} autoPlay loop muted playsInline>
          <source src="/img/hero.mp4" type="video/mp4" />
        </video>
        <div className="relative text-center">
          <h1 className={cn("mx-auto max-w-[812px] text-[28px] leading-[1.2] font-bold md:text-[56px]", "transition delay-[600ms] duration-500", { "translate-y-5 opacity-0": !inView })}>
            Yaşam Tarzınızı Özel Concierge Hizmetleriyle Bir Üst Seviyeye Taşıyın
          </h1>
          <p className={cn("mx-auto mt-4 max-w-xl text-lg font-light opacity-80", "transition delay-[900ms] duration-500", { "opacity-0": !inView })}>
            BlackCardHouse, ihtiyaçlarınıza göre şekillenen seçkin hizmetler sunar; her ayrıntı özen, hız ve kişisel ilgiyle yönetilir.
          </p>
          <Button className={cn("mt-13 text-base font-semibold", "transition delay-[1200ms] duration-500", { "opacity-0": !inView })} size="lg" asChild>
            <Link href="/order-concierge-service">Başlayın</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
