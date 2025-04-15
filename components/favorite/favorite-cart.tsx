"use client";

import { useUserFavorite } from "@/hooks";
import { SingleProductSkeleton } from "../skeletons/single-product-skeleton";
import EmptyCart from "../common/empty-cart";
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

  console.log(data)

  return (
    <div className="my-10 w-full  grid grid-cols-1 md:grid-cols-3 items-center place-items-center gap-5">
      {data?.data?.products.map((item: Products) => {
        return <FavoriteSingleProduct key={item._id} item={item} />;
      })}
    </div>
  );
}
