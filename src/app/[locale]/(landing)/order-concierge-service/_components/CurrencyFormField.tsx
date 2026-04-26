import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { currencies } from "@/config/currencies";
import { servicePricing } from "@/config/services";
import { CheckoutFormValues } from "@/lib/validations";
import { useFormContext } from "react-hook-form";

import { useTranslations } from "next-intl";

export default function CurrencyFormField() {
  const t = useTranslations("Checkout");
  const { control, setValue, watch } = useFormContext<CheckoutFormValues>();
  const service = watch("service");

  const handleValueChange =
    (onChange: (value: string) => void) => (value: string) => {
      onChange(value);

      if (service) {
        setValue("serviceAmount", servicePricing[service]);
      }
    };

  return (
    <div className="grid grid-cols-12 gap-5">
      <FormField
        control={control}
        name="currency"
        render={({ field }) => (
          <FormItem className="col-span-full mt-6 md:col-span-4">
            <FormLabel>{t("currency")}</FormLabel>
            <Select
              defaultValue={field.value}
              onValueChange={handleValueChange(field.onChange)}
            >
              <FormControl>
                <SelectTrigger className="w-full" ref={field.ref}>
                  <SelectValue placeholder={t("currency_placeholder")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.keys(currencies).map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
