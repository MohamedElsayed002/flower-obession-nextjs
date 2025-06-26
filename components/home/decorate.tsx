"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function HomeSection() {
  const t = useTranslations();

  return (
    <div className="grid min-h-screen grid-cols-1 items-start gap-4 px-4 pt-10 md:grid-cols-2 md:items-center md:gap-10">
      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative mx-auto w-full max-w-[600px]"
      >
        <div className="w-full">
          <Image
            src="/image2.jpg"
            width={900}
            height={500}
            alt="Image home"
            className="h-auto w-full rounded-lg object-cover"
          />
        </div>
        <div className="animate-float absolute -bottom-8 -right-4 -z-[10] h-28 w-28 rounded-full border-2 border-[#FF8181]" />
      </motion.div>

      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative mx-auto -mt-48 w-full max-w-[600px] md:mt-2"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-3xl font-semibold leading-tight text-custom-brown sm:text-4xl md:text-5xl"
        >
          {t("we-decorate-your")} <br /> {t("events-you-just-enjoy")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-4 text-base text-custom-brown-2 sm:text-lg"
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
            className="right-0 -z-[10] hidden h-auto w-[150px] -rotate-90 rotate-90 md:absolute md:top-28 md:block md:w-[300px]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
