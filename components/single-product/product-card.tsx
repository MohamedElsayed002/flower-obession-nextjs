"use client";

import { Heart, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import useFavoriteButton from "@/hooks";

type ProductCardProps = {
  product: Products;
  index: number;
};

export default function ProductCard({ product, index }: ProductCardProps) {
  const locale = useLocale();
  const { mutate: FavoriteButtonMutate, isPending: isFavoriteButtonLoading } =
    useFavoriteButton();
  const shouldApplyStyle = (index - 1) % 3 === 0;

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  const trigger = (
    <div className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gray-400 shadow-lg">
      <div className="h-8 w-8 rounded-full bg-white" />
    </div>
  );

  return (
    <div
      className={`relative rounded-lg ${
        shouldApplyStyle ? "md:translate-y-20" : ""
      }`}
    >
      {/* Product Image */}
      <Link href={`/${locale}/shop/${product.details[0].slug}`}>
        <Image
          src={product.image}
          alt={product.details[0].title}
          width={400}
          height={600}
          className="h-auto w-full rounded-2xl object-cover"
        />
      </Link>

      {/* Floating Price Tag */}
      <div className="absolute right-4 top-4 z-20">
        {isTouchDevice ? (
          <Popover>
            <PopoverTrigger>{trigger}</PopoverTrigger>
            <PopoverContent className="z-50 rounded-lg bg-white p-3 shadow-xl">
              <h3 className="text-lg font-bold">
                {product.details[0].title}
              </h3>
              <p className="text-gray-500">${product.price}</p>
            </PopoverContent>
          </Popover>
        ) : (
          <HoverCard>
            <HoverCardTrigger>{trigger}</HoverCardTrigger>
            <HoverCardContent className="z-50 rounded-lg bg-white p-3 shadow-xl">
              <h3 className="text-lg font-bold">
                {product.details[0].title}
              </h3>
              <p className="text-gray-500">${product.price}</p>
            </HoverCardContent>
          </HoverCard>
        )}
      </div>

      {/* Favorite Button */}
      <div
        onClick={() => FavoriteButtonMutate(product._id)}
        className="absolute bottom-10 right-4 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-gray-400"
      >
        {isFavoriteButtonLoading ? (
          <Loader className="animate-spin" />
        ) : (
          <Heart className="text-red-300" />
        )}
      </div>
    </div>
  );
}
