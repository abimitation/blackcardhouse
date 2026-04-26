import { FormControl, FormItem, FormLabel } from "@/components/ui/Form";
import { RadioGroupItem } from "@/components/ui/RadioGroup";
import { Separator } from "@/components/ui/Separator";
import { Currency } from "@/config/currencies";
import { Service } from "@/config/services";
import { formatPrice } from "@/lib/utils";
import { CheckoutFormValues } from "@/lib/validations";
import { CheckIcon } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

import { useTranslations } from "next-intl";

export default function ServiceItem({ service }: { service: Service }) {
  const t = useTranslations("Services");
  const { control } = useFormContext<CheckoutFormValues>();
  const currency = useWatch({ control, name: "currency" }) as Currency;

  const translatedTitle = t(`${service.id}.title`);
  const translatedFeatures = t.raw(`${service.id}.features`) as string[];

  const tOrder = useTranslations("Order");

  return (
    <FormItem
      key={service.id}
      className="col-span-full sm:col-span-6 md:col-span-4"
    >
      <FormLabel className="flex w-full flex-col rounded-md border border-neutral-700 bg-neutral-800 p-6 font-normal transition hover:bg-neutral-700/70 data-[error=true]:border-red-700">
        <div className="flex items-center justify-start gap-4 self-start">
          <FormControl>
            <RadioGroupItem
              className="border-neutral-600! bg-neutral-700!"
              value={service.id}
            />
          </FormControl>
          <span className="text-lg font-bold text-white">{translatedTitle}</span>
        </div>
        <Separator className="my-2 bg-neutral-700!" />
        <ul className="mb-auto space-y-2 self-start">
          {translatedFeatures.map((feature) => (
            <li key={feature} className="flex gap-2">
              <CheckIcon className="size-4 shrink-0 text-primary" />
              <span className="text-xs font-medium text-white/70">
                {feature}
              </span>
            </li>
          ))}
        </ul>
        <Separator className="my-2 bg-neutral-700!" />
        <div className="flex flex-col">
          <span className="text-xl font-bold text-white">
            {formatPrice(service.amount, currency)}{" "}
            <span className="text-base"> / {tOrder("per_month")}</span>
          </span>
          <span className="text-center text-xs text-white/70">
            {tOrder("one_time_payment")}
          </span>
        </div>
      </FormLabel>
    </FormItem>
  );
}
