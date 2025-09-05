"use client";

import { redirect } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { useUserStore } from "@/store/userStore";

import AdminStats from "./admin-stats";
import AllOrders from "./all-orders";
import RevenueAnalytics from "./revenue-analytics";
import { useFetchRevenueAnalytics } from "@/hooks";
import { SingleProductSkeleton } from "../skeletons/single-product-skeleton";

function RevenueAnalyticsWrapper() {
  const { data: revenueData, isPending: revenueLoading } = useFetchRevenueAnalytics();

  if (revenueLoading) {
    return <SingleProductSkeleton />;
  }

  if (!revenueData) {
    return <div className="text-center text-gray-500">No revenue data available</div>;
  }

  return <RevenueAnalytics data={revenueData} />;
}

export default function AdminComp() {
  const locale = useLocale();
  const t = useTranslations()
  const { user } = useUserStore();
  const [activeTab, setActiveTab] = useState<'stats' | 'orders' | 'revenue'>('stats');

  if (user?.role !== "Admin") {
    redirect(`/${locale}/`);
  }

  return (
    <section className="grid grid-cols-1 gap-10  md:grid-cols-12">
      <div className="my-5 -mb-10 flex gap-5  rounded-md bg-custom-yellow-2 p-5  text-xl  text-custom-brown md:col-span-3 md:h-1/2 md:flex-col md:p-20 md:text-white ">
        <h1 className={`${activeTab === 'stats' ? "cursor-pointer underline" : "cursor-pointer"}`} onClick={() => setActiveTab('stats')}>{t("stats")}</h1>
        <h1 className={`${activeTab === 'orders' ? "cursor-pointer underline" : "cursor-pointer"}`} onClick={() => setActiveTab('orders')}>{t("all-orders-0")}</h1>
        <h1 className={`${activeTab === 'revenue' ? "cursor-pointer underline" : "cursor-pointer"}`} onClick={() => setActiveTab('revenue')}>{t("revenue-analytics")}</h1>
      </div>
      <div className="md:col-span-9">
        {
          activeTab === 'stats' ? <AdminStats /> :
            activeTab === 'orders' ? <AllOrders /> :
              <RevenueAnalyticsWrapper />
        }
      </div>
    </section>
  );
}