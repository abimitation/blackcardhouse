"use client";

import { cn } from "@/lib/utils";
import { UserRoundIcon } from "lucide-react";
import Link from "next/link";
import ContactUs from "./ContactUs";
import { Button } from "./ui/Button";

const navigation = [
  { label: "Deneyimler", href: "/#experiences" },
  { label: "Hakkımızda", href: "/#about-us" },
];

export default function Nav({ className }: { className?: string }) {
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
          Concierge Hizmeti Sipariş Et
        </Link>
      </Button>
    </nav>
  );
}
