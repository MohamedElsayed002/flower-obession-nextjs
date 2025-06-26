"use client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion"; // Import motion for animations
import { useLocale, useTranslations } from "next-intl";

import { getAllProducts } from "@/utils/actions";

import { ProductSkeleton } from "../skeletons/product-skeleton";
import ProductCard from "./product-card";

export default function HomeProducts() {
  const t = useTranslations();
  const locale = useLocale();

  const {
    data: products = [],
    isPending
  } = useQuery<Products[]>({
    queryKey: ["home products", locale],
    queryFn: () => getAllProducts(locale, "show"),
    staleTime: 1000 * 60 * 5
  });

  // Skeleton Loader Animation
  if (isPending) {
    return (
      <div className="mx-auto grid w-4/5 grid-cols-1 gap-y-3 md:w-full md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ProductSkeleton />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ProductSkeleton />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ProductSkeleton />
        </motion.div>
      </div>
    );
  }

  // No Products Available
  if (products.length === 0) {
    return (
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold">{t("no-products-available")}</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto mb-20 grid w-4/5 grid-cols-1 gap-10 md:w-full md:grid-cols-3">
        {products.slice(0, 3).map((item) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductCard product={item} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
