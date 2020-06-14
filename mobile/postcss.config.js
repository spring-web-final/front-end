module.exports = {
  plugins:{
    autoprefixer:{},
    "postcss-px-to-viewport":{
      // 设计稿大小为iPhone5的大小
      viewportWidth: 320,//视窗宽度，对应设计稿宽度
      viewportHeight: 568,//视窗高度，对应设计稿高度
      unitPrecision: 5,//指定`px`转换为视窗单位值的小数位数
      viewportUnit: 'vw',//指定需要转换成的视窗单位
      // selectorBlackList: [],//指定不需要转换的类
      minPixelValue: 1,//小于或等于`1px`不转换为视窗单位
      mediaQuery: false,//允许在媒体查询中转换`px`
    }
  }
}
