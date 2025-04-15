"use client"
import { useUserStore } from "@/store/userStore"
import { useLocale, useTranslations } from "next-intl"
import { redirect } from "next/navigation"

export default function AdminComp() {

    // Translations
    const t = useTranslations()

    const locale = useLocale()

    // Store
    const { user} = useUserStore()

    if(user?.role !== "Admin") {
        redirect(`/${locale}/`)
    }

    return (
        <h1>{t('admin')}</h1>
    )
}