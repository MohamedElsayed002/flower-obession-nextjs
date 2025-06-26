"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

function PacketFlower() {
  const t = useTranslations();

  return (
    <div className="relative -mt-64 flex min-h-screen flex-col justify-center md:mt-0">
      <div className="relative p-4">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <Image
            src="/packet-image.png"
            width={1200}
            height={200}
            className="h-auto w-full rounded-md"
            alt="Packet Flower Image"
          />
        </motion.div>

        {/* Shape Polygon */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bottom-96 -z-[10] hidden md:absolute md:bottom-80 md:block ltr:-left-10"
        >
          <Image src="/shape.png" width={200} height={200} alt="shape" />
        </motion.div>

        {/* Stroke Shape */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="absolute bottom-96 md:bottom-80 ltr:-left-20"
        >
          <Image src="/shape2.png" width={200} height={200} alt="stroke" />
        </motion.div>

        {/* Text above image */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="left-5 top-5 hidden max-w-xl rounded-md p-4 md:absolute md:left-10 md:top-10 md:block"
        >
          <h2 className="text-3xl font-bold text-custom-brown md:text-5xl">
            {t("count-on-us-for-any-type-of-celebration")}
          </h2>
          <p className="mt-4 text-custom-brown-2">{t("description-3")}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        viewport={{ once: true }}
        className="mt-6 flex flex-col gap-10 px-4 md:flex-row"
      >
        <div className="mb-5 max-w-sm">
          <h1 className="mb-2 text-2xl font-bold text-custom-brown">
            {t("custom-designs")}
          </h1>
          <p className="text-custom-brown-2">
            {t("custom-design-description")}
          </p>
        </div>
        <div className="max-w-sm">
          <h1 className="mb-2 text-2xl font-bold text-custom-brown">
            {t("decoration-specialist")}
          </h1>
          <p className="text-custom-brown-2">
            {t("decoration-specialist-description")}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default PacketFlower;
