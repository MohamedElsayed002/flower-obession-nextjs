import FavoriteCart from "@/components/favorite/favorite-cart";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("favorite-title"),
    description: t("favorite-description"),
  };
}

export default function FavoritePage() {
  return <FavoriteCart />;
}
