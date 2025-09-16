"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const schema = z.object({
    phone: z.string().min(5),
    gender: z.enum(["Male", "Female"]),
});

export default function CompleteProfilePage() {
    const t = useTranslations();
    const locale = useLocale();
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: { phone: "", gender: "Male" },
    });

    async function onSubmit(values: z.infer<typeof schema>) {
        const token = Cookies.get("access_token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/complete-profile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify(values),
        });
        if (res.ok) {
            window.location.href = `/${locale}/`;
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-96 space-y-4 ">
                <h1 className="text-4xl text-custom-brown">{t("complete-profile")}</h1>
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder={t("enter-your-phone")} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder={t("gender")} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full bg-custom-brown hover:bg-custom-brown/80">{t("submit")}</Button>
            </form>
        </Form>
    );
}


