import "@mantine/core/styles.css";
import "~/styles/globals.css";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps
} from "@mantine/core";

import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import theme from "./_themes/default.theme";

export const metadata: Metadata = {
  title: "Meal Bot",
  description: "A bot that helps you find the best meal for you",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
