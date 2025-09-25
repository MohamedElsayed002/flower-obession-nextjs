import * as Sentry from "@sentry/nextjs";
import type { Metadata } from "next";

import CookieBanner from "@/components/common/cookie-banner";
import ScrollToTopButton from "@/components/common/scroll-top-button";
import Footer from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";
import ClientLayout from "@/utils/providers/client-provider";



export function generateMetadata(): Metadata {
  return {
    // ... your existing metadata
    title: "Flower Obsession",
    description: "Flower ob description",
    other: {
      ...Sentry.getTraceData()
    }
  };
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientLayout>
      {/* ✅ Fetch user once here */}
      <div className="flex min-h-screen flex-col">
        <header>
          <Navbar />
        </header>
        <main className="container flex-1">{children}</main>
        <ScrollToTopButton />
        <CookieBanner />
        <footer className="mt-auto">
          <Footer />
        </footer>
      </div>
    </ClientLayout>
  );
}
