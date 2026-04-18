"use client";

import { sendContactForm } from "@/actions/mail";
import { contactFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/Form";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";

export default function ContactForm({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { email: "", firstName: "", lastName: "", message: "", phone: "", subject: "" },
  });

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    const result = await sendContactForm(values);
    if (result.error) { toast.error(result.error); return; }
    toast.success("Mesajınız başarıyla gönderildi!");
    onSuccess();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-12 items-start gap-5">
        <div className="col-span-full md:col-span-6"><FormField control={form.control} name="firstName" render={({ field }) => (<FormItem><FormLabel>Ad</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} /></div>
        <div className="col-span-full md:col-span-6"><FormField control={form.control} name="lastName" render={({ field }) => (<FormItem><FormLabel>Soyad</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} /></div>
        <div className="col-span-full md:col-span-6"><FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>E-posta</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} /></div>
        <div className="col-span-full md:col-span-6"><FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Telefon</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>)} /></div>
        <div className="col-span-full"><FormField control={form.control} name="subject" render={({ field }) => (<FormItem><FormLabel>Konu</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} /></div>
        <div className="col-span-full"><FormField control={form.control} name="message" render={({ field }) => (<FormItem><FormLabel>Mesaj</FormLabel><FormControl><Textarea className="min-h-30" {...field} /></FormControl><FormMessage /></FormItem>)} /></div>
        <Button className="col-span-full" size="lg" type="submit" disabled={form.formState.isSubmitting}>Mesaj Gönder</Button>
      </form>
    </Form>
  );
}
