const {
  override,
  addWebpackAlias,
  addLessLoader,
  addWebpackModuleRule,
  adjustStyleLoaders
} = require("customize-cra");
const rewirePostcss = require("react-app-rewire-postcss");

const path = require("path");
module.exports = override(
  addWebpackAlias({
    //配置别名
    "@": path.resolve(__dirname, "src"),
  }),
  addWebpackModuleRule(
    {
      test: /\.(jpg|png|gif|svg|jpeg)$/,
      use: ["url-loader"],
    }
  ),
  adjustStyleLoaders(({ use: [ , css, postcss, resolve, processor ] }) => {
    css.options.sourceMap = true;         // css-loader
    postcss.options.sourceMap = true;     // postcss-loader
    // when enable pre-processor,
    // resolve-url-loader will be enabled too
    if (resolve) {
      resolve.options.sourceMap = true;   // resolve-url-loader
    }
    // pre-processor
    if (processor && processor.loader.includes('less-loader')) {
      processor.options.sourceMap = true; // less-loader
    }
  }),
  addLessLoader({
    lessOptions: {
      strictMath: true,
      noIeCompat: true,
      javascriptEnabled: true,
      cssLoaderOptions: {
        modules: { localIdentName: "[name]_[local]_[hash:base64:5]" },
      }, // .less file used css-loader option, not all CSS file.
      sourceMap: true,
    },
  }),
  (config, env) => {
    rewirePostcss(config, {
      // postcss 配置
      plugins: (loader) => [
        // require("postcss-import")({}),  //开启会报错,暂时未找到原因
        // require("postcss-url")({}),
        require("postcss-aspect-ratio-mini")({}),
        require("postcss-preset-env")({
          autoprefixer: {
            flexbox: "no-2009",
          },
          stage: 3,
        }),
        require("postcss-px-to-viewport")({
          unitToConvert: "px", // 要转化的单位
          viewportWidth: 750, // (Number) 视窗的宽度，对应的是我们设计稿的宽度，一般是750
          // viewportHeight: 1334, // (Number) 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
          unitPrecision: 6, // (Number) 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
          viewportUnit: "vw", // (String) 指定需要转换成的视窗单位，建议使用vw
          selectorBlackList: [], // (Array) 指定不转换为视窗单位的类，可以自定义，可以无限添加，建议定义一至两个通用的类名，注意：第三方UI库也要在此添加
          minPixelValue: 1, // (Number) 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
          mediaQuery: false, // (Boolean) 允许在媒体查询中转换`px`
          replace: true, // 是否转换后直接更换属性值
          exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
          landscape: false, // 是否处理横屏情况
          // propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
        }),
        require("postcss-write-svg")({
          utf8: false,
        }),
        require("postcss-viewport-units")({
          filterRule: (rule) =>
            rule.nodes.findIndex((i) => i.prop === "content") === -1, // 过滤伪类content使用
        }),
        require("cssnano")({
          preset: "advanced",
          autoprefixer: false,
          "postcss-zindex": false, // 防止z-index的值重置为1
        }),
      ],
    });
    return config;
  }
);
