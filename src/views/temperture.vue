<!-- 个人档案首页 -->
<template>
  <div class="temperature-page">
    <van-icon name="replay" class="svg-left" @click="refreach()" />
    <!-- <van-button @click="testNFC">测温</van-button> -->
    <svg-icon icon-class="setting" @click.native="turnTo('setting')" class="svg-right" />
    <p v-show="offline" class="offlineStr">离线模式</p>
    <div class="content">
      <label :class="status == 1 ? 'status-label normal' : 'status-label abnormal'">
        {{ status == 1 ? '正常' : '异常' }}
      </label>
      <br />
      <b class="temperture">{{ temperture | temperatureStr }}</b>
    </div>
    <div class="info-box">
      <van-row>
        <van-col span="7">
          <img
            class="headerPic"
            :src="currentUser.avatarUrl === undefined ? require('@/assets/default_man.png') : currentUser.avatarUrl"
          />
        </van-col>
        <van-col span="17">
          <div class="p-name">姓名：{{ currentUser.name | nameStr }}</div>
          <div class="p-name">班级：{{ currentUser.title | classNameStr }}</div>
          <div class="p-name">卡号：{{ currentUser.cardNo | cardNoStr }}</div>
        </van-col>
      </van-row>
    </div>
    <offline-dialog ref="offline_dialog" />
  </div>
</template>

<script>
import OfflineDialog from './components/offlineDialog.vue'
export default {
  name: 'Home',
  components: { OfflineDialog },
  data() {
    return {
      Users: [],
      currentUser: {},
      temperture: 0,
      status: 1, // 1 正常 2 异常
      model: null
    }
  },
  computed: {
    offline: function() {
      return this.$store.getters.offline
    }
  },
  methods: {
    // 刷新
    refreach() {
      this.g_fetchCtx(res => {
        switch (res) {
          case 1: // 成功
            this.g_setOffline(false)
            this.g_uploadCacheData()
            break
          case 2: // 失败
            this.g_setOffline(true)
            this.$startup.toast('获取最新学生信息失败')
            break
          case 3: // 未认证
            this.$router.push({ path: '/signIn' })
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
      this.g_bus.$emit('nfcCallBack', '9b1d85e9')
    },
    // 初始化
    init() {
      this.g_creatUserDic()
      // nfc读卡回调
      this.g_bus.$on('nfcCallBack', res => {
        if (res === undefined) {
          return false
        }
        if (this.currentUser.cardNo !== undefined && this.currentUser.cardNo === `${this.g_binaryConversion(res)}`) {
          this.$startup.toast('不能二次上传同一卡号数据')
          return false
        }
        // 根据卡号获取学生信息
        this.currentUser = this.$getUser(res)
        // 上传检查
        if (this.currentUser) {
          this.$startup.speak(this.currentUser.nameTTS)
          this.model = this.g_creatModel(this.currentUser, this.temperture)
          this.cacheData()
        }
      })
      // 测温插件监听
      this.$startup.readingTemperature(res => this.temperatureCallBack(res))
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
    // 定时清理
    clearCurrentUser() {
      setInterval(() => {
        if (this.model) {
          var nowTime = new Date()
          var second = nowTime.getSeconds() - this.model.Time.getSeconds()
          if (second >= 5) {
            this.currentUser = {}
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
    this.g_bus.$off('nfcCallBack')
    this.$startup.readingCardNo(res => {
      this.g_bus.$emit('nfcCallBack', res)
    })
    this.init()
    this.g_uploadCacheData()
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
    position: absolute;
    left: 0px;
    font-size: 30px;
    margin-left: 15px;
    color: white;
    z-index: 1000;
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
