"use client"
import ErrorComponent from "@/components/common/error-component"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export default function Error({
    error,
    reset
} : {
    error : Error & { digest ?: string};
    reset : () => void
}) {

    // Translation 
    const t = useTranslations()

    return (
        <main className="min-h-screen flex flex-col justify-center items-center">
        {/* Message */}
        <ErrorComponent>{error.message}</ErrorComponent>
  
        {/* Try again */}
        <div className="mt-12 flex justify-center">
          <Button onClick={() => reset()}>{t("try-again")}</Button>
        </div>
      </main>  
     )
}