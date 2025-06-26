"use client";

import { motion } from "framer-motion"; // Import framer-motion
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { SingleProductSkeleton } from "@/components/skeletons/single-product-skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useOrderStripe, useUserCart } from "@/hooks";

import EmptyCart from "../common/empty-cart";
import { Button } from "../ui/button";
import { SingleProductRow } from "./single-product-row";

export default function CartTable() {
  // Translation
  const t = useTranslations();

  const locale = useLocale()

  // Mutate
  const { data, isPending, error } = useUserCart();
  const { mutate: OrderStripeMutate, isPending: OrderStripeLoading } = useOrderStripe();

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
    <div className="my-10 -ml-6 grid grid-cols-12 gap-8">
      {/* Animate Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="col-span-12 md:col-span-8"
      >
        <Table className="overflow-x-auto scrollbar-hide sm:flex-row sm:overflow-y-auto">
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
        <div className="h-96 w-96 rounded-xl bg-custom-yellow-2 p-10">
          <h1 className="-pt-10 mb-2 text-center text-xl font-bold">{t("cart-summary")}</h1>
          <Separator />
          <div className="mt-10 flex flex-col gap-y-4">
            <h1 className="text-md font-medium">
              {t("total-price")} {data?.totalPrice}
            </h1>
            <h2 className="text-md font-medium">
              {t("price-after-discount")} ${data?.totalPriceDiscount}
            </h2>
            <h1>{t("delivery")} $0</h1>
            <Separator />
            <h1 className="text-center text-xl font-bold">
              {t("total")} ${data?.totalPrice ?? 0}
            </h1>
            <div className="flex items-center gap-2">
              <Button
                className="-mt-1 w-full rounded-md bg-custom-brown py-2 text-center text-white"
                onClick={() => OrderStripeMutate()}
                disabled={OrderStripeLoading}
              >
                {t("checkout")}
              </Button>
              <Link href={`/${locale}/checkout`} passHref>
                <Button className="bg-custom-brown-2" asChild>
                  <span>{t("cash-on-delivery")}</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
