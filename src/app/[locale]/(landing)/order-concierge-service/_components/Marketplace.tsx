import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import {
  MARKETPLACE_CATEGORIES,
  MARKETPLACE_PACKAGES,
} from "@/config/marketplace";
import { CheckoutFormValues, CLIENT_TYPES } from "@/lib/validations";
import { useFormContext, useWatch } from "react-hook-form";
import MarketplaceItem from "./MarketplaceItem";

import { useTranslations } from "next-intl";

export default function Marketplace() {
  const t = useTranslations("Marketplace");
  const tItems = useTranslations("MarketplaceItems");
  const { control } = useFormContext<CheckoutFormValues>();
  const clientType = useWatch({ control, name: "clientType" });

  if (clientType === CLIENT_TYPES.NEW) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold">{t("title")}</h2>
      <p className="mt-3 text-sm font-light opacity-70">
        {t("description")}
      </p>

      <Tabs
        className="mt-6"
        defaultValue={MARKETPLACE_CATEGORIES.DAILY_SERVICES.ID}
      >
        <TabsList>
          {Object.values(MARKETPLACE_CATEGORIES).map((category) => (
            <TabsTrigger key={category.ID} value={category.ID}>
              {tItems(category.ID)}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.values(MARKETPLACE_CATEGORIES).map((category) => (
          <TabsContent
            className="grid grid-cols-12 gap-5"
            key={category.ID}
            value={category.ID}
          >
            {Object.values(MARKETPLACE_PACKAGES[category.ID]).map(
              (marketplacePackage) => (
                <MarketplaceItem
                  key={marketplacePackage.id}
                  marketplacePackage={marketplacePackage}
                />
              ),
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
