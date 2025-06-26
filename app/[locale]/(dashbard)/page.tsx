import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Decorate from "@/components/home/decorate";
import FlowerForHouse from "@/components/home/flowers-for-house";
import Hero from "@/components/home/hero";
import HomeComponent5 from "@/components/home/home-component-5";
import HomeComponent6 from "@/components/home/home-component-6";
import HomeComponent7 from "@/components/home/home-component-7";
import HomeProducts from "@/components/home/home-products";
import PacketFlower from "@/components/home/packet-flower";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("home-title"),
    description: t("home-description")
  };
}

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Decorate />
      <PacketFlower />
      <FlowerForHouse />
      <HomeComponent5 />
      <HomeComponent6 />
      <HomeProducts />
      <HomeComponent7 />
    </div>
  );
};

export default HomePage;
