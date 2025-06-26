"use client"

import { motion } from "framer-motion"; // Import motion
import { Flower, Truck } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React from "react";

const FeatureCard = ({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <motion.div
    className="flex max-w-sm flex-col items-center gap-3 md:flex-row"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFC37B] p-2">
      {icon}
    </div>
    <div>
      <h2 className="text-2xl text-custom-brown">{title}</h2>
      <p className="text-custom-brown-2">{description}</p>
    </div>
  </motion.div>
);

const FlowerForHouse = () => {
  const t = useTranslations();

  return (
    <>
      <section className="relative mt-10 grid md:mt-0 md:grid-cols-2">
        <motion.div
          className="hidden flex-col md:flex"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <div className="absolute left-3/4 z-[-10] h-[150px] w-[80vw] max-w-[900px] -translate-x-full transform rounded-r-full bg-[#858B5F] p-5 text-white">
              <div className="absolute -bottom-4 h-5 w-[500px] bg-[#FFC37B]" />
              <h2 className="ml-64 text-4xl">{t("flowers-for-the-home")}</h2>
              <p className="ml-64 mt-2">{t("flowers-for-home-description")}</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="-mt-20 grid items-center gap-20 md:mt-60 md:grid-cols-2">
        <motion.div
          className="flex flex-col gap-10 sm:flex-row"
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
