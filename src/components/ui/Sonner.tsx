"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "dark" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          error: "bg-red-900!",
          success: "bg-green-900!",
          toast: "group toast group-[.toaster]:pointer-events-auto",
        },
      }}
      duration={4000} // Matches Mantine's default
      richColors
      {...props}
    />
  );
};

export { Toaster };
