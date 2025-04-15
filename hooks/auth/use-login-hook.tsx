"use client";

import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoginAction } from "@/utils/actions/auth/login-action";
import Cookies from "js-cookie";

export default function useLogin() {
  const t = useTranslations();

  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const result = await LoginAction({ email, password });


      if ("access_token" in result) {
        return result as SuccessfulLoginResponse;
      }
      throw new Error(result.message);
    },
    onSuccess: (data) => {
      Cookies.set("access_token", data.access_token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      toast.success(t("user-logged-in-successfully"));
      return
    },
    onError: (error) => {
      toast.error(error.message);
      return
    },
  });

  return {
    isPending,
    error,
    mutate,
  };
}
