// 全局过滤器
import Vue from 'vue'
import Momont from 'moment'
import Parameter from './parameters'

// 判断信息元素是否填写 已填写则返回填写值，否则返回提示信息字符串
Vue.filter('complete', function(value) {
  if (value === '' || value === null || value === undefined) {
    return '未填写'
  }
  return value
})

// 根据信息项是否有值，返回对应提示信息
Vue.filter('ifHasValue', function(value) {
  var result = ''
  if (value) {
    result = '（{0}）'.format(value)
  } else {
    result = '未填写'
  }
  return result
})

// 时间转换 年-月-日
Vue.filter('csdate', function(value) {
  if (!value) {
    return ''
  }
  return Momont(value).format('YYYY-MM-DD')
})

// 时间转换 年-月-日 时-分
Vue.filter('cstime', function(value) {
  if (!value) {
    return ''
  }
  return Momont(value).format('YYYY-MM-DD HH:mm')
})

// 人事相关字典 数据转换
Vue.filter('translateParameter', function(value, code) {
  if (value === '' || value === null) {
    return ''
  }
  const args = code.split('.')
  var dict = Parameter[args[0]][args[1]]
  if (!dict) {
    return ''
  }
  for (let i = 0; i < dict.Items.length; i++) {
    const item = dict.Items[i]
    if (item.Value === value) {
      return item.Label
    }
  }
  return ''
})
