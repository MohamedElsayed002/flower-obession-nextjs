import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import ContactForm from "@/components/contact/contact-form";

// Localized metadata
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("contactPage-title") || "Contact Us | Flowerly",
    description: t("contactPage-description") || "Get in touch with Flowerly for questions, feedback, or custom orders."
  };
}

export default async function ContactPage() {
  const t = await getTranslations();

  return (
    <section className="mb-10 flex flex-col justify-between gap-5 md:flex-col">
      <div className="relative w-fit">
        <h1 className="absolute inset-0 flex items-center justify-center text-start text-4xl font-bold text-custom-brown">
          {t("contact")}
        </h1>
        <Image src="/shape-4.png" alt="al" width={200} height={200} />
      </div>
      <ContactForm />
      <div className="relative -mt-28 ml-auto md:-mt-44 md:block">
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
    </section>
  );
}
