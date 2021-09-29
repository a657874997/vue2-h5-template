/*
 * @Author: helei
 * @Date: 2021-09-29 09:52:24
 * @LastEditors: helei
 * @LastEditTime: 2021-09-29 15:53:51
 * @msg: 配置文件
 */

// 代码压缩
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

// gzip压缩
const CompressionWebpackPlugin = require("compression-webpack-plugin");

// 判断是否是生产环境

const isProduction = process.env.NODE_ENV !== "prod";

// 本地环境是否需要使用cdn

const isDevNeedCdn = true;

// cdn链接
const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
    vue: "Vue",
    vuex: "Vuex",
    "vue-router": "VueRouter",
  },
  // cdn的css链接
  css: [],
  // cdn的js链接
  js: [
    "https://cdn.jsdelivr.net/npm/vue@2.6.14",
    "https://unpkg.com/vuex",
    "https://unpkg.com/vue-router/dist/vue-router.js",
  ],
};

module.exports = {
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  chainWebpack: (config) => {
    // ===========压缩图片 start===========
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({ bypassOnDebug: true })
      .end();
    // ===========压缩图片 end===========

    // ===========注入cdn start===========
    config.plugin("html").tap((args) => {
      // 根据是否是生产环境和本地环境，判断是否需要使用cdn
      if (isProduction || isDevNeedCdn) {
        args[0].cdn = cdn;
      }
      return args;
    });
    // ===========注入cdn end===========
  },
  configureWebpack: (config) => {
    // 若用cdn方式引入，则构建时要忽略相关资源
    if (isProduction || isDevNeedCdn) {
      config.externals = cdn.externals;
    }
    // 生产环境相关配置
    if (isProduction) {
      // 代码压缩
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            // 生产环境自动删除console
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ["console.log"],
            },
          },
          sourceMap: false,
          parallel: true,
        })
      );

      // gzip压缩
      const productionGzipExtensions = ["html", "js", "css"];
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp(".(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 1024 * 10, // 资源大于10k的将被压缩
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false, // 删除源文件
        })
      );

      // 公共代码抽离
      config.optimization = {
        //执行是自上而下的
        splitChunks: {
          //分割代码块
          cacheGroups: {
            //缓存组

            // 抽离第三方库
            vendor: {
              chunks: "all",
              test: /node_modules/,
              name: "vendor",
              minChunks: 1, //引用1次就打包
              maxInitialRequests: 5,
              minSize: 0, //共用字节大于0即抽离
              priority: 100, // 抽离的优先级，默认为0
            },
            // 抽离自定义模块
            common: {
              chunks: "all",
              test: /[/]src[/]js[/]/,
              name: "common",
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 60,
            },
            styles: {
              name: "styles",
              test: /.(sa|sc|le|c)ss$/,
              chunks: "all",
              enforce: true,
            },
            runtimeChunk: {
              name: "manifest",
            },
          },
        },
      };
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("autoprefixer")({
            // 配置使用 autoprefixer
            overrideBrowserslist: ["last 15 versions"],
          }),
          require("postcss-pxtorem")({
            rootValue: 75, // 换算基数
            // 忽略转换正则匹配项。插件会转化所有的样式的px。比如引入了三方UI，也会被转化。目前我使用 selectorBlackList字段，来过滤
            //如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。
            //如果你创建时候选择了prettier格式化代码而且编译器也装了插件，你的css里不想被转化的"PX"编译器会自动帮你转化为"px"，此时只要在不想转化前一行加上
            // /* prettier-ignore */即可
            selectorBlackList: ["ig"],
            propList: ["*"],
            exclude: /node_modules/,
          }),
        ],
      },
    },
  },
};
