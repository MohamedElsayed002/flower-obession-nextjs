"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "../ui/button";
import WavyLine from "./wavy-line";

export default function Hero() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="relative mx-auto grid gap-10 md:grid-cols-2">
      {/* Text Block */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto mt-10 max-w-7xl px-4 sm:mt-32 sm:px-8"
      >
        <h1 className="text-3xl font-semibold leading-tight tracking-tighter text-custom-brown sm:text-5xl md:text-7xl">
          {t("blossom-every-moment-with-fresh-and-beautiful-flowers")}
        </h1>
        <p className="mt-4 text-base text-custom-brown-2 sm:text-lg">{t("hero-description")}</p>
        <Button aria-label={t("explore-0")} className="mt-4 bg-custom-brown hover:bg-custom-brown/80" asChild>
          <Link
            className="cursor-pointer rounded-bl-2xl rounded-tr-2xl px-8 py-2"
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
        <div className="absolute bottom-10 h-28 w-28 rounded-full border-2 border-[#FF8181] after:content-[''] ltr:-left-10" />

        <div className="mt-20 flex flex-col gap-4 md:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative h-[550px] w-full max-w-[450px]"
          >
            <Image
              src="/home.png"
              alt="image"
              fill
              className="rounded-t-full object-cover"
              sizes="(max-width: 768px) 100vw, 450px"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-auto flex gap-10 tracking-widest text-custom-brown md:flex-col"
          >
            {/* Each stat can be animated individually too if you want */}
            <div>
              <h1 className="text-3xl font-extrabold md:text-5xl">100%</h1>
              <h2 className="text-sm uppercase md:text-2xl">
                {t("proximity")} {t("products")}
              </h2>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold md:text-5xl">420+</h1>
              <h2 className="text-sm md:text-2xl">{t("collection")}</h2>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold md:text-5xl">1200+</h1>
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
        className="absolute bottom-10 left-0 -rotate-12"
      >
        <WavyLine />
      </motion.div>
    </div>
  );
}
