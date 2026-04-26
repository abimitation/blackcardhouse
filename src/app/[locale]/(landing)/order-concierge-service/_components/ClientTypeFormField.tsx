import { FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import {
  checkoutFormDefaultValues,
  CheckoutFormValues,
  CLIENT_TYPES,
} from "@/lib/validations";
import { useFormContext } from "react-hook-form";

import { useTranslations } from "next-intl";

export default function ClientTypeFormField() {
  const t = useTranslations("Checkout");
  const { control, reset } = useFormContext<CheckoutFormValues>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { service, ...restCheckoutFormDefaultValues } =
    checkoutFormDefaultValues;

  const handleValueChange =
    (onChange: (value: string) => void) => (value: string) => {
      onChange(value);
      reset({
        ...restCheckoutFormDefaultValues,
        clientType: value as (typeof CLIENT_TYPES)[keyof typeof CLIENT_TYPES],
      });
    };

  return (
    <div className="grid grid-cols-12 gap-4">
      <FormField
        control={control}
        name="clientType"
        render={({ field }) => (
          <FormItem className="col-span-full md:col-span-6">
            <FormControl>
              <RadioGroup
                onValueChange={handleValueChange(field.onChange)}
                value={field.value}
                className="grid h-9 grid-cols-2 gap-px rounded-md border border-neutral-700 bg-neutral-800 p-px shadow-xs"
              >
                <Label className="justify-center rounded-md px-3 transition outline-none hover:bg-neutral-700/70 has-checked:bg-neutral-700">
                  {" "}
                  {/* TODO: focus-visible:border-neutral-300 focus-visible:ring-[3px] focus-visible:ring-neutral-300/50 */}
                  <RadioGroupItem className="hidden" value={CLIENT_TYPES.NEW} />
                  {t("new_client")}
                </Label>
                <Label className="justify-center rounded-md px-3 transition outline-none hover:bg-neutral-700/70 has-checked:bg-neutral-700">
                  <RadioGroupItem
                    className="hidden"
                    value={CLIENT_TYPES.EXISTING}
                  />
                  {t("existing_client")}
                </Label>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
