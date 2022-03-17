"use strict";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const dependencies = require("./package.json").dependencies;
module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    publicPath: "http://localhost:3000/",
    filename: "bundle.js",
    chunkFilename: "[name].bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [{
      test: /\.(ts|js|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "ts-loader"
      }
    }]
  },
  devServer: {
    port: 3000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new ModuleFederationPlugin({
      name: "counter",
      filename: "remoteEntry.js",
      "./CounterApp": "./src/components/counterApp",
      shared: {
        ...dependencies,
        "react": {
          singleton: true,
          eager: true,
          requiredVersion: dependencies.react,
        },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: dependencies.react,
        },
      }
    })
  ]
};
