"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { HTMLAttributes, useCallback, useMemo, useState, useEffect } from "react";

interface WarpBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  perspective?: number;
  beamsPerSide?: number;
  beamSize?: number;
  beamDelayMax?: number;
  beamDelayMin?: number;
  beamDuration?: number;
  gridColor?: string;
}

const Beam = ({
  width,
  x,
  delay,
  duration,
}: {
  width: string | number;
  x: string | number;
  delay: number;
  duration: number;
}) => {
  const [hue, setHue] = useState(0);
  const [ar, setAr] = useState(1);
  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when component unmounts
      document.body.style.overflow = "";
    };
  }, []);
  
  useEffect(() => {
    setHue(Math.floor(Math.random() * 360));
    setAr(Math.floor(Math.random() * 10) + 1);
  }, []);

  return (
    <motion.div
      style={
        {
          "--x": `${x}`,
          "--width": `${width}`,
          "--aspect-ratio": `${ar}`,
          "--background": `linear-gradient(hsl(${hue} 80% 60%), transparent)`,
        } as React.CSSProperties
      }
      className={`absolute left-[var(--x)] top-0 [aspect-ratio:1/var(--aspect-ratio)] [background:var(--background)] [width:var(--width)]`}
      initial={{ y: "100cqmax", x: "-50%" }}
      animate={{ y: "-100%", x: "-50%" }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

export const WarpBackground: React.FC<WarpBackgroundProps> = ({
  children,
  perspective = 100,
  className,
  beamsPerSide = 3,
  beamSize = 5,
  beamDelayMax = 3,
  beamDelayMin = 0,
  beamDuration = 3,
  gridColor = "hsl(var(--border))",
  ...props
}) => {
  const generateBeams = useCallback(() => {
    const beams = [];
    const cellsPerSide = Math.floor(100 / beamSize);
    const step = cellsPerSide / beamsPerSide;

    for (let i = 0; i < beamsPerSide; i++) {
      const x = Math.floor(i * step);
      const delay = Math.random() * (beamDelayMax - beamDelayMin) + beamDelayMin;
      beams.push({ x, delay });
    }
    return beams;
  }, [beamsPerSide, beamSize, beamDelayMax, beamDelayMin]);

  const topBeams = useMemo(() => generateBeams(), [generateBeams]);
  const rightBeams = useMemo(() => generateBeams(), [generateBeams]);
  const bottomBeams = useMemo(() => generateBeams(), [generateBeams]);
  const leftBeams = useMemo(() => generateBeams(), [generateBeams]);

  return (
    <div className={cn("relative rounded border p-20", className)} {...props}>
      <div
        style={
          {
            "--perspective": `${perspective}px`,
            "--grid-color": gridColor,
            "--beam-size": `${beamSize}%`,
          } as React.CSSProperties
        }
        className="pointer-events-none absolute left-0 top-0 size-full overflow-hidden [clip-path:inset(0)] [container-type:size] [perspective:var(--perspective)] [transform-style:preserve-3d]"
      >
        {/* Top side */}
        <div className="absolute [transform-style:preserve-3d] [height:100cqmax] [transform-origin:50%_0%] [transform:rotateX(-90deg)] [width:100cqi]">
          {topBeams.map((beam, index) => (
            <Beam
              key={`top-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
            />
          ))}
        </div>
        {/* Bottom side */}
        <div className="absolute top-full [transform-style:preserve-3d] [height:100cqmax] [transform-origin:50%_0%] [transform:rotateX(-90deg)] [width:100cqi]">
          {bottomBeams.map((beam, index) => (
            <Beam
              key={`bottom-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
            />
          ))}
        </div>
        {/* Left side */}
        <div className="absolute left-0 top-0 [transform-style:preserve-3d] [height:100cqmax] [transform-origin:0%_0%] [transform:rotate(90deg)_rotateX(-90deg)] [width:100cqh]">
          {leftBeams.map((beam, index) => (
            <Beam
              key={`left-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
            />
          ))}
        </div>
        {/* Right side */}
        <div className="absolute right-0 top-0 [transform-style:preserve-3d] [height:100cqmax] [width:100cqh] [transform-origin:100%_0%] [transform:rotate(-90deg)_rotateX(-90deg)]">
          {rightBeams.map((beam, index) => (
            <Beam
              key={`right-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
            />
          ))}
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
};
