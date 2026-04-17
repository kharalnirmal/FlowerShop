import { useEffect, useRef } from "react";

const gradientId = "trailGradient";

const config = {
  particleCount: 92,
  trailSpan: 0.34,
  durationMs: 4400,
  rotationDurationMs: 28000,
  pulseDurationMs: 10000,
  strokeWidth: 0.6,

  spiralR: 5,
  spiralr: 1,
  spirald: 3,
  spiralScale: 1.2,
  spiralBreath: 0.1,

  rotate: true,

  point(progress: number, detailScale: number) {
    const t = progress * Math.PI * 2;
    const d = this.spirald + detailScale * 0.25;

    const baseX =
      (this.spiralR - this.spiralr) * Math.cos(t) +
      d * Math.cos(((this.spiralR - this.spiralr) / this.spiralr) * t);

    const baseY =
      (this.spiralR - this.spiralr) * Math.sin(t) -
      d * Math.sin(((this.spiralR - this.spiralr) / this.spiralr) * t);

    const scale = this.spiralScale + detailScale * this.spiralBreath;

    return {
      x: 50 + baseX * scale,
      y: 50 + baseY * scale,
    };
  },
};

function normalizeProgress(p: number) {
  return ((p % 1) + 1) % 1;
}

function getDetailScale(time: number) {
  const pulseProgress =
    (time % config.pulseDurationMs) / config.pulseDurationMs;
  const pulseAngle = pulseProgress * Math.PI * 2;

  return 0.52 + ((Math.sin(pulseAngle + 0.55) + 1) / 2) * 0.48;
}

function getRotation(time: number) {
  if (!config.rotate) return 0;
  return (
    -((time % config.rotationDurationMs) / config.rotationDurationMs) * 360
  );
}

export default function LOGO() {
  const groupRef = useRef<SVGGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const circlesRef = useRef<SVGCircleElement[]>([]);

  const startedAt = useRef(performance.now());

  useEffect(() => {
    const SVG_NS = "http://www.w3.org/2000/svg";

    // create particles once
    const group = groupRef.current!;
    circlesRef.current = [];

    for (let i = 0; i < config.particleCount; i++) {
      const circle = document.createElementNS(SVG_NS, "circle");
      circle.setAttribute("fill", `url(#${gradientId})`);
      group.appendChild(circle);
      circlesRef.current.push(circle);
    }

    let frame: number;

    const render = (now: number) => {
      const time = now - startedAt.current;

      const progress = (time % config.durationMs) / config.durationMs;

      const detailScale = getDetailScale(time);

      // rotate group
      if (groupRef.current) {
        groupRef.current.setAttribute(
          "transform",
          `rotate(${getRotation(time)} 50 50)`,
        );
      }

      // build path
      const steps = 480;
      let d = "";

      for (let i = 0; i <= steps; i++) {
        const p = i / steps;
        const pt = config.point.call(config, p, detailScale);

        d += `${i === 0 ? "M" : "L"} ${pt.x.toFixed(2)} ${pt.y.toFixed(2)} `;
      }

      if (pathRef.current) {
        pathRef.current.setAttribute("d", d);
      }

      // particles
      circlesRef.current.forEach((node, index) => {
        const tailOffset = index / (config.particleCount - 1);

        const p = normalizeProgress(progress - tailOffset * config.trailSpan);

        const pt = config.point.call(config, p, detailScale);

        const fade = Math.pow(1 - tailOffset, 0.56);

        const radius = 0.45 + fade * 1.2;
        const opacity = 0.04 + fade * 0.96;

        node.setAttribute("cx", pt.x.toFixed(2));
        node.setAttribute("cy", pt.y.toFixed(2));
        node.setAttribute("r", radius.toFixed(2));
        node.setAttribute("opacity", opacity.toFixed(3));
      });

      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="flex justify-center items-center bg-transparent min-h-screen text-white">
      <svg
        viewBox="0 0 100 100"
        className="drop-shadow-[0_0_6px_rgba(0,0,0,0.55)] w-25 h-50"
        fill="#000000"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="60%" stopColor="#c9a227" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#c9a227" />
          </linearGradient>
        </defs>
        <g ref={groupRef}>
          <path
            ref={pathRef}
            stroke={`url(#${gradientId})`}
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.15}
          />
        </g>
      </svg>
    </div>
  );
}
