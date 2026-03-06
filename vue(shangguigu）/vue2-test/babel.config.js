module.exports = {
  presets: [
    //解析vue下面的js的
    "@vue/cli-plugin-babel/preset",
    ["@babel/preset-env", { modules: false }],
  ],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
      },
    ],
  ],
};
