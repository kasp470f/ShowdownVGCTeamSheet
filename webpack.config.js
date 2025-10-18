const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: "development",
	entry: {
		content: "./src/content.ts",
		injected: "./src/injected.ts",
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{ from: "src/popup/popup.html", to: "popup.html" },
				{ from: "public/base.pdf", to: "base.pdf" },
			],
		}),
	],
	devtool: "inline-source-map",
};
