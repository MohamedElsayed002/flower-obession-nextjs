"use client";

import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Heart, Loader } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import useFavoriteButton from "@/hooks";
import { useEffect, useState } from "react";

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
    <div className="w-14 h-14 rounded-full bg-gray-400 shadow-lg flex items-center justify-center cursor-pointer">
      <div className="w-8 h-8 rounded-full bg-white" />
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
          className="w-full h-auto object-cover rounded-2xl"
        />
      </Link>

      {/* Floating Price Tag */}
      <div className="absolute top-4 right-4 z-20">
        {isTouchDevice ? (
          <Popover>
            <PopoverTrigger>{trigger}</PopoverTrigger>
            <PopoverContent className="z-50 bg-white p-3 rounded-lg shadow-xl">
              <h3 className="text-lg font-bold">
                {product.details[0].title}
              </h3>
              <p className="text-gray-500">${product.price}</p>
            </PopoverContent>
          </Popover>
        ) : (
          <HoverCard>
            <HoverCardTrigger>{trigger}</HoverCardTrigger>
            <HoverCardContent className="z-50 bg-white p-3 rounded-lg shadow-xl">
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
        className="absolute bottom-10 right-4 z-20 w-14 h-14 bg-gray-400 rounded-full flex justify-center items-center"
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
