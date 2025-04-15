"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useCreateOrder } from "@/hooks";
import { useRef, useState } from "react";
import { Confetti, type ConfettiRef } from "@/components/magicui/confetti";

export default function CheckoutForm() {
  // Translation
  const t = useTranslations();

  // State
  const [show, setShow] = useState(false);

  // Mutate
  const { mutate } = useCreateOrder();

  // Confetti
  const confettiRef = useRef<ConfettiRef>(null);

  // Schema
  const FormSchema = z.object({
    street: z.string().min(3, { message: t("street-must-be-at-least-3-characters-long") }),
    city: z.string().min(2, { message: t("city-name-is-too-short") }),
    phone: z
      .string()
      .min(10, { message: t("phone-number-must-be-at-least-10-digits") })
      .max(15, { message: t("phone-number-is-too-long") })
      .regex(/^[0-9]+$/, { message: t("phone-number-must-contain-only-digits") }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      street: "",
      city: "",
      phone: "",
    },
  });

  // Function
  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(
      { street: data.street, city: data.city, phone: data.phone },
      {
        onSuccess: () => {
          setShow(true);
        },
      }
    );
  }

  return (
    <>
      {/* Celebrate Confetti */}
      {show && (
        <Confetti
          ref={confettiRef}
          className="absolute left-0 top-0 z-0 size-full"
          onMouseEnter={() => {
            confettiRef.current?.fire({});
          }}
        />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-4/5 mx-auto md:mt-20 flex gap-y-4 flex-col"
        >
          {/* Street Input */}
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className=" bg-[#fdf3e9] placeholder:text-custom-brown-2"
                    placeholder={t("street")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* City Input */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className=" bg-[#fdf3e9] placeholder:text-custom-brown-2"
                    placeholder={t("city")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Input Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className=" bg-[#fdf3e9] placeholder:text-custom-brown-2"
                    placeholder={t("phone")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Button */}
          <Button
            className="rounded-tr-full rounded-bl-full px-10  bg-custom-brown hover:bg-custom-brown/80"
            type="submit"
          >
            {t("order")}
          </Button>
        </form>
      </Form>
    </>
  );
}
