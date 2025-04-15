"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion"; // Import motion

export default function HomeComponent6() {
  const t = useTranslations();

  return (
    <div className="my-20 min-h-screen gap-10 grid md:grid-cols-2">
      <div className="relative">
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image src="/bouquet-img.png" alt="fd" width={700} height={700} />
          <div className="text-black z-10 absolute bottom-4 px-5 md:bottom-48 right-10">
            <motion.h1
              className="text-4xl text-custom-brown"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              {t("bouquets-are-our-obsession")}
            </motion.h1>
            <motion.p
              className="text-custom-brown-2 max-w-md"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {t("bouquests-are-our-obessesion-desc")}
            </motion.p>
          </div>
        </motion.div>
      </div>

      <div className="w-full flex flex-col gap-10 mt-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <h1 className="text-4xl mb-4 font-bold">{t("create-your-own-bouquet")}</h1>
          <p className="text-custom-brown-2 mb-4">{t("create-your-own-bouquet-2")}</p>
          <p className="flex gap-2 text-xl underline cursor-pointer hover:opacity-60">
            {t("view-more")} <ArrowRight />
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <h1 className="text-4xl mb-4 font-bold">{t("get-inspired-by-our-examples")}</h1>
          <p className="text-custom-brown-2 mb-4">{t("inspired-description")}</p>
          <p className="flex gap-2 text-xl underline cursor-pointer hover:opacity-60">
            {t("view-more")} <ArrowRight />
          </p>
        </motion.div>
      </div>
    </div>
  );
}
