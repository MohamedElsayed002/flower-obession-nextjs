import { NextIntlClientProvider, useLocale, useMessages, useNow, useTimeZone } from "next-intl";
import ReactQueryProvider from "./query-provider";
import { Toaster } from "@/components/ui/sonner";


type ProvidersProps = {
    children : React.ReactNode
}

export default function Providers({children} : ProvidersProps) {

    // Translation 
    const messages = useMessages()
    const locale = useLocale()
    const timezone = useTimeZone()
    const now = useNow()
    
    return (
        <NextIntlClientProvider
            messages={messages}
            timeZone={timezone}
            now={now}
            locale={locale}
        >
            <ReactQueryProvider>
                {children}
                <Toaster/>
            </ReactQueryProvider>
        </NextIntlClientProvider>
    )
}