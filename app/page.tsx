"use client";

import Choose from "@/components/Choose";
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

      <main className="relative">
        <Home />
        <div
          className={cn(
            "flex justify-center items-center mx-auto mt-20 lg:px-20 lg:w-6xl font-extrabold text-7xl",
          )}
        >
          <h1 className="text-gold">BOUQUETS FOR THE MOOD </h1>
        </div>
        <Choose />
        <Image
          className={cn(
            "top-[50%] -left-[10%] md:-left-[12%] absolute w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-auto rotate-[55deg]",
          )}
          src="/flowers/gallery-1.png"
          alt="Description"
          width={500}
          height={500}
        />
      </main>
    </>
  );
}
