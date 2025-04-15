"use client"

import { Flower, Truck } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion"; // Import motion
import React from "react";

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <motion.div
    className="flex flex-col md:flex-row items-center gap-3 max-w-sm"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex justify-center items-center w-10 h-10 p-2 bg-[#FFC37B] rounded-full">
      {icon}
    </div>
    <div>
      <h2 className="text-custom-brown text-2xl">{title}</h2>
      <p className="text-custom-brown-2">{description}</p>
    </div>
  </motion.div>
);

const FlowerForHouse = () => {
  const t = useTranslations();

  return (
    <>
      <section className="relative grid md:grid-cols-2 mt-10 md:mt-0">
        <motion.div
          className="hidden md:flex flex-col"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <div className="absolute left-3/4 transform -translate-x-full bg-[#858B5F] text-white w-[80vw] max-w-[900px] h-[150px] z-[-10] rounded-r-full p-5">
              <div className="bg-[#FFC37B] w-[500px] h-5 absolute -bottom-4" />
              <h2 className="ml-64 text-4xl">{t("flowers-for-the-home")}</h2>
              <p className="ml-64 mt-2">{t("flowers-for-home-description")}</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="grid md:grid-cols-2 md:mt-60 -mt-20 gap-20 items-center">
        <motion.div
          className="flex gap-10 flex-col sm:flex-row"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FeatureCard
            icon={<Truck />}
            title={t("home-service")}
            description={t("home-service-description")}
          />
          <FeatureCard
            icon={<Flower />}
            title={t("fresh-flowers-every-day")}
            description={t("fresh-flowers-everyday-description")}
          />
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            className="absolute mt-10"
            src="/shape2.png"
            width={200}
            height={200}
            alt="Decorative shape"
          />
          <Image
            width={600}
            height={500}
            src="/Mask@1x.png"
            alt="Fresh flowers delivery"
            priority
          />
        </motion.div>
      </section>
    </>
  );
};

export default FlowerForHouse;
