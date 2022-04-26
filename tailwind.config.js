module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4c4ead",
        gray: "#969696",
        dark: "#2b2b2b",
        error: "#b98686",
      },
      fontFamily: { rubik: ["rubik, sans serif"] },
      backgroundImage: { pattern: "url(../images/pattern-bg.png)" },
    },
  },
  plugins: [],
};
