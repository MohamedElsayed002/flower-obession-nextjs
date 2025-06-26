import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import CheckoutAnimation from "@/components/checkout/checkout-animation";
import CheckoutForm from "@/components/checkout/checkout-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("checkout-title"),
    description: t("checkout-description")
  };
}

export default function CheckoutPage() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      <CheckoutForm />
      <aside>
        <CheckoutAnimation />
      </aside>
    </section>
  );
}
