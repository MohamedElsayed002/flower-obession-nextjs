import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import SingleProduct from "@/components/single-product/single-product";
import { getProductBySlug } from "@/utils/actions";

type Props = {
  params: {
    slug: string;
    locale: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations(); // Fetch translations based on locale

  try {
    const decodedSlug = decodeURIComponent(params.slug);
    const product = await getProductBySlug(decodedSlug, params.locale);

    if (!product || !product.details?.[0]) {
      throw new Error(t("productNotFound")); // Use the translation key for error message
    }

    const { title, description } = product.details[0];

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [product.image]
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      title: t("productNotFound"),
      description: t("productNotFoundDescription")
    };
  }
}

export default function SingleProductPage({
  params
}: {
  params: { slug: string; locale: string };
}) {
  return (
    <section>
      <SingleProduct params={params} />
    </section>
  )
}
