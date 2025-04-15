import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ProfileForm from "@/components/profile/profile-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("profile"),
    description: t("profile-description"),
  };
}

export default function ProfilePage() {
  return (
    <>
      <ProfileForm/>
    </>
  )
}