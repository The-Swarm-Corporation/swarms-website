import { Montserrat, Orbitron } from "next/font/google"

// Shared between the (en) and /zh root layouts so both language trees load
// the exact same self-hosted font files.
// Only weights actually used in the codebase are loaded. Montserrat covers
// font-normal through font-bold; Orbitron only appears on the not-found page
// at font-semibold and font-bold. Add a weight here before using a new
// font-* utility outside that range.
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
})

export const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-orbitron",
})
