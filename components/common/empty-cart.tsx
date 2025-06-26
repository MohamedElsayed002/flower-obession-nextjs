import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function EmptyCart() {

  // Translation
  const t = useTranslations();

  // Locale
  const locale = useLocale();

  return (
    <div>
      {/* Title */}
      <h1 className="mb-5 text-3xl">{t("no-products-available-0")}</h1>
      <Link
        aria-label={t("go-shopping")}
        className="mt-4 rounded-md bg-custom-brown px-5 py-3 text-white hover:bg-custom-brown/80"
        href={`/${locale}/shop`}
      >
        {t("go-shopping")}
      </Link>
    </div>
  );
}
