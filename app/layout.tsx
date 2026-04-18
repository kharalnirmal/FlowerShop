"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { handlee } from "@/lib/font";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${handlee.className} h-full antialiased`}>
      <body className="relative w-full">
        <div
          className="-z-10 fixed inset-0 pointer-events-none"
          style={{ zIndex: -1 }}
        >
          <ShaderGradientCanvas className="w-full h-full">
            <ShaderGradient
              animate="on"
              axesHelper="on"
              bgColor1="#000000"
              bgColor2="#000000"
              brightness={1.5}
              cAzimuthAngle={60}
              cDistance={7.1}
              cPolarAngle={90}
              cameraZoom={18.71}
              color1="#2d4a32"
              color2="#7a9e7e"
              color3="#c9a227"
              destination="onCanvas"
              embedMode="off"
              envPreset="dawn"
              format="gif"
              fov={45}
              frameRate={10}
              gizmoHelper="hide"
              grain="off"
              lightType="3d"
              pixelDensity={1}
              positionX={0}
              positionY={-0.15}
              positionZ={0}
              range="disabled"
              rangeEnd={40}
              rangeStart={0}
              reflection={0.1}
              rotationX={0}
              rotationY={0}
              rotationZ={0}
              shader="defaults"
              type="sphere"
              uAmplitude={1.4}
              uDensity={1.1}
              uFrequency={5.5}
              uSpeed={0.1}
              uStrength={0.4}
              uTime={0}
              wireframe={false}
            />
          </ShaderGradientCanvas>
        </div>
        <div className="z-0 relative">{children}</div>
      </body>
    </html>
  );
}
