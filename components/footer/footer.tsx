"use client";

import Image from "next/image";
import { NavLinks } from "../navbar/nav-links";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { NewsLetterEmail } from "./component/newsletter-email";

export default function Footer() {
  // Locale
  const locale = useLocale();

  // Translation
  const tNewsLetter = useTranslations();
  const t = useTranslations("navigation");

  const pathname = usePathname();

  return (
    <div className=" p-10 bg-[#446A7D]">
      <div className="container grid grid-cols-1  md:grid-cols-2 gap-y-10">
        <div>
          {locale === "en" ? (
                      <Image src="/logo-2.png" width={200} height={200} alt="logo" />

          ) : (
            <h1 className="text-2xl font-bold text-white">
             هوس الزهور
            </h1>
          )}
          <div className="flex gap-5 mt-3">
            {NavLinks.map((link) => {
              if (link.name === "cart" || link.name === "favorite" || link.name === "orders" || link.name === "profile") {
                return null; // Do not render "cart" and "favorite" if there's no user
              } 
              return (
                <Link
                
                  key={link.id}
                  className={`uppercase text-white text-sm ${
                    pathname === `/${locale}${link.href}` && "text-black font-bold"
                  }`}
                  href={`/${locale}${link.href}`}
                >
                  {t(link.name)}
                </Link>
              );
            })}
          </div>
        </div>
        <div>
          {/* News Letter Comp */}
          <h1 className="text-xl text-white mb-2">{tNewsLetter("subscribe-to-our-newsletter")}</h1>
          <NewsLetterEmail />
        </div>
      </div>
    </div>
  );
}
