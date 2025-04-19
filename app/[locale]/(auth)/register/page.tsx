"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import useRegister from "@/hooks/auth/use-register";

export default function RegisterPage() {
  const t = useTranslations();
  const locale = useLocale();

  const { mutate: RegisterMutate, isPending, error } = useRegister();

  const formSchema = z
    .object({
      name: z
        .string()
        .trim()
        .min(3, { message: t("name-must-be-at-least-3-characters") })
        .max(50, { message: t("name-must-not-exceed-50-characters") }),

      email: z
        .string()
        .trim()
        .min(1, { message: t("email-required") }) // Ensure email is not empty
        .email({ message: t("email-invalid") }), // Validate email format

      password: z
        .string()
        .trim()
        .min(8, { message: t("password-must-be-at-least-8-characters-long") }) // Ensure a strong password
        .regex(/[A-Z]/, { message: t("password-must-contain-at-least-one-uppercase-letter") })
        .regex(/[a-z]/, { message: t("password-must-contain-at-least-one-lowercase-letter") })
        .regex(/[0-9]/, { message: t("password-must-contain-at-least-one-number") })
        .regex(/[!@#$%^&*()_]/, {
          message: t("password-must-contain-at-least-one-special-character-and"),
        }),

      rePassword: z.string().trim(),

      gender: z.enum(["Male", "Female"], { required_error: t("gender-must-be-male-or-female") }),

      phone: z
        .string()
        .trim()
        .min(10, { message: t("phone-must-be-at-least-10-digits") })
        .max(15, { message: t("phone-must-not-exceed-15-digits") })
        .regex(/^\+?\d+$/, { message: t("phone-must-contain-only-numbers") }),
    })
    .refine((data) => data.password === data.rePassword, {
      message: t("passwords-do-not-match"),
      path: ["rePassword"], // Attach error to rePassword field
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      gender: "Male",
      email: "",
      password: "",
      rePassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    RegisterMutate(
      {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        gender: values.gender,
      },
      {
        onSuccess: () => {
          window.location.href = `/${locale}/login`;
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-96">
        <h1 className="text-4xl text-custom-brown">{t("register")}</h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input disabled={isPending} placeholder={t("enter your name")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder={t("enter-your-email-address")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input disabled={isPending} placeholder={t("enter your phone number")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger dir={locale === "en" ? "ltr" : "rtl"}>
                    <SelectValue placeholder={t("gender")} />
                  </SelectTrigger>
                  <SelectContent dir={locale === "en" ? "ltr" : "rtl"}>
                    <SelectItem value="Male">{t("male")}</SelectItem>
                    <SelectItem value="Female">{t("female")}</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={isPending}
                  type="password"
                  placeholder={t("enter-your-password")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={isPending}
                  type="password"
                  placeholder={t("confirm your password")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-red-500 text-sm">{error?.message}</p>
        <Button
          aria-label={t("submit")}
          disabled={isPending}
          className="w-full bg-custom-brown hover:bg-custom-brown/80"
          type="submit"
        >
          {t("submit")}
        </Button>
        <div className="flex gap-2">
          <p>{t("already-have-an-account")}</p>
          <Link className="hover:underline" href={`/${locale}/login`}>
            {t("login")}
          </Link>
        </div>
      </form>
    </Form>
  );
}
