"use client";

import { FormControl, FormItem, FormLabel } from "@/components/ui/Form";
import { RadioGroupItem } from "@/components/ui/RadioGroup";
import { Separator } from "@/components/ui/Separator";
import { Slider } from "@/components/ui/Slider";
import { Currency } from "@/config/currencies";
import { Service, ServiceId } from "@/config/services";
import { formatPrice } from "@/lib/utils";
import { CheckoutFormValues } from "@/lib/validations";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";


function calculateCost({
  initialCost,
  maxCount,
  unitCount,
}: {
  unitCount: number;
  initialCost: number;
  maxCount: number;
}) {
  const scarcityFactor = unitCount / maxCount;
  const maxMultiplier = 0.9;
  const nonLinearMultiplier =
    1 + Math.pow(scarcityFactor, 2) * (maxMultiplier - 1);
  const totalCost = parseFloat(
    (initialCost * unitCount * nonLinearMultiplier).toFixed(2),
  );

  return totalCost;
}

import { useTranslations } from "next-intl";

export default function ServiceItemDynamic({ service }: { service: Service }) {
  const t = useTranslations("Service");
  const tServices = useTranslations("Services");
  const tOrder = useTranslations("Order");
  const { control, setValue } = useFormContext<CheckoutFormValues>();
  const [currency, selectedService] = useWatch({
    control,
    name: ["currency", "service"],
  });

  const serviceMeta: Partial<
    Record<ServiceId, { label: string; initialValue?: number; max?: number }>
  > = {
    request_access: { label: t("requests_label") },
    daily_access: { label: t("days_label"), max: 30 },
  };

  const unitInitialValue = serviceMeta[service.id]?.initialValue ?? 1;
  const [unitValue, setUnitValue] = useState<number[]>([unitInitialValue]);
  const unitLabel = serviceMeta[service.id]?.label ?? "Unit";
  const unitMax = serviceMeta[service.id]?.max ?? 100;
  const amount = calculateCost({
    initialCost: service.amount,
    maxCount: unitMax,
    unitCount: unitValue[0],
  });

  const handleValueCommit = () => {
    if (selectedService !== service.id) return;

    setValue("serviceAmount", amount);
  };

  const translatedTitle = tServices(`${service.id}.title`);
  const translatedFeatures = tServices.raw(`${service.id}.features`) as string[];

  useEffect(() => {
    setUnitValue([unitInitialValue]);
  }, [currency, unitInitialValue]);

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
        <div className="flex w-full flex-col items-center">
          <span className="text-xs font-medium text-white">
            {unitLabel}: <span className="">{unitValue[0]}</span>
          </span>
          <Slider
            className="my-3"
            value={unitValue}
            onValueChange={setUnitValue}
            onValueCommit={handleValueCommit}
            min={1}
            max={unitMax}
          />
          <span className="text-xl font-bold text-white">
            {formatPrice(amount, currency as Currency)}
          </span>
          <span className="text-center text-xs text-white/70">
            {tOrder("one_time_payment")}
          </span>
        </div>
      </FormLabel>
    </FormItem>
  );
}
