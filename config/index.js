const path = require("path");
const { title: rootTitle } = require("../src/config/project");
const ConfigGenerator = require("../plugins/config-generator");

const resolve = (dir) => {
  const root = `${__dirname}/../src`;
  return path.join(root, dir);
};
const merge = require("webpack-merge");
const dev = require("./dev");
const prod = require("./prod");

const common = {
  publicPath:
    process.env.NODE_ENV === "development"
      ? "/"
      : process.env.VUE_APP_PUBLIC_PATH,
  css: {
    sourceMap: true,
    // loaderOptions: {
    //   sass: {
    //     prependData: '@import "@styles/modules/_variables.scss";',
    //   },
    // },
  },
  configureWebpack: {
    name: rootTitle,
    resolve: {
      extensions: [".js", ".vue", ".json"],
      alias: {
        "@": resolve(""),
        "@api": resolve("api"),
        "@models": resolve("models"),
        "@store": resolve("store"),
        "@assets": resolve("assets"),
        "@router": resolve("router"),
        "@views": resolve("views"),
        "@utils": resolve("utils"),
        "@components": resolve("components"),
      },
    },
  },
  chainWebpack: (config) => {
    config.module.rule("svg").exclude.add(resolve("assets/icons")).end();
    config.module
      .rule("image")
      .test(/\.ico$/)
      .use("url-loader")
      .loader("url-loader")
      .end();

    config.optimization.minimizer("terser").tap((args) => {
      const { terserOptions } = args[0];
      terserOptions.keep_fnames = /(Model$)|(Api$)/;
      return args;
    });

    config
      .plugin("ConfigGenerator")
      .use(ConfigGenerator)
      .tap((c) => {
        return c;
      });
  },
};

const isDev = process.env.NODE_ENV === "development";
const target = isDev ? dev : prod;
module.exports = merge({}, common, target);
