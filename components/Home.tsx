import { cn } from "@/lib/utils";
import { greatVibes } from "../lib/font";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import Magnet from "./ui/Magnet";

export default function Home() {
  const homeRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.from(homeRef.current, {
      opacity: 0,
      ease: "sine.in",
      duration: 0.3,
    });
  });

  return (
    <div
      id="home"
      ref={homeRef}
      className="flex justify-center items-center mx-auto w-full max-w-[100vw] min-h-[60vh] sm:min-h-[70vh] lg:min-h-screen overflow-x-hidden"
      style={{
        backgroundImage: 'url("/flowers/hero.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="px-4 sm:px-6 lg:px-0 w-full max-w-5xl h-52 sm:h-64 lg:h-[65vh]">
        <div className="flex justify-center items-center m-4 sm:m-8 lg:m-0 border-4 border-white rounded-3xl h-full">
          <h1
            className={cn(
              "flex flex-col justify-center items-center w-[90%] sm:w-[80%] lg:w-[60%] h-full font-bold text-white lg:text-[20vh] text-4xl sm:text-5xl md:text-6xl leading-tight lg:leading-none",
              greatVibes.className,
            )}
          >
            <span className="self-end">
              <Magnet padding={200} disabled={false} magnetStrength={100}>
                Moon
              </Magnet>
            </span>
            <span className="self-start">
              <Magnet padding={200} disabled={false} magnetStrength={100}>
                Blooming
              </Magnet>
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}
