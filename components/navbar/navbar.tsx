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
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

export function Navbar() {
  // Translation & Locale
  const t = useTranslations();
  const locale = useLocale();
  const { user, loading, clearUser } = useUserStore(); // Add `loading`

  // State
  const [isHidden, setIsHidden] = useState(true);
  const { scrollY } = useScroll();
  const lastRef = useRef(0);

  // when scroll down 300px hide the navbar.
  useMotionValueEvent(scrollY, "change", (y) => {
    const difference = y - lastRef.current;
    if (Math.abs(difference) > 50) {
      setIsHidden(difference > 0);
      lastRef.current = y;
    }
  });

  return (
    <motion.nav
      animate={isHidden ? "hidden" : "visible"}
      whileHover="visible"
      onFocusCapture={() => setIsHidden(false)}
      variants={{
        hidden: {
          y: "-90%",
        },
        visible: {
          y: "0%",
        },
      }}
      transition={{ duration: 0.2 }}
      className="fixed top-1 z-10 flex w-full justify-center items-center gap-x-20 bg-custom-yellow-2 p-2"
    >
      {/* Logo (Clickable, Links to Home) */}
      {locale === "en" ? (
        <Link href="/" aria-label="Home">
          <Image width={200} height={200} src="/logo.png" alt="Flower Obsession Logo" priority />
        </Link>
      ) : (
        <Link className="text-2xl font-bold text-custom-brown" href="/" aria-label="Home">
          <h1>
            هوس <span className="text-custom-yellow-2">الزهور</span>
          </h1>
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
        {loading ? (
          <Loader className="animate-spin" />
        ) : user ? (
          <UserNavbar user={user} clearUser={clearUser} />
        ) : (
          <Button
            className="border border-yellow-700 hover:opacity-80 uppercase"
            variant="ghost"
            asChild
          >
            <Link href={`/${locale}/login`}>{t("login-register-0")}</Link>
          </Button>
        )}
      </div>

      {/* Mobile Dropdown */}
      <div className="flex gap-3 items-center md:hidden">
        <LocaleToggle />
        <DropdownNavbar />
      </div>
    </motion.nav>
  );
}
