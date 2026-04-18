import { currencies, Currency } from "@/config/currencies";
import { marketplacePackagePricing } from "@/config/marketplace";
import { clsx, type ClassValue } from "clsx";
import { FieldErrors, FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { CheckoutFormValues } from "./validations";

export function calculateOrderAmount({
  currency,
  marketplacePackages,
  service,
  serviceAmount,
}: Pick<
  CheckoutFormValues,
  "currency" | "marketplacePackages" | "service" | "serviceAmount"
>) {
  let amount = 0;

  if (marketplacePackages.length > 0) {
    amount += marketplacePackages.reduce(
      (sum, pkgId) => sum + marketplacePackagePricing[pkgId],
      0,
    );
  }

  if (service) {
    amount += serviceAmount;
  }

  return convertPrice(amount, currency as Currency);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertPrice(amount: number, currency: Currency = "EUR") {
  const { rate } = currencies[currency];
  const converted = parseFloat((amount * rate).toFixed(2));

  return converted;
}

export function formatPrice(
  amount: number,
  currency: Currency = "EUR",
  shouldConvert = true,
): string {
  const { locale } = currencies[currency];
  const finalAmount = shouldConvert
    ? convertPrice(amount, currency)
    : parseFloat(amount.toFixed(2));

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(finalAmount);
}

export function scrollToFirstError<TFieldValues extends FieldValues>(
  errors: FieldErrors<TFieldValues>,
) {
  const firstError = Object.values(errors).find((error) => error?.ref);

  if (
    firstError?.ref &&
    firstError.ref instanceof Element &&
    typeof firstError.ref.scrollIntoView === "function"
  ) {
    firstError.ref.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
}
