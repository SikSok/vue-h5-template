import Vue from 'vue'

/* eslint-disable */
import startup from 'startup'
import developmentStartup from 'developmentStartup'

if (process.env.NODE_ENV === 'development') {
  Vue.prototype.$startup = developmentStartup
} else {
  Vue.prototype.$startup = startup
}

import Bus from '@/utils/bus.js'
Vue.prototype.g_bus = Bus

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

/* 初始化学生字典 */
var userDic = null
/* 构建字典 */
// TODO待完善
Vue.prototype.g_creatUserDic = function() {
  this.g_idataDb.get('ctx').then(res => {
    userDic = res.users
    if (res.users.length < 1) {
      this.$startup.toast('上下文无用户数据')
    }
  })
}

// 根据卡号获取学生信息
Vue.prototype.$getUser = function(cardNo) {
  // 逆序16进制转10进制
  cardNo = this.g_binaryConversion(cardNo)
  var result = userDic.find(x => x.cardNo === '{0}'.format(cardNo))
  /* 提示 */
  if (!result) {
    this.$startup.toast('卡号【{0}】无匹配用户'.format(cardNo))
  }
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
/* 设置运行状态 脱机、非脱机 */
Vue.prototype.g_setOffline = function(status) {
  this.$store.dispatch('app/setOffline', status)
  if (process.env.NODE_ENV === 'development') {
    sessionStorage.setItem('offline', status)
  }
}

// 从服务器获取上下文，刷新浏览器上下文缓存 返回值 1 已同步 2 同步失败 3 未认证
Vue.prototype.g_fetchCtx = function(callback) {
  // 联网状态 从服务器获取上下文
  this.getAxios('api/Temperature', { SN: this.$startup.sn })
    .then(res => {
      if (res.tenantId > 0) {
        res.updateTime = new Date()
        g_cacheCtx(res)
        callback(1)
      } else {
        callback(3)
      }
    })
    .catch(res => {
      callback(2)
    })

  /* 缓存前判断db是否已有数据 有则刷新版本号后保存 没有就新增保存 */
  function g_cacheCtx(ctx) {
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
  }
  /* 保存上下文到db */
  function putCTX(ctx) {
    idataDb
      .put(ctx)
      .then(() => {
        startup.toast('已获取最新学生信息')
      })
      .catch(err => {
        console.log(`缓存最新上下文失败:${err}`)
      })
  }
}

/* 定时上传任务开启 */
Vue.prototype.g_uploadCacheData = function() {
  var offline = this.g_getoffline()
  var errCount = 0
  var _this = this
  upload()
  function upload() {
    idataDb
      .find({
        selector: { type: 'cache' },
        limit: 1
      })
      .then(res => {
        offline = _this.g_getoffline()
        if (res.docs.length > 0 && !offline) {
          var model = res.docs[0]
          Vue.prototype
            .postAxios('api/Temperature?SN={0}'.format(Vue.prototype.$startup.sn), {}, model)
            .then(() => {
              errCount = 0
              console.log('测温缓存数据已上传')
              _this.$startup.toast(`${model.CardNo}号数据已上传`)
              idataDb
                .remove(model)
                .then(() => {
                  setTimeout(upload, 100)
                })
                .catch(res => {
                  console.log(`删除db数据失败：${res}`)
                })
            })
            .catch(err => {
              errCount++
              console.log(`测温缓存数据上传失败第${errCount}次  : ${err}`)
              setTimeout(upload, 6000)

              // 上传3次以上失败时未脱机提示脱机 然后上传失败次数清零
              if (errCount > 3) {
                errCount = 0
                if (!offline) {
                  _this.$startup.toast('上传数据失败，转离线模式')
                  _this.$store.dispatch('app/setOffline', true)
                  if (process.env.NODE_ENV === 'development') {
                    sessionStorage.setItem('offline', true)
                  }
                }
              }
            })
        } else {
          setTimeout(upload, 6000)
        }
      })
  }
}
