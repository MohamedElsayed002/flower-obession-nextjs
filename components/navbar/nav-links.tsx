"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale,useTranslations } from "next-intl";

import { LinksType } from "@/utils/types";

export const NavLinks: LinksType[] = [
  { id: 1, name: "home", href: "/" },
  { id: 2, name: "inspiration", href: "/inspiration" },
  { id: 3, name: "shop", href: "/shop" },
  { id: 4, name: "contact", href: "/contact" },
  { id: 5, name: "cart", href: "/cart" },
  { id: 6, name: "favorite", href: "/favorite" },
  {id : 7, name: "orders",href:"/orders"},
  {id: 8, name: "profile",href:"/profile"}
];

export const NavLinksComponent = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("navigation");

  return (
    <div className="mt-2 flex items-center gap-5 rtl:text-start">
      {NavLinks.map((link) => {
        // Check if the user exists before rendering the "cart" and "favorite" links
        if ((link.name === "cart" || link.name === "favorite" || link.name === "orders" || link.name === "profile") ) {
          return null; // Don't render these links if there's no user
        }

        return (
          <Link
            key={link.id}
            className={`text-lg uppercase text-gray-500 ${
              pathname === `/${locale}${link.href}` && "font-bold text-black"
            }`}
            href={`/${locale}${link.href}`}
          >
            {t(link.name)}
          </Link>
        );
      })}
    </div>
  );
};
