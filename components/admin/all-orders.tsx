"use client";
import { useState } from "react";
import { useGetAllOrders } from "@/hooks";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { PaginationDemo } from "./pagination";
import { SingleProductSkeleton } from "../skeletons/single-product-skeleton";

export default function AllOrders() {
  const t = useTranslations();
  const [page, setPage] = useState(1);
  const { data, isPending } = useGetAllOrders({ page });

  if (isPending) return <SingleProductSkeleton />;

  return (
    <div className="flex text-center flex-col justify-center items-center mt-14">
      <div>
        <h1 className="text-3xl font-bold text-custom-brown">{t("all-orders-0")}</h1>
        <h2 className="text-custom-brown-2 text-sm text-center mt-3 mb-10">
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
                  } text-white p-2 rounded-md`}
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
