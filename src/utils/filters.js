// 全局过滤器
import Vue from 'vue'
import Momont from 'moment'

// 判断信息元素是否填写 已填写则返回填写值，否则返回提示信息字符串
Vue.filter('complete', function(value) {
  if (value === '' || value === null || value === undefined) {
    return '未填写'
  }
  return value
})

Vue.filter('trueOrFalse', function(value) {
  if (value) {
    return '是'
  } else {
    return '否'
  }
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

// 时间转换 年-月-日 时-分
Vue.filter('csGender', function(value) {
  if (!value) {
    return ''
  }
  if (value === 0) {
    return ''
  } else if (value === 1) {
    return '女'
  } else {
    return '男'
  }
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
  return Momont(value).format('HH:mm')
})

// 在卡号前加个NO .
Vue.filter('cardNoStr', function(value) {
  if (!value) {
    return ''
  }
  return 'NO . {0}'.format(value)
})
