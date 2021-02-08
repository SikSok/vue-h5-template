<!-- 个人档案首页 -->
<template>
  <div class="temperature-page">
    <van-icon name="replay" class="svg-left" @click="refreach()" />
    <svg-icon icon-class="setting" @click.native="turnTo('setting')" class="svg-right" />
    <p v-show="offline" class="offlineStr">离线模式</p>
    <div class="content">
      <img
        class="bac-img"
        :src="currentUser.avatarUrl === undefined ? require('@/assets/default_man.png') : currentUser.avatarUrl"
      />
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
      temperture: 0
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
  .big-img {
    background-repeat: no-repeat;
    background-size: auto;
    height: 100%;
  }
  .content {
    overflow: hidden;
    margin: 30px auto;
    border: 7px solid white;
    border-radius: 50%;
    width: 230px;
    height: 230px;
    text-align: center;
    z-index: 1000px;
    position: relative;
    .bac-img {
      width: 100%;
    }
    .relation-label {
      background-color: rgba(2, 132, 192, 0.5);
      font-size: 20px;
      color: white;
      text-align: center;
      height: 50px;
      line-height: 50px;
      width: 100%;
      position: absolute;
      bottom: 0px;
      span {
        opacity: 1;
      }
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
