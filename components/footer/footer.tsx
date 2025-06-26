"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { NavLinks } from "../navbar/nav-links";
import { NewsLetterEmail } from "./component/newsletter-email";

export default function Footer() {
  // Locale
  const locale = useLocale();

  // Translation
  const tNewsLetter = useTranslations();
  const t = useTranslations("navigation");

  const pathname = usePathname();

  return (
    <div className=" bg-[#446A7D] p-10">
      <div className="container grid grid-cols-1  gap-y-10 md:grid-cols-2">
        <div>
          {locale === "en" ? (
                      <Image src="/logo-2.png" width={200} height={200} alt="logo" />

          ) : (
            <h1 className="text-2xl font-bold text-white">
             هوس الزهور
            </h1>
          )}
          <div className="mt-3 flex gap-5">
            {NavLinks.map((link) => {
              if (link.name === "cart" || link.name === "favorite" || link.name === "orders" || link.name === "profile") {
                return null; // Do not render "cart" and "favorite" if there's no user
              } 
              return (
                <Link
                
                  key={link.id}
                  className={`text-sm uppercase text-white ${
                    pathname === `/${locale}${link.href}` && "font-bold text-black"
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
          <h1 className="mb-2 text-xl text-white">{tNewsLetter("subscribe-to-our-newsletter")}</h1>
          <NewsLetterEmail />
        </div>
      </div>
    </div>
  );
}
