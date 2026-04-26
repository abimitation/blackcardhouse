"use client";

import { MenuIcon } from "lucide-react";
import Nav from "./Nav";
import { Button } from "./ui/Button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/Sheet";

import { useTranslations } from "next-intl";

export default function MobileMenu() {
  const t = useTranslations("MobileMenu");
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="ms-auto h-11 xl:hidden" variant="ghost">
          <span className="sr-only">{t("sr_open_menu")}</span>
          <MenuIcon className="size-7 text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent className="gap-y-0 overflow-y-auto border-neutral-700 p-5" side="right">
        <SheetHeader className="p-0">
          <SheetTitle className="sr-only">{t("sr_menu_title")}</SheetTitle>
          <SheetDescription className="sr-only">{t("sr_menu_desc")}</SheetDescription>
        </SheetHeader>
        <Nav className="my-auto flex-col gap-y-10" />
      </SheetContent>
    </Sheet>
  );
}
