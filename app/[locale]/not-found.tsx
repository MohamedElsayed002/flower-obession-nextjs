import NotFoundComponent from "@/components/common/not-found-component";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {

    // Translation
    const t = useTranslations()

    return (
        <main className="min-h-screen flex-col flex items-center justify-center gap-12">
            {/* Message */}
            <NotFoundComponent />

            {/* Homepage link */}
            <Button className=" mt-5" asChild>
                <Link href="/">{t("back-to-home")}</Link>
            </Button>
        </main>
    )
}