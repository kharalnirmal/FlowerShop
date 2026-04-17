"use client";

import Loader from "@/components/Loader";
import { useState } from "react";

export default function Home() {
  const [loading, setloading] = useState(true);

  return (
    <div className="relative bg-[#eef4ea] min-h-screen overflow-hidden">
      <div
        aria-hidden={loading}
        className={`z-0 relative flex min-h-screen flex-col items-center justify-center px-6 py-10 text-center transition-[opacity,transform,filter] duration-700 ease-out ${
          loading
            ? "pointer-events-none select-none opacity-0 scale-[1.02] blur-[2px]"
            : "pointer-events-auto opacity-100 scale-100 blur-0"
        }`}
      >
        <h1 className="mb-4 font-bold text-[#17311c] text-4xl sm:text-6xl">
          Welcome to My App
        </h1>
        <p className="mb-8 max-w-xl text-[#4f6352] text-lg">
          This is a sample Next.js application.
        </p>
        <button
          onClick={() => setloading(true)}
          className="bg-[#17311c] hover:bg-[#224528] px-5 py-3 rounded-full font-medium text-white text-sm transition"
        >
          Show Loader
        </button>
      </div>

      {loading ? <Loader onComplete={() => setloading(false)} /> : null}
    </div>
  );
}
