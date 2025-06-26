"use client";

import { useUserFavorite } from "@/hooks";

import EmptyCart from "../common/empty-cart";
import { SingleProductSkeleton } from "../skeletons/single-product-skeleton";
import { FavoriteSingleProduct } from "./favorite-single-product";

export default function FavoriteCart() {
    
  // Mutation
  const { data, isPending } = useUserFavorite();

  if (isPending) {
    return <SingleProductSkeleton />;
  }

  if (data?.data?.products.length === 0 || !data?.data) {
    return <EmptyCart />;
  }


  return (
    <div className="my-10 grid  w-full grid-cols-1 place-items-center items-center gap-5 md:grid-cols-3">
      {data?.data?.products.map((item: Products) => {
        return <FavoriteSingleProduct key={item._id} item={item} />;
      })}
    </div>
  );
}
