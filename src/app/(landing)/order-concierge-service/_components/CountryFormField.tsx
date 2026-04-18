import { Button } from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { cn } from "@/lib/utils";
import { CheckoutFormValues, CLIENT_TYPES } from "@/lib/validations";
import { getData as getCountries } from "country-list";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function CountryFormField() {
  const [isOpen, setIsOpen] = useState(false);
  const { control, getValues, setValue } = useFormContext<CheckoutFormValues>();
  const countries = getCountries().sort((a, b) => a.name.localeCompare(b.name));

  return (
    <FormField
      control={control}
      name="country"
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormLabel>Ülke</FormLabel>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  ref={field.ref}
                  className={cn(
                    "justify-between truncate rounded-md border border-neutral-700! bg-neutral-800! font-normal hover:bg-neutral-700/80!",
                    {
                      "text-white/50!": !field.value,
                      "focus-visible:ring-[3px] dark:border-red-700! dark:focus-visible:border-red-700! dark:focus-visible:ring-red-500/40!":
                        error,
                    },
                  )}
                >
                  {field.value
                    ? countries.find((country) => country.code === field.value)
                        ?.name
                    : "Ülke seçin"}
                  <ChevronsUpDownIcon className="text-white/50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-(--radix-popover-trigger-width) p-0"
            >
              <Command>
                <CommandInput placeholder="Ülke ara..." className="h-9" />
                <CommandList>
                  <CommandEmpty>Ülke bulunamadı.</CommandEmpty>
                  <CommandGroup>
                    {countries.map((country) => (
                      <CommandItem
                        value={country.name}
                        key={country.code}
                        onSelect={() => {
                          setValue("country", country.code, {
                            shouldValidate: true,
                          });
                          setIsOpen(false);
                        }}
                      >
                        {country.name}
                        <CheckIcon
                          className={cn("ms-auto", {
                            "opacity-0": country.code !== field.value,
                          })}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
      rules={{
        validate: (value) => {
          const { clientType: getClientType } = getValues();
          if (getClientType === CLIENT_TYPES.EXISTING) return true;
          return !!value || "Required";
        },
      }}
    />
  );
}
