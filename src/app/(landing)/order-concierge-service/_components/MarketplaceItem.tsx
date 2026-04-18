import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";
import { Separator } from "@/components/ui/Separator";
import { Currency } from "@/config/currencies";
import { MarketplacePackage, MarketplacePackageId } from "@/config/marketplace";
import { formatPrice } from "@/lib/utils";
import { CheckoutFormValues } from "@/lib/validations";
import { CheckIcon } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

export default function MarketplaceItem({
  marketplacePackage,
}: {
  marketplacePackage: MarketplacePackage;
}) {
  const { control, setValue } = useFormContext<CheckoutFormValues>();
  const currency = useWatch({ control, name: "currency" }) as Currency;
  const selectedPackages =
    useWatch({ control, name: "marketplacePackages" }) ?? [];
  const isChecked = selectedPackages.includes(marketplacePackage.id);

  const handleCheckedChange = (checked: boolean) => {
    if (checked) {
      setValue("marketplacePackages", [
        ...(selectedPackages as MarketplacePackageId[]),
        marketplacePackage.id,
      ]);
    } else {
      setValue(
        "marketplacePackages",
        (selectedPackages as MarketplacePackageId[]).filter(
          (id) => id !== marketplacePackage.id,
        ),
      );
    }
  };

  return (
    <div
      key={marketplacePackage.id}
      className="col-span-full sm:col-span-6 md:col-span-4"
    >
      <Label className="flex h-full w-full flex-col rounded-md border border-neutral-700 bg-neutral-800 p-6 font-normal transition hover:bg-neutral-700/70 data-[error=true]:border-red-700 dark:has-aria-checked:border-primary/50">
        <div className="flex justify-start gap-4 self-start">
          <Checkbox
            checked={isChecked}
            className="mt-1.5 border-neutral-600! bg-neutral-700! data-[state=checked]:bg-primary!"
            onCheckedChange={handleCheckedChange}
          />
          <span className="text-lg font-bold text-white">
            {marketplacePackage.title}
          </span>
        </div>
        <Separator className="my-2 bg-neutral-700!" />
        <ul className="mb-auto space-y-2 self-start">
          {marketplacePackage.features.map((feature) => (
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
            {formatPrice(marketplacePackage.amount, currency)}{" "}
            <span className="text-base"> / ay</span>
          </span>
          <span className="text-center text-xs text-white/70">
            tek seferlik ödeme
          </span>
        </div>
      </Label>
    </div>
  );
}
