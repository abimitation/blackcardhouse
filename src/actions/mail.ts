"use server";

import tr from "@/messages/tr.json";
import en from "@/messages/en.json";
import { mailClient } from "@/lib/mail/client";
import { contactFormMailTemplate } from "@/lib/mail/templates/contactForm";
import {
  orderConfirmationMailTemplate,
  OrderConfirmationMailTemplateProps,
} from "@/lib/mail/templates/orderConfirmation";
import { ContactFormValues } from "@/lib/validations";

export async function sendContactForm(data: ContactFormValues) {
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

interface Messages {
  OrderConfirmation: {
    subject: string;
  };
}

export async function sendOrderConfirmationMail(
  data: OrderConfirmationMailTemplateProps,
) {
  try {
    const messages = (data.locale === "tr" ? tr : en) as unknown as Messages;

    await Promise.all([
      await mailClient.sendMail({
        from: `"BlackCardHouse" <${process.env.MAIL_USERNAME}>`,
        to: data.email,
        subject: messages.OrderConfirmation.subject,
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
