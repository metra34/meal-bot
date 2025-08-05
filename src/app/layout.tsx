import { Geist } from "next/font/google";
import "~/styles/globals.css";

import { type Metadata } from "next";
import { Footer } from "~/components/layout/footer";
import { Header } from "~/components/layout/header";
import { TRPCReactProvider } from "~/trpc/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "~/components/ui/sonner";

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
    <html
      lang="en"
      className={`${geist.variable}`}
      data-scroll-behavior="smooth"
    >
      <body
        cz-shortcut-listen="true"
        className="flex min-h-screen flex-col bg-gradient-to-tr from-[#2E313B] to-[#55555E]"
      >
        <SessionProvider>
          <TRPCReactProvider>
            <Header />
            <main className="flex-1 pt-16 pb-2">{children}</main>
            <Toaster position="top-center" richColors />
            <Footer />
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
