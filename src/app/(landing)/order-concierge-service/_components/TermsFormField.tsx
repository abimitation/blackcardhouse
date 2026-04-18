import { Checkbox } from "@/components/ui/Checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/Form";
import { CheckoutFormValues } from "@/lib/validations";
import Link from "next/link";
import { useFormContext } from "react-hook-form";

export default function TermsFormField() {
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
              <Link className="underline" href="/terms-of-service" target="_blank">Hizmet Şartları</Link>
              {' '}metnini okudum ve kabul ediyorum.
            </FormLabel>
          </FormItem>
        )}
      />
    </div>
  );
}
