"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import CookieConsent from "react-cookie-consent";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const t = useTranslations()
  useEffect(() => {
    const hasConsent = document.cookie.includes("mySiteCookieConsent");
    if (!hasConsent) {
      setShowBanner(true);
    }
  }, []);

  if (!showBanner) return null;

  return (
    <CookieConsent
      location="bottom"
      buttonText={t("i-understand")}
      declineButtonText={t("i-decline")}
      enableDeclineButton
      cookieName="mySiteCookieConsent"
      style={{ background: "#4A1F0D" }}
      buttonStyle={{ background: "#00AEEF", color: "#fff", fontSize: "13px" }}
      declineButtonStyle={{ background: "#999", fontSize: "13px" }}
    >
      {t("this-website-uses-cookies-to-enhance-the-user-experience")}
    </CookieConsent>
  );
}
