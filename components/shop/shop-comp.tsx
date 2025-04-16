"use client";

import { ProductSkeleton } from "@/components/skeletons/product-skeleton";
import { getShopProducts } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SearchProduct from "./search-form";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

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

  const {
    data: products = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["shop products", locale, debouncedSearch],
    queryFn: () => getShopProducts(locale, debouncedSearch),
    staleTime: 1000 * 60 * 5,
  });

  const handleSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
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

  if (isPending) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 w-4/5  md:w-full gap-y-3">
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-4xl font-bold">{error.message}</h1>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <div className="flex justify-between flex-col md:items-center md:flex-row mb-20 md:mb-0 gap-y-10">
        <div className="relative w-fit z-50">
          <h1 className="absolute inset-0 flex items-center text-start justify-center text-4xl text-custom-brown font-bold">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 -mt-10 items-center place-items-center">
        {products.length === 0 ? (
          <p className="col-span-3 text-center text-lg">{t("no_products_found")}</p>
        ) : (
          products.map((item: Products, index: number) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="overflow-hidden rounded-lg">
                <div className="overflow-hidden">
                  <Link href={`/${locale}/shop/${item.details[0].slug}`}>
                    <Image
                      className="hover:scale-150 transition-transform duration-300 ease-in-out"
                      src={item.image}
                      alt={item.details[0].title}
                      width={400}
                      height={400}
                    />
                  </Link>
                </div>
                <div>
                  <h1 className="font-bold">{item.details[0].title}</h1>
                  <p className="text-custom-brown-2 font-bold">${item.price}</p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
