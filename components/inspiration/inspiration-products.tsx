"use client";

import { ProductSkeleton } from "@/components/skeletons/product-skeleton";
import { getAllProducts } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { cn } from "@/utils/lib/utils";
import ProductCard from "@/components/single-product/product-card";
import { motion } from "framer-motion"; // Import framer-motion

export default function InspirationComp() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedParams = searchParams.get("category") || "home";
  const locale = useLocale();

  const {
    data: products = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["products", locale, selectedParams],
    queryFn: () => getAllProducts(locale, selectedParams || "home"),
    staleTime: 1000 * 60 * 5,
  });

  const handleCategoryChange = (category: string) => {
    const currentPath = window.location.pathname; // Get the current path (e.g., /en/inspiration)
    const newUrl = `${currentPath}?category=${category.toLowerCase()}`;
    router.push(newUrl); // Update the URL
  };

  if (isPending) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 w-4/5 md:w-full gap-y-3">
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </div>
    );
  }

  if (error) {
    return <h1>Error {error.message}</h1>;
  }

  return (
    <>
      <div className="flex gap-5 justify-between flex-col md:flex-row md:items-center">
        <div className="relative w-fit">
          <h1 className="absolute inset-0 flex items-center text-start justify-center text-4xl text-custom-brown font-bold">
            {t("inspiration")}
          </h1>
          <Image src="/shape-4.png" alt="al" width={200} height={200} />
        </div>
        <div className="flex gap-4 overflow-x-auto sm:overflow-y-auto sm:flex-row scrollbar-hide">
          <div
            className={cn(
              "bg-[#FBC3A7] py-2 cursor-pointer px-3 rounded-full text-custom-brown border border-custom-brown",
              selectedParams === "home" ? "text-white" : ""
            )}
            onClick={() => handleCategoryChange("home")}
          >
            <h1>{t("Home")}</h1>
          </div>
          <h1
            onClick={() => handleCategoryChange("weddings")}
            className={cn(
              "bg-[#FBC3A7] py-2 cursor-pointer px-3 rounded-full text-custom-brown border border-custom-brown",
              selectedParams === "weddings" ? "text-white" : ""
            )}
          >
            {t("weddings")}
          </h1>
          <h1
            onClick={() => handleCategoryChange("events")}
            className={cn(
              "bg-[#FBC3A7] py-2 cursor-pointer px-3 rounded-full text-custom-brown border border-custom-brown",
              selectedParams === "events" ? "text-white" : ""
            )}
          >
            {t("events")}
          </h1>
          <h1
            onClick={() => handleCategoryChange("bouquets")}
            className={cn(
              "bg-[#FBC3A7] py-2 cursor-pointer px-3 rounded-full text-custom-brown border border-custom-brown",
              selectedParams === "bouquets" ? "text-white" : ""
            )}
          >
            {t("bouquets")}
          </h1>
          <h1
            onClick={() => handleCategoryChange("christmas")}
            className={cn(
              "bg-[#FBC3A7] py-2 cursor-pointer px-3 rounded-full text-custom-brown border border-custom-brown",
              selectedParams === "christmas" ? "text-white" : ""
            )}
          >
            {t("christmas")}
          </h1>
        </div>
      </div>

      {/* Product Grid with Animation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 w-full max-w-6xl mx-auto mb-20">
        {products.slice(0, 9).map((product: Products, index: number) => {
          return (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <ProductCard key={product._id} product={product} index={index} />
            </motion.div>
          );
        })}
        {products.length === 0 && (
          <div className="min-h-[24.5rem] grid place-items-center w-full">
            <h1 className="text-5xl font-bold text-custom-brown w-full">
              {t("no-products-available")}
            </h1>
          </div>
        )}
      </div>
    </>
  );
}
