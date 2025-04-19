"use client";

import { useUserStore } from "@/store/userStore";
import { useLocale } from "next-intl";
import { redirect } from "next/navigation";
import AllOrders from "./all-orders";

export default function AdminComp() {

  const locale = useLocale();

  // Store
  const { user } = useUserStore();

  if (user?.role !== "Admin") {
    redirect(`/${locale}/`);
  }

  return (
    <section>
      <AllOrders />
    </section>
  );
}
