/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      spacing:{
        "12/12":"95%",
        "18":"70px",
        "84":"350px",
        "86":"380px",
        "88":"430px",
        "90":"440px",
        "98":"400px",
        "99":"430px",
        "100":"450px",
        "105":"470px"
      }
    },
  },
  plugins: [],
}

