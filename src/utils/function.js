import Vue from 'vue'

/* eslint-disable */
import startup from 'startup'
Vue.prototype.$startup = startup

// 浏览器内置数据库
import PouchDB from 'pouchdb'
import PouchdbFind from 'pouchdb-find'
PouchDB.plugin(PouchdbFind)
var idataDb = new PouchDB('idata_database')
Vue.prototype.g_idataDb = idataDb

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
  // 逆序16进制转10进制
  cardNo = this.g_binaryConversion(cardNo)
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
Vue.prototype.g_creatModel = function(currentUser, temperatureValue) {
  var model = {}
  model.MsgId = 0
  model.TenantId = currentUser.tenantId
  model.UserType = currentUser.userType
  model.UserId = currentUser.userId
  model.CardNo = currentUser.cardNo
  model.Time = new Date()
  model.value = temperatureValue
  if (model.value == null) {
    model.value = 0
  }
  return model
}

// 计算表达式的值
function evil(fn) {
  var Fn = Function // 一个变量指向Function，防止有些前端编译工具报错
  return new Fn('return ' + fn)()
}
// 获取工作状态 是否离线
Vue.prototype.g_getoffline = function() {
  var offline = this.$store.getters.offline
  if (process.env.NODE_ENV === 'development') {
    if (sessionStorage.getItem('offline') != null) {
      offline = evil(sessionStorage.getItem('offline'))
    }
  }
  return offline
}

// 从服务器获取上下文，刷新浏览器上下文缓存 返回值 1 已同步 2 同步失败 3 未认证
Vue.prototype.g_fetchCtx = function(callback) {
  // 联网状态 从服务器获取上下文
  this.getAxios('api/Temperature', { SN: this.$startup.sn })
    .then(res => {
      if (res.tenantId > 0) {
        this.$store.dispatch('app/setCommonData', res)
        // 缓存session以便调试获取
        sessionStorage.setItem('commonData', JSON.stringify(res))
        callback(1)
      } else {
        callback(3)
      }
    })
    .catch(res => {
      callback(2)
    })
}

// 缓存 刷新上下文
Vue.prototype.g_cacheCtx = function(ctx) {
  ctx._id = 'ctx'
  idataDb
    .get('ctx')
    .then(res => {
      ctx._rev = res._rev
      putCTX(ctx)
    })
    .catch(() => {
      putCTX(ctx)
    })

  // 缓存上下文
  function putCTX(ctx) {
    idataDb
      .put(ctx)
      .then(() => {
        startup.toast('已同步数据')
      })
      .catch(err => {
        console.log('缓存最新上下文失败，{0}'.format(err))
      })
  }
}
