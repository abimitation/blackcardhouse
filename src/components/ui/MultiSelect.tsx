"use client";

import { Command as CommandPrimitive } from "cmdk";
import { Dispatch, forwardRef, SetStateAction, useRef, useState } from "react";

import { Badge } from "@/components/ui/Badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import { cn } from "@/lib/utils";

import { ChevronsUpDownIcon, XIcon } from "lucide-react";
import { Button } from "./Button";

type MultiSelectProps = {
  error?: boolean;
  options: string[];
  placeholder?: string;
  selected: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
};

const MultiSelect = forwardRef<HTMLInputElement, MultiSelectProps>(
  ({ error, options, placeholder = "Search", selected, onChange }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const handleUnselect = (option: string) => {
      onChange(selected.filter((item) => item !== option));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            const lastItem = selected[selected.length - 1];
            onChange(selected.filter((item) => item !== lastItem));
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    };

    return (
      <Command
        ref={ref}
        onKeyDown={handleKeyDown}
        className="overflow-visible bg-transparent"
      >
        <div
          className={cn(
            "group flex min-h-9 items-center rounded-md border border-neutral-700 bg-neutral-800 px-3 py-1 text-sm shadow-sm transition has-focus-visible:ring-[3px] dark:has-focus-visible:border-neutral-300 dark:has-focus-visible:ring-neutral-300/50",
            {
              "dark:border-red-700 dark:has-focus-visible:border-red-700 dark:has-focus-visible:ring-red-500/40":
                error,
            },
          )}
        >
          <div className="relative flex w-full flex-wrap gap-1">
            {selected.map((option) => (
              <Badge
                key={option}
                className="pe-1 dark:bg-neutral-700"
                variant="secondary"
              >
                {option}
                <Button
                  className="-my-0.5 ms-1 size-4 opacity-50 hover:bg-transparent hover:opacity-100"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(option);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(option)}
                  size="icon"
                  variant="ghost"
                >
                  <XIcon className="size-4" />
                </Button>
              </Badge>
            ))}
            {/* Avoid having the "Search" Icon */}
            <CommandPrimitive.Input
              ref={inputRef}
              className={cn(
                "flex-1 outline-none placeholder:text-white/50",
                selected.length > 0 && "placeholder:opacity-0",
              )}
              value={searchValue}
              onBlur={() => setIsOpen(false)}
              onFocus={() => setIsOpen(true)}
              onValueChange={setSearchValue}
              placeholder={placeholder}
            />
            <ChevronsUpDownIcon className="pointer-events-none absolute end-0 top-1/2 size-4 -translate-y-1/2 opacity-50" />
          </div>
        </div>
        <div className="relative">
          {isOpen && (
            <div className="absolute top-2 z-10 w-full animate-in rounded-md border border-neutral-700 bg-neutral-800 shadow-md outline-none">
              <CommandList>
                <CommandEmpty className="py-2.5 text-center text-sm">
                  No results
                </CommandEmpty>
                <CommandGroup className="max-h-64 overflow-y-auto">
                  {options.map((option) => {
                    const isDisabled = selected.includes(option);

                    return (
                      <CommandItem
                        key={option}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={() => {
                          onChange(
                            selected.includes(option)
                              ? selected.filter((item) => item !== option)
                              : [...selected, option],
                          );
                          setSearchValue("");
                        }}
                        className={cn(isDisabled && "opacity-50")}
                        disabled={isDisabled}
                      >
                        {option}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </div>
          )}
        </div>
      </Command>
    );
  },
);

MultiSelect.displayName = "MultiSelect";

export { MultiSelect };
