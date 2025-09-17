"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFirebaseAuth } from "@/hooks/auth/use-firebase-auth";
import useLogin from "@/hooks/auth/use-login-hook";
import { TestLoginAction } from "@/utils/actions/auth/test-login-action";

export default function LoginPage() {
  const t = useTranslations();
  const locale = useLocale();

  const { mutate: LoginMutate, isPending, error } = useLogin();
  const { mutate: signInWithGoogle, isPending: isGooglePending, error: googleError } = useFirebaseAuth();

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
        message: t("password-must-contain-at-least-one-special-character-and")
      })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    LoginMutate(
      {
        email: values.email,
        password: values.password
      },
      {
        onSuccess: () => {
          window.location.href = `/${locale}/`;
        }
      }
    );
  }

  async function loginAsTestAdmin() {
    try {
      const result = await TestLoginAction();
      if ("access_token" in result) {
        Cookies.set("access_token", result.access_token, {
          expires: 7,
          secure: true,
          sameSite: "Strict"
        });
        window.location.href = `/${locale}/admin`;
      }
    } catch { }
  }

  function handleGoogleSignIn(e:React.FormEvent) {
    e.preventDefault()
    signInWithGoogle();
  }



  return (
    <>
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-96 space-y-4 ">
        <h1 className="text-4xl text-custom-brown">{t("login")}</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  autoFocus
                  tabIndex={1}
                  aria-label="Email Address"
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
                  aria-label="Password"
                  tabIndex={2}
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
        <p className="text-sm text-red-500">{googleError?.message}</p>
        <Button
          tabIndex={3}
          aria-label={t("submit")}
          disabled={isPending}
          className="w-full bg-custom-brown hover:bg-custom-brown/80"
          type="submit"
        >
          {t("submit")}
        </Button>
        <Button
          type="button"
          onClick={loginAsTestAdmin}
          className="w-full border border-custom-brown text-white  hover:bg-custom-brown/10"
        >
          {t("login-as-test-admin")}
        </Button>
        <Button
          onClick={handleGoogleSignIn}
          disabled={isGooglePending}
          className="w-full border border-custom-brown text-white hover:bg-custom-brown/10"
        >
          {isGooglePending ? "Signing in..." : (
            <span className="flex items-center justify-center gap-2">
              <img
                src="/google-icon.webp"
                alt="Google Icon"
                className="h-5 w-5"
              />
              {t("sign-in-with-google")}
            </span>
          )}
        </Button>
        <p className="text-sm text-custom-brown-2">{t("optional-feature")}</p>
        <div className="-mt-2 text-custom-brown-2">
          <span> {t("dont-have-an-account")}</span>
          <Link tabIndex={4} className="underline" href={`/${locale}/register`}>
            {t("register")}
          </Link>
        </div>
        <Link
          tabIndex={5}
          className="text-custom-brown-2 underline"
          href={`/${locale}/forgot-password`}
        >
          {t("forgot-password")}
        </Link>
      </form>
    </Form>
    </>
  );
}
