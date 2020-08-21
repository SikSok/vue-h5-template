// 全局过滤器
import Vue from 'vue'

// 判断信息元素是否填写 已填写则返回填写值，否则返回提示信息字符串
Vue.filter('complete', function(value) {
  if (value === '' || value === null || value === undefined) {
    return '未填写'
  }
  return value
})

// 根据信息项是否有值，返回对应提示信息
Vue.filter('ifHasValue', function(value) {
  var result = '未填写'
  if (value) {
    result = ''
  }
  return result
})
