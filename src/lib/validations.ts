import { marketplacePackageIdsMap } from "@/config/marketplace";
import { serviceMap } from "@/config/services";
import { z } from "zod";

export const PAYMENT_STATUSES = {
  CANCELLED: "canceled",
  CREATED: "created",
  DONE: "done",
  EXPIRED: "expired",
  PAID: "payed",
  REFUND_PENDING: "refund_pending",
  REFUND_REJECTED: "refund_rejected",
  REFUNDED: "refunded",
} as const;

export const CLIENT_TYPES = {
  NEW: "new",
  EXISTING: "existing",
} as const;

export const getContactFormSchema = (t: (key: string, params?: any) => string) =>
  z.object({
    email: z.string().email({ message: t("invalid_email") }),
    firstName: z
      .string()
      .trim()
      .max(50, t("too_long", { max: 50 }))
      .min(1, t("required")),
    lastName: z
      .string()
      .trim()
      .max(50, t("too_long", { max: 50 }))
      .min(1, t("required")),
    message: z.string().trim().min(1, t("required")),
    phone: z.string().trim().min(6, t("invalid_phone")),
    subject: z
      .string()
      .trim()
      .max(50, t("too_long", { max: 50 }))
      .min(1, t("required")),
  });

export const getCheckoutFormSchema = (t: (key: string, params?: any) => string) =>
  z.object({
    // amount: z.number().nullable(),
    city: z.string().trim().max(85).min(1, t("required")),
    clientType: z.nativeEnum(CLIENT_TYPES),
    country: z.string().trim().max(56).min(1, t("required")),
    currency: z.string(),
    dateOfBirth: z.coerce.date(),
    email: z.string().email({ message: t("invalid_email") }),
    experiences: z
      .string()
      .array()
      .nonempty({ message: t("min_experience") }),
    firstName: z.string().trim().max(50).min(1, t("required")),
    isTermsChecked: z.boolean(),
    lastName: z.string().trim().max(50).min(1, t("required")),
    locale: z.string().optional(),
    marketplacePackages: z.array(z.enum(marketplacePackageIdsMap)),
    notes: z.string().trim(),
    phone: z
      .string()
      .trim()
      .min(6, t("invalid_phone")),
    postcode: z.string().trim().max(20).min(1, t("required")),
    service: z.enum(serviceMap, { required_error: t("select_service") }),
    serviceAmount: z.number(),
    street: z.string().trim().max(100).min(1, t("required")),
    telegram: z.string().trim().max(32).min(1, t("required")),
  });

export const contactFormSchema = getContactFormSchema((k) => k);
export const checkoutFormSchema = getCheckoutFormSchema((k) => k);

export const checkoutFormDefaultValues = {
  city: "",
  clientType: CLIENT_TYPES.NEW,
  country: "",
  currency: "EUR",
  dateOfBirth: undefined,
  email: "",
  experiences: [],
  firstName: "",
  isTermsChecked: false,
  lastName: "",
  marketplacePackages: [],
  notes: "",
  phone: "",
  postcode: "",
  service: undefined,
  serviceAmount: 0,
  street: "",
  telegram: "",
};

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export const orderCreateSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  amount: z.number(),
  currency: z.string(),
  experiences: z.string().array(),
  service: z.enum(serviceMap),
});

// Docs: https://merchant-fe-staging.armenotech.net/developers/docs/h2h/integration#deposit-transaction
export type TransactionRequest = {
  amount: number;
  fields: {
    transaction: {
      deposit_method: string;
      deposit: {
        billing_post_code: string;
        billing_street: string;
        billing_town: string;
        external_id: string;
        from_country: string;
        from_email: string;
        from_first_name: string;
        from_last_name: string;
        locale_lang: string;
        payer_id: string;
        redirect_url: string;
        referer_domain: string;
        status_callback_url: string;
      };
    };
  };
};

export type TransactionResponse = {
  amount: number;
  amount_body: number;
  amount_in: number;
  amount_out: number;
  contract_fee: number;
  customer_fee: number;
  extra_info: {
    displayed_fields: string[];
    external_transaction_id: string;
    is_redirect: string;
    transaction_id: string;
  };
  how: string;
  id: string;
  merchant_fee: number;
};

export type TransactionCallbackResponse = {
  amount_body: number;
  amount_in: number;
  amount_out: number;
  asset: string;
  delivery_currency: string;
  deposit_details: {
    bank_card_mask: string;
    from_first_name: string;
    from_last_name: string;
    payment_group:
    | "bank_account"
    | "bank_card"
    | "cash_collection"
    | "crypto"
    | "ewallet";
    payment_method: string;
  };
  md5_body_sig: string; // To validate: md5(transaction_id+sep31_status+refunded+secret_key)
  merchant_external_id: string;
  refunded: boolean;
  sep31_status: "completed" | "error";
  seq: number;
  status: (typeof PAYMENT_STATUSES)[keyof typeof PAYMENT_STATUSES];
  transaction_id: string;
};

export type ErrorResponse = {
  errors: {
    /**
     * @example "Unauthorized"
     */
    status: string;
    /**
     * @example "401"
     */
    code: string;
  }[];
};
