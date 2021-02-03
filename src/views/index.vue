<!-- 场景选择页 -->
<template>
  <div class="content">
    <div class="logo">
      <img src="@/assets/logo.png" alt="" />
    </div>
    <div class="appName">
      常青云幼儿晨检/接送应用
    </div>
    <van-row v-show="!initStatus">
      <p class="label-getdata">获取数据中...</p>
    </van-row>
    <div class="label" v-show="initStatus">
      请选择使用场景：
    </div>
    <van-row v-show="initStatus">
      <van-col span="10" offset="2" @click="turnTo('temperture')">
        <svg-icon icon-class="check" class="svg-icon" />
        <br />
        <span class="label2">晨检/测温</span>
      </van-col>
      <van-col span="10" @click="turnTo('pickup')">
        <svg-icon icon-class="relation" class="svg-icon" />
        <br />
        <span class="label2">家长接送</span>
      </van-col>
    </van-row>
    <offline-dialog ref="offline_dialog" @init="init" />
  </div>
</template>

<script>
import OfflineDialog from './components/offlineDialog.vue'
export default {
  name: '',
  components: { OfflineDialog },
  data() {
    return {
      initStatus: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      // 使用插件获取机器sn号
      this.$startup.initialize()
      // 如果没有上下文就从服务器或浏览器数据库获取获取
      if (this.$store.getters.commonData === null) {
        this.getCommonData()
      } else {
        this.initStatus = true
      }
    },
    // 获取上下文
    getCommonData() {
      var offline = this.g_getoffline()
      if (offline) {
        // 离线状态 从浏览器数据库获取
        this.g_idataDb
          .get('ctx')
          .then(res => {
            this.$store.dispatch('app/setCommonData', res)
            // 缓存session以便调试获取
            sessionStorage.setItem('commonData', JSON.stringify(res))
            this.initStatus = true
          })
          .catch(() => {
            this.$startup.toast('获取上下文失败，请联网后初始化')
            this.$router.push({ path: '/signIn' })
            this.$store.dispatch('app/setOffline', false)
          })
      } else {
        // 联网状态 从服务器获取上下文
        this.g_fetchCtx(res => {
          switch (res) {
            case 1: // 成功
              this.initStatus = true
              // 上下文缓存至浏览器数据库
              this.g_cacheCtx(this.$store.getters.commonData)
              break
            case 2: // 失败
              this.$refs.offline_dialog.show = true
              break
            case 3: // 未认证
              this.$router.push({ path: '/signIn' })
              break
          }
        })
      }
    },
    // 缓存上下文前检查 已有更新，没有则创建
    saveCTX(ctx) {
      ctx._id = 'ctx'
      this.g_idataDb
        .get('ctx')
        .then(res => {
          ctx._rev = res._rev
          this.putCTX(ctx)
        })
        .catch(() => {
          this.putCTX(ctx)
        })
    },
    // 缓存上下文
    putCTX(ctx) {
      this.g_idataDb
        .put(ctx)
        .then(response => {
          console.log('缓存最新上下文成功')
        })
        .catch(err => {
          console.log('缓存最新上下文失败，{0}'.format(err))
        })
    },
    // 页面跳转
    turnTo(page) {
      this.$router.push({ path: page })
    }
  }
}
</script>
<style lang="less" scoped>
/*@import url(); 引入公共css类*/
.content {
  text-align: center;
  letter-spacing: 2px;
}
.logo {
  margin-top: 20px;
  width: 150px;
  margin-left: 70px;
  img {
    width: 100%;
    height: 100%;
  }
}
.appName {
  font-size: 18px;
  color: white;
  white-space: nowrap;
  line-height: 50px;
}
.label {
  font-size: 16px;
  color: white;
  line-height: 40px;
  margin: 40px 0px 15px;
}
.svg-icon {
  font-size: 40px;
  border: 3px solid white;
  border-radius: 50%;
  padding: 15px;
}
.label2 {
  color: white;
  font-size: 14px;
  line-height: 30px;
}
.label-getdata {
  line-height: 100px;
  color: white;
  font-size: 25px;
  margin-top: 50px;
}
</style>
