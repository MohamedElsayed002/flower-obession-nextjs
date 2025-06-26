"use client"

import { useTranslations } from "next-intl";

import { Card, CardHeader } from "../ui/card";

export default function StatsContainer({adminStats} : {adminStats: FetchAdminStats}) {

    const t = useTranslations()

  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-muted">
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-3xl font-bold capitalize text-custom-brown">{t("users")}</h3>
          <span className="text-5xl font-extrabold text-primary">{adminStats?.users}</span>
        </CardHeader>
      </Card>
      <Card className="bg-muted">
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-3xl font-bold capitalize text-custom-brown">{t("products")}</h3>
          <span className="text-5xl font-extrabold text-primary">{adminStats?.products}</span>
        </CardHeader>
      </Card>
      <Card className="bg-muted">
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-3xl font-bold capitalize text-custom-brown">{t("purchased")}</h3>
          <span className="text-5xl font-extrabold text-primary">{adminStats?.orders}</span>
        </CardHeader>
      </Card>
    </div>
  );
}
