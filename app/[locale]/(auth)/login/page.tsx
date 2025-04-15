"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import useLogin from "@/hooks/auth/use-login-hook";

export default function LoginPage() {
  const t = useTranslations();
  const locale = useLocale();

  const { mutate: LoginMutate, isPending, error } = useLogin();

  const formSchema = z.object({
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
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    LoginMutate(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          window.location.href = `/${locale}/`;
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-96 ">
        <h1 className="text-4xl text-custom-brown">{t("login")}</h1>
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
        <p className="text-sm text-red-500">{error?.message}</p>
        <Button
          disabled={isPending}
          className="w-full bg-custom-brown hover:bg-custom-brown/80"
          type="submit"
        >
          {t("submit")}
        </Button>
        <div className="-mt-2 text-custom-brown-2">
          <span> {t("dont-have-an-account")}</span>
          <Link className="hover:underline" href={`/${locale}/register`}>
            {t("register")}
          </Link>
        </div>
        <Link className="text-custom-brown-2 hover:underline" href={`/${locale}/forgot-password`}>
          {t("forgot-password")}
        </Link>
      </form>
    </Form>
  );
}
