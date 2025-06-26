"use client"
import { useTranslations } from "next-intl"

import ErrorComponent from "@/components/common/error-component"
import { Button } from "@/components/ui/button"

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
        <main className="flex min-h-screen flex-col items-center justify-center">
        {/* Message */}
        <ErrorComponent>{error.message}</ErrorComponent>
  
        {/* Try again */}
        <div className="mt-12 flex justify-center">
          <Button onClick={() => reset()}>{t("try-again")}</Button>
        </div>
      </main>  
     )
}