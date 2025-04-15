"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store/userStore";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { userUpdateUser } from "@/hooks";

// Schema generator function using translations
const getSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    name: z.string().min(3, {
      message: t("name-must-be-at-least-3-characters"),
    }),
    phone: z.string().min(10, {
      message: t("phone-must-be-at-least-10-digits"),
    }),
  });

export default function ProfileForm() {
  const { user } = useUserStore();
  const t = useTranslations();

  const FormSchema = getSchema(t);


  // Mutation
  const {mutate} = userUpdateUser()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    if(!user?._id) return 
    mutate({userId:user?._id,name:values.name,phone:values.phone})
  };

  return (
    <>
      <h1 className="text-2xl text-center font-bold">{t("user-information")}</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 my-10"
        >
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2">{t("name")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <Label className="mb-2">
              {t("email")}{" "}
              <span className="text-xs text-red-400">{t("readonly")}</span>
            </Label>
            <Input disabled defaultValue={user?.email} />
          </div>

          <div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2">{t("phone")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <Label className="mb-2">
              {t("role")}{" "}
              <span className="text-xs text-red-400">{t("readonly")}</span>
            </Label>
            <Input disabled defaultValue={user?.role} />
          </div>

          <Button type="submit" className="bg-custom-brown hover:bg-custom-brown/80">
            {t("update-user")}
          </Button>
        </form>
      </Form>
    </>
  );
}
