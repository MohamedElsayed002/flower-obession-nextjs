"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

export function NewsLetterEmail() {
  // Translation
  const t = useTranslations();

  // Schema
  const formSchema = z.object({
    email: z
      .string()
      .trim()
      .min(1, { message: t("email-required") }) // Ensure it's not empty
      .email({ message: t("email-invalid") }) // Validate email format
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: t("email-invalid") }), // Extra check
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Function
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="text-end flex items-center w-full max-w-md"
      >
        {/* Input Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className=" w-full">
              <FormControl>
                <Input
                  className="bg-[#446A7D] placeholder:text-gray-200"
                  required
                  placeholder={t("enter-your-email-address")}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400 text-sm" />
              <Button
                aria-label={t("subscribe")}
                type="submit"
                className="px-6 bg-[#1B2A34] text-white font-medium rounded-full hover:bg-gray-700 shadow-md"
              >
                {t("subscribe")}
              </Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
