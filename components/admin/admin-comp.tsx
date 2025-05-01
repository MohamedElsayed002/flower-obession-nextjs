"use client";

import { useUserStore } from "@/store/userStore";
import { useLocale, useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import AllOrders from "./all-orders";
import { useState } from "react";
import AdminStats from "./admin-stats";

export default function AdminComp() {
  const locale = useLocale();
  const t = useTranslations()
  const { user } = useUserStore();
  const [show, setShow] = useState<boolean>(true);

  if (user?.role !== "Admin") {
    redirect(`/${locale}/`);
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-12  gap-10">
      <div className="flex -mb-10 my-5 p-5  gap-5 md:flex-col md:col-span-3  md:p-20  bg-custom-yellow-2 md:h-1/2 text-custom-brown text-xl md:text-white rounded-md ">
        <h1 className={`${show ? 'underline cursor-pointer' : 'cursor-pointer'}`} onClick={() => setShow(true)}>{t('stats')}</h1>
        <h1 className={`${!show ? 'underline cursor-pointer' : 'cursor-pointer'}`} onClick={() => setShow(false)}>{t("all-orders-0")}</h1>
      </div>
      <div className="md:col-span-9">
        {
          show ? <AdminStats/> : <AllOrders/>
        }
      </div>
    </section>
  );
}