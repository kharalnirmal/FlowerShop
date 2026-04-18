"use client";

/**
 * ============================================================
 * Footer.tsx — Moon Blooming
 * ============================================================
 * LAYOUT:
 *   LEFT   — Brand name + tagline
 *   CENTER — Social icons
 *   RIGHT  — Vintage lamp SVG + wooden bench scene
 *
 * EFFECTS:
 *   • Fireflies float & glow across the whole footer (CSS + GSAP)
 *   • Lamp has warm golden light glow (CSS radial pulse)
 *   • Footer content animates in on scroll (GSAP ScrollTrigger)
 *   • Ground mist layer at the bottom
 *   • Stars twinkling in the bg
 * ============================================================
 */

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FaGithub, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { greatVibes, handlee } from "@/lib/font";
import Image from "next/image";

// ✅ Register once at module level
gsap.registerPlugin(useGSAP, ScrollTrigger);

// ─── FIREFLY CONFIG ─────────────────────────────────────────
// Each firefly has a unique starting position + movement path
const FIREFLIES = [
  { id: 1, x: "8%", y: "30%", dur: 6, delay: 0 },
  { id: 2, x: "18%", y: "55%", dur: 8, delay: 1.2 },
  { id: 3, x: "32%", y: "20%", dur: 7, delay: 0.5 },
  { id: 4, x: "45%", y: "65%", dur: 9, delay: 2 },
  { id: 5, x: "55%", y: "35%", dur: 6.5, delay: 0.8 },
  { id: 6, x: "62%", y: "70%", dur: 8, delay: 1.5 },
  { id: 7, x: "72%", y: "25%", dur: 7.5, delay: 3 },
  { id: 8, x: "82%", y: "50%", dur: 6, delay: 0.3 },
  { id: 9, x: "91%", y: "40%", dur: 9, delay: 2.5 },
  { id: 10, x: "25%", y: "80%", dur: 7, delay: 1 },
  { id: 11, x: "50%", y: "15%", dur: 8.5, delay: 1.8 },
  { id: 12, x: "78%", y: "75%", dur: 6, delay: 0.6 },
];

// ─── SOCIAL LINKS ────────────────────────────────────────────
const SOCIALS = [
  {
    icon: FaGithub,
    href: "https://github.com/kharalnirmal",
    label: "GitHub",
    hoverColor: "#e8d5b0",
  },
  { icon: FaTwitter, href: "#", label: "Twitter", hoverColor: "#7a9e7e" },
  { icon: FaInstagram, href: "#", label: "Instagram", hoverColor: "#c9a227" },
  { icon: FaYoutube, href: "#", label: "YouTube", hoverColor: "#d4627a" },
];

// ─── COMPONENT ───────────────────────────────────────────────
export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Array ref for fireflies — stores each firefly DOM node
  const firefliesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      /**
       * ── ENTRANCE ANIMATION ──────────────────────────────────
       * Three columns animate in when footer scrolls into view.
       *
       * gsap.timeline() chains animations in sequence.
       * Each .from() starts FROM these values and arrives at CSS natural state.
       *
       * scrollTrigger with scrub:false + once:true = plays ONCE on enter.
       * This is different from scrubbed scroll — it's a one-shot trigger.
       */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%", // when footer top is 85% down the viewport
          once: true, // only play once — not every time you scroll past
        },
      });

      // Brand enters from LEFT
      tl.from(brandRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Socials enter from BELOW — staggered
      tl.from(
        socialsRef.current!.children,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1, // each icon 0.1s after the previous
          ease: "back.out(1.7)", // slight bounce — feels alive
        },
        "-=0.6",
      ); // overlap with brand animation by 0.6s

      // Scene enters from RIGHT
      tl.from(
        sceneRef.current,
        {
          x: 80,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.8",
      );

      /**
       * ── LAMP GLOW PULSE ─────────────────────────────────────
       * The golden lamp glow breathes — scales up and down infinitely.
       *
       * gsap.to with repeat: -1 = infinite loop
       * yoyo: true = plays forward then REVERSES back (ping-pong)
       *
       * This is more natural than CSS animation for complex values
       * because GSAP handles the easing on both directions.
       */
      gsap.to(glowRef.current, {
        scale: 1.3,
        opacity: 0.9,
        duration: 2.5,
        repeat: -1, // -1 = repeat forever
        yoyo: true, // reverse back after each repeat
        ease: "sine.inOut", // smooth, organic — like breathing
      });

      /**
       * ── FIREFLY ANIMATION ───────────────────────────────────
       * Each firefly gets a unique random wandering path.
       *
       * We use GSAP's motionPath alternative — simple random x/y tweens
       * with repeat:-1 and yoyo:true create organic floating motion.
       *
       * The key insight: give each firefly DIFFERENT duration + delay
       * so they never move in sync. Synchronised = fake. Async = alive.
       */
      firefliesRef.current.forEach((ff, i) => {
        if (!ff) return;
        const config = FIREFLIES[i];

        // Movement path — random direction, unique per firefly
        const xMove = (Math.random() - 0.5) * 120; // -60px to +60px
        const yMove = (Math.random() - 0.5) * 80; // -40px to +40px

        // Float movement
        gsap.to(ff, {
          x: xMove,
          y: yMove,
          duration: config.dur,
          delay: config.delay,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Opacity pulse — fireflies blink independently from movement
        // This is a SEPARATE tween on the SAME element.
        // GSAP handles multiple simultaneous tweens on one element perfectly.
        gsap.to(ff, {
          opacity: Math.random() * 0.4 + 0.6, // random between 0.6 and 1.0
          duration: config.dur * 0.4,
          delay: config.delay * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Scale pulse — the glow circle grows and shrinks
        gsap.to(ff.querySelector(".ff-glow"), {
          scale: 1.8,
          duration: config.dur * 0.35,
          delay: config.delay,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    },
    { scope: footerRef },
  );

  // ─── RENDER ────────────────────────────────────────────────
  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #0d1f10 0%, #060f07 100%)",
        borderTop: "0.5px solid #1a2e1e",
        minHeight: "320px",
      }}
    >
      {/* ── BACKGROUND STARS ──────────────────────────────── */}
      {/*
        Pure CSS stars — tiny white dots scattered in the bg.
        Using box-shadow trick: one element, many shadows.
        No JS needed for static decorative elements.
      */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.4 }}
        aria-hidden="true"
      >
        <div
          style={{
            position: "absolute",
            width: "2px",
            height: "2px",
            borderRadius: "50%",
            background: "transparent",
            boxShadow: `
            120px 40px 0 #e8d5b0, 280px 80px 0 #c9a227,
            450px 30px 0 #e8d5b0, 600px 60px 0 #e8d5b0,
            780px 20px 0 #c9a227, 920px 50px 0 #e8d5b0,
            1050px 35px 0 #e8d5b0,160px 110px 0 #c9a227,
            350px 95px 0 #e8d5b0, 520px 120px 0 #e8d5b0,
            700px 85px 0 #c9a227, 870px 100px 0 #e8d5b0,
            1100px 70px 0 #e8d5b0,240px 150px 0 #e8d5b0,
            480px 140px 0 #c9a227,750px 160px 0 #e8d5b0
          `,
          }}
        />
      </div>

      {/* ── FIREFLIES ─────────────────────────────────────── */}
      {/*
        Each firefly = a positioned div with a glowing dot inside.
        GSAP animates the outer div (position) and inner div (glow scale).
        Two separate tweens, same element → smooth compound motion.
      */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {FIREFLIES.map((ff, i) => (
          <div
            key={ff.id}
            ref={(el) => {
              firefliesRef.current[i] = el;
            }}
            className="absolute"
            style={{ left: ff.x, top: ff.y }}
          >
            {/* Outer glow — large soft circle */}
            <div
              className="absolute rounded-full ff-glow"
              style={{
                width: "16px",
                height: "16px",
                background:
                  "radial-gradient(circle, rgba(255,255,150,0.4) 0%, transparent 70%)",
                top: "-6px",
                left: "-6px",
                transformOrigin: "center",
              }}
            />
            {/* Core dot — small bright center */}
            <div
              className="rounded-full"
              style={{
                width: "4px",
                height: "4px",
                background: "#ffff88",
                boxShadow: "0 0 6px 2px rgba(255,255,100,0.8)",
              }}
            />
          </div>
        ))}
      </div>

      {/* ── GROUND MIST ───────────────────────────────────── */}
      {/*
        Gradient fade at the very bottom — simulates ground fog.
        Pure CSS, no animation needed. Sells the atmosphere.
      */}
      <div
        className="right-0 bottom-0 left-0 absolute pointer-events-none"
        style={{
          height: "80px",
          background:
            "linear-gradient(to top, rgba(6,15,7,0.8) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── GROUND LINE ───────────────────────────────────── */}
      <div
        className="right-0 bottom-10 left-0 absolute pointer-events-none"
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent, #1a2e1e 20%, #2d4a32 50%, #1a2e1e 80%, transparent)",
        }}
        aria-hidden="true"
      />

      {/* ── MAIN CONTENT ──────────────────────────────────── */}
      <div
        className="z-10 relative mx-auto px-8 md:px-16 max-w-7xl"
        style={{ paddingTop: "3.5rem", paddingBottom: "5rem" }}
      >
        <div className="items-end gap-12 md:gap-8 grid grid-cols-1 md:grid-cols-3">
          {/* ── LEFT: BRAND ─────────────────────────────── */}
          <div ref={brandRef} className="flex flex-col gap-4">
            {/* Eyebrow label */}
            <span
              className="text-xs uppercase tracking-[0.22em]"
              style={{ color: "#4a6e4e", fontFamily: "'Jost', sans-serif" }}
            >
              est. 2026
            </span>

            {/* Brand name */}
            <h2
              className={cn(
                "text-7xl leading-none ,",
                "antialiased",
                greatVibes.className,
              )}
            >
              Moon Blooming
            </h2>

            {/* Gold divider line */}
            <div
              style={{
                width: "40px",
                height: "0.5px",
                background: "linear-gradient(to right, #c9a227, transparent)",
              }}
            />

            {/* Tagline */}
            <p
              className={cn(
                "text-sm leading-relaxed",
                handlee.className,
                "text-gray-400",
              )}
            >
              Where flowers bloom beneath the moonlit sky.
            </p>

            {/* Nav links */}
            <nav className="flex flex-col gap-2 mt-2">
              {["Gallery", "About", "Contact", "home"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className={cn(
                    "text-white text-xs uppercase tracking-widest transition-colors duration-300",
                    handlee.className,
                  )}
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* ── CENTER: SOCIAL ICONS ────────────────────── */}
          <div ref={socialsRef} className="flex flex-col items-center gap-6">
            {/* Label */}
            <span
              className={cn(
                "text-xs uppercase tracking-[0.2em]",
                handlee.className,
              )}
              style={{ color: "#2d4a32" }}
            >
              find us here
            </span>

            {/* Icon row */}
            <div className="flex items-center gap-5">
              {SOCIALS.map(({ icon: Icon, href, label, hoverColor }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  aria-label={label}
                  title={label}
                  className="group relative flex justify-center items-center transition-all duration-300"
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    border: "0.5px solid #2d4a32",
                    background: "rgba(26,46,30,0.6)",
                    backdropFilter: "blur(4px)",
                    color: "#4a6e4e",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = hoverColor;
                    el.style.color = hoverColor;
                    el.style.background = "rgba(26,46,30,0.9)";
                    // GSAP for the scale — smoother than CSS transform
                    gsap.to(el, {
                      scale: 1.15,
                      duration: 0.3,
                      ease: "back.out(2)",
                    });
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "#2d4a32";
                    el.style.color = "#4a6e4e";
                    el.style.background = "rgba(26,46,30,0.6)";
                    gsap.to(el, {
                      scale: 1,
                      duration: 0.4,
                      ease: "power2.out",
                    });
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            {/* Gold separator */}
            <div
              style={{
                width: "1px",
                height: "40px",
                background:
                  "linear-gradient(to bottom, transparent, #2d4a32, transparent)",
              }}
            />

            {/* Copyright */}
            <p
              className={cn("text-xs text-center", handlee.className)}
              style={{
                color: "#2d4a32",

                letterSpacing: "0.05em",
              }}
            >
              © 2026 Moon Blooming
              <br />
              All rights reserved
            </p>
          </div>

          {/* ── RIGHT: LAMP + BENCH SCENE ───────────────── */}
          <div
            ref={sceneRef}
            className="relative flex justify-end items-end"
            style={{ height: "260px" }}
            aria-hidden="true"
          >
            {/* Lamp glow — rendered BEHIND the lamp */}
            <div
              ref={glowRef}
              className="absolute"
              style={{
                // Position glow at the lamp head position
                top: "10px",
                right: "62px",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(201,162,39,0.35) 0%, rgba(201,162,39,0.1) 40%, transparent 70%)",
                transformOrigin: "center",
                pointerEvents: "none",
              }}
            />

            {/* Ground glow pool — the light that falls on the ground */}
            <div
              className="bottom-12 absolute"
              style={{
                right: "20px",
                width: "180px",
                height: "60px",
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse, rgba(201,162,39,0.12) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* ── BENCH (SVG drawn inline) ───────────────── */}
            {/*
              Drawing the bench as inline SVG so we can control
              every detail — color, proportions, style.
              Positioned to sit on the "ground" of the scene.
            */}
            <div
              className="absolute"
              style={{ bottom: "52px", right: "110px" }}
            >
              <svg width="140" height="80" viewBox="0 0 140 80" fill="none">
                {/* Back legs */}
                <rect
                  x="8"
                  y="44"
                  width="8"
                  height="34"
                  rx="2"
                  fill="#3d2810"
                />
                <rect
                  x="124"
                  y="44"
                  width="8"
                  height="34"
                  rx="2"
                  fill="#3d2810"
                />

                {/* Front legs */}
                <rect
                  x="20"
                  y="44"
                  width="7"
                  height="30"
                  rx="2"
                  fill="#5c3d1a"
                />
                <rect
                  x="113"
                  y="44"
                  width="7"
                  height="30"
                  rx="2"
                  fill="#5c3d1a"
                />

                {/* Seat planks */}
                <rect
                  x="4"
                  y="36"
                  width="132"
                  height="10"
                  rx="2"
                  fill="#7a5228"
                />
                <rect
                  x="4"
                  y="37"
                  width="132"
                  height="8"
                  rx="1"
                  fill="#8b6232"
                />
                {/* Plank grain lines */}
                {[28, 52, 76, 100].map((x) => (
                  <line
                    key={x}
                    x1={x}
                    y1="36"
                    x2={x}
                    y2="46"
                    stroke="#5c3d1a"
                    strokeWidth="1"
                  />
                ))}

                {/* Backrest */}
                <rect
                  x="4"
                  y="16"
                  width="132"
                  height="9"
                  rx="2"
                  fill="#7a5228"
                />
                <rect
                  x="4"
                  y="27"
                  width="132"
                  height="9"
                  rx="2"
                  fill="#6b4820"
                />
                {/* Backrest grain */}
                {[28, 52, 76, 100].map((x) => (
                  <line
                    key={x}
                    x1={x}
                    y1="16"
                    x2={x}
                    y2="36"
                    stroke="#5c3d1a"
                    strokeWidth="1"
                  />
                ))}

                {/* Back supports */}
                <rect
                  x="8"
                  y="16"
                  width="6"
                  height="20"
                  rx="1"
                  fill="#4a2e10"
                />
                <rect
                  x="126"
                  y="16"
                  width="6"
                  height="20"
                  rx="1"
                  fill="#4a2e10"
                />

                {/* Armrests */}
                <rect
                  x="1"
                  y="22"
                  width="14"
                  height="7"
                  rx="2"
                  fill="#8b6232"
                />
                <rect
                  x="125"
                  y="22"
                  width="14"
                  height="7"
                  rx="2"
                  fill="#8b6232"
                />

                {/* Subtle shadow under bench */}
                <ellipse
                  cx="70"
                  cy="78"
                  rx="60"
                  ry="4"
                  fill="rgba(0,0,0,0.3)"
                />
              </svg>
            </div>

            {/* LAMP */}
            <div
              className="absolute"
              style={{
                bottom: "44px",
                right: "20px",
                width: "65px",
                height: "240px",
                zIndex: 2,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 400"
                width="65"
                height="240"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient
                    id="poleMetal"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#2a2a2a" />
                    <stop offset="50%" stopColor="#4a4a4a" />
                    <stop offset="100%" stopColor="#2a2a2a" />
                  </linearGradient>
                  <radialGradient id="bulbGlow" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#ffff99" opacity="1" />
                    <stop offset="40%" stopColor="#ffd700" opacity="0.95" />
                    <stop offset="70%" stopColor="#ffb700" opacity="0.6" />
                    <stop offset="100%" stopColor="#ff9500" opacity="0.1" />
                  </radialGradient>
                  <radialGradient id="bulbHighlight" cx="30%" cy="25%" r="40%">
                    <stop offset="0%" stopColor="#ffffff" opacity="0.6" />
                    <stop offset="100%" stopColor="#ffffff" opacity="0" />
                  </radialGradient>
                  <filter id="lampGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <style>{`
                    @keyframes bulbPulse {
                      0%, 100% { opacity: 0.95; }
                      50% { opacity: 1; }
                    }
                    .lamp-bulb-glow {
                      animation: bulbPulse 3s ease-in-out infinite;
                    }
                  `}</style>
                </defs>

                {/* Vintage street lamp head */}
                <g className="lamp-bulb-glow">
                  {/* Outer warm halo */}
                  <ellipse
                    cx="50"
                    cy="28"
                    rx="24"
                    ry="28"
                    fill="none"
                    stroke="#ffd76a"
                    strokeWidth="1"
                    opacity="0.22"
                    filter="url(#lampGlow)"
                  />

                  {/* Top finial and crown */}
                  <circle cx="50" cy="4" r="2.3" fill="#222" />
                  <rect
                    x="48.6"
                    y="6"
                    width="2.8"
                    height="4"
                    rx="1"
                    fill="#2b2b2b"
                  />
                  <path
                    d="M 35 16 L 65 16 L 62 22 L 38 22 Z"
                    fill="#1f1f1f"
                    stroke="#3b3b3b"
                    strokeWidth="1"
                  />

                  {/* Head neck to pole */}
                  <rect
                    x="46"
                    y="44"
                    width="8"
                    height="10"
                    rx="2"
                    fill="#222"
                  />

                  {/* Lantern housing */}
                  <path
                    d="M 39 22 L 61 22 L 64 28 L 61 44 L 39 44 L 36 28 Z"
                    fill="#202020"
                    stroke="#3d3d3d"
                    strokeWidth="1"
                  />

                  {/* Glass chamber */}
                  <path
                    d="M 41 25 L 59 25 L 60.8 29 L 58.8 42 L 41.2 42 L 39.2 29 Z"
                    fill="url(#bulbGlow)"
                    opacity="0.92"
                  />

                  {/* Glass pane dividers */}
                  <line
                    x1="50"
                    y1="25"
                    x2="50"
                    y2="42"
                    stroke="#2f2f2f"
                    strokeWidth="1"
                    opacity="0.7"
                  />
                  <line
                    x1="43"
                    y1="30"
                    x2="57"
                    y2="30"
                    stroke="#2f2f2f"
                    strokeWidth="0.9"
                    opacity="0.45"
                  />

                  {/* Inner flame-like core */}
                  <ellipse
                    cx="50"
                    cy="34"
                    rx="4.8"
                    ry="6.5"
                    fill="#fff2a8"
                    opacity="0.72"
                  />
                  <path
                    d="M 50 29 C 47 33, 48 37, 50 39 C 52 37, 53 33, 50 29 Z"
                    fill="#ffd166"
                    opacity="0.9"
                  />

                  {/* Glass highlight */}
                  <path
                    d="M 44 27 C 43 31, 43.5 36, 45 40"
                    stroke="url(#bulbHighlight)"
                    strokeWidth="1.6"
                    fill="none"
                    opacity="0.75"
                  />
                </g>

                {/* Main vertical pole */}
                <rect
                  x="40"
                  y="60"
                  width="20"
                  height="300"
                  fill="url(#poleMetal)"
                  rx="10"
                />

                {/* Pole accent stripe */}
                <rect
                  x="45"
                  y="60"
                  width="4"
                  height="300"
                  fill="#5a5a5a"
                  rx="2"
                  opacity="0.6"
                />

                {/* Base plate - circular */}
                <ellipse
                  cx="50"
                  cy="365"
                  rx="28"
                  ry="12"
                  fill="#3a3a3a"
                  opacity="0.9"
                />

                {/* Base support feet */}
                <ellipse
                  cx="50"
                  cy="375"
                  rx="32"
                  ry="8"
                  fill="#2a2a2a"
                  opacity="0.7"
                />

                {/* Connection bolts */}
                <circle cx="50" cy="80" r="2" fill="#6a6a6a" opacity="0.7" />
                <circle cx="50" cy="140" r="2" fill="#6a6a6a" opacity="0.7" />
                <circle cx="50" cy="210" r="2" fill="#6a6a6a" opacity="0.7" />
                <circle cx="50" cy="290" r="2" fill="#6a6a6a" opacity="0.7" />

                {/* Subtle shadow on left side */}
                <rect
                  x="40"
                  y="60"
                  width="3"
                  height="300"
                  fill="#1a1a1a"
                  rx="2"
                  opacity="0.5"
                />
              </svg>
            </div>

            {/* Ground shadow under everything */}
            <div
              className="right-0 bottom-10 absolute"
              style={{
                width: "200px",
                height: "8px",
                background:
                  "radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)",
                borderRadius: "50%",
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
