"use client";

import { MenuIcon } from "lucide-react";
import Nav from "./Nav";
import { Button } from "./ui/Button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/Sheet";

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="ms-auto h-11 xl:hidden" variant="ghost">
          <span className="sr-only">Mobil menüyü aç/kapat</span>
          <MenuIcon className="size-7 text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent className="gap-y-0 overflow-y-auto border-neutral-700 p-5" side="right">
        <SheetHeader className="p-0">
          <SheetTitle className="sr-only">Mobil menü</SheetTitle>
          <SheetDescription className="sr-only">Mobil navigasyon</SheetDescription>
        </SheetHeader>
        <Nav className="my-auto flex-col gap-y-10" />
      </SheetContent>
    </Sheet>
  );
}
