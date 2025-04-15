"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLocale, useTranslations } from "next-intl";
import { SingleProductSkeleton } from "@/components/skeletons/single-product-skeleton";
import { useUserCart } from "@/hooks";
import { SingleProductRow } from "./single-product-row";
import EmptyCart from "../common/empty-cart";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { motion } from "framer-motion"; // Import framer-motion

export default function CartTable() {
  // Translation
  const t = useTranslations();

  // Locale
  const locale = useLocale();

  // Mutate
  const { data, isPending, error } = useUserCart();

  if (isPending) {
    return <SingleProductSkeleton />;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  if (data?.cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="grid grid-cols-12 -ml-6 gap-8 my-10">
      {/* Animate Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="col-span-12 md:col-span-8"
      >
        <Table className="overflow-x-auto sm:overflow-y-auto sm:flex-row scrollbar-hide">
          {/* Table Header */}
          <TableCaption>{t("products-cart")}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>{t("image")}</TableHead>
              <TableHead>{t("product-name")}</TableHead>
              <TableHead>{t("quantity")}</TableHead>
              <TableHead className="">{t("subtotal")}</TableHead>
              <TableHead>{t("action")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Table Body */}
            {data?.cartItems.map((item) => (
              <SingleProductRow key={item.product._id} item={item} />
            ))}
          </TableBody>
        </Table>
      </motion.div>

      {/* Animate Cart Summary */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="col-span-12 md:col-span-4"
      >
        {/* Add cart summary or total here */}
        <div className="bg-custom-yellow-2 w-96 rounded-xl p-10 h-96">
          <h1 className="text-center -pt-10 text-xl font-bold mb-2">{t("cart-summary")}</h1>
          <Separator />
          <div className="mt-10 flex flex-col gap-y-4">
            <h1 className="text-md font-medium">
              {t("total-price")} {data?.totalPrice}
            </h1>
            <h2 className="text-md font-medium">
              {t("price-after-discount")} ${data?.totalPriceDiscount}
            </h2>
            <h1>
              {t("delivery")} ${data?.totalPrice ? (data.totalPrice * 0.05).toFixed(2) : 0}
            </h1>
            <Separator />
            <h1 className="text-xl font-bold text-center">
              {t("total")} ${(data?.totalPrice ?? 0) + (data?.totalPrice ?? 0) * 0.05}
            </h1>
            <Link
              className="bg-custom-brown w-full text-white text-center py-2 rounded-md -mt-1"
              href={`/${locale}/checkout?cartId=${data?.id}`}
            >
              {t("checkout")}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
