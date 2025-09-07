"use client";

import { redirect } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { useFetchBusinessInsights, useFetchOperationalMetrics, useFetchProductAnalytics, useFetchRevenueAnalytics, useFetchSeasonalAnalytics } from "@/hooks";
import { useUserStore } from "@/store/userStore";

import { SingleProductSkeleton } from "../skeletons/single-product-skeleton";
import AdminStats from "./admin-stats";
import AllOrders from "./all-orders";
import BusinessInsights from "./business-insights";
import OperationalMetrics from "./operational-metrics";
import ProductAnalytics from "./product-analytics";
import RevenueAnalytics from "./revenue-analytics";
import SeasonalAnalytics from "./seasonal-analytics";

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

function ProductAnalyticsWrapper() {
  const { data: productData, isPending: productLoading } = useFetchProductAnalytics();

  if (productLoading) {
    return <SingleProductSkeleton />;
  }

  if (!productData) {
    return <div className="text-center text-gray-500">No product analytics data available</div>;
  }

  return <ProductAnalytics data={productData} />;
}

function OperationalMetricsWrapper() {
  const { data: operationalData, isPending: operationalLoading } = useFetchOperationalMetrics();

  if (operationalLoading) {
    return <SingleProductSkeleton />;
  }

  if (!operationalData) {
    return <div className="text-center text-gray-500">No operational metrics data available</div>;
  }

  return <OperationalMetrics data={operationalData} />;
}

function SeasonalAnalyticsWrapper() {
  const { data: seasonalData, isPending: seasonalLoading } = useFetchSeasonalAnalytics();

  if (seasonalLoading) {
    return <SingleProductSkeleton />;
  }

  if (!seasonalData) {
    return <div className="text-center text-gray-500">No seasonal analytics data available</div>;
  }

  return <SeasonalAnalytics data={seasonalData} />;
}

function BusinessInsightsWrapper() {
  const { data: businessData, isPending: businessLoading } = useFetchBusinessInsights();

  if (businessLoading) {
    return <SingleProductSkeleton />;
  }

  if (!businessData) {
    return <div className="text-center text-gray-500">No business insights data available</div>;
  }

  return <BusinessInsights data={businessData} />;
}

export default function AdminComp() {
  const locale = useLocale();
  const t = useTranslations()
  const { user } = useUserStore();
  const [activeTab, setActiveTab] = useState<"stats" | "orders" | "revenue" | "products" | "operational" | "seasonal" | "business">("stats");

  if (user?.role !== "Admin") {
    redirect(`/${locale}/`);
  }

  return (
    <section className="grid grid-cols-1 gap-10  md:grid-cols-12">
      <div className="my-5 -mb-10 -ml-10   flex max-h-[550px] gap-2 overflow-x-auto rounded-md bg-custom-yellow-2 p-3 text-sm text-custom-brown md:col-span-3 md:-ml-0 md:flex-col md:gap-5 md:overflow-x-visible md:p-20 md:text-xl md:text-white">
        <h1 className={`mr-2 whitespace-nowrap  rounded-md py-2 transition-colors ${activeTab === "stats" ? "cursor-pointer  text-white underline" : "cursor-pointer"}`} onClick={() => setActiveTab("stats")}>{t("stats")}</h1>
        <h1 className={`mr-2 whitespace-nowrap  rounded-md py-2 transition-colors ${activeTab === "orders" ? "cursor-pointer  text-white underline" : "cursor-pointer "}`} onClick={() => setActiveTab("orders")}>{t("all-orders-0")}</h1>
        <h1 className={`whitespace-nowrap  rounded-md py-2 transition-colors ${activeTab === "revenue" ? "cursor-pointer  text-white underline" : "cursor-pointer "}`} onClick={() => setActiveTab("revenue")}>{t("revenue-analytics")}</h1>
        <h1 className={`mr-2 whitespace-nowrap  rounded-md py-2 transition-colors ${activeTab === "products" ? "cursor-pointer  text-white underline" : "cursor-pointer "}`} onClick={() => setActiveTab("products")}>{t("product-analytics")}</h1>
        <h1 className={`mr-2 whitespace-nowrap  rounded-md py-2 transition-colors ${activeTab === "operational" ? "cursor-pointer  text-white underline" : "cursor-pointer "}`} onClick={() => setActiveTab("operational")}>{t("operational-metrics")}</h1>
        <h1 className={`mr-2 whitespace-nowrap  rounded-md py-2 transition-colors ${activeTab === "seasonal" ? "cursor-pointer  text-white underline" : "cursor-pointer "}`} onClick={() => setActiveTab("seasonal")}>{t("seasonal-analytics")}</h1>
        <h1 className={`whitespace-nowrap  rounded-md py-2 transition-colors ${activeTab === "business" ? "cursor-pointer  text-white underline" : "cursor-pointer "}`} onClick={() => setActiveTab("business")}>{t("business-insights")}</h1>
      </div>
      <div className="md:col-span-9">
        {
          activeTab === "stats" ? <AdminStats /> :
            activeTab === "orders" ? <AllOrders /> :
              activeTab === "revenue" ? <RevenueAnalyticsWrapper /> :
                activeTab === "products" ? <ProductAnalyticsWrapper /> :
                  activeTab === "operational" ? <OperationalMetricsWrapper /> :
                    activeTab === "seasonal" ? <SeasonalAnalyticsWrapper /> :
                      <BusinessInsightsWrapper />
        }
      </div>
    </section>
  );
}