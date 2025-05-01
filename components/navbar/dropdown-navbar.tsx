"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { NavLinks } from "./nav-links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useUserStore } from "@/store/userStore";
import { removeCookiesFromHeader } from "@/utils/actions";
import { toast } from "sonner";

export const DropdownNavbar = () => {
  const pathname = usePathname();
  const t = useTranslations();
  const tNav = useTranslations("navigation");
  const { user, clearUser } = useUserStore();
  const locale = useLocale();

  const handleLogout = async () => {
    await removeCookiesFromHeader();
    clearUser();
    setTimeout(() => {
      toast.success(t("logout-success"));

    },2000)
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="border border-gray-400">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="end" sideOffset={10}>
        {user && user.role === "Admin" && (
          <DropdownMenuItem>
            <Link className="p-2 hover:bg-gray-100 rounded-md w-full " href={`/${locale}/admin`}>
              {t("Admin")}
            </Link>
          </DropdownMenuItem>
        )}
        {NavLinks.map((link) => {
          // Conditional rendering for "cart" and "favorite" based on the user state
          if (
            (link.name === "cart" ||
              link.name === "favorite" ||
              link.name === "orders" ||
              link.name === "profile") &&
            !user
          ) {
            return null; // Do not render "cart" and "favorite" if there's no user
          }

          return (
            <DropdownMenuItem key={link.id} className="uppercase">
              <Link
                href={`/${locale}${link.href}`}
                className={`w-full px-2 py-1 rounded-md transition-all ${
                  pathname === link.href ? "bg-gray-400 p-2 text-white font-semibold" : ""
                }`}
              >
                {tNav(link.name)}
              </Link>
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem>
            <Button onClick={handleLogout} variant="outline" className="w-full">
              {t("logout")}
            </Button>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Button className="hover:opacity-80 uppercase" variant="ghost">
              <Link href={`/${locale}/login`}>{t("login-register")}</Link>
            </Button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
