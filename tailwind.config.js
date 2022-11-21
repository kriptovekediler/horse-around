module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  content: [
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    ["./src/**/*.{html,js}", "./node_modules/tw-elements/dist/js/**/*.js"],
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "10rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      colors: {
        goldMetallic: "#DBB12A",
        themeBlack: "#0C0C0C",
        smokyBlack: "#150E03",
        cafeNoir: "#39250B",
        success: "#34A853",
        dark30: "#4444444D",
      },
      opacity: {
        15: "0.15",
      },
      height: {
        "wallet-button-height": "2.83rem",
      },
      fontSize: {
        "wallet-button-font-size": "15.25px",
      },
      lineHeight: {
        "wallet-button-line-height": "21px",
      },
      boxShadow: {
        "wallet-button-box-shadow": "0px 5.27px 0px 0px rgba(205, 156, 21, 1)",
      },
      maxWidth: {
        "description-max-width": "881px",
      },
      screens: {
        mobile: "376px", //mobile
        tablet: "641px", //sm
        laptop: "1025px", //lg
        desktop: "1281px", //xl
        "desktop-two": "1441px", //desktop
      },
    },
    screens: {
      sm: { min: "320px", max: "767px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { min: "768px", max: "1023px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: { min: "1024px", max: "1279px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }
      xl: { min: "1280px", max: "1535px" },
      x: { min: "1280px", max: "1440px" },
      y: { min: "1536px", max: "1920px" },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }
      "2xl": { min: "1536px" },
      "3xl": { min: "1921px" },
    },

    fontFamily: {
      Nunito: ["Nunito", "sans-serif"],
      NunitoNavbar: ["NunitoNavbar", "sans-serif"],
      LapsusPro: ['"Lapsus Pro"', "sans-serif"],
      Gilroy: ["Gilroy", "sans-serif"],
      PoppinsBold: ["Poppins Bold", "sans-serif"],
      PoppinsSemiBold: ["Poppins SemiBold", "sans-serif"],
    },
    backgroundImage: {
      bgHorse: "url('/home/bg.png')",
      bgJoin: "url('/banner/bg.png')",
      becomeaSeller: "url('/bg/becomeaseller.png')",
      blog: "url('/bg/blog.png')",
      underConstruction: "url('/bg/under.png')",
      connectWallet: "url('/bg/wallet.png')",
      faq: "url('/bg/faq.png')",
      page404: "url('/bg/404.png')",
      contact: "url('/bg/contact.png')",
      profile: "url('/bg/profile.png')",
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require("tw-elements/dist/plugin"),
    require("@tailwindcss/line-clamp"),
  ],
};
