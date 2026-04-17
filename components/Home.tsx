import { cn } from "@/lib/utils";
import { greatVibes } from "./font";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

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
      ref={homeRef}
      className="flex justify-center items-center mx-auto h-[39vh] lg:min-h-screen container"
      style={{
        backgroundImage: 'url("/flowers/hero.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-5xl h-52 lg:h-[65vh]">
        <div className="flex justify-center items-center m-8 lg:m-0 border-4 border-white rounded-3xl h-full">
          <h1
            className={cn(
              "flex flex-col justify-center items-center w-[60%] h-full font-bold text-white lg:text-[20vh] text-6xl leading-11 lg:leading-25",
              greatVibes.className,
            )}
          >
            <span className="self-end">Moon</span>
            <span className="self-start">Blooming</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
