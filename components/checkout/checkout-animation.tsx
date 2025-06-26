"use client"
import Lottie from "lottie-react";

import animationData from "@/public/assets/animate.json";

export default function CheckoutAnimation() {
  return (
    <>
    {/* Animation Lottie */}
      <Lottie className="md:-mt-10" animationData={animationData} />
    </>
  );
}
