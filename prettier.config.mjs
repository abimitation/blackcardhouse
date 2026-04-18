/**
 * @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions}
 */

const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["cn"],
  tailwindStylesheet: "./src/styles/app.css",
};

export default config;
