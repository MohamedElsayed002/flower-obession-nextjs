import { useTranslations } from "next-intl";

export default function NotFoundComponent() {
  // Translation
  const t = useTranslations();

  return (
    <section className="flex flex-col items-center gap-6 text-center">
      <p className="text-9xl font-bold text-red-500">404</p>

      <p className="rounded-full border border-red-500 bg-red-50 px-3 py-2 text-lg font-medium text-red-400">
        {t("not-found-message")}
      </p>
    </section>
  );
}
