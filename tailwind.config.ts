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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      maxWidth: {
        container: "1280px",
      },
      fontFamily: {
        inter: "var(--font-inter)",
        dmSerifDisplay: "var(--font-dm-serif)",
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
      });
    },
  ],
};

export default config;
