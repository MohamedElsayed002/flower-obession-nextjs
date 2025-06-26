"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { RotateCcw, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import BreadCrumbProduct from "@/components/single-product/breadcrumb-product";
import { SingleProductSkeleton } from "@/components/skeletons/single-product-skeleton";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useUserStore } from "@/store/userStore";
import { addToCart, getProductBySlug } from "@/utils/actions";

import { Badge } from "../ui/badge";

export default function SingleProduct({ params }: { params: { slug: string } }) {
  // Decode Arabic text
  const decodedSlug = decodeURIComponent(params.slug);

  // Translation
  const locale = useLocale();
  const t = useTranslations();

  // Context
  const { user } = useUserStore();
  const router = useRouter(); // Initialize router

  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["Single Product", locale, decodedSlug],
    queryFn: () => getProductBySlug(decodedSlug, locale),
    staleTime: 1000 * 60 * 5
  });

  const formSchema = z.object({
    size: z.enum(["Big", "Medium", "Small"], { required_error: t("size-error") }),
    amount: z.preprocess((val) => Number(val) || 1, z.number().min(1).max(100)) // Ensures `1` is default
  });

  // Schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // I send by default big because in the data base there is no size.
      // plus I'm trying to copy the design :)
      size: "Big",
      amount: 1
    }
  });

  // Function
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await addToCart({
      userId: user?._id || "",
      productId: data?._id || "",
      amount: values.amount
    });

    if (response) {
      toast.success(t("product-added-to-cart-successfully")); // Optional success message
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      router.push(`/${locale}/cart`); // Redirect to cart page
    } else {
      toast.error(t("failed-to-add-product-to-cart")); // Show error if request fails
    }
  }

  if (isPending) {
    return <SingleProductSkeleton />;
  }

  if (error) {
    return (
      <div className="mt-20 flex flex-col items-center justify-center gap-y-4 p-20">
        <h1 className="text-4xl font-bold text-custom-brown">{error.message}</h1>
        <p className="text-sm text-custom-brown-2">{t("slug-message-error")}</p>
      </div>
    );
  }

  return (
   <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.4 }}
  className="grid grid-rows-[auto_auto] gap-4 py-10 md:grid-cols-2 md:grid-rows-1"
>
  {/* Image Section */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="relative order-1 mx-auto h-[300px] w-[300px] md:order-2 md:h-[500px] md:w-[500px]"
  >
    <Image
      className="rounded-xl object-cover"
      src={data?.image || "/placeholder-image.jpg"}
      alt={data?.details[0].title || "Product image"}
      fill
    />
  </motion.div>

  {/* Product Details */}
  <div className="order-2 md:order-1">
    <BreadCrumbProduct title={data?.details[0].title || "Default Title"} />
    <div className="mt-10 flex flex-col gap-y-3.5">
      <h1 className="text-xl font-bold text-custom-brown">{data?.details[0].title}</h1>
      <p className="-mt-2 text-sm text-custom-brown-2">
        {data?.category} {t("collection-0")}
      </p>
      <h2 className="text-xl font-bold text-custom-brown">${data?.price}</h2>
      <p className="text-sm text-custom-brown-2">{data?.details[0].description}</p>
      <p className="text-xl font-bold text-custom-brown">
        {t("sold")}: {data?.sold}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-4 gap-4">
          {/* Size Selector */}
          <div className="col-span-3 w-full">
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <label htmlFor="product-size" className="sr-only">
                    {t("select-size")}
                  </label>
                  <FormControl>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={String(field.value)}
                    >
                      <SelectTrigger
                        id="product-size"
                        dir={locale === "en" ? "ltr" : "rtl"}
                        className="bg-[#fdf3e9]"
                      >
                        <SelectValue placeholder={t("size")} />
                      </SelectTrigger>
                      <SelectContent dir={locale === "en" ? "ltr" : "rtl"} className="bg-[#fdf3e9]">
                        <SelectItem value="Big">{t("big")}</SelectItem>
                        <SelectItem value="Medium">{t("medium")}</SelectItem>
                        <SelectItem value="Small">{t("small")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Quantity Selector */}
          <div className="col-span-1">
            {(data?.quantity ?? 0) > 0 ? (
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <label htmlFor="product-amount" className="sr-only">
                      {t("select-amount")}
                    </label>
                    <FormControl>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        value={String(field.value) || "1"}
                      >
                        <SelectTrigger
                          id="product-amount"
                          dir={locale === "en" ? "ltr" : "rtl"}
                          className="bg-custom-yellow"
                        >
                          <SelectValue placeholder={t("amount")} />
                        </SelectTrigger>
                        <SelectContent dir={locale === "en" ? "ltr" : "rtl"} className="bg-custom-yellow">
                          {Array.from({ length: data?.quantity || 0 }, (_, i) => (
                            <SelectItem key={i + 1} value={String(i + 1)}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : (
              <Badge className="rounded-md bg-custom-brown p-[0.38rem] text-center text-white hover:bg-custom-brown/80 md:p-2.5">
                {t("out-stock")}
              </Badge>
            )}
          </div>

          {/* Add to Cart / Login */}
          <div className="flex w-full gap-3">
            <div>
              {user ? (
                (data?.quantity ?? 0) > 0 ? (
                  <div>
                    <Button
                      aria-label={t("add-to-cart")}
                      className="rounded-bl-full rounded-tr-full bg-custom-brown px-10 text-white hover:bg-custom-brown/80"
                      type="submit"
                    >
                      {t("add-to-cart")}
                    </Button>
                    {data?.quantity === 1 && (
                      <p className="mt-2 w-full text-xs" id="stock-alert" role="alert">
                        {t("1-product-available-in-stock")}
                      </p>
                    )}
                  </div>
                ) : null
              ) : (
                <Button
                  aria-label={t("login-please")}
                  className="rounded-bl-full rounded-tr-full bg-custom-brown px-10 hover:bg-custom-brown/80"
                >
                  <Link href={`/${locale}/login`}>{t("login-please")}</Link>
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>

    {/* Shipping and Returns */}
    <div
      className="mt-10 w-full rounded-md border border-custom-yellow-2 text-custom-brown-2"
      aria-label={t("delivery-and-return-info")}
    >
      <div className="m-5 flex items-center gap-4">
        <Truck aria-hidden="true" />
        <div>
          <h2 className="font-bold">{t("2-5-business-days")}</h2>
          <p>{t("easy-and-quick-delivery")}</p>
        </div>
      </div>
      <div className="h-[1px] w-full bg-custom-yellow-2" />
      <div className="m-5 flex gap-4">
        <RotateCcw aria-hidden="true" />
        <h2>{t("30-days-free-return")}</h2>
      </div>
    </div>
  </div>
</motion.div>

  );
}
