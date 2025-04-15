"use client";
import Image from "next/image";
import { NavLinksComponent } from "./nav-links";
import { Button } from "../ui/button";
import { DropdownNavbar } from "./dropdown-navbar";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import LocaleToggle from "../common/toggle-locale";
import { useUserStore } from "@/store/userStore";
import { UserNavbar } from "./user-navbar";
import { Loader } from "lucide-react";

export function Navbar() {
  // Translation & Locale
  const t = useTranslations();
  const locale = useLocale();
  const { user, loading, clearUser } = useUserStore(); // Add `loading`

  return (
    <nav className="container flex justify-between items-center my-5">
      {/* Logo (Clickable, Links to Home) */}
      {locale === "en" ? (
        <Link href="/" aria-label="Home">
          <Image width={200} height={200} src="/logo.png" alt="Flower Obsession Logo" priority />
        </Link>
      ) : (
        <Link className="text-2xl font-bold text-custom-brown" href="/" aria-label="Home">
          <h1>هوس <span className="text-custom-yellow-2">الزهور</span></h1>
      </Link>

      )}
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        <NavLinksComponent />
      </div>

      {/* User Authentication Handling */}
      <div className="hidden md:flex md:gap-x-4">
        <LocaleToggle />

        {/* Show Nothing When Loading */}
        {loading ? <Loader className="animate-spin" /> : user ? <UserNavbar user={user} clearUser={clearUser} /> : (
          <Button className="border border-yellow-700 hover:opacity-80 uppercase" variant="ghost" asChild>
            <Link href={`/${locale}/login`}>{t('login-register-0')}</Link>
          </Button>
        )}
      </div>

      {/* Mobile Dropdown */}
      <div className="flex gap-3 items-center md:hidden">
        <LocaleToggle />
        <DropdownNavbar />
      </div>
    </nav>
  );
}
