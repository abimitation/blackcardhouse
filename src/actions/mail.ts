"use server";

import { mailClient } from "@/lib/mail/client";
import { contactFormMailTemplate } from "@/lib/mail/templates/contactForm";
import {
  orderConfirmationMailTemplate,
  OrderConfirmationMailTemplateProps,
} from "@/lib/mail/templates/orderConfirmation";
import { contactFormSchema } from "@/lib/validations";
import { z } from "zod";

export async function sendContactForm(data: z.infer<typeof contactFormSchema>) {
  try {
    await mailClient.sendMail({
      from: `"BlackCardHouse" <${process.env.MAIL_USERNAME}>`,
      to: process.env.MAIL_USERNAME,
      subject: `[Contact Form] ${data.subject}`,
      html: contactFormMailTemplate(data),
    });

    return { error: null };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
    return { error: "Unable to send an enquiry" };
  }
}

export async function sendOrderConfirmationMail(
  data: OrderConfirmationMailTemplateProps,
) {
  try {
    await Promise.all([
      await mailClient.sendMail({
        from: `"BlackCardHouse" <${process.env.MAIL_USERNAME}>`,
        to: data.email,
        subject: "Sipariş onayı",
        html: orderConfirmationMailTemplate(data),
      }),
      await mailClient.sendMail({
        from: `"BlackCardHouse" <${process.env.MAIL_USERNAME}>`,
        to: process.env.MAIL_USERNAME,
        subject: `[New Order] ${data.orderId}`,
        html: orderConfirmationMailTemplate(data),
      }),
    ]);

    return { error: null };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
    return { error: "Unable to send an order confirmation" };
  }
}
