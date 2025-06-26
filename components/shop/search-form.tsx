
import { useTranslations } from "next-intl";

import { Input } from "../ui/input";

export default function SearchProduct({
  search,
  setSearch,
  handleSearch
}: {
  search: string;
  setSearch: (value: string) => void;
  handleSearch: (value: string) => void;
}) {
  const t = useTranslations();

  return (
    <Input
    autoFocus
      className="mx-auto w-full max-w-sm  border border-custom-brown bg-custom-yellow text-custom-brown placeholder:text-custom-brown md:mx-0 ltr:md:-ml-52 rtl:md:-mr-52"
      type="text"
      placeholder={t("search-product")}
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
    />
  );
}
