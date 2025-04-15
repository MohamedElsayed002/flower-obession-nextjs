import Hero from "@/components/home/hero";
import Decorate from "@/components/home/decorate";
import PacketFlower from "@/components/home/packet-flower";
import FlowerForHouse from "@/components/home/flowers-for-house";
import HomeComponent5 from "@/components/home/home-component-5";
import HomeComponent6 from "@/components/home/home-component-6";
import HomeProducts from "@/components/home/home-products";
import HomeComponent7 from "@/components/home/home-component-7";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("home-title"),
    description: t("home-description"),
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
