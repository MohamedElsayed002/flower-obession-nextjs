"use client"

import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LocaleToggle() {

    // Navigation
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Translation
    const t = useTranslations()


    // Function
    const switchLocale = (locale: "en" | "ar") => {
        router.push(`${pathname}?${searchParams.toString()}`, { locale });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
                <Globe className="outline-none" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => switchLocale("en")}>{t('english')}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLocale("ar")}>{t('arabic')}</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}