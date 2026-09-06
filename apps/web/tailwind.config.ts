import type { Config } from "tailwindcss";
import preset from "@charm/config/tailwind.preset";

export default {
  presets: [preset],
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    // Scan the shared package too, or its utility classes get purged away.
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
} satisfies Config;
