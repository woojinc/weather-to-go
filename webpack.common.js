const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const outputDir = "./dist";

module.exports = {
    entry: path.join(__dirname, './public/javascripts/index.js'), //
    output: {
        // path: path.join(__dirname, outputDir),
        path: path.join(__dirname, './public'),
        filename: "bundle.js",
        // publicPath: "/dist/"
    },
    resolve: {
        extensions: [".js"] // if we were using React.js, we would include ".jsx"
    },
    module: {
        rules: [{
            test: /\.js$/, // if we were using React.js, we would use \.jsx?$/
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                    exclude: /node_modules/
                } // if we were using React.js, we would include "react"
            }
        },
        {
            test: /\.css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    // you can specify a publicPath here
                    // by default it uses publicPath in webpackOptions.output
                    publicPath: "../",
                    hmr: process.env.NODE_ENV === "development"
                }
            },
                "css-loader",
                "postcss-loader"
            ]
        },
        {
            test: /\.scss/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    // you can specify a publicPath here
                    // by default it uses publicPath in webpackOptions.output
                    publicPath: "../",
                    hmr: process.env.NODE_ENV === "development"
                }
            },
                "css-loader",
                "sass-loader",
                "postcss-loader"
            ]
        }
        ]
    },
    plugins: [new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: "[name].css",
        chunkFilename: "[id].css",
        ignoreOrder: false // Enable to remove warnings about conflicting order
    }), require("autoprefixer")]
};