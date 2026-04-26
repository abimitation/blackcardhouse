"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import ContactForm from "./ContactForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/Dialog";

export default function ContactUs() {
  const t = useTranslations("ContactUs");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="cursor-pointer font-light transition hover:text-green-600">
        {t("trigger")}
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>
            {t("description")}
          </DialogDescription>
        </DialogHeader>
        <ContactForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
