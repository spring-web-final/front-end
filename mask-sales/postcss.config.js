module.exports = {
  plugins:{
    autoprefixer:{},
    "postcss-px-to-viewport":{
      viewportWidth: 1920,//视窗宽度，对应设计稿宽度
      viewportHeight: 722,//视窗高度，对应设计稿高度
      unitPrecision: 5,//指定`px`转换为视窗单位值的小数位数
      viewportUnit: 'vw',//指定需要转换成的视窗单位
      // selectorBlackList: [],//指定不需要转换的类
      minPixelValue: 1,//小于或等于`1px`不转换为视窗单位
      mediaQuery: false,//允许在媒体查询中转换`px`
      // exclude:[/Login.vue/,/LoginForm.vue/,/Register.vue/,/RegisterForm.vue/,/Forget.vue/,/ForgetForm.vue/]
    }
  }
}
