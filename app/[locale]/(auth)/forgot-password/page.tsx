"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useForgotPassword from "@/hooks/auth/use-forgot-password-hook";
import useVerifyPassword from "@/hooks/auth/use-verify-password-hook";
import useResetPassword from "@/hooks/auth/use-reset-password-hook";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export default function ForgotPassword() {
  // Translation
  const t = useTranslations();

  // Localization & Routing
  const locale = useLocale();
  const router = useRouter();

  // State
  const [emailSaved, setEmailSaved] = useState("");
  const [emailDialog, setEmailDialog] = useState(true);
  const [codeDialog, setCodeDialog] = useState(false);
  const [confirmPasswordDialog, setConfirmPasswordDialog] = useState(false);

  // Mutate
  const {
    isPending: ForgotPasswordLoading,
    mutate: ForgotPasswordMutate,
    error: ForgotPasswordError,
  } = useForgotPassword();

  const {
    isPending: VerifyPasswordLoading,
    mutate: VerifyPasswordMutate,
    error: VerifyPasswordError,
  } = useVerifyPassword();

  const {
    isPending: ResetPasswordLoading,
    mutate: ResetPasswordMutate,
    error: ResetPasswordError,
  } = useResetPassword();

  // Schemas
  const formSchema = z.object({
    email: z.string().email({ message: t("email-invalid") }),
  });

  const codeSchema = z.object({
    code: z.string().min(6, { message: t("minimum-code-is-6-characters") }),
  });

  const newPasswordSchema = z
    .object({
      newPassword: z
        .string()
        .trim()
        .min(8, { message: t("password-must-be-at-least-8-characters-long") }) // Ensure a strong password
        .regex(/[A-Z]/, { message: t("password-must-contain-at-least-one-uppercase-letter") })
        .regex(/[a-z]/, { message: t("password-must-contain-at-least-one-lowercase-letter") })
        .regex(/[0-9]/, { message: t("password-must-contain-at-least-one-number") })
        .regex(/[@$!%*?&]/, {
          message: t("password-must-contain-at-least-one-special-character-and"),
        }),

      rePassword: z.string().trim(),
    })
    .refine((data) => data.newPassword === data.rePassword, {
      message: t("passwords-do-not-match"),
      path: ["rePassword"], // Attach error to rePassword field
    });

  const emailForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const codeForm = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: "",
    },
  });

  const newPasswordForm = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      newPassword: "",
      rePassword: "",
    },
  });

  // Functions
  function EmailSubmit(values: z.infer<typeof formSchema>) {
    ForgotPasswordMutate(values.email, {
      onError: () => {
        return;
      },
      onSuccess: () => {
        // to show second dialog. to let user send code verification if the email exists
        setEmailDialog(false);
        setConfirmPasswordDialog(false);
        setCodeDialog(true);
        // to save the email of the user
        setEmailSaved(values.email);
      },
    });
  }

  function CodeSubmit(values: z.infer<typeof codeSchema>) {
    VerifyPasswordMutate(
      { code: values.code, email: emailSaved },
      {
        onError: () => {
          return;
        },
        onSuccess: () => {
          // to show third dialog. let user send email address and new password after checking code verification
          setConfirmPasswordDialog(true);
          setCodeDialog(false);
          setEmailDialog(false);
        },
      }
    );
  }

  function NewPasswordSubmit(values: z.infer<typeof newPasswordSchema>) {
    ResetPasswordMutate(
      { email: emailSaved, password: values.newPassword },
      {
        onError: () => {
          return;
        },
        onSuccess: () => {
          // Reset all the states and close the dialog
          setConfirmPasswordDialog(false);
          setCodeDialog(false);
          setEmailDialog(false);
          setTimeout(() => {
            router.push(`/${locale}/login`); // Redirect to login page
          });
        },
      }
    );
  }

  return (
    <>
      {/* First Dialog - Email */}
      {emailDialog && (
        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(EmailSubmit)} className="space-y-4 w-96">
            <h1 className="text-4xl text-custom-brown">{t("forgot-password")}</h1>
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* Email Input */}
                    <Input
                      disabled={ForgotPasswordLoading}
                      className="w-full"
                      placeholder={t("enter-your-email-address")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-red-500 text-sm">{ForgotPasswordError?.message}</p>
            {/* Submit Button */}
            <Button
              disabled={ForgotPasswordLoading}
              className="w-full bg-custom-brown hover:bg-custom-brown/80"
              type="submit"
            >
              {t("submit")}
            </Button>
          </form>
        </Form>
      )}

      {/* Second Dialog - Code Verification */}
      {codeDialog && (
        <Form {...codeForm}>
          <form onSubmit={codeForm.handleSubmit(CodeSubmit)} className="space-y-4 w-96">
            <h1 className="text-4xl text-custom-brown">{t("code")}</h1>
            <FormField
              control={codeForm.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP pattern={REGEXP_ONLY_DIGITS} maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-red-500 text-sm">{VerifyPasswordError?.message}</p>
            {/* Submit Button */}
            <Button
              disabled={VerifyPasswordLoading}
              className="w-full bg-custom-brown hover:bg-custom-brown/80"
              type="submit"
            >
              {t("submit")}
            </Button>
          </form>
        </Form>
      )}

      {/* Third Dialog - New Password */}
      {confirmPasswordDialog && (
        <Form {...newPasswordForm}>
          <form
            onSubmit={newPasswordForm.handleSubmit(NewPasswordSubmit)}
            className="space-y-4 w-96"
          >
            <h1 className="text-4xl text-custom-brown">{t("reset-your-password")}</h1>
            <FormField
              control={newPasswordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* New Password Input */}
                    <Input
                      className="w-full border"
                      type="password"
                      placeholder={t("enter-new-password")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={newPasswordForm.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* New Password Input */}
                    <Input
                      disabled={ResetPasswordLoading}
                      className="w-full border"
                      type="password"
                      placeholder={t("confirm-new-password")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {ResetPasswordError && (
              <p className="text-red-500 text-sm">{ResetPasswordError.message}</p>
            )}
            {/* Submit Button */}
            <Button
              disabled={ResetPasswordLoading}
              className="w-full bg-custom-brown hover:bg-custom-brown/80"
              type="submit"
            >
              {t("submit")}
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}
