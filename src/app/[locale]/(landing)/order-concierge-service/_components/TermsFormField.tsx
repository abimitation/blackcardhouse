import { Checkbox } from "@/components/ui/Checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/Form";
import { CheckoutFormValues } from "@/lib/validations";
import Link from "next/link";
import { useFormContext } from "react-hook-form";

import { useTranslations } from "next-intl";

export default function TermsFormField() {
  const t = useTranslations("Terms");
  const { control } = useFormContext<CheckoutFormValues>();
  return (
    <div>
      <FormField
        control={control}
        name="isTermsChecked"
        render={({ field }) => (
          <FormItem className="flex flex-row gap-2">
            <FormControl>
              <Checkbox className="mt-0.5 border-neutral-600! bg-neutral-700! data-[state=checked]:bg-primary!" checked={field.value} onCheckedChange={field.onChange} name={field.name} ref={field.ref} />
            </FormControl>
            <FormLabel className="inline leading-5">
              {t.rich("read_and_accept", {
                link: (chunks) => (
                  <Link className="underline" href="/terms-of-service" target="_blank">
                    {chunks}
                  </Link>
                ),
              })}
            </FormLabel>
          </FormItem>
        )}
      />
    </div>
  );
}
