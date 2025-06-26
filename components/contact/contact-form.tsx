"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {

    //  Translations
    const t = useTranslations();


    //   Schema
    const formSchema = z.object({
        name: z
            .string()
            .trim()
            .min(3, { message: t("name-must-be-at-least-3-characters") })
            .max(50, { message: t("name-must-not-exceed-50-characters") }),

        email: z
            .string()
            .trim()
            .min(1, { message: t("email-required") }) // Ensure email is not empty
            .email({ message: t("email-invalid") }), // Validate email format

        message: z
            .string()
            .trim()
            .min(10, { message: t("message minimum character is 10") })
            .max(300)
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: ""
        }
    });


    //   Function 
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mx-auto w-full space-y-4 md:-mt-20 md:w-3/5"
            >
                {/* Input name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <label htmlFor="name" className="sr-only">
                                {t("name")}
                            </label>
                            <FormControl>
                                <Input
                                    id="name"
                                    autoFocus
                                    className="bg-[#fdf3e9] placeholder:text-custom-brown-2"
                                    placeholder={t("enter your name")}
                                    aria-describedby="name-error"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Input Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <label htmlFor="email" className="sr-only">
                                {t("email")}
                            </label>
                            <FormControl>
                                <Input
                                    id="email"
                                    className="bg-[#fdf3e9] placeholder:text-custom-brown-2"
                                    placeholder={t("enter-your-email-address")}
                                    aria-describedby="email-error"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Input Message */}
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <label htmlFor="message" className="sr-only">
                                {t("message")}
                            </label>
                            <FormControl>
                                <Textarea
                                    id="message"
                                    className="resize-none bg-[#fdf3e9]"
                                    placeholder={t("enter your message")}
                                    aria-describedby="message-error"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button
                    className="rounded-bl-full rounded-tr-full bg-custom-brown  px-10 hover:bg-custom-brown/80"
                    type="submit"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting ? t("sending") : t("submit")}
                </Button>
            </form>
        </Form>

    )
}