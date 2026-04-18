"use client";

import { useState } from "react";
import ContactForm from "./ContactForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/Dialog";

export default function ContactUs() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="cursor-pointer font-light transition hover:text-green-600">
        Bize Ulaşın
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Bize Ulaşın</DialogTitle>
          <DialogDescription>
            Aşağıdaki formu doldurun; concierge ekibimiz en kısa sürede sizinle iletişime geçecektir.
          </DialogDescription>
        </DialogHeader>
        <ContactForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
