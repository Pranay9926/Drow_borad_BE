// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},

//   },
//   plugins: [],
// }
// tailwind.config.js

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      userSelect: {
        text: "text",
        none: "none",
        all: "all",
        auto: "auto",
      },
      transform: {
        "rotate-270": "rotate(270deg)",
      },
    },
  },
  variants: {
    extend: {
      userSelect: ["responsive"],
      transform: ["responsive"],
    },
  },
};
