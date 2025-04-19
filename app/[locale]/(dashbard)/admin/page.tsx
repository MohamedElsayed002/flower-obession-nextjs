import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import AdminComp from "@/components/admin/admin-comp";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("admin"),
    description: t("admin-description"),
  };
}

export default async function AdminPage() {
  return <AdminComp />;
}
