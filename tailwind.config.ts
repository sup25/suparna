import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "(var(--background))",
        foreground: "(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      maxWidth: {
        container: "1280px",
      },
      fontFamily: {
        inter: "var(--font-inter)",
        dmSerifDisplay: "var(--font-dm-serif)",
        marcellus: "var(--font-marcellus)",
        bricolage: "var(--font-bricolage)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    function (api: PluginAPI) {
      const { addComponents, theme } = api;
      addComponents({
        ".section": {
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "0 10px",
        },
        ".container": {
          maxWidth: theme("maxWidth.container"),
        },
        "@media screen and (min-width: 768px)": {
          ".section": {
            padding: "0 30px",
          },
        },
        ".heading": {
          fontSize: "3rem",
          lineHeight: "1",
          fontWeight: "800",
          fontFamily: "dmSerifDisplay",
        },
        "@media screen and (max-width: 768px)": {
          ".heading": {
            fontSize: "2.25rem",
            lineHeight: "1",
            fontWeight: "800",
            fontFamily: "dmSerifDisplay",
          },
        },
      });
    },
    require("tailwindcss-animate"),
  ],
};

export default config;
