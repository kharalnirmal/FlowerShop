"use client";

import Home from "@/components/Home";
import Loader from "@/components/Loader";
import { AnimatedNavFramer } from "@/components/Navbar";

import Image from "next/image";
import { useState } from "react";

export default function HomePage() {
  const [loading, setLoading] = useState<boolean>(true);
  return loading ? (
    <Loader onComplete={() => setLoading(false)} />
  ) : (
    <>
      <AnimatedNavFramer />

      <main className="bg-black overflow-hidden">
        <Home />
      </main>
    </>
  );
}
