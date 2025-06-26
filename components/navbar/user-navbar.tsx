"use client";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { removeCookiesFromHeader } from "@/utils/actions";
import { User } from "@/utils/types/user";

import { Button } from "../ui/button";

export function UserNavbar({ user, clearUser }: { user: User; clearUser: () => void }) {
  const t = useTranslations();
  const locale = useLocale();

  const handleLogout = async () => {
    toast.success(t("logout-success"));
    await removeCookiesFromHeader();
    clearUser();
    window.location.reload();
  };

  return (
    <DropdownMenu dir={locale === "ar" ? "rtl" : "ltr"}>
      <DropdownMenuTrigger asChild>
        <Button className="bg-custom-brown outline-none hover:bg-custom-brown/80">
          {t("hello-0")} {user?.name} 👋
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {user.role === "Admin" && (
          <DropdownMenuItem>
            <Link className="w-full rounded-md p-2 hover:bg-gray-100 " href={`/${locale}/admin`}>
              {t("Admin")}
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Link className="w-full rounded-md p-2 hover:bg-gray-100 " href={`/${locale}/cart`}>
            {t("cart")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full rounded-md p-2 hover:bg-gray-100 " href={`/${locale}/favorite`}>
            {t("favorite")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full rounded-md p-2 hover:bg-gray-100 " href={`/${locale}/orders`}>
            {t("orders")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full rounded-md p-2 hover:bg-gray-100 " href={`/${locale}/profile`}>
            {t("profile")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <Button onClick={handleLogout} variant="outline" className="w-full">
            {t("logout")}
          </Button>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
