"use client"

import { useTranslations } from "use-intl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { forgotPasswordAction } from "@/utils/actions/auth/forgot-password-action";

export default function useForgotPassword() {
  // Translation
  const t = useTranslations();

  // Mutation using fetch
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (email: string) => {
      const result = await forgotPasswordAction(email);
      
      if("error" in result) {
        throw new Error(result.message)
      }

      return result;
    },
    onSuccess: () => {
      toast.success(t("otp-sent-to-your-email"));
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
