"use client"
import { verifyPasswordAction } from "@/utils/actions/auth/verify-password-action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useVerifyPassword() {
  // Translation
  const t = useTranslations();
  // Mutation
  const { error, isPending, mutate } = useMutation({
    mutationFn: async ({ code, email }: { code: string; email: string }) => {
      const result = await verifyPasswordAction(code, email);

      if("error" in result) {
        throw new Error(result.message)
      }

      return result;
    },
    onSuccess: () => {
      toast.success(t("verification-success"));
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
