"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState, useMemo } from "react";
import { useDebouncedCallback } from "use-debounce";
import InfiniteScroll from 'react-infinite-scroll-component';

import { ProductSkeleton } from "@/components/skeletons/product-skeleton";
import { getShopProducts } from "@/utils/actions";

import SearchProduct from "./search-form";

const PRODUCTS_PER_PAGE = 4;

export default function ShopComp() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const t = useTranslations();
  const locale = useLocale();

  // Use debounced search value for useQuery
  const [debouncedSearch, setDebouncedSearch] = useState(
    searchParams.get("search")?.toString() || ""
  );
  const [inputSearch, setInputSearch] = useState(debouncedSearch); // Immediate input value for UI
  const [displayedCount, setDisplayedCount] = useState(PRODUCTS_PER_PAGE);

  const {
    data: allProducts = [],
    isPending,
    error
  } = useQuery({
    queryKey: ["shop products", locale, debouncedSearch],
    queryFn: () => getShopProducts(locale, debouncedSearch),
    staleTime: 1000 * 60 * 5
  });

  // Get currently displayed products
  const displayedProducts = useMemo(() => {
    return allProducts.slice(0, displayedCount);
  }, [allProducts, displayedCount]);

  // Check if there are more products to load
  const hasMore = displayedCount < allProducts.length;

  const handleSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
    setDisplayedCount(PRODUCTS_PER_PAGE); // Reset to initial count when searching
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 1000);

  const handleInputChange = (value: string) => {
    setInputSearch(value);
    handleSearch(value);
  };

  const fetchMoreData = () => {
    // Load 6 more products
    setDisplayedCount(prev => Math.min(prev + PRODUCTS_PER_PAGE, allProducts.length));
  };

  if (isPending) {
    return (
      <div className="grid w-4/5 grid-cols-1 gap-y-3  md:w-full md:grid-cols-3">
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-4xl font-bold">{error.message}</h1>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <div className="mb-20 flex flex-col justify-between gap-y-10 md:mb-0 md:flex-row md:items-center">
        <div className="relative z-50 w-fit">
          <h1 className="absolute inset-0 flex items-center justify-center text-start text-4xl font-bold text-custom-brown">
            {t("shop")}
          </h1>
          <Image src="/shape-4.png" alt="Image Shop" width={200} height={200} />
        </div>
        <SearchProduct
          search={inputSearch}
          setSearch={handleInputChange}
          handleSearch={handleSearch}
        />
        <div />
      </div>

      {allProducts.length === 0 ? (
        <div className="-mt-10">
          <p className="text-center text-lg">{t("no_products_found")}</p>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={displayedProducts.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className="col-span-3 flex justify-center py-4">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
              </div>
            </div>
          }
          className="-mt-10"
        >
          <div className="grid grid-cols-1 place-items-center items-center gap-5 md:grid-cols-3">
            {displayedProducts.map((item: Products, index: number) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index % PRODUCTS_PER_PAGE) * 0.1 }}
              >
                <div className="overflow-hidden rounded-lg">
                  <div className="overflow-hidden">
                    <Link href={`/${locale}/shop/${item.details[0].slug}`}>
                      <Image
                        className="transition-transform duration-300 ease-in-out hover:scale-150"
                        src={item.image}
                        alt={item.details[0].title}
                        width={400}
                        height={400}
                      />
                    </Link>
                  </div>
                  <div>
                    <h1 className="font-bold">{item.details[0].title}</h1>
                    <p className="font-bold text-custom-brown-2">${item.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}