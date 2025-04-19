"use client";

import { useLocale, useTranslations } from "next-intl";
import { Button } from "../ui/button";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import Image from "next/image";
export default function ProductCard({ product }: { product: Products }) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="flex flex-col gap-y-3">
      <Image
        src={product.image}
        alt={product.details[0].title}
        width={384} // equivalent to w-96
        height={288} // equivalent to h-72
        className="w-full max-w-[384px] h-auto rounded-md object-cover"
      />{" "}
      <h1 className="text-xl font-bold">{product.details[0].title}</h1>
      {product.details[0].description.length > 100
        ? product.details[0].description.substring(0, 150) + "..."
        : product.details[0].description}
      <Button aria-label={t("view-more")} className="border" variant="link" asChild>
        <Link
          className="flex items-center gap-2"
          href={`/${locale}/shop/${product.details[0].slug}`}
        >
          {t("view-more")} <MoveRight />
        </Link>
      </Button>
    </div>
  );
}
