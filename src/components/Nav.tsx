"use client";

import { cn } from "@/lib/utils";
import { UserRoundIcon } from "lucide-react";
import { Link } from "@/i18n/routing";
import ContactUs from "./ContactUs";
import { Button } from "./ui/Button";

import { useTranslations } from "next-intl";

export default function Nav({ className }: { className?: string }) {
  const t = useTranslations("Nav");
  const navigation = [
    { label: t("experiences"), href: "/#experiences" },
    { label: t("about"), href: "/#about-us" },
  ];

  return (
    <nav className={cn("flex items-center gap-x-10", className)}>
      {navigation.map((navItem) => (
        <Link key={navItem.href} className="font-light transition hover:text-green-600" href={navItem.href}>
          {navItem.label}
        </Link>
      ))}
      <ContactUs />
      <Button asChild>
        <Link className="inline-flex items-center gap-x-1 font-light" href="/order-concierge-service">
          <UserRoundIcon className="size-5" />
          {t("order_service")}
        </Link>
      </Button>
    </nav>
  );
}
