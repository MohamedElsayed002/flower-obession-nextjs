"use client"
import { motion } from "framer-motion"; // Import motion
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Button } from "../ui/button";

export default function HomeComponent5() {
  const t = useTranslations();

  return (
    <div className="relative my-20 w-full bg-[#FCEEE3]">
      {/* Image Container */}
      <motion.div
        className="relative min-h-[300px] w-full md:min-h-[500px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image src="/Image@1x.png" layout="fill" objectFit="cover" alt="ds" />
      </motion.div>

      {/* Left Side Text */}
      <motion.div
        className="absolute left-5 top-1/2 -mt-20 max-w-[90%] -translate-y-1/2 transform text-white sm:left-10  sm:p-10 md:-mt-52 md:max-w-[40%] md:p-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <h1 className="text-2xl font-bold leading-tight sm:text-4xl">
          {t("we-are-much-more-than-a-florist")}
        </h1>
        <p className="mt-2 text-sm sm:mt-4 sm:text-base">{t("more-than-floirst-desc")}</p>
        <Button aria-label={t("explore")} className="mt-4 w-full rounded-bl-full rounded-tr-full bg-white px-4 py-2 text-lg text-custom-brown hover:bg-white/80 sm:mt-6 sm:text-xl">
          {t("explore")}
        </Button>
      </motion.div>

      {/* Right Side Shape with Text */}
      <motion.div
        className="-bottom-5 right-5 hidden w-[180px] p-4 text-right text-white sm:bottom-10 sm:right-10 sm:w-[250px] md:absolute md:-bottom-16 md:block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <Image
          src="/shape2.png"
          width={250}
          height={250}
          alt="Image"
          className="absolute inset-0 h-full w-full rotate-45"
        />
        <Image
          src="/shape1.png"
          width={250}
          height={250}
          alt="Shape"
          className="absolute inset-0 h-full w-full"
        />
        <p className="relative z-10 text-sm leading-relaxed sm:text-base">
          {t(
            "more-than-a-florist-we-create-unique-experiences-with-personalized-designs-and-exceptional-service"
          )}
        </p>
      </motion.div>
    </div>
  );
}
