import * as Sentry from "@sentry/nextjs";
import type { Metadata } from "next";

import CookieBanner from "@/components/common/cookie-banner";
import ScrollToTopButton from "@/components/common/scroll-top-button";
import Footer from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";
import ClientLayout from "@/utils/providers/client-provider";
import Link from "next/link";



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
        <span className="text-center p-3 bg-red-300">
          Database was lost due to an outage in AWS Bahrain (me-south-1). Region has been changed, and products will be re-added again 😵‍💫.
          <Link className="underline font-bold" href="https://github.com/MohamedElsayed002/flower-obession-nextjs" target="_blank" rel="noopener noreferrer">
            Source Code
          </Link>
        </span>
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
