import ScrollToTopButton from "@/components/common/scroll-top-button";
import Footer from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";
import ClientLayout from "@/utils/providers/client-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flower Obsession",
  description: "Flower ob description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientLayout>
      {" "}
      {/* ✅ Fetch user once here */}
      <div>
        <header>
          <Navbar />
        </header>
        <main className="container min-h-[38rem]">{children}</main>
        <ScrollToTopButton />
        <footer>
          <Footer />
        </footer>
      </div>
    </ClientLayout>
  );
}
