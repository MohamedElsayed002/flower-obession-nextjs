import CartTable from "@/components/cart/cart-table";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("cart"),
    description: t("cart-description"),
  };
}

export default function CartPage() {
  return <CartTable />;
}
