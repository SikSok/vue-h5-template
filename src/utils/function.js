import Vue from 'vue'

const openApiUrl = 'http://api.apps.cloudschools.cn'

Vue.prototype.getFileUrl = function(tenantId, id) {
  return '{0}/api/PubFile/{1}/Avatar/{2}'.format(openApiUrl, tenantId, id)
}

// 16进制逆序转10进制
Vue.prototype.g_binaryConversion = function(sixteen) {
  if (sixteen === '' || sixteen === null) {
    return 0
  }
  var sixteenStr = '{0}'.format(sixteen)
  // 如果位数不成对 最高位补0
  if (sixteenStr.length % 2 !== 0) {
    sixteenStr = '0{0}'.format(sixteen)
  }
  // 16进制逆序转正序
  var result = ''
  for (var i = sixteenStr.length; i > 0; i = i - 2) {
    result = '{0}{1}{2}'.format(result, sixteenStr[i - 2], sixteenStr[i - 1])
  }
  // 16进制转10进制
  result = parseInt(result, 16)
  return result
}

// 根据卡号获取学生信息
Vue.prototype.$getUser = function(cardNo) {
  // 调试缓存刷新时从session重新获取
  if (this.$store.getters.commonData == null) {
    var commonData = JSON.parse(sessionStorage.getItem(`commonData`))
    this.$store.dispatch('app/setCommonData', commonData)
  }
  if (this.$store.getters.commonData == null) {
    this.$startup.toast('未获取学生数据缓存')
    return null
  }
  var users = this.$store.getters.commonData.users
  var result = users.find(x => x.cardNo === '{0}'.format(cardNo))
  return result
}

// 上传测温结果数据
Vue.prototype.g_postModel = function(currentUser, temperatureValue) {
  var model = {}
  model.MsgId = 0
  model.TenantId = currentUser.tenantId
  model.UserType = currentUser.userType
  model.UserId = currentUser.userId
  model.CardNo = currentUser.cardNo
  model.Time = new Date()
  model.value = temperatureValue

  this.postAxios('api/Temperature?SN={0}'.format(this.$startup.sn), {}, model).then(res => {
    this.$startup.toast('{0}测温数据已上传'.format(currentUser.name))
  })
}

/* eslint-disable */
import startup from 'startup'
Vue.prototype.$startup = startup
