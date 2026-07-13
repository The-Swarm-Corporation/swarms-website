import { Montserrat, Orbitron } from "next/font/google"

// Shared between the (en) and /zh root layouts so both language trees load
// the exact same self-hosted font files.
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
})

export const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
})
