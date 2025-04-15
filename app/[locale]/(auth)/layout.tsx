import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("auth-title"),
    description: t("auth-description"),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Image Container */}
      <div className="relative w-full h-full hidden md:flex">
        <Image
          src="/auth-image-2.jpg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          priority
        />

        {/* Overlay (Shade) */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Main Content */}
      <main className="flex items-center justify-center p-8">{children}</main>
    </div>
  );
}
