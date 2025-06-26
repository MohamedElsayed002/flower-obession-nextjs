import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import InspirationComp from "@/components/inspiration/inspiration-products";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("inspiration-title"),
    description: t("inspiration-description")
  };
}

export default function InspirationPage() {
  return (
    <section>
      <InspirationComp />
    </section>
  )
}
