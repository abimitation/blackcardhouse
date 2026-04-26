"use server";

import {
  ErrorResponse,
  TransactionRequest,
  TransactionResponse,
} from "@/lib/validations";

type Payment = {
  amount: number;
  city: string;
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  orderId: string;
  postcode: string;
  street: string;
  userId: string;
  locale?: string;
};

export async function createPayment({
  amount,
  city,
  country,
  email,
  firstName,
  lastName,
  orderId,
  postcode,
  street,
  userId,
  locale,
}: Payment) {
  if (
    !process.env.NEXT_PUBLIC_URL ||
    !process.env.PAYMENT_BASE_API ||
    !process.env.PAYMENT_APP_TOKEN ||
    !process.env.PAYMENT_APP_SECRET ||
    !process.env.PAYMENT_APP_METHOD_GUID
  ) {
    return {
      data: null,
      error: "Missing environment variables",
    };
  }

  const payload: TransactionRequest = {
    amount,
    fields: {
      transaction: {
        deposit: {
          billing_post_code: postcode,
          billing_street: street,
          billing_town: city,
          external_id: orderId,
          from_country: country,
          from_email: email,
          from_first_name: firstName,
          from_last_name: lastName,
          locale_lang: locale === "en" ? "en" : "tr",
          payer_id: userId,
          redirect_url: `${process.env.NEXT_PUBLIC_URL}/success?orderId=${orderId}`,
          referer_domain: process.env.NEXT_PUBLIC_URL,
          status_callback_url: `${process.env.NEXT_PUBLIC_URL}/api/checkout?orderId=${orderId}`,
        },
        deposit_method: process.env.PAYMENT_APP_METHOD_GUID,
      },
    },
  };

  try {
    const res = await fetch(`${process.env.PAYMENT_BASE_API}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-App-Token": process.env.PAYMENT_APP_TOKEN,
        "X-App-Secret": process.env.PAYMENT_APP_SECRET,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const { errors } = (await res.json()) as ErrorResponse;

      console.log(errors);

      return { data: null, error: errors };
    }

    const data = (await res.json()) as TransactionResponse;

    return {
      data: { redirectUrl: data.how },
      error: null,
    };
  } catch (error) {
    console.log("Caught error:", error);

    return {
      data: null,
      error,
    };
  }
}
