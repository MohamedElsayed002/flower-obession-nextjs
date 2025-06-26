import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ShopComp from "@/components/shop/shop-comp";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("shop-title"),
    description: t("shop-description")
  };
}

export default function ShopPage() {
  return (
    <section>
      <ShopComp />
    </section>
  )
}
