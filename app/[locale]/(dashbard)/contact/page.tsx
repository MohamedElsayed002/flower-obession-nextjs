import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/contact/contact-form";
import Image from "next/image";
import type { Metadata } from "next";

// Localized metadata
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("contactPage-title") || "Contact Us | Flowerly",
    description: t("contactPage-description") || "Get in touch with Flowerly for questions, feedback, or custom orders.",
  };
}

export default async function ContactPage() {
  const t = await getTranslations();

  return (
    <div className="flex gap-5 justify-between flex-col md:flex-col mb-10">
      <div className="relative w-fit">
        <h1 className="absolute inset-0 flex items-center text-start justify-center text-4xl text-custom-brown font-bold">
          {t("contact")}
        </h1>
        <Image src="/shape-4.png" alt="al" width={200} height={200} />
      </div>
      <ContactForm />
      <div className="relative md:block ml-auto -mt-28 md:-mt-44">
        <Image src="/flower-vase.png" width={200} height={200} alt="fd" className="relative z-10" priority />
        <Image
          src="/shape1.png"
          width={200}
          height={200}
          alt="ds"
          className="absolute bottom-0 left-0 z-0"
          loading="lazy"
        />
      </div>
    </div>
  );
}
