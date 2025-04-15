"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

function PacketFlower() {
  const t = useTranslations();

  return (
    <div className="relative min-h-screen -mt-64 md:mt-0 flex flex-col justify-center">
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
            className="rounded-md w-full h-auto"
            alt="Packet Flower Image"
          />
        </motion.div>

        {/* Shape Polygon */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden md:block md:absolute bottom-96 md:bottom-80 ltr:-left-10 -z-[10]"
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
          className="hidden md:block md:absolute max-w-xl top-5 left-5 md:top-10 md:left-10 p-4 rounded-md"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-custom-brown">
            {t("count-on-us-for-any-type-of-celebration")}
          </h2>
          <p className="text-custom-brown-2 mt-4">{t("description-3")}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row gap-10 px-4 mt-6"
      >
        <div className="max-w-sm mb-5">
          <h1 className="text-custom-brown text-2xl font-bold mb-2">
            {t("custom-designs")}
          </h1>
          <p className="text-custom-brown-2">
            {t("custom-design-description")}
          </p>
        </div>
        <div className="max-w-sm">
          <h1 className="text-custom-brown text-2xl font-bold mb-2">
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
