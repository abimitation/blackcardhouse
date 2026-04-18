import { Be_Vietnam_Pro } from "next/font/google";

import { Toaster } from "@/components/ui/Sonner";
import { cn } from "@/lib/utils";
import "@/styles/app.css";
import { TRPCReactProvider } from "@/trpc/client";
import { ThemeProvider } from "./ThemeProvider";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="BlackCardHouse" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={cn(beVietnamPro.className, "bg-neutral-950 antialiased")}>
        <ThemeProvider attribute="class" disableTransitionOnChange forcedTheme="dark">
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
