import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { TableCell, TableRow } from "@/components/ui/table";
import { useRemoveProduct, useUpdateCart } from "@/hooks";

import { Button } from "../ui/button";

export function SingleProductRow({ item }: { item: CartItem }) {
  // Translation
  const t = useTranslations();

  // Mutate
  const { mutate: updateMutate, isPending: updateProductQuantityPending } = useUpdateCart();
  const { mutate, isPending } = useRemoveProduct();
  return (
    <TableRow key={item.product._id}>
      <TableCell>
        {/* Product Image */}
        <Image
          width={200}
          height={200}
          src={item.product.image}
          alt={item.product.details[0].title}
        />
      </TableCell>
      <TableCell>
        <div>
          {/* Product Details */}
          <h1 className="text-xl text-custom-brown">{item.product.details[0].title}</h1>
          <h2 className="text-sm text-custom-brown-2">
            {t("category")}: {item.product.category}
          </h2>
          <h2 className="text-xl font-bold text-custom-brown">
            {t("price")}: ${item.product.price}
          </h2>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-row gap-2">
          {/* Quantity */}
          <Button
          aria-label={t("decrease-quantity")}
            disabled={updateProductQuantityPending || item.quantity === 1}
            variant="outline"
            className="bg-custom-yellow-2 hover:bg-custom-yellow-2"
            onClick={() =>
              updateMutate({ productId: item.product._id ?? "", quantity: item.quantity - 1 })
            }
          >
            <Minus />
          </Button>
          <span className="rounded-full bg-custom-brown p-2 text-custom-yellow-2">
            {item.quantity}
          </span>
          <Button
          aria-label={t("increase-quantity")}
            disabled={updateProductQuantityPending}
            variant="outline"
            className="bg-custom-yellow-2 hover:bg-custom-yellow-2"
            onClick={() =>
              updateMutate({ productId: item.product._id ?? "", quantity: item.quantity + 1 })
            }
          >
            <Plus />
          </Button>
        </div>
      </TableCell>
      <TableCell>
        <h1>${item.price}</h1>
      </TableCell>
      <TableCell>
        {/* Action */}
        <Button
          aria-label={t("remove-product")}
          disabled={isPending}
          onClick={() => mutate({ productId: item.product._id ?? "" })}
          className="bg-custom-yellow-2 text-black hover:bg-custom-yellow-2"
        >
          <X />
        </Button>
      </TableCell>
    </TableRow>
  );
}
