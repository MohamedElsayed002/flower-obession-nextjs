"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function HomeSection() {
  const t = useTranslations();

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 items-start md:items-center px-4 pt-10">
      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative w-full max-w-[600px] mx-auto"
      >
        <div className="w-full">
          <Image
            src="/image2.jpg"
            width={900}
            height={500}
            alt="Image home"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div className="absolute w-28 h-28 border-2 border-[#FF8181] rounded-full -right-4 -bottom-8 -z-[10] animate-float" />
      </motion.div>

      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative w-full -mt-48 md:mt-2 max-w-[600px] mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-custom-brown text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight"
        >
          {t("we-decorate-your")} <br /> {t("events-you-just-enjoy")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-4 text-base sm:text-lg text-custom-brown-2"
        >
          {t("decoration-description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, rotate: -90, y: 20 }}
          whileInView={{ opacity: 1, rotate: -90, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <Image
            src="/flowers.png"
            width={300}
            height={300}
            alt="flowers image"
            className="hidden md:block md:absolute right-0 md:top-28 rotate-90 -z-[10] -rotate-90 w-[150px] h-auto md:w-[300px]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
