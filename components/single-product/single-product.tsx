"use client";

import BreadCrumbProduct from "@/components/single-product/breadcrumb-product";
import { addToCart, getProductBySlug } from "@/utils/actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { RotateCcw, Truck } from "lucide-react";
import { SingleProductSkeleton } from "@/components/skeletons/single-product-skeleton";
import { useUserStore } from "@/store/userStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

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
    staleTime: 1000 * 60 * 5,
  });

  const formSchema = z.object({
    size: z.enum(["Big", "Medium", "Small"], { required_error: t("size-error") }),
    amount: z.preprocess((val) => Number(val) || 1, z.number().min(1).max(100)), // Ensures `1` is default
  });

  // Schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // I send by default big because in the data base there is no size.
      // plus I'm trying to copy the design :)
      size: "Big",
      amount: 1,
    },
  });

  // Function
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await addToCart({
      userId: user?._id || "",
      productId: data?._id || "",
      amount: values.amount,
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
      <div className="flex flex-col items-center p-20 mt-20 gap-y-4 justify-center">
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
      className="grid grid-rows-[auto_auto] md:grid-cols-2 md:grid-rows-1 py-10 gap-4"
    >
      {/* Image Section - Appears on Top on Small Screens, Right on Larger Screens */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="order-1 md:order-2 relative w-[300px] h-[300px] mx-auto md:w-[500px] md:h-[500px]"
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
          <p className="text-sm text-custom-brown-2 -mt-2">
            {data?.category} {t("collection-0")}
          </p>
          <h2 className="text-xl font-bold text-custom-brown">${data?.price}</h2>
          <p className="text-sm text-custom-brown-2">{data?.details[0].description}</p>
          <p className="text-xl font-bold text-custom-brown">
            {t("sold")}: {data?.sold}
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-4 gap-4">
              <div className="col-span-3 w-full">
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          disabled={isPending}
                          onValueChange={field.onChange}
                          defaultValue={String(field.value)}
                        >
                          <SelectTrigger
                            dir={locale === "en" ? "ltr" : "rtl"}
                            className="bg-[#fdf3e9]"
                          >
                            <SelectValue placeholder="Size" />
                          </SelectTrigger>
                          <SelectContent
                            dir={locale === "en" ? "ltr" : "rtl"}
                            className="bg-[#fdf3e9]"
                          >
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
              <div className="col-span-1">
                {(data?.quantity ?? 0) > 0 ? (
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            disabled={isPending}
                            onValueChange={field.onChange}
                            value={String(field.value) || "1"} // Default value is 1
                          >
                            <SelectTrigger
                              dir={locale === "en" ? "ltr" : "rtl"}
                              className="bg-custom-yellow"
                            >
                              <SelectValue placeholder="Amount" />
                            </SelectTrigger>
                            <SelectContent
                              dir={locale === "en" ? "ltr" : "rtl"}
                              className="bg-custom-yellow"
                            >
                              <SelectContent
                                dir={locale === "en" ? "ltr" : "rtl"}
                                className="bg-custom-yellow"
                              >
                                {Array.from({ length: data?.quantity || 0 }, (_, i) => (
                                  <SelectItem key={i + 1} value={String(i + 1)}>
                                    {i + 1}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ) : (
                  <h1 className="bg-custom-brown text-white text-center rounded-md p-[0.38rem] md:p-2">
                    {t("out-stock")}
                  </h1>
                )}
              </div>
              <div className="w-full flex gap-3">
                <div>
                  {user ? (
                    (data?.quantity ?? 0) > 0 ? (
                      <Button
                        className="rounded-tr-full px-10 rounded-bl-full text-white bg-custom-brown hover:bg-custom-brown/80"
                        type="submit"
                      >
                        {t("add-to-cart")}
                      </Button>
                    ) : null
                  ) : (
                    <Button className="rounded-tr-full px-10 rounded-bl-full bg-custom-brown hover:bg-custom-brown/80">
                      <Link href={`/${locale}/login`}>{t("login-please")}</Link>
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </div>
        <div className="w-full border border-custom-yellow-2 text-custom-brown-2 rounded-md mt-10">
          <div className="flex gap-4 items-center m-5">
            <Truck />
            <div>
              <h1 className="font-bold">{t("2-5-business-days")}</h1>
              <p>{t("easy-and-quick-delivery")}</p>
            </div>
          </div>
          <div className="w-full h-[1px] bg-custom-yellow-2" />
          <div className="flex gap-4 m-5">
            <RotateCcw />
            <h1>{t("30-days-free-return")}</h1>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
