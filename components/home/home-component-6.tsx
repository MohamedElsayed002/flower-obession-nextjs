"use client";
import { motion } from "framer-motion"; // Import motion
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function HomeComponent6() {
  const t = useTranslations();

  return (
    <div className="my-20 grid min-h-screen gap-10 md:grid-cols-2">
      <div className="relative">
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image src="/bouquet-img.png" alt="fd" width={700} height={700} />
          <div className="absolute bottom-4 right-10 z-10 px-5 text-black md:bottom-48">
            <motion.h1
              className="text-4xl text-custom-brown"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              {t("bouquets-are-our-obsession")}
            </motion.h1>
            <motion.p
              className="max-w-md text-custom-brown-2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {t("bouquests-are-our-obessesion-desc")}
            </motion.p>
          </div>
        </motion.div>
      </div>

      <div className="mt-10 flex w-full flex-col gap-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <h1 className="mb-4 text-4xl font-bold">{t("create-your-own-bouquet")}</h1>
          <p className="mb-4 text-custom-brown-2">{t("create-your-own-bouquet-2")}</p>
          <p className="flex cursor-pointer gap-2 text-xl underline hover:opacity-60">
            {t("view-more")} <ArrowRight />
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <h1 className="mb-4 text-4xl font-bold">{t("get-inspired-by-our-examples")}</h1>
          <p className="mb-4 text-custom-brown-2">{t("inspired-description")}</p>
          <p className="flex cursor-pointer gap-2 text-xl underline hover:opacity-60">
            {t("view-more")} <ArrowRight />
          </p>
        </motion.div>
      </div>
    </div>
  );
}
