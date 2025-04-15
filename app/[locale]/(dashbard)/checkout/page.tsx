import CheckoutForm from "@/components/checkout/checkout-form";
import CheckoutAnimation from "@/components/checkout/checkout-animation";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("checkout-title"),
    description: t("checkout-description"),
  };
}

export default function CheckoutPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <CheckoutForm />
      <CheckoutAnimation />
    </div>
  );
}
