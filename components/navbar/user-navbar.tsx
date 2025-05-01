"use client";
import { User } from "@/utils/types/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { removeCookiesFromHeader } from "@/utils/actions";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";

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
        <Button className="bg-custom-brown hover:bg-custom-brown/80 outline-none">
          {t("hello-0")} {user?.name} 👋
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {user.role === "Admin" && (
          <DropdownMenuItem>
            <Link className="p-2 hover:bg-gray-100 rounded-md w-full " href={`/${locale}/admin`}>
              {t("Admin")}
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Link className="p-2 hover:bg-gray-100 rounded-md w-full " href={`/${locale}/cart`}>
            {t("cart")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="p-2 hover:bg-gray-100 rounded-md w-full " href={`/${locale}/favorite`}>
            {t("favorite")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="p-2 hover:bg-gray-100 rounded-md w-full " href={`/${locale}/orders`}>
            {t("orders")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="p-2 hover:bg-gray-100 rounded-md w-full " href={`/${locale}/profile`}>
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
