
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";

export default function SearchProduct({
  search,
  setSearch,
  handleSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
  handleSearch: (value: string) => void;
}) {
  const t = useTranslations();

  return (
    <Input
      className="w-full mx-auto md:mx-0  max-w-sm ltr:md:-ml-52 rtl:md:-mr-52 bg-custom-yellow placeholder:text-custom-brown text-custom-brown border border-custom-brown"
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
