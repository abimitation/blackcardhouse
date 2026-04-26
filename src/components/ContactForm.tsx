"use client";

import { sendContactForm } from "@/actions/mail";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/Form";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";

import { useTranslations } from "next-intl";
import { getContactFormSchema } from "@/lib/validations";

export default function ContactForm({ onSuccess }: { onSuccess: () => void }) {
  const t = useTranslations("ContactForm");
  const v = useTranslations("Validation");
  const schema = getContactFormSchema(v);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", firstName: "", lastName: "", message: "", phone: "", subject: "" },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    const result = await sendContactForm(values);
    if (result.error) { toast.error(result.error); return; }
    toast.success(t("success"));
    onSuccess();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-12 items-start gap-5">
        <div className="col-span-full md:col-span-6"><FormField control={form.control} name="firstName" render={({ field }) => (<FormItem><FormLabel>{t("firstName")}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} /></div>
        <div className="col-span-full md:col-span-6"><FormField control={form.control} name="lastName" render={({ field }) => (<FormItem><FormLabel>{t("lastName")}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} /></div>
        <div className="col-span-full md:col-span-6"><FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>{t("email")}</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} /></div>
        <div className="col-span-full md:col-span-6"><FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>{t("phone")}</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>)} /></div>
        <div className="col-span-full"><FormField control={form.control} name="subject" render={({ field }) => (<FormItem><FormLabel>{t("subject")}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} /></div>
        <div className="col-span-full"><FormField control={form.control} name="message" render={({ field }) => (<FormItem><FormLabel>{t("message")}</FormLabel><FormControl><Textarea className="min-h-30" {...field} /></FormControl><FormMessage /></FormItem>)} /></div>
        <Button className="col-span-full" size="lg" type="submit" disabled={form.formState.isSubmitting}>{t("submit")}</Button>
      </form>
    </Form>
  );
}
