const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
	const isProduction = argv.mode === "production";

	return {
		mode: isProduction ? "production" : "development",
		entry: {
			background: "./src/background.ts",
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
					{ from: "public/sv.pdf", to: "sv.pdf" },
					{ from: "public/champions.pdf", to: "champions.pdf" }
				],
			}),
		],
		optimization: {
			splitChunks: {
				chunks: "all",
				minSize: 0,
				maxSize: 5_000_000,
				automaticNameDelimiter: "-",
			},
			runtimeChunk: "single",
		},
		devtool: isProduction ? false : "inline-source-map",
	};
};
