import Providers from "@/utils/providers";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, Roboto } from "next/font/google";
import { cn } from "@/utils/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
});

// export function generateStaticParams() {
//   return routing.locales.map(locale => ({ locale }));
// }

export default function LocaleLayout({
  params: { locale },
  children,
}: LayoutProps) {
  if (!routing.locales.includes(locale)) notFound();

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={cn(
          inter.variable,
          roboto.variable,
          inter.className,
          "antialiased"
        )}
      >
        <Providers>
          {/* Main content */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
