import InspirationComp from "@/components/inspiration/inspiration-products";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("inspiration-title"),
    description: t("inspiration-description"),
  };
}

export default function InspirationPage() {
  return <InspirationComp />;
}
