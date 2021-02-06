<!-- 个人档案首页 -->
<template>
  <div class="temperature-page">
    <van-icon name="replay" class="svg-left" @click="refreach()" />
    <van-button @click="testNFC" style="float:left">测温</van-button>
    <svg-icon icon-class="setting" @click.native="turnTo('setting')" class="svg-right" />
    <div class="content">
      <label :class="status == 1 ? 'status-label normal' : 'status-label abnormal'">
        {{ status == 1 ? '正常' : '异常' }}
      </label>
      <br />
      <b class="temperture">{{ temperture | temperatureStr }}</b>
    </div>
    <div class="info-box">
      <van-row>
        <van-col span="8">
          <img
            class="headerPic"
            :src="currentUser.avatarUrl === '' ? require('@/assets/default_man.png') : currentUser.avatarUrl"
          />
        </van-col>
        <van-col span="16">
          <div class="p-name">姓名：{{ currentUser.name | nameStr }}</div>
          <div class="p-name">班级：{{ currentUser.title | classNameStr }}</div>
          <div class="p-name">NO : {{ currentUser.cardNo | cardNoStr }}</div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      Users: [],
      currentUser: {
        avatarUrl: ''
      },
      temperture: 0,
      status: 1, // 1 正常 2 异常
      model: null
    }
  },
  methods: {
    // 刷新
    refreach() {
      this.g_fetchCtx(res => {
        switch (res) {
          case 1: // 成功
            // 上下文缓存至浏览器数据库
            this.g_cacheCtx(this.$store.getters.commonData)
            break
          case 2: // 失败
            this.$startup.toast('同步失败')
            break
        }
      })
    },
    // 模拟测温
    testTemperature() {
      this.temperatureCallBack('36.5')
    },
    // 模拟读卡
    testNFC() {
      this.nfcCallBack('9b1d85e9')
    },
    // 初始化
    init() {
      // 监听nfc读卡插件
      this.$startup.readingCardNo(res => this.nfcCallBack(res))
      // 测温插件监听
      this.$startup.readingTemperature(res => this.temperatureCallBack(res))
    },
    // 上传缓存刷卡数据 (定时任务)
    uploadCacheData() {
      var offline = this.g_getoffline()
      var _this = this
      if (!offline) {
        this.g_idataDb
          .find({
            selector: { type: 'cache' },
            limit: 1
          })
          .then(res => {
            for (var i = 0; i < res.docs.length; i++) {
              var model = res.docs[i]
              this.postAxios('api/Temperature?SN={0}'.format(this.$startup.sn), {}, model)
                .then(res => {
                  console.log('测温缓存数据已上传')
                  _this.g_idataDb.remove(model)
                })
                .catch(err => {
                  console.log(`测温缓存数据上传失败${err}`)
                })
            }
            if (res.docs.length > 0) {
              setTimeout(this.uploadCacheData, 1000)
            } else {
              setTimeout(this.uploadCacheData, 6000)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    // 刷卡数据缓存浏览器数据库
    cacheData() {
      this.model.type = 'cache'
      this.g_idataDb
        .post(this.model)
        .then(response => {
          console.log('刷卡离线缓存成功:{0}'.format(response))
        })
        .catch(err => {
          console.log('离线缓存刷新数据失败:{0}'.format(err))
        })
    },
    // nfc监听函数的回调函数
    nfcCallBack(res) {
      if (res === undefined) {
        return false
      }
      // 根据卡号获取学生信息
      this.currentUser = this.$getUser(res)
      // 上传检查
      if (!this.currentUser) {
        var cardNo_ten = this.g_binaryConversion(res)
        this.$startup.toast('卡号【{0}】无匹配用户'.format(cardNo_ten))
        return false
      } else if (this.model != null && this.model.CardNo === this.currentUser.cardNo) {
        this.$startup.toast('不能二次上传同一卡号数据')
      } else {
        this.$startup.read(this.currentUser.name)
        this.model = this.g_creatModel(this.currentUser, this.temperture)
        this.cacheData()
      }
    },
    // 定时清理
    clearCurrentUser() {
      setInterval(() => {
        if (this.model) {
          var nowTime = new Date()
          var second = nowTime.getSeconds() - this.model.Time.getSeconds()
          if (second >= 5) {
            this.currentUser = {
              avatarUrl: ''
            }
            this.temperture = 0
          }
        }
      }, 5000)
    },
    // 测温监听函数回调
    temperatureCallBack(res) {
      if (res === undefined) {
        return false
      }
      this.temperture = res
    },
    // 页面跳转
    turnTo(page) {
      this.$router.push({ path: page })
    }
  },
  mounted() {
    this.init()
    this.uploadCacheData()
    this.clearCurrentUser()
  },
  watch: {
    // 温度是否异常
    temperture: {
      handler(val) {
        if (val > 38) {
          this.status = 0
        } else {
          this.status = 1
        }
      },
      immediate: true
    }
  }
}
</script>
<style lang="less" scoped>
.temperature-page {
  overflow: hidden;
  padding-top: 15px;
  position: relative;
  height: 100vh;
  box-sizing: border-box;
  .svg-left {
    font-size: 30px;
    float: left;
    margin-left: 15px;
    color: white;
  }
  .svg-right {
    font-size: 30px;
    float: right;
    margin-right: 15px;
  }
  .content {
    margin: 30px auto;
    border: 7px solid white;
    border-radius: 50%;
    width: 230px;
    height: 230px;
    text-align: center;
    padding-top: 15px;
    .status-label {
      font-size: 14px;
      text-align: center;
      color: white;
      padding: 10px 20px;
      border-radius: 20px;
      white-space: nowrap;
      line-height: 60px;
    }
    .normal {
      background-color: #0cb312;
    }
    .abnormal {
      background-color: #fd956c;
    }
    .temperture {
      font-size: 50px;
      color: white;
      line-height: 85px;
    }
  }
  .info-box {
    height: 125px;
    position: absolute;
    bottom: 0px;
    width: 100%;
    z-index: 1000;
    background-color: white;
    padding: 15px 15px 15px 25px;
    box-sizing: border-box;
    text-align: left;
    .headerPic {
      border-radius: 100%;
      width: 70px;
    }
    .p-name {
      font-size: 17px;
      line-height: 35px;
      margin-bottom: -15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .p-no {
      font-size: 16px;
      line-height: 30px;
    }
  }
}
</style>
