"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion"; // Import motion

export default function HomeComponent5() {
  const t = useTranslations();

  return (
    <div className="relative my-20 w-full bg-[#FCEEE3]">
      {/* Image Container */}
      <motion.div
        className="relative w-full min-h-[300px] md:min-h-[500px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image src="/Image@1x.png" layout="fill" objectFit="cover" alt="ds" />
      </motion.div>

      {/* Left Side Text */}
      <motion.div
        className="absolute -mt-20 md:-mt-52 top-1/2 left-5 sm:left-10 transform -translate-y-1/2 text-white  sm:p-10 md:p-20 max-w-[90%] md:max-w-[40%]"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <h1 className="text-2xl sm:text-4xl font-bold leading-tight">
          {t("we-are-much-more-than-a-florist")}
        </h1>
        <p className="mt-2 sm:mt-4 text-sm sm:text-base">{t("more-than-floirst-desc")}</p>
        <Button aria-label={t("explore")} className="mt-4 sm:mt-6 bg-white hover:bg-white/80 w-full rounded-tr-full rounded-bl-full text-custom-brown text-lg sm:text-xl px-4 py-2">
          {t("explore")}
        </Button>
      </motion.div>

      {/* Right Side Shape with Text */}
      <motion.div
        className="hidden md:block md:absolute -bottom-5 md:-bottom-16 right-5 sm:bottom-10 sm:right-10 w-[180px] sm:w-[250px] p-4 text-right text-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <Image
          src="/shape2.png"
          width={250}
          height={250}
          alt="Image"
          className="absolute inset-0 w-full h-full rotate-45"
        />
        <Image
          src="/shape1.png"
          width={250}
          height={250}
          alt="Shape"
          className="absolute inset-0 w-full h-full"
        />
        <p className="relative z-10 text-sm sm:text-base leading-relaxed">
          {t(
            "more-than-a-florist-we-create-unique-experiences-with-personalized-designs-and-exceptional-service"
          )}
        </p>
      </motion.div>
    </div>
  );
}
