"use client"
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { resetPasswordAction } from "@/utils/actions/auth/reset-password-action";

export default function useResetPassword() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const result = await resetPasswordAction({ email, password });

      if("error" in result) {
        throw new Error(result.message)
      }
      
      return result;
    },
    onSuccess: (data) => {
      toast.success(t("password-changed-you-can-login-now"));
      return;
    },
    onError: (error) => {
      toast.error(error.message);
      return;
    },
  });

  return {
    isPending,
    error,
    mutate,
  };
}
