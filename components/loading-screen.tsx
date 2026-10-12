/**
 * Full-screen loading state: the Swarms mark, animated in pure CSS (keyframes
 * at the end of `app/globals.css`). Shown during page navigations by
 * `components/route-loader.tsx`.
 *
 * The seven hexagons form a 6-fold symmetric flower, so turning the group by
 * 60° lands it back on itself and the turn loops without a visible jump.
 */

import type React from "react"

// Hexagon paths from public/logo.svg, outer ring order (right, then
// counter-clockwise) with the center last. dx/dy point away from the center.
const HEXES = [
  { d: "M150.293 69.4016L162.261 90.2439L150.293 111.086H126.356L114.387 90.2439L126.356 69.4016H150.293Z", dx: 1, dy: 0 },
  { d: "M126.168 27.3887L138.137 48.231L126.168 69.0734H102.232L90.2631 48.231L102.232 27.3887L126.168 27.3887Z", dx: 0.5, dy: -0.866 },
  { d: "M78.1054 27.3887L90.0738 48.231L78.1054 69.0734H54.1685L42.2 48.231L54.1685 27.3887L78.1054 27.3887Z", dx: -0.5, dy: -0.866 },
  { d: "M54.1664 69.4016L66.1349 90.2439L54.1664 111.086H30.2296L18.2611 90.2439L30.2296 69.4016H54.1664Z", dx: -1, dy: 0 },
  { d: "M78.1054 111.367L90.0738 132.209L78.1054 153.052H54.1685L42.2 132.209L54.1685 111.367H78.1054Z", dx: -0.5, dy: 0.866 },
  { d: "M126.168 111.367L138.137 132.209L126.168 153.052H102.232L90.2631 132.209L102.232 111.367H126.168Z", dx: 0.5, dy: 0.866 },
]
const CENTER_HEX = "M102.23 69.4016L114.198 90.2439L102.23 111.086H78.2927L66.3242 90.2439L78.2927 69.4016H102.23Z"
const SPREAD = 7 // how far (in logo units) the outer hexagons drift out

export function LoadingScreen({ label = "Loading" }: { label?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="swarms-loader fixed inset-0 z-[9997] flex items-center justify-center bg-black"
    >
      <div className="swarms-loader__mark relative h-28 w-28 sm:h-32 sm:w-32">
        <div className="swarms-loader__glow absolute inset-[-40%] rounded-full" aria-hidden="true" />
        <div className="swarms-loader__comet absolute inset-0 rounded-full" aria-hidden="true" />
        <svg viewBox="0 0 180 180" fill="none" className="relative h-full w-full overflow-visible" aria-hidden="true">
          <circle cx="90" cy="90" r="87.5" stroke="#EE0712" strokeOpacity="0.2" strokeWidth="5" />
          <g className="swarms-loader__flower">
            {HEXES.map((hex, i) => (
              <path
                key={i}
                d={hex.d}
                fill="#F5070C"
                className="swarms-loader__hex"
                style={
                  {
                    "--dx": `${hex.dx * SPREAD}px`,
                    "--dy": `${hex.dy * SPREAD}px`,
                    animationDelay: `${i * 0.06}s`,
                  } as React.CSSProperties
                }
              />
            ))}
            <path d={CENTER_HEX} fill="#F5070C" className="swarms-loader__core" />
          </g>
        </svg>
      </div>
      <span className="sr-only">{label}</span>
    </div>
  )
}
