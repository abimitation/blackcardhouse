import { TRPCReactProvider } from "@/trpc/client";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { Be_Vietnam_Pro } from "next/font/google";

const beVietnamPro = Be_Vietnam_Pro({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function ProtectedLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="tr" {...mantineHtmlProps}>
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="BlackCardHouse" />
        <link rel="manifest" href="/site.webmanifest" />
        <ColorSchemeScript forceColorScheme="dark" />
      </head>
      <body>
        <MantineProvider forceColorScheme="dark" theme={{ fontFamily: beVietnamPro.style.fontFamily }}>
          <Notifications />
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
