import { Space_Grotesk, Inter } from "next/font/google";

// Space Grotesk (display/headings) + Inter (body): modern, confident, warm —
// energetic without over-formalizing a casual restaurant.
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
