import ShopComp from "@/components/shop/shop-comp";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("shop-title"),
    description: t("shop-description"),
  };
}

export default function ShopPage() {
  return <ShopComp />;
}
