"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useGetAllOrders } from "@/hooks";

import { SingleProductSkeleton } from "../skeletons/single-product-skeleton";
import { PaginationDemo } from "./pagination";

export default function AllOrders() {
  const t = useTranslations();
  const [page, setPage] = useState(1);
  const { data, isPending } = useGetAllOrders({ page });

  if (isPending) return <SingleProductSkeleton />;

  return (
    <div className="mt-14 flex flex-col items-center justify-center text-center">
      <div>
        <h1 className="text-3xl font-bold text-custom-brown">{t("all-orders-0")}</h1>
        <h2 className="mb-10 mt-3 text-center text-sm text-custom-brown-2">
          {t("total-orders-in-the-website")} {data?.total}
        </h2>
      </div>
      <Table>
        <TableCaption>{t("a-list-of-your-orders")}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>{t("order-0")}</TableHead>
            <TableHead>{t("shipping-address")}</TableHead>
            <TableHead>{t("payment-method")}</TableHead>
            <TableHead>{t("payment-status")}</TableHead>
            <TableHead>{t("total-price-0")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item._id}</TableCell>
              <TableCell>{item.shippingAddress.street}</TableCell>
              <TableCell>{t("cash-online")}</TableCell>
              <TableCell>
                <Badge
                  className={`${
                    item.isPaid ? "bg-green-500" : "bg-red-500"
                  } rounded-md p-2 text-white`}
                >
                  {item.isPaid ? t("paid") : t("not-paid")}
                </Badge>
              </TableCell>
              <TableCell>${item.totalOrderPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationDemo
        totalPages={data?.totalPages ?? 1}
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
