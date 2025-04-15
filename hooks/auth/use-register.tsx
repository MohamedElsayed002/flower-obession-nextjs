"use client"
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { RegisterAction } from "@/utils/actions/auth/register-action";

type RegisterProp = {
  email: string;
  name: string;
  gender: "Male" | "Female";
  phone: string;
  password: string;
};

export default function useRegister() {
  const t = useTranslations();
  const { isPending, mutate,error } = useMutation({
    mutationFn: async ({ name, email, gender, phone, password }: RegisterProp) => {
      const result = await RegisterAction({ email, name, password, gender, phone });

      if("error" in result) {
        throw new Error(result.message)
      }

      return result;
    },
    onSuccess: () => {
      toast.success(t("user-register-successfully-you-can-login-now"));
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
