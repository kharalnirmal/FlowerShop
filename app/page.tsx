"use client";

import Choose from "@/components/Choose";
import Home from "@/components/Home";
import Loader from "@/components/Loader";
import { AnimatedNavFramer } from "@/components/Navbar";

import { useState } from "react";

export default function HomePage() {
  const [loading, setLoading] = useState<boolean>(true);
  return loading ? (
    <Loader onComplete={() => setLoading(false)} />
  ) : (
    <>
      <AnimatedNavFramer />

      <main className="overflow-hidden">
        <Home />
        <Choose />
      </main>
    </>
  );
}
