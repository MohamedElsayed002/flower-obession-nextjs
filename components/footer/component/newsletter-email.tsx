"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: t("email-invalid") }) // Extra check
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    }
  });

  // Function
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-md items-center text-end"
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
              <FormMessage className="text-sm text-red-400" />
              <Button
                aria-label={t("subscribe")}
                type="submit"
                className="rounded-full bg-[#1B2A34] px-6 font-medium text-white shadow-md hover:bg-gray-700"
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
