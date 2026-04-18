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

      <main className="relative mx-auto">
        <Home />
        <div
          className={cn(
            "flex justify-center items-center mx-auto mt-10 lg:mt-20 -mb-10 lg:px-20 lg:w-6xl",
          )}
        >
          <h1 className="font-extrabold text-gold text-3xl lg:text-7xl">
            BOUQUETS FOR THE MOOD{" "}
          </h1>
        </div>
        <div className="relative">
          <Choose />
          <FlowerImage />
        </div>
        <FlowerGallery />
      </main>
      <div className="relative">
        <Footer />
        <Image
          className={cn(
            "-top-[60%] md:right-[-4%] absolute blur-sm w-[100px] sm:w-[200px] md:w-[250px] lg:w-[300px] -rotate-[55deg]",
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
        "-top-[50%] -left-[14%] md:-left-[12%] absolute w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-auto rotate-[55deg]",
      )}
      src="/flowers/gallery-1.png"
      alt="Description"
      width={500}
      height={500}
    />
  );
}
