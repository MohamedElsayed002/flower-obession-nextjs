"use client";
import ProductCard from "./product-card";
import { useLocale, useTranslations } from "next-intl";
import { getAllProducts } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import { ProductSkeleton } from "../skeletons/product-skeleton";
import { motion } from "framer-motion"; // Import motion for animations

export default function HomeProducts() {
  const t = useTranslations();
  const locale = useLocale();

  const {
    data: products = [],
    isPending,
  } = useQuery<Products[]>({
    queryKey: ["home products", locale],
    queryFn: () => getAllProducts(locale, 'show'),
    staleTime: 1000 * 60 * 5,
  });

  // Skeleton Loader Animation
  if (isPending) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 w-4/5 mx-auto md:w-full gap-y-3">
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
      <div className="grid grid-cols-1 w-4/5 mx-auto md:w-full md:grid-cols-3 gap-10 mb-20">
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
