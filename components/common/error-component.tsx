import { useTranslations } from "next-intl";

type ErrorComponentProps = {
  children?: React.ReactNode;
};

export default function ErrorComponent({ children }: ErrorComponentProps) {
  // Translation
  const t = useTranslations();

  return (
    <section className="flex flex-col items-center gap-6 text-center">
      <p className="text-9xl font-bold text-red-500">{t("error")}</p>
      <p className="rounded-full border border-red-500 bg-red-50 px-3 py-2 text-red-500">
        {children || t("something-went-wrong")}
      </p>
    </section>
  );
}
