import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F5EDE2",
        secondary: "#D9B382",
        background: "var(--background)",
        foreground: "var(--foreground)",
        "warm-bg-1": "#FFF8E1",
        "warm-bg-2": "#FFEFD5",
        "warm-card": "#FFFDF5",
        "warm-text": "#5D463A",
        "warm-border": "#EADDCB",
        "warm-accent": "#E89D2B",
        "warm-accent-dark": "#E87D24",
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.warm-text'),
            a: {
              color: theme('colors.warm-accent'),
              '&:hover': {
                color: theme('colors.warm-accent'),
              },
            },
            h1: {
              color: theme('colors.warm-text'),
            },
            h2: {
              color: theme('colors.warm-text'),
            },
            h3: {
              color: theme('colors.warm-text'),
            },
            h4: {
              color: theme('colors.warm-text'),
            },
            p: {
              color: theme('colors.warm-text'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // Add other plugins if necessary
  ],
} satisfies Config;
