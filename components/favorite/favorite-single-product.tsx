import { Loader, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import useFavoriteButton from "@/hooks";

export function FavoriteSingleProduct({ item }: { item: Products }) {
  // Mutate
  const { mutate: FavoriteButtonMutate, isPending: isFavoriteButtonLoading } = useFavoriteButton();

  // Locale
  const locale = useLocale();

  const t = useTranslations();

  return (
    <div className="relative" key={item._id}>
      <Link href={`/${locale}/shop/${item.details[0].slug}`}>
        <Image
          className="rounded-md"
          src={item.image}
          alt={item.details[0].title}
          width={400}
          height={400}
        />
      </Link>
      <div className="absolute top-5 md:right-8 ltr:right-14 rtl:right-10">
        <div
          aria-label={t("add-remove-from-favorite")}
          onClick={() => FavoriteButtonMutate(item._id ?? "")}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-custom-yellow-2 text-white"
        >
          {isFavoriteButtonLoading ? <Loader className="animate-spin" /> : <X />}
        </div>
      </div>
    </div>
  );
}
