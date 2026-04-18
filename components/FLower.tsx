"use client";

/**
 * ============================================================
 * FlowerGallery.tsx
 * ============================================================
 * WHAT THIS DOES:
 * - Section gets PINNED to the viewport while you scroll
 * - 6 flower cards move horizontally RIGHT → LEFT
 * - Each card is slightly tilted (the "little bend")
 * - When all cards pass → section unpins → page scrolls down
 * - Fully responsive
 *
 * GSAP CONCEPTS TAUGHT HERE:
 * 1. gsap.context()      — scoped cleanup
 * 2. ScrollTrigger.create — pin + scrub
 * 3. gsap.to()           — the core tween
 * 4. scrub               — ties animation to scroll position
 * 5. pin                 — freezes the section in viewport
 * 6. end                 — controls HOW LONG pin lasts
 * 7. markers             — debug tool (turn on to see triggers)
 * ============================================================
 */

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { greatVibes, handlee } from "@/lib/font";

// ✅ RULE: Always register plugins at MODULE LEVEL — outside component
// If you put this inside the component it re-registers on every render
// gsap.registerPlugin() is idempotent (safe to call multiple times)
// but it's still bad practice. Module level = runs ONCE when file loads.
gsap.registerPlugin(useGSAP, ScrollTrigger);

// ─── DATA ────────────────────────────────────────────────────
// Your flower cards data — swap image paths with your real photos
// from public/images/ folder
const flowers = [
  {
    id: 1,
    title: "Crimson Dream",
    subtitle: "Rare · Seasonal",
    image: "/flowers/gallery-2.png",
    price: "NPR 2,400",
    rotate: "-3deg", // the "little bend" — slightly tilted left
  },
  {
    id: 2,
    title: "White Pearl",
    subtitle: "Classic · Pure",
    image: "/flowers/gallery-2.png",
    price: "NPR 1,800",
    rotate: "2deg", // tilted right — alternating creates rhythm
  },
  {
    id: 3,
    title: "Moon Garden",
    subtitle: "Nocturnal · Rare",
    image: "/flowers/gallery-2.png",
    price: "NPR 2,800",
    rotate: "-2deg",
  },
  {
    id: 4,
    title: "Wildflower",
    subtitle: "Free · Untamed",
    image: "/flowers/gallery-2.png",
    price: "NPR 2,100",
    rotate: "3deg",
  },
  {
    id: 5,
    title: "Golden Dusk",
    subtitle: "Warm · Luxe",
    image: "/flowers/gallery-2.png",
    price: "NPR 3,200",
    rotate: "-1.5deg",
  },
  {
    id: 6,
    title: "Forest Bloom",
    subtitle: "Earthy · Fresh",
    image: "/flowers/gallery-2.png",
    price: "NPR 1,900",
    rotate: "2.5deg",
  },
];

// ─── COMPONENT ───────────────────────────────────────────────
export default function FlowerGallery() {
  /**
   * REFS — direct pointers to DOM nodes
   *
   * Think of useRef like a sticky note attached to a DOM element.
   * React gives you the actual HTML element at .current
   * GSAP needs these to animate the right elements — never use
   * class selectors like gsap.to('.card') in Next.js — SSR will break it.
   */
  const sectionRef = useRef<HTMLElement>(null); // the outer <section>
  const trackRef = useRef<HTMLDivElement>(null); // the scrolling strip of cards
  const headingRef = useRef<HTMLDivElement>(null); // top heading area

  /**
   * useGSAP — THE MODERN WAY (2025+)
   * ─────────────────────────────────
   * This is a React hook built BY the GSAP team specifically for React.
   * It does 3 things automatically:
   *
   * 1. CLEANUP — when component unmounts, it kills all tweens/triggers
   *    created inside. No memory leaks. You never write "return () => {}"
   *
   * 2. STRICT MODE SAFE — React 18 runs effects TWICE in dev mode to
   *    catch bugs. useGSAP handles this correctly. useEffect doesn't.
   *
   * 3. SCOPING — { scope: sectionRef } means any selector string like
   *    ".card" only searches INSIDE sectionRef — not the whole document.
   *    We use refs anyway but scope is good practice.
   *
   * MENTAL MODEL: Think of useGSAP as "useEffect but GSAP-aware"
   */
  useGSAP(
    () => {
      /**
       * ── STEP 1: MEASURE HOW FAR TO SCROLL ──────────────────
       *
       * We need to know: how many pixels must the track move
       * to show all cards? That's: totalWidth - viewportWidth
       *
       * trackRef.current.scrollWidth = total width of ALL cards combined
       * window.innerWidth            = width of the browser viewport
       *
       * So if track is 3000px wide and screen is 1000px wide,
       * we need to move it 2000px to the left to see the last card.
       *
       * The negative sign: CSS x moves right when positive.
       * We want to move LEFT so we use negative.
       */
      const track = trackRef.current!;
      const totalScroll = -(track.scrollWidth - window.innerWidth);

      /**
       * ── STEP 2: THE HORIZONTAL SCROLL TWEEN ────────────────
       *
       * gsap.to(target, vars)
       * ─────────────────────
       * "to" means: animate FROM current state TO these values
       *
       * target = track element (the row of cards)
       * xPercent: 0 is the default — don't animate percent here
       * x: totalScroll — move it this many pixels on the X axis
       *    (negative = move left)
       *
       * ease: 'none'
       * ────────────
       * MIND BENDING CONCEPT: When using scrub, ease: 'none' is
       * almost always correct. Here's why:
       *
       * scrub already handles the "smoothness" — it ties the animation
       * position directly to scroll position. If you add an ease ON TOP,
       * the animation feels rubber-bandy and wrong because you have
       * TWO easing systems fighting each other.
       *
       * ease: 'none' = perfectly linear = 1px scroll = 1px animation
       * This feels natural because scroll IS the control mechanism.
       */
      const horizontalTween = gsap.to(track, {
        x: totalScroll,
        ease: "none",

        /**
         * scrollTrigger — THE STAR OF THE SHOW
         * ──────────────────────────────────────
         * ScrollTrigger connects ANY gsap animation to scroll position.
         * Without it, animations play immediately on page load.
         * With it, animations play AS YOU SCROLL.
         *
         * Think of ScrollTrigger as a "scroll position → animation progress" mapper.
         * When scroll is at 0% of the trigger zone → animation is at 0%
         * When scroll is at 100% of the trigger zone → animation is at 100%
         */
        scrollTrigger: {
          /**
           * trigger: sectionRef.current
           * ────────────────────────────
           * Which element STARTS the ScrollTrigger zone?
           * When THIS element enters the viewport, the trigger activates.
           * We use the section itself — the whole gallery component.
           */
          trigger: sectionRef.current,

          /**
           * start: 'top top'
           * ─────────────────
           * FORMAT: 'elementPosition viewportPosition'
           *
           * First word  = where on the TRIGGER ELEMENT to start
           * Second word = where on the VIEWPORT to start
           *
           * 'top top' means:
           * → When the TOP of sectionRef hits the TOP of the viewport
           * → That's when the pin activates and animation begins
           *
           * Other examples:
           * 'top center'    = when element top hits viewport middle
           * 'bottom top'    = when element bottom enters viewport top
           * 'top 80%'       = when element top is 80% down the viewport
           * '+=100 top'     = 100px AFTER the element top hits viewport top
           */
          start: "top top",

          /**
           * end: () => '+=' + track.scrollWidth
           * ──────────────────────────────────────
           * FORMAT: 'position' OR a function returning a string
           *
           * This controls HOW LONG the pin lasts (how much scroll distance).
           *
           * '+=' means "relative to the start position"
           * So '+= 3000' means "3000px of scroll after the start"
           *
           * We use track.scrollWidth so the pin lasts exactly as long as
           * needed to scroll all cards through. Dynamic and responsive!
           *
           * MIND BENDING: The "end" value is in SCROLL PIXELS, not time.
           * It's not "end after 3 seconds" — it's "end after 3000px of scroll"
           * This is why scrub feels so natural — it's tied to real scroll distance.
           */
          end: () => "+=" + track.scrollWidth,

          /**
           * pin: true
           * ──────────
           * THE MAGIC PROPERTY.
           *
           * pin: true tells ScrollTrigger to:
           * 1. Take the trigger element OUT of document flow
           * 2. Apply position: fixed to it (sticks it to viewport)
           * 3. Add a spacer div that occupies the space it left
           * 4. Remove the pin when "end" is reached
           *
           * VISUAL MENTAL MODEL:
           * Imagine you're scrolling through a book.
           * Normally pages scroll past.
           * pin = you GRAB a page and hold it still.
           * The book pages (scroll) still move beneath your hand.
           * When your hand releases (end reached) → pages flow again.
           *
           * This is how luxury scroll experiences work on Apple, Awwwards sites.
           */
          pin: true,

          /**
           * pinSpacing: true (default)
           * ──────────────────────────
           * When pin grabs the element, it leaves a "hole" in the page.
           * pinSpacing: true fills that hole with a spacer so the
           * content BELOW the pinned section doesn't jump up.
           *
           * Always leave this as true unless you're doing complex layouts.
           */
          pinSpacing: true,

          /**
           * scrub: 1
           * ─────────
           * MOST IMPORTANT SCROLL TRIGGER PROPERTY.
           *
           * scrub: false → animation plays once when trigger is hit (not what we want)
           * scrub: true  → animation progress = scroll progress (instant, mechanical)
           * scrub: 1     → animation FOLLOWS scroll with a 1 second lag (smooth!)
           * scrub: 2     → 2 second lag (more floaty)
           * scrub: 0.5   → 0.5 second lag (snappier)
           *
           * MIND BENDING CONCEPT:
           * scrub: 1 doesn't mean "1 second duration"
           * It means: animation position LERPS toward scroll position over 1 second
           * LERP = Linear Interpolation = smooth catching up
           *
           * So if you scroll fast → animation lags 1s behind
           * If you scroll slow → animation stays close to scroll position
           * If you STOP scrolling → animation smoothly catches up over 1s
           *
           * This is what makes horizontal scroll feel buttery smooth vs jarring.
           */
          scrub: 2,

          /**
           * invalidateOnRefresh: true
           * ──────────────────────────
           * When the window resizes, ScrollTrigger recalculates.
           * This tells it to also recalculate our totalScroll value.
           *
           * Without this: resize window → cards go to wrong position.
           * With this: resize window → everything recalculates correctly.
           *
           * ALWAYS use this when your end value is dynamic (a function).
           */
          invalidateOnRefresh: true,

          // markers: true,
          /**
           * ^ UNCOMMENT THIS DURING DEVELOPMENT!
           * markers draws colored lines on screen showing:
           * - Green line = where trigger START is
           * - Red line   = where trigger END is
           * - Purple line = scroller start
           * - Orange line = scroller end
           *
           * It's the #1 debugging tool for ScrollTrigger.
           * ALWAYS remove before production.
           */
        },
      });

      /**
       * ── STEP 3: HEADING PARALLAX ────────────────────────────
       *
       * While cards scroll, the heading moves slightly upward.
       * This creates depth — heading feels "closer" to viewer.
       *
       * gsap.to(headingRef.current, { y: -60 })
       * → moves heading 60px UP as the section pins
       *
       * We link this to the SAME ScrollTrigger as the main tween
       * by referencing the same trigger/start/end.
       *
       * yPercent vs y:
       * y: 100      = move 100px down (absolute pixels)
       * yPercent: 100 = move 100% of element's OWN HEIGHT down
       *              yPercent is better for responsive layouts
       */
      gsap.to(headingRef.current, {
        yPercent: -30,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + track.scrollWidth * 0.4,
          scrub: 2,
        },
      });

      /**
       * ── STEP 4: CARD ENTRANCE ANIMATION ────────────────────
       *
       * Before horizontal scroll starts, cards enter the scene.
       * We use gsap.from() here — opposite of gsap.to()
       *
       * gsap.from(target, { y: 80, opacity: 0 })
       * means: element STARTS at y:80 opacity:0 and animates
       * TO its natural CSS position (y:0 opacity:1)
       *
       * gsap.from  = starts FROM these values, ends at current CSS
       * gsap.to    = starts at current CSS, ends AT these values
       * gsap.fromTo = you control BOTH start AND end
       *
       * stagger: 0.1
       * ─────────────
       * When target is an ARRAY of elements, stagger adds a
       * delay between each element's animation start.
       *
       * stagger: 0.1 = each card starts 0.1s after the previous
       * So card1 starts at 0s, card2 at 0.1s, card3 at 0.2s...
       *
       * This creates the cascade / domino effect.
       * Without stagger, ALL cards animate simultaneously → boring.
       * With stagger → they feel alive, organic, intentional.
       */
      const cards = track.querySelectorAll(".flower-card");
      gsap.from(cards, {
        y: 100,
        opacity: 0,
        rotation: 0, // start with no rotation, CSS adds the tilt
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",

        /**
         * ease: 'power3.out'
         * ───────────────────
         * GSAP has 30+ built-in eases. Here's how to think about them:
         *
         * 'none' / 'linear'  → constant speed, robotic
         * 'power1'           → gentle ease (like CSS ease-in-out)
         * 'power2'           → medium ease
         * 'power3'           → strong ease (most used in UI)
         * 'power4'           → very strong, dramatic
         *
         * The suffix:
         * '.in'   → slow start, fast end  (like dropping something)
         * '.out'  → fast start, slow end  (like throwing something)
         * '.inOut'→ slow start AND end    (smooth, balanced)
         *
         * 'power3.out' = starts FAST, decelerates to stop
         * Perfect for elements ENTERING the screen — feels snappy and confident
         *
         * Other useful eases:
         * 'back.out(1.7)' = overshoots then settles (bouncy)
         * 'elastic.out(1, 0.3)' = spring physics
         * 'expo.out' = extremely fast then extremely slow
         * 'circ.out' = circular, very smooth stop
         */

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%", // start when top of section is 85% down viewport
          end: "top 30%",
          scrub: false, // NOT scrubbed — plays once when triggered
          once: true, // only plays once, even if you scroll back up
        },
      });
    },
    { scope: sectionRef },
  );
  // ↑ scope: sectionRef — all GSAP queries inside are scoped to this element

  // ─── RENDER ──────────────────────────────────────────────
  return (
    /**
     * SECTION — the pin target
     *
     * overflow-hidden: critical! When cards are outside the viewport
     * during horizontal scroll, we don't want a horizontal scrollbar
     * to appear. overflow-hidden clips them cleanly.
     *
     * min-h-screen: gives the section enough height to be visible
     * when pinned. Without height, ScrollTrigger has nothing to pin.
     */
    <section
      id="gallery"
      ref={sectionRef}
      className="relative flex flex-col justify-center bg-forest-900 min-h-screen overflow-hidden"
      style={{ backgroundColor: "#0d1f10" }}
    >
      {/* ── HEADING ─────────────────────────────────────── */}
      <div
        ref={headingRef}
        className="z-10 relative flex flex-col gap-3 mx-auto mb-12 px-8 md:px-16 lg:w-6xl"
      >
        {/* Label */}
        <span
          className="text-xs uppercase tracking-[0.25em]"
          style={{ color: "#c9a227", fontFamily: "'Jost', sans-serif" }}
        >
          our collection
        </span>

        {/* Title */}
        <h2
          className={cn(
            "font-normal text-5xl md:text-7xl leading-none",
            "text-gold",
            greatVibes.className,
            "antialiased",
          )}
        >
          In bloom
        </h2>

        {/* Scroll hint */}
        <p
          className="flex items-center gap-3 text-sm"
          style={{ color: "#4a6e4e", fontFamily: "'Jost', sans-serif" }}
        >
          <span
            className="inline-block w-8 h-px"
            style={{ background: "#2d4a32" }}
          />
          scroll to explore
          <span>→</span>
        </p>
      </div>

      {/* ── TRACK — the horizontal scroll strip ─────────── */}
      {/**
       * This div holds ALL 6 cards in a horizontal row.
       * It's wider than the viewport — that's intentional.
       * GSAP moves this div left (negative x) to reveal cards.
       *
       * flex + gap = cards sit side by side with spacing
       * w-max = width fits all content (no wrapping)
       * px-8 = breathing room on left and right edges
       */}
      <div
        ref={trackRef}
        className="flex items-center gap-6 md:gap-8 px-8 md:px-16 w-max"
        style={{ paddingRight: "8rem" }} // extra right padding for last card
      >
        {flowers.map((flower, index) => (
          /**
           * CARD WRAPPER
           * ─────────────
           * rotate is applied via CSS transform.
           * Each card has a slightly different rotation (the "little bend").
           *
           * GSAP then animates opacity and y on these cards
           * while CSS maintains the rotation. They layer perfectly.
           *
           * will-change: transform
           * ─────────────────────
           * This is a browser HINT: "hey, this element will be transformed a lot"
           * Browser moves it to its own GPU layer → smoother animation
           * Only use on elements that ACTUALLY animate — overusing causes memory issues
           */
          <div
            key={flower.id}
            className="group cursor-pointer shrink-0 flower-card"
            style={{
              transform: `rotate(${flower.rotate})`,
              willChange: "transform",
            }}
          >
            {/* ── CARD INNER ────────────────────────────── */}
            <div
              className="relative overflow-hidden"
              style={{
                width: "clamp(240px, 28vw, 340px)",
                height: "clamp(320px, 42vw, 480px)",
                backgroundColor: "#1a2e1e",
                borderRadius: "12px",
                border: "0.5px solid #2d4a32",

                /**
                 * CSS transition on the card itself for hover
                 * GSAP handles scroll animations
                 * CSS handles hover micro-interactions
                 * They coexist perfectly — different triggers
                 */
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              {/* Image container */}
              <div className="relative w-full h-[65%] overflow-hidden">
                <Image
                  src={flower.image}
                  alt={flower.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  /**
                   * group-hover:scale-110
                   * ──────────────────────
                   * Tailwind's group utility:
                   * 1. Parent gets className="group"
                   * 2. Child uses "group-hover:*" — applies when PARENT is hovered
                   *
                   * This lets the image zoom when the CARD is hovered,
                   * not just when the image itself is hovered.
                   *
                   * duration-700 = 700ms CSS transition (not GSAP)
                   * CSS transitions are fine for simple hover states.
                   * Save GSAP for complex, sequenced, or scroll-linked animations.
                   */
                  sizes="(max-width: 768px) 240px, 340px"
                />

                {/* Dark overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "rgba(13,31,16,0.4)" }}
                />
              </div>

              {/* Card content */}
              <div
                className="flex flex-col gap-2 p-5"
                style={{ height: "35%" }}
              >
                {/* Index number — editorial touch */}
                <span
                  className="text-xs"
                  style={{
                    color: "#2d4a32",
                    fontFamily: "'Jost', sans-serif",
                    letterSpacing: "0.2em",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                  {/* padStart(2, '0') = '1' → '01', '2' → '02' */}
                </span>

                {/* Title */}
                <h3
                  className="text-xl md:text-2xl leading-tight"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    color: "#e8d5b0",
                  }}
                >
                  {flower.title}
                </h3>

                {/* Bottom row */}
                <div className="flex justify-between items-center mt-auto">
                  <span
                    className="text-xs uppercase tracking-widest"
                    style={{
                      color: "#4a6e4e",
                      fontFamily: "'Jost', sans-serif",
                    }}
                  >
                    {flower.subtitle}
                  </span>
                  <span
                    className="font-medium text-sm"
                    style={{
                      color: "#c9a227",
                      fontFamily: "'Jost', sans-serif",
                    }}
                  >
                    {flower.price}
                  </span>
                </div>
              </div>

              {/* Gold border on hover — applied via CSS not GSAP */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 pointer-events-none"
                style={{ border: "0.5px solid rgba(201,162,39,0.4)" }}
              />
            </div>
          </div>
        ))}
      </div>

      <div
        className="right-8 md:right-16 bottom-12 absolute flex flex-col items-center gap-2"
        style={{ color: "#2d4a32" }}
      >
        <div
          className="w-px h-12"
          style={{
            background: "linear-gradient(to bottom, transparent, #2d4a32)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}

/**
 * ============================================================
 * SUMMARY — WHAT YOU LEARNED
 * ============================================================
 *
 * GSAP CORE:
 * ──────────
 * gsap.to()     → animate TO values (from current state)
 * gsap.from()   → animate FROM values (to current state)
 * gsap.fromTo() → control both start and end explicitly
 *
 * ease:         → controls acceleration curve
 *   'none'      → linear (use with scrub)
 *   'power3.out'→ fast start, slow end (entering elements)
 *   'back.out()'→ overshoots then settles (bouncy feel)
 *
 * stagger:      → delay between array of elements animating
 * duration:     → how long one animation cycle takes (seconds)
 * delay:        → wait before animation starts
 *
 * SCROLLTRIGGER:
 * ──────────────
 * trigger:      → what element activates the scroll zone
 * start:        → 'elementPos viewportPos' when to start
 * end:          → 'elementPos viewportPos' OR '+=Npx' when to end
 * pin:          → freeze element in viewport while scrolling
 * scrub:        → tie animation to scroll (number = smoothing lag)
 * markers:      → debug overlay (REMOVE in production)
 * invalidateOnRefresh → recalculate on window resize
 * once:         → play animation only the first time
 *
 * REACT INTEGRATION:
 * ──────────────────
 * useGSAP()     → replaces useEffect, auto-cleanup, StrictMode safe
 * scope:        → scopes selector queries to a container ref
 * refs          → always use refs, never class/id selectors in Next.js
 * registerPlugin → always at MODULE LEVEL, never inside component
 * ============================================================
 */
