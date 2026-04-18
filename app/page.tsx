"use client";

import Choose from "@/components/Choose";
import FlowerGallery from "@/components/FLower";
import Footer from "@/components/Footer";
import Home from "@/components/Home";
import Loader from "@/components/Loader";
import { AnimatedNavFramer } from "@/components/Navbar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export default function HomePage() {
  const [loading, setLoading] = useState<boolean>(true);
  return loading ? (
    <Loader onComplete={() => setLoading(false)} />
  ) : (
    <>
      <AnimatedNavFramer />

      <main className="relative mx-auto w-full overflow-x-hidden">
        <Home />
        <div
          className={cn(
            "mx-auto mt-10 lg:mt-20 -mb-10 px-4 sm:px-6 lg:px-20 w-full max-w-6xl",
          )}
        >
          <h1 className="font-extrabold text-gold text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-center leading-tight">
            BOUQUETS FOR THE MOOD{" "}
          </h1>
        </div>
        <div className="relative">
          <Choose />
          <FlowerImage />
        </div>
        <FlowerGallery />
      </main>
      <div className="relative overflow-x-hidden">
        <Footer />
        <Image
          className={cn(
            "hidden sm:block -top-[30%] sm:-top-[45%] md:-top-[60%] right-[-16%] sm:right-[-10%] md:right-[-4%] absolute blur-sm w-22.5 sm:w-45 md:w-62.5 lg:w-75 -rotate-55 pointer-events-none select-none",
          )}
          src="/flowers/gallery-1.png"
          alt="Description"
          width={500}
          height={500}
        />
      </div>
    </>
  );
}

export function FlowerImage() {
  return (
    <Image
      className={cn(
        "hidden sm:block -top-[22%] sm:-top-[32%] md:-top-[50%] -left-[24%] sm:-left-[18%] md:-left-[12%] absolute w-37.5 sm:w-65 md:w-100 lg:w-125 h-auto rotate-55 pointer-events-none select-none",
      )}
      src="/flowers/gallery-1.png"
      alt="Description"
      width={500}
      height={500}
    />
  );
}
