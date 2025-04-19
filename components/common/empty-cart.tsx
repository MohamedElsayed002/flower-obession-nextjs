import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export default function EmptyCart() {

  // Translation
  const t = useTranslations();

  // Locale
  const locale = useLocale();

  return (
    <div>
      {/* Title */}
      <h1 className="text-3xl mb-5">{t("no-products-available-0")}</h1>
      <Link
        aria-label={t("go-shopping")}
        className="mt-4 bg-custom-brown hover:bg-custom-brown/80 py-3 px-5 text-white rounded-md"
        href={`/${locale}/shop`}
      >
        {t("go-shopping")}
      </Link>
    </div>
  );
}
