"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinksType } from "@/utils/types";
import { useTranslations, useLocale } from "next-intl";

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
    <div className="flex items-center mt-2 gap-5 rtl:text-start">
      {NavLinks.map((link) => {
        // Check if the user exists before rendering the "cart" and "favorite" links
        if ((link.name === "cart" || link.name === "favorite" || link.name === "orders" || link.name === "profile") ) {
          return null; // Don't render these links if there's no user
        }

        return (
          <Link
            key={link.id}
            className={`uppercase text-gray-500 text-lg ${
              pathname === `/${locale}${link.href}` && "text-black font-bold"
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
