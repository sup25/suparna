import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";
import tailwindcssAnimate from "tailwindcss-animate";

/** Reads a token defined in app/globals.css as space-separated RGB channels. */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: token("bg"),
          subtle: token("bg-subtle"),
          elevated: token("bg-elevated"),
        },
        fg: {
          DEFAULT: token("fg"),
          muted: token("fg-muted"),
          subtle: token("fg-subtle"),
          faint: token("fg-faint"),
        },
        line: {
          DEFAULT: token("border"),
          strong: token("border-strong"),
        },
        accent: {
          DEFAULT: token("accent"),
          soft: token("accent-soft"),
          border: token("accent-border"),
        },
      },

      fontFamily: {
        inter: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        bricolage: [
          "var(--font-bricolage)",
          "var(--font-inter)",
          "ui-sans-serif",
          "sans-serif",
        ],
      },

      /* Explicit type scale, so headings stop being one-off arbitrary values */
      fontSize: {
        eyebrow: ["0.625rem", { lineHeight: "1", letterSpacing: "0.28em" }],
        "display-sm": ["2.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["3.5rem", { lineHeight: "1.03", letterSpacing: "-0.025em" }],
        "display-lg": ["4.5rem", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "display-xl": ["6.5rem", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
      },

      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },

      maxWidth: {
        container: "1280px",
        prose: "72ch",
      },

      /* Consistent vertical rhythm between page sections */
      spacing: {
        section: "6rem",
        "section-lg": "9rem",
      },

      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.5s ease-out both",
      },
    },
  },
  plugins: [
    function ({ addComponents, theme }: PluginAPI) {
      addComponents({
        /* Full-bleed row that centres its container child.
           Gutters step up with the viewport: 1rem was too tight against the
           screen edge on a phone, and left the page reading as 96px of vertical
           air against 16px of horizontal, which is what made mobile spacing
           feel off rather than the vertical rhythm itself. */
        ".section": {
          width: "100%",
          display: "flex",
          justifyContent: "center",
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem",
          "@screen sm": {
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
          },
          "@screen md": {
            paddingLeft: "2rem",
            paddingRight: "2rem",
          },
        },
        /* Vertical rhythm between page sections. The `section` spacing token is
           a flat 6rem at every breakpoint, which is desktop air on a phone;
           this scales it instead. */
        ".section-y": {
          paddingTop: "4rem",
          paddingBottom: "4rem",
          "@screen sm": {
            paddingTop: "5rem",
            paddingBottom: "5rem",
          },
          "@screen md": {
            paddingTop: "6rem",
            paddingBottom: "6rem",
          },
          "@screen lg": {
            paddingTop: "7.5rem",
            paddingBottom: "7.5rem",
          },
        },
        ".container": {
          width: "100%",
          maxWidth: theme("maxWidth.container"),
        },
        /* Section eyebrow label, repeated in five places before this existed */
        ".eyebrow": {
          fontSize: theme("fontSize.eyebrow[0]"),
          lineHeight: "1",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          fontFamily: "var(--font-inter)",
          color: "rgb(var(--fg-subtle))",
        },
      });
    },
    tailwindcssAnimate,
  ],
};

export default config;
