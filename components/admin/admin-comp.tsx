"use client";

import { redirect } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { useUserStore } from "@/store/userStore";

import AdminStats from "./admin-stats";
import AllOrders from "./all-orders";

export default function AdminComp() {
  const locale = useLocale();
  const t = useTranslations()
  const { user } = useUserStore();
  const [show, setShow] = useState<boolean>(true);

  if (user?.role !== "Admin") {
    redirect(`/${locale}/`);
  }

  return (
    <section className="grid grid-cols-1 gap-10  md:grid-cols-12">
      <div className="my-5 -mb-10 flex gap-5  rounded-md bg-custom-yellow-2 p-5  text-xl  text-custom-brown md:col-span-3 md:h-1/2 md:flex-col md:p-20 md:text-white ">
        <h1 className={`${show ? "cursor-pointer underline" : "cursor-pointer"}`} onClick={() => setShow(true)}>{t("stats")}</h1>
        <h1 className={`${!show ? "cursor-pointer underline" : "cursor-pointer"}`} onClick={() => setShow(false)}>{t("all-orders-0")}</h1>
      </div>
      <div className="md:col-span-9">
        {
          show ? <AdminStats/> : <AllOrders/>
        }
      </div>
    </section>
  );
}