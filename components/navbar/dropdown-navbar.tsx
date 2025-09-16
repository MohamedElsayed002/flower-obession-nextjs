"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect,useState } from "react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/store/userStore";
import { removeCookiesFromHeader } from "@/utils/actions";

import { Button } from "../ui/button";
import { NavLinks } from "./nav-links";

export const DropdownNavbar = () => {
  const pathname = usePathname();
  const t = useTranslations();
  const tNav = useTranslations("navigation");
  const { user, clearUser } = useUserStore();
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  // Close dropdown when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    await removeCookiesFromHeader();
    clearUser();
    setTimeout(() => {
      toast.success(t("logout-success"));

    }, 2000)
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="border border-gray-400">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="end" sideOffset={10}>
        {user && user.role === "Admin" && (
          <DropdownMenuItem>
            <Link className="w-full rounded-md p-2 hover:bg-gray-100 " href={`/${locale}/admin`} onClick={() => setOpen(false)}>
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
                className={`w-full rounded-md px-2 py-1 transition-all ${pathname === link.href ? "bg-gray-400 p-2 font-semibold text-white" : ""
                  }`}
                onClick={() => setOpen(false)}
              >
                {tNav(link.name)}
              </Link>
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem>
            <Button onClick={() => {
              handleLogout();
              setOpen(false);
            }} variant="outline" className="w-full">
              {t("logout")}
            </Button>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Button className="uppercase hover:opacity-80" variant="ghost">
              <Link href={`/${locale}/login`} onClick={() => setOpen(false)}>{t("login-register")}</Link>
            </Button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
