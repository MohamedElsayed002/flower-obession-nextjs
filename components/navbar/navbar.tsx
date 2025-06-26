"use client";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { useUserStore } from "@/store/userStore";

import LocaleToggle from "../common/toggle-locale";
import { Button } from "../ui/button";
import { DropdownNavbar } from "./dropdown-navbar";
import { NavLinksComponent } from "./nav-links";
import { UserNavbar } from "./user-navbar";

export function Navbar() {
  // Translation & Locale
  const t = useTranslations();
  const locale = useLocale();
  const { user, loading, clearUser } = useUserStore(); // Add `loading`

  return (
    <nav className="container my-5 flex items-center justify-between">
      {/* Logo (Clickable, Links to Home) */}
      {locale === "en" ? (
        <Link href="/" aria-label="Home">
          <Image width={200} height={200} src="/logo.png" alt="Flower Obsession Logo" priority />
        </Link>
      ) : (
        <Link className="text-2xl font-bold text-custom-brown" href="/ar" aria-label="Home">
          <h1>هوس <span className="text-custom-yellow-2">الزهور</span></h1>
      </Link>

      )}
      
      {/* Desktop Navigation */}
      <div className="hidden items-center space-x-6 md:flex">
        <NavLinksComponent />
      </div>

      {/* User Authentication Handling */}
      <div className="hidden md:flex md:gap-x-4">
        <LocaleToggle />

        {/* Show Nothing When Loading */}
        {loading ? <Loader className="animate-spin" /> : user ? <UserNavbar user={user} clearUser={clearUser} /> : (
          <Button className="border border-yellow-700 uppercase hover:opacity-80" variant="ghost" asChild>
            <Link href={`/${locale}/login`}>{t("login-register-0")}</Link>
          </Button>
        )}
      </div>

      {/* Mobile Dropdown */}
      <div className="flex items-center gap-3 md:hidden">
        <LocaleToggle />
        <DropdownNavbar />
      </div>
    </nav>
  );
}
