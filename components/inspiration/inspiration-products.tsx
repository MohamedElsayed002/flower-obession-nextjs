"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useMemo,useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import ProductCard from "@/components/single-product/product-card";
import { ProductSkeleton } from "@/components/skeletons/product-skeleton";
import { getAllProducts } from "@/utils/actions";
import { cn } from "@/utils/lib/utils";

const PRODUCTS_PER_PAGE = 3;

export default function InspirationComp() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedParams = searchParams.get("category") || "home";
  const locale = useLocale();

  // State for infinite scrolling
  const [displayedCount, setDisplayedCount] = useState(PRODUCTS_PER_PAGE);

  const {
    data: allProducts = [],
    isPending,
    error
  } = useQuery({
    queryKey: ["products", locale, selectedParams],
    queryFn: () => getAllProducts(locale, selectedParams || "home"),
    staleTime: 1000 * 60 * 5
  });

  // Get currently displayed products
  const displayedProducts = useMemo(() => {
    return allProducts.slice(0, displayedCount);
  }, [allProducts, displayedCount]);

  // Check if there are more products to load
  const hasMore = displayedCount < allProducts.length;

  const handleCategoryChange = (category: string) => {
    const currentPath = window.location.pathname;
    const newUrl = `${currentPath}?category=${category.toLowerCase()}`;
    setDisplayedCount(PRODUCTS_PER_PAGE); // Reset to initial count when changing category
    router.push(newUrl);
  };

  const fetchMoreData = () => {
    // Load 6 more products
    setDisplayedCount(prev => Math.min(prev + PRODUCTS_PER_PAGE, allProducts.length));
  };

  if (isPending) {
    return (
      <div className="grid w-4/5 grid-cols-1 gap-y-3 md:w-full md:grid-cols-3">
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
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div className="relative w-fit">
          <h1 className="absolute inset-0 flex items-center justify-center text-start text-4xl font-bold text-custom-brown">
            {t("inspiration")}
          </h1>
          <Image src="/shape-4.png" alt="Shape image" width={200} height={200} />
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide sm:flex-row sm:overflow-y-auto">
          <div
            className={cn(
              "bg-[#FBC3A7] py-2 cursor-pointer px-3 rounded-full text-custom-brown border border-custom-brown",
              selectedParams === "home" ? "text-white" : ""
            )}
            tabIndex={0}
            onClick={() => handleCategoryChange("home")}
            aria-label={t("home")}
          >
            <h1>{t("Home")}</h1>
          </div>
          <h1
            onClick={() => handleCategoryChange("weddings")}
            className={cn(
              "bg-[#FBC3A7] py-2 cursor-pointer px-3 rounded-full text-custom-brown border border-custom-brown",
              selectedParams === "weddings" ? "text-white" : ""
            )}
            aria-label={t("weddings")}
          >
            {t("weddings")}
          </h1>
          <h1
            onClick={() => handleCategoryChange("events")}
            className={cn(
              "bg-[#FBC3A7] py-2 cursor-pointer px-3 rounded-full text-custom-brown border border-custom-brown",
              selectedParams === "events" ? "text-white" : ""
            )}
            aria-label={t("events")}
          >
            {t("events")}
          </h1>
          <h1
            onClick={() => handleCategoryChange("bouquets")}
            className={cn(
              "bg-[#FBC3A7] py-2 cursor-pointer px-3 rounded-full text-custom-brown border border-custom-brown",
              selectedParams === "bouquets" ? "text-white" : ""
            )}
            aria-label={t("bouquets")}
          >
            {t("bouquets")}
          </h1>
          <h1
            onClick={() => handleCategoryChange("christmas")}
            className={cn(
              "bg-[#FBC3A7] py-2 cursor-pointer px-3 rounded-full text-custom-brown border border-custom-brown",
              selectedParams === "christmas" ? "text-white" : ""
            )}
            aria-label={t("christmas")}
          >
            {t("christmas")}
          </h1>
        </div>
      </div>

      {/* Product Grid with Infinite Scroll and Animation */}
      {allProducts.length === 0 ? (
        <div className="mx-auto mb-20 grid min-h-[24.5rem] w-full max-w-6xl place-items-center p-6">
          <h1 className="w-full text-5xl font-bold text-custom-brown">
            {t("no-products-available")}
          </h1>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={displayedProducts.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center py-4">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
              </div>
            </div>
          }
        >
          <div className="mx-auto mb-20 grid w-full max-w-6xl grid-cols-1 gap-6 overflow-hidden p-6 md:grid-cols-3">
            {displayedProducts.map((product: Products, index: number) => {
              return (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (index % PRODUCTS_PER_PAGE) * 0.1 }}
                  // className="overflow-y-hidden"
                >
                  <ProductCard product={product} index={index} />
                </motion.div>
              );
            })}
          </div>
        </InfiniteScroll>
      )}
    </>
  );
}