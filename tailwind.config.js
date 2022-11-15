/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./widget/**/*.{js,ts,jsx,tsx}",
    "./HOC/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'detail-product': 'minmax(0px, 28%) minmax(0px, 50%) minmax(0px, 22%)',
        'checkout-product': 'minmax(0px, 70%) minmax(0px, 30%)',
      },
      margin: {
        'card-transaksi': '-50px 0px 0px 0px',
      }
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
