//以下是插件babel-plugin-import 的配置
//作用：能在src/plugins/vant.js 下按需加载vant-ui组件
//详见：https://segmentfault.com/a/1190000019275330

// 获取 VUE_APP_ENV 非 NODE_ENV，测试环境依然 console
const IS_PROD = ['production', 'prod'].includes(process.env.VUE_APP_ENV)
const plugins = []
// 去除 console.log
if (IS_PROD) {
  plugins.push('transform-remove-console')
}

module.exports = {
  presets: [['@vue/cli-plugin-babel/preset', { useBuiltIns: 'usage', corejs: 3 }]],
  plugins
}
