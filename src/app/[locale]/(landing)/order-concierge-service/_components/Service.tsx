"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { Separator } from "@/components/ui/Separator";
import { services } from "@/config/services";
import { CheckoutFormValues, CLIENT_TYPES } from "@/lib/validations";
import { useFormContext, useWatch } from "react-hook-form";
import ServiceItem from "./ServiceItem";
import ServiceItemDynamic from "./ServiceItemDynamic";

import { useTranslations } from "next-intl";

export default function Service() {
  const t = useTranslations("Service");
  const { control, setValue } = useFormContext<CheckoutFormValues>();
  const clientType = useWatch({ control, name: "clientType" });
  const title = clientType === CLIENT_TYPES.NEW ? t("title_new") : t("title_existing");
  const description =
    clientType === CLIENT_TYPES.NEW
      ? t("description_new")
      : t("description_existing");

  const handleValueChange =
    (onChange: (value: string) => void) => (value: string) => {
      onChange(value);
      setValue(
        "serviceAmount",
        services.find((s) => s.id === value)?.amount || 0,
      );
    };

  return (
    <div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-3 text-sm font-light opacity-70">{description}</p>
      <FormField
        control={control}
        name="service"
        render={({ field }) => (
          <FormItem className="col-span-full mt-6">
            <FormControl>
              <RadioGroup
                className="grid grid-cols-12 gap-5"
                defaultValue={field.value ?? undefined}
                name={field.name}
                onValueChange={handleValueChange(field.onChange)}
                ref={field.ref}
              >
                {clientType === CLIENT_TYPES.NEW && (
                  <>
                    {services.map((service) => {
                      if (service.isDynamic) return null;

                      return <ServiceItem key={service.id} service={service} />;
                    })}

                    <Separator className="col-span-full" />
                  </>
                )}

                {services.map((service) => {
                  if (!service.isDynamic) return null;

                  return (
                    <ServiceItemDynamic key={service.id} service={service} />
                  );
                })}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="serviceAmount"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <input type="hidden" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
