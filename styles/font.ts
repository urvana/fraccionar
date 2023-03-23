import { Readex_Pro } from "next/font/google";

export const readex = Readex_Pro({
  variable: "--skin-font-sans", // see tailwind.config.js
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const font = readex;
