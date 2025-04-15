import useFavoriteButton from "@/hooks";
import { Loader, X } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export function FavoriteSingleProduct({ item }: { item: Products }) {
  // Mutate
  const { mutate: FavoriteButtonMutate, isPending: isFavoriteButtonLoading } = useFavoriteButton();

  // Locale
  const locale = useLocale();

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
      <div className="absolute top-5 ltr:right-14 rtl:right-10 md:right-8">
        <div
          onClick={() => FavoriteButtonMutate(item._id)}
          className="w-10 h-10 rounded-full bg-custom-yellow-2 flex justify-center items-center text-white cursor-pointer"
        >
          {isFavoriteButtonLoading ? <Loader className="animate-spin" /> : <X />}
        </div>
      </div>
    </div>
  );
}
