// The swarms-rs mark as a solid object: the flat SVG is stacked as thin slices
// along the Z axis, so rotating the group in CSS 3D shows real thickness from
// the side instead of a card that vanishes edge-on. Pure CSS, no JS and no
// canvas, so it stays a server component and costs nothing at hydration.

const DEPTH = 64 // total thickness in px
const STEP = 2 // distance between slices in px

const RED = "#D30019"
const RED_SIDE = "#7c000f"
const WHITE = "#ffffff"
const WHITE_SIDE = "#8d8d8d"

function Slice({ z, red, white }: { z: number; red: string; white: string }) {
  return (
    <svg
      viewBox="0 0 280 225"
      fill="none"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      style={{ transform: `translateZ(${z}px)` }}
    >
      <path d="M3 0H224.096L279.819 55.7197L224.096 111.439L168.372 55.7197H58.7233L3 0Z" fill={red} />
      <path d="M58.7305 111.443H168.38L279.826 221.085H168.38L58.7305 111.443Z" fill={white} />
      <path
        d="M30.8623 163.279C47.9066 163.279 61.7236 177.096 61.7236 194.14C61.7235 211.184 47.9065 225.001 30.8623 225.001C13.8179 225.001 9.3806e-05 211.184 0 194.14C0 177.096 13.8178 163.279 30.8623 163.279Z"
        fill={red}
      />
    </svg>
  )
}

export function SwarmsRsLogo3D({ className }: { className?: string }) {
  const half = DEPTH / 2
  const zs: number[] = []
  for (let z = -half; z <= half; z += STEP) zs.push(z)

  return (
    <div
      className={className}
      role="img"
      aria-label="The swarms-rs logo, slowly rotating in three dimensions"
    >
      <div className="relative flex h-[300px] items-center justify-center sm:h-[400px] lg:h-[480px]">
        {/* Soft light behind the object, so the dark sides read against the page. */}
        <div
          aria-hidden="true"
          className="absolute h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle,rgba(211,0,25,0.22),transparent_65%)] blur-2xl"
        />

        <div className="[perspective:1400px]">
          <div
            className="rs-logo-float relative"
            style={{ transformStyle: "preserve-3d", transform: "rotateX(-12deg)" }}
          >
            <div
              className="rs-logo-spin relative aspect-[280/225] w-[230px] sm:w-[300px] lg:w-[360px]"
              style={{ transformStyle: "preserve-3d", transform: "rotateY(-28deg)" }}
            >
              {zs.map((z) => {
                const face = z === half || z === -half
                return (
                  <Slice
                    key={z}
                    z={z}
                    red={face ? RED : RED_SIDE}
                    white={face ? WHITE : WHITE_SIDE}
                  />
                )
              })}
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-6 h-6 w-[55%] rounded-[50%] bg-[radial-gradient(ellipse,rgba(255,255,255,0.10),transparent_70%)] sm:bottom-10"
        />
      </div>
    </div>
  )
}
