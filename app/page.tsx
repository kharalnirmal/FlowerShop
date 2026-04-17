"use client";

import Loader from "@/components/Loader";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [loading, setloading] = useState(true);
  return loading ? (
    <Loader onComplete={() => setloading(false)} />
  ) : (
    <div className="flex flex-col justify-center items-center py-2 min-h-screen">
      <h1 className="mb-4 font-bold text-4xl">Welcome to My App</h1>
      <p className="mb-8 text-gray-600 text-lg">
        This is a sample Next.js application.
      </p>
      <button
        onClick={() => setloading(true)}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
      >
        Show Loader
      </button>
    </div>
  );
}
