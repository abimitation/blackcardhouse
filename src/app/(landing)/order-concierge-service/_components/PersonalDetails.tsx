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
import ÜlkeFormField from "./ÜlkeFormField";

export default function PersonalDetails() {
  const { control, getValues } = useFormContext<CheckoutFormValues>();
  const lastEnabledDate = new Date(
    new Date().setFullYear(new Date().getFullYear() - 18),
  ); // 18 years ago
  const clientType = useWatch({ control, name: "clientType" });

  return (
    <div>
      <h2 className="text-2xl font-bold">Kişisel bilgiler</h2>
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
                <FormLabel>Ad</FormLabel>
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
                return value.trim().length > 0 || "Zorunlu alan";
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
                <FormLabel>Soyad</FormLabel>
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
                return value.trim().length > 0 || "Zorunlu alan";
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
                <FormLabel>Doğum tarihi</FormLabel>
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
                          <span className="opacity-50">Tarih seçin</span>
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
                return value instanceof Date || "Zorunlu alan";
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
                <FormLabel>Telegram</FormLabel>
                <FormControl>
                  <Input placeholder="@john.doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            rules={{
              validate: (value) => {
                return value.trim().length > 0 || "Zorunlu alan";
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
                <FormLabel>E-mail</FormLabel>
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
                if (!Boolean(value.trim().length > 0)) return "Zorunlu alan";
                return (
                  z.string().email().safeParse(value).success ||
                  "Geçerli bir e-posta adresi girin"
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
                <FormLabel>Telefon</FormLabel>
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
                if (!Boolean(value.trim().length > 0)) return "Zorunlu alan";
                return (
                  value.trim().length >= 6 || "Geçerli bir telefon numarası girin"
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
                <FormLabel>Adres</FormLabel>
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
                return value.trim().length > 0 || "Zorunlu alan";
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
                <FormLabel>Şehir</FormLabel>
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
                return value.trim().length > 0 || "Zorunlu alan";
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
                <FormLabel>Posta kodu</FormLabel>
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
                return value.trim().length > 0 || "Zorunlu alan";
              },
            }}
          />
        </div>
        <div
          className={cn("col-span-full", {
            hidden: clientType === CLIENT_TYPES.EXISTING,
          })}
        >
          <ÜlkeFormField />
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
                <FormLabel>Deneyimler</FormLabel>
                <FormControl>
                  <MultiSelect
                    selected={field.value}
                    options={experiences.map((experience) => experience.title)}
                    placeholder="Deneyim ara"
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
                  "Choose at least 1 experience"
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
                  <FormLabel>Ek notlar</FormLabel>
                  <FormDescription>İsteğe bağlı</FormDescription>
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
