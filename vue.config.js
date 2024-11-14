const path = require("path");
const { defineConfig } = require('@vue/cli-service');

const vueSrc = "./src";

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
		const svgRule = config.module.rule("svg");

		svgRule.uses.clear();
		svgRule.delete("type");
		svgRule.delete("generator");

		svgRule.use("svg-sprite-loader").loader("svg-sprite-loader");
	},
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, vueSrc),
        "@baseComponents": path.resolve(__dirname, `${vueSrc}/components/base`),
      },
    }
  }
})
