import { useId } from "react";
import { cn } from "@/lib/utils";

export function ForgeMark({
  className,
  animated = false,
  title,
}: {
  className?: string;
  animated?: boolean;
  title?: string;
}) {
  const id = useId().replace(/:/g, "");
  const face = `face-${id}`;
  const crack = `crack-${id}`;
  const glow = `glow-${id}`;

  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("size-8", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient
          id={face}
          x1="12"
          y1="4"
          x2="36"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#3A424E" />
          <stop offset="1" stopColor="#0E1015" />
        </linearGradient>
        <linearGradient
          id={crack}
          x1="24"
          y1="3"
          x2="24"
          y2="45"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FFE7A3" />
          <stop offset=".45" stopColor="#FF9A2E" />
          <stop offset="1" stopColor="#FF4D00" />
        </linearGradient>
        <filter id={glow} x="-90%" y="-40%" width="280%" height="180%">
          <feGaussianBlur stdDeviation="1.9" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d="M24 3 43 13v20L24 43 5 33V13Z"
        fill={`url(#${face})`}
        stroke="#525C6B"
        strokeWidth="1.2"
      />
      <path
        d="M5 13l19 10 19-10M24 23v20"
        fill="none"
        stroke="#3B4350"
        strokeWidth="1"
        opacity=".9"
      />
      <g className={animated ? "animate-seam" : undefined}>
        <path
          d="M25 3l-3 9 5 6-4 8 5 6-4 11"
          fill="none"
          stroke={`url(#${crack})`}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${glow})`}
        />
        <path
          d="M25 3l-3 9 5 6-4 8 5 6-4 11"
          fill="none"
          stroke="#FFF5DE"
          strokeWidth=".8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity=".85"
        />
      </g>
    </svg>
  );
}