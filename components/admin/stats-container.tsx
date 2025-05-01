"use client"

import { useTranslations } from "next-intl";
import { Card, CardHeader } from "../ui/card";

export default function StatsContainer({adminStats} : {adminStats: FetchAdminStats}) {

    const t = useTranslations()

  return (
    <div className="mt-8 grid md:grid-cols-2 gap-4 lg:grid-cols-3">
      <Card className="bg-muted">
        <CardHeader className="flex flex-row justify-between items-center">
          <h3 className="capitalize text-3xl text-custom-brown font-bold">{t("users")}</h3>
          <span className="text-primary text-5xl font-extrabold">{adminStats?.users}</span>
        </CardHeader>
      </Card>
      <Card className="bg-muted">
        <CardHeader className="flex flex-row justify-between items-center">
          <h3 className="capitalize text-3xl text-custom-brown font-bold">{t("products")}</h3>
          <span className="text-primary text-5xl font-extrabold">{adminStats?.products}</span>
        </CardHeader>
      </Card>
      <Card className="bg-muted">
        <CardHeader className="flex flex-row justify-between items-center">
          <h3 className="capitalize text-3xl text-custom-brown font-bold">{t("purchased")}</h3>
          <span className="text-primary text-5xl font-extrabold">{adminStats?.orders}</span>
        </CardHeader>
      </Card>
    </div>
  );
}
