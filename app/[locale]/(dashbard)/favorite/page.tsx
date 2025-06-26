import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import FavoriteCart from "@/components/favorite/favorite-cart";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("favorite-title"),
    description: t("favorite-description")
  };
}

export default function FavoritePage() {
  return (
    <section>
      <FavoriteCart />
    </section>
  )
}
