import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { MultiSelect } from "@/components/ui/MultiSelect";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Textarea } from "@/components/ui/Textarea";
import { experiences } from "@/config/experiences";
import { cn } from "@/lib/utils";
import { CheckoutFormValues, CLIENT_TYPES } from "@/lib/validations";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import z from "zod";
import CountryFormField from "./CountryFormField";

import { useTranslations } from "next-intl";

export default function PersonalDetails() {
  const t = useTranslations("PersonalDetails");
  const { control, getValues } = useFormContext<CheckoutFormValues>();
  const lastEnabledDate = new Date(
    new Date().setFullYear(new Date().getFullYear() - 18),
  ); // 18 years ago
  const clientType = useWatch({ control, name: "clientType" });

  return (
    <div>
      <h2 className="text-2xl font-bold">{t("title", { defaultValue: "Personal Information" })}</h2>
      <div className="mt-6 grid grid-cols-12 items-start gap-5">
        <div
          className={cn("col-span-full md:col-span-6", {
            hidden: clientType === CLIENT_TYPES.EXISTING,
          })}
        >
          <FormField
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("firstName")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            rules={{
              validate: (value) => {
                const { clientType: getClientType } = getValues();
                if (getClientType === CLIENT_TYPES.EXISTING) return true;
                return value.trim().length > 0 || t("required_field");
              },
            }}
          />
        </div>
        <div
          className={cn("col-span-full md:col-span-6", {
            hidden: clientType === CLIENT_TYPES.EXISTING,
          })}
        >
          <FormField
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("lastName")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            rules={{
              validate: (value) => {
                const { clientType: getClientType } = getValues();
                if (getClientType === CLIENT_TYPES.EXISTING) return true;
                return value.trim().length > 0 || t("required_field");
              },
            }}
          />
        </div>
        <div
          className={cn("col-span-full md:col-span-6", {
            hidden: clientType === CLIENT_TYPES.EXISTING,
          })}
        >
          <FormField
            control={control}
            name="dateOfBirth"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{t("dob")}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        ref={field.ref}
                        className={cn(
                          "rounded-md! border-neutral-700! bg-neutral-800! ps-3 text-start font-normal hover:bg-neutral-700/80!",
                          { "border-red-700!": error?.message },
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span className="opacity-50">{t("dob_placeholder")}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      autoFocus
                      mode="single"
                      selected={field.value ?? undefined}
                      onSelect={field.onChange}
                      disabled={{
                        after: lastEnabledDate,
                      }}
                      today={lastEnabledDate}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
            rules={{
              validate: (value) => {
                const { clientType: getClientType } = getValues();
                if (getClientType === CLIENT_TYPES.EXISTING) return true;
                return value instanceof Date || t("required_field");
              },
            }}
          />
        </div>
        <div className="col-span-full md:col-span-6">
          <FormField
            control={control}
            name="telegram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("telegram")}</FormLabel>
                <FormControl>
                  <Input placeholder="@john.doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            rules={{
              validate: (value) => {
                return value.trim().length > 0 || t("required_field");
              },
            }}
          />
        </div>
        <div
          className={cn("col-span-full md:col-span-6", {
            hidden: clientType === CLIENT_TYPES.EXISTING,
          })}
        >
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            rules={{
              validate: (value) => {
                const { clientType: getClientType } = getValues();
                if (getClientType === CLIENT_TYPES.EXISTING) return true;
                if (!Boolean(value.trim().length > 0)) return t("required_field");
                return (
                  z.string().email().safeParse(value).success ||
                  t("invalid_email")
                );
              },
            }}
          />
        </div>
        <div
          className={cn("col-span-full md:col-span-6", {
            hidden: clientType === CLIENT_TYPES.EXISTING,
          })}
        >
          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("phone")}</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            rules={{
              validate: (value) => {
                const { clientType: getClientType } = getValues();
                if (getClientType === CLIENT_TYPES.EXISTING) return true;
                if (!Boolean(value.trim().length > 0)) return t("required_field");
                return (
                  value.trim().length >= 6 ||
                  t("invalid_phone")
                );
              },
            }}
          />
        </div>
        <div
          className={cn("col-span-full md:col-span-6", {
            hidden: clientType === CLIENT_TYPES.EXISTING,
          })}
        >
          <FormField
            control={control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("address")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            rules={{
              validate: (value) => {
                const { clientType: getClientType } = getValues();
                if (getClientType === CLIENT_TYPES.EXISTING) return true;
                return value.trim().length > 0 || t("required_field");
              },
            }}
          />
        </div>
        <div
          className={cn("col-span-full md:col-span-3", {
            hidden: clientType === CLIENT_TYPES.EXISTING,
          })}
        >
          <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("city")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            rules={{
              validate: (value) => {
                const { clientType: getClientType } = getValues();
                if (getClientType === CLIENT_TYPES.EXISTING) return true;
                return value.trim().length > 0 || t("required_field");
              },
            }}
          />
        </div>
        <div
          className={cn("col-span-full md:col-span-3", {
            hidden: clientType === CLIENT_TYPES.EXISTING,
          })}
        >
          <FormField
            control={control}
            name="postcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("postcode")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            rules={{
              validate: (value) => {
                const { clientType: getClientType } = getValues();
                if (getClientType === CLIENT_TYPES.EXISTING) return true;
                return value.trim().length > 0 || t("required_field");
              },
            }}
          />
        </div>
        <div
          className={cn("col-span-full", {
            hidden: clientType === CLIENT_TYPES.EXISTING,
          })}
        >
          <CountryFormField />
        </div>
        <div
          className={cn("col-span-full", {
            hidden: clientType === CLIENT_TYPES.EXISTING,
          })}
        >
          <FormField
            control={control}
            name="experiences"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{t("experiences")}</FormLabel>
                <FormControl>
                  <MultiSelect
                    selected={field.value}
                    options={experiences.map((experience) => experience.title)}
                    placeholder={t("experiences_placeholder")}
                    error={!!error}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            rules={{
              validate: (value) => {
                const { clientType: getClientType } = getValues();
                if (getClientType === CLIENT_TYPES.EXISTING) return true;
                return (
                  (Array.isArray(value) && value.length > 0) ||
                  t("min_experience")
                );
              },
            }}
          />
        </div>
        <div
          className={cn("col-span-full", {
            hidden: clientType === CLIENT_TYPES.EXISTING,
          })}
        >
          <FormField
            control={control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel>{t("notes")}</FormLabel>
                  <FormDescription>{t("optional")}</FormDescription>
                </div>
                <FormControl>
                  <Textarea className="max-h-65" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
