import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import CartTable from "@/components/cart/cart-table";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("cart"),
    description: t("cart-description")
  };
}

export default function CartPage() {
  return (
    <section>
      <CartTable/>
    </section>
  );
}
