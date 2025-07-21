import { Geist } from "next/font/google";
import "~/styles/globals.css";

import { type Metadata } from "next";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Meal Bot",
  description: "A bot that helps you find the best meal for you",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body
        cz-shortcut-listen="true"
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#009e51] to-[#15162c]"
      >
        <TRPCReactProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
