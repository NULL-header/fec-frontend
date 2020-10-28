import path from "path";
import webpack from "webpack";
import "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import packageJSON from "./package.json";
import Dotenv from "dotenv-webpack";

interface Env {
  master: "master" | null;
  develop: "develop" | null;
  feature: "feature" | null;
  branchName: string;
}

const webpackConfig = (env: Env): webpack.Configuration => ({
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css"],
    alias: {
      src: path.resolve(__dirname, "src/"),
    },
  },
  output: {
    path: path.join(__dirname, "/public"),
    filename: "bundle.js",
    publicPath:
      "/" + ((e) => (e == null ? "" : encodeURIComponent(e)))(env.branchName),
  },
  devServer: {
    historyApiFallback: true,
  },
  devtool: "#inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: path.resolve(__dirname, "./tsconfig.build.json"),
        },
        exclude: /public/,
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { url: false },
          },
        ],
      },
      {
        test: /\.js$/,
        enforce: "pre",
        loader: "source-map-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new webpack.DefinePlugin({
      "process.env.PRODUCTION": env.master || !(env.develop || env.feature),
      "process.env.NAME": JSON.stringify(packageJSON.name),
      "process.env.VERSION": JSON.stringify(packageJSON.version),
      "process.env.BRANCH_NAME":
        env.branchName == null
          ? undefined
          : JSON.stringify(encodeURIComponent(env.branchName)),
    }),
    new ForkTsCheckerWebpackPlugin(),
    new Dotenv({
      path: getEnvFilepath(env),
    }),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
});

const getEnvFilepath = (config: Env): string => {
  let envPath;
  if (config.master) {
    envPath = path.resolve(__dirname, ".env.production");
  } else if (config.develop) {
    envPath = path.resolve(__dirname, ".env.development");
  } else {
    envPath = path.resolve(__dirname, ".env.feature");
  }
  return envPath;
};

export default webpackConfig;
