// components/Loader.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// ✅ Rule 3 — register ONCE at module level, outside component
gsap.registerPlugin(useGSAP);

interface LoaderProps {
  onComplete: () => void; // parent calls this to show the site
}

export default function Loader({ onComplete }: LoaderProps) {
  // ✅ Rule 2 — refs, never class selectors
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const bloomGroupRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<(HTMLDivElement | null)[]>([]);

  const PETAL_COUNT = 10;

  // ✅ Rule 1 — useGSAP, never useEffect
  useGSAP(
    () => {
      // ✅ Rule 4 — one timeline sequences everything
      const tl = gsap.timeline({
        onComplete: onComplete, // fires when last tween finishes
      });

      // STEP 1 — line draws down from top to center
      // scaleY starts at 0 (invisible), animates to 1 (full height)
      // transformOrigin top means it grows downward
      tl.from(lineRef.current, {
        scaleY: 0,
        duration: 0.9,
        ease: "power3.inOut",
        transformOrigin: "top center",
      });

      // STEP 2 — gold dot pops in at center
      // back.out(2.5) = overshoots then settles — the bounce effect
      tl.from(
        dotRef.current,
        {
          scale: 0,
          opacity: 0,
          duration: 0.45,
          ease: "back.out(2.5)",
        },
        "-=0.05",
      ); // starts 0.05s before line finishes

      // STEP 3 — petals bloom from center with a soft unfurl
      tl.fromTo(
        petalsRef.current,
        {
          scaleX: 0.6,
          scaleY: 0.2,
          y: 10,
          opacity: 0,
          filter: "blur(4px)",
        },
        {
          scaleX: 1,
          scaleY: 1,
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.62,
          stagger: { each: 0.07, from: "center" },
          ease: "back.out(1.45)",
          transformOrigin: "center 88%",
        },
        "+=0.08",
      );

      // A brief settle makes the petals feel less mechanical
      tl.to(
        petalsRef.current,
        {
          scale: 1.03,
          duration: 0.24,
          yoyo: true,
          repeat: 1,
          stagger: { each: 0.02, from: "edges" },
          ease: "sine.inOut",
        },
        "-=0.1",
      );

      tl.fromTo(
        dotRef.current,
        {
          boxShadow: "0 0 0 rgba(201, 162, 39, 0)",
        },
        {
          boxShadow: "0 0 24px rgba(201, 162, 39, 0.45)",
          duration: 0.36,
          ease: "sine.out",
        },
        "-=0.28",
      );

      // STEP 4 — dissolve the full loader (no upward motion)
      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.65,
          ease: "sine.inOut",
        },
        "+=0.12",
      );
    },
    { scope: containerRef },
  ); // ✅ scope locks all queries to this container

  return (
    <div
      ref={containerRef}
      className="z-50 fixed inset-0 bg-[#0d1f10] overflow-hidden"
    >
      <div
        className="absolute inset-0 flex justify-center items-center bg-[#0d1f10]"
        style={{
          borderBottomLeftRadius: "58% 34%",
          borderBottomRightRadius: "58% 34%",
          transformOrigin: "center bottom",
        }}
      >
        {/* The vertical line — starts at center, grows down */}
        <div
          className="absolute flex flex-col items-center"
          style={{ top: "12%", bottom: "50%" }}
        >
          <div
            ref={lineRef}
            className="bg-linear-to-b from-transparent via-[#c9a227]/60 to-[#c9a227] w-px"
            style={{ height: "100%" }}
          />
        </div>

        {/* Center point — dot + petals all anchored here */}
        <div
          ref={bloomGroupRef}
          className="z-10 relative flex justify-center items-center w-36 h-36"
        >
          <div
            className="absolute rounded-full"
            style={{
              width: "104px",
              height: "104px",
              background:
                "radial-gradient(circle, rgba(116, 173, 119, 0.2) 0%, rgba(13, 31, 16, 0) 72%)",
              filter: "blur(2px)",
            }}
          />

          {/* Petals — each rotated evenly around 360° */}
          {Array.from({ length: PETAL_COUNT }).map((_, i) => {
            const angle = (i / PETAL_COUNT) * 360;
            const petalHeight = i % 2 === 0 ? 58 : 52;
            const petalWidth = i % 3 === 0 ? 18 : 16;
            const tilt = i % 2 === 0 ? -4 : 3;

            return (
              <div
                key={i}
                ref={(el) => {
                  petalsRef.current[i] = el;
                }}
                className="top-1/2 left-1/2 absolute w-0 h-0"
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                  transformOrigin: "center center",
                }}
              >
                <div
                  className="top-1/2 left-1/2 absolute shadow-[0_4px_12px_rgba(0,0,0,0.28)] border border-[#9db58a]/40 rounded-[55%_55%_46%_46%/92%_92%_24%_24%] overflow-hidden"
                  style={{
                    width: `${petalWidth}px`,
                    height: `${petalHeight}px`,
                    clipPath:
                      "polygon(50% 0%, 88% 16%, 100% 45%, 86% 78%, 50% 100%, 14% 78%, 0% 45%, 12% 16%)",
                    background:
                      "linear-gradient(180deg, #9bc08a 0%, #65875c 42%, #355137 100%)",
                    transformOrigin: "center bottom",
                    transform: `translate(-50%, -100%) rotate(${tilt}deg)`,
                  }}
                >
                  <div
                    className="top-[7%] left-1/2 absolute rounded-full -translate-x-1/2"
                    style={{
                      width: "2px",
                      height: "80%",
                      background:
                        "linear-gradient(180deg, rgba(243, 252, 236, 0.88) 0%, rgba(178, 211, 163, 0.15) 100%)",
                    }}
                  />
                  <div
                    className="top-[18%] left-[18%] absolute rounded-full"
                    style={{
                      width: "56%",
                      height: "34%",
                      background: "rgba(228, 245, 218, 0.24)",
                      filter: "blur(2px)",
                      transform: "rotate(-18deg)",
                    }}
                  />
                  <div
                    className="bottom-[10%] absolute inset-x-[10%] rounded-full"
                    style={{
                      height: "20%",
                      background: "rgba(34, 61, 38, 0.38)",
                      filter: "blur(2px)",
                    }}
                  />
                </div>
              </div>
            );
          })}

          <div
            ref={dotRef}
            className="z-10 relative bg-[#c9a227] rounded-full w-3 h-3"
          >
            <div className="absolute inset-1 bg-[#e8d5b0]/60 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
