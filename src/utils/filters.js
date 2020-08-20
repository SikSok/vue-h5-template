// 全局过滤器
import Vue from 'vue'

Vue.filter('complete', function(value) {
  if (value === '' || value === null || value === undefined) {
    return '未填写'
  }
  return value
})
