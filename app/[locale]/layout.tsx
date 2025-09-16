import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { cn } from "@/utils/lib/utils";
import Providers from "@/utils/providers";

type LayoutProps = {
  params: { locale: "en" | "ar" };
  children: React.ReactNode;
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter"
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto"
});

export const metadata: Metadata = {
  title: "Flower Obsession",
  description: "Beautiful flowers and bouquets for every occasion",
  icons: {
    icon: "/assets/big-image-bouquet.png",
    shortcut: "/assets/big-image-bouquet.png",
    apple: "/assets/big-image-bouquet.png"
  }
};

// export function generateStaticParams() {
//   return routing.locales.map(locale => ({ locale }));
// }

export default function LocaleLayout({
  params: { locale },
  children
}: LayoutProps) {
  if (!routing.locales.includes(locale)) notFound();

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <link rel="icon" type="image/png" href="/cat.png" />
        <link rel="shortcut icon" type="image/png" href="/cat.png" />
        <link rel="apple-touch-icon" href="/cat.png" />
      </head>
      <body
        className={cn(
          inter.variable,
          roboto.variable,
          inter.className,
          "antialiased"
        )}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
