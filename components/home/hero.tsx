"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import WavyLine from "./wavy-line";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "../ui/button";
import Image from "next/image";

export default function Hero() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="relative mx-auto gap-10 grid md:grid-cols-2">
      {/* Text Block */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-10 sm:mt-32 px-4 sm:px-8 max-w-7xl mx-auto"
      >
        <h1 className="text-3xl sm:text-5xl md:text-7xl text-custom-brown font-semibold tracking-tighter leading-tight">
          {t("blossom-every-moment-with-fresh-and-beautiful-flowers")}
        </h1>
        <p className="text-custom-brown-2 mt-4 text-base sm:text-lg">{t("hero-description")}</p>
        <Button aria-label={t('explore-0')} className="bg-custom-brown hover:bg-custom-brown/80 mt-4" asChild>
          <Link
            className="py-2 px-8 rounded-tr-2xl rounded-bl-2xl cursor-pointer"
            href={`/${locale}/inspiration`}
          >
            {t("explore")}
          </Link>
        </Button>
      </motion.div>

      {/* Image Block */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative"
      >
        <Image
          alt="Top polygon"
          width={200}
          height={200}
          className="absolute right-10 -z-10"
          src="/home1.svg"
        />
        <Image
          alt="Bottom polygon"
          src="/blob2.svg"
          className="absolute -bottom-10 -z-10 ltr:-left-12"
          width={200}
          height={200}
        />
        <div className="absolute w-28 h-28 border-2 border-[#FF8181] rounded-full bottom-10 ltr:-left-10 after:content-['']" />

        <div className="flex flex-col md:flex-row gap-4 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative w-full max-w-[450px] h-[550px]"
          >
            <Image
              src="/home.png"
              alt="image"
              fill
              className="object-cover rounded-t-full"
              sizes="(max-width: 768px) 100vw, 450px"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex mt-auto tracking-widest md:flex-col gap-10 text-custom-brown"
          >
            {/* Each stat can be animated individually too if you want */}
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold">100%</h1>
              <h2 className="text-sm uppercase md:text-2xl">
                {t("proximity")} {t("products")}
              </h2>
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold">420+</h1>
              <h2 className="text-sm md:text-2xl">{t("collection")}</h2>
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold">1200+</h1>
              <h2 className="text-sm md:text-2xl">{t("ecological-deliveries")}</h2>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Wavy line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute left-0 bottom-10 -rotate-12"
      >
        <WavyLine />
      </motion.div>
    </div>
  );
}
