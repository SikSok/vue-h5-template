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
    <offline-dialog ref="offline_dialog" @init="offlineWorking" />
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
    // 从服务器获取上下文
    this.g_fetchCtx(res => {
      switch (res) {
        case 1: // 成功
          this.initStatus = true
          this.g_setOffline(false)
          break
        case 2: // 失败
          if (!this.g_getoffline()) {
            this.$refs.offline_dialog.show = true
          } else {
            this.initStatus = true
          }
          break
        case 3: // 未认证
          this.$router.push({ path: '/signIn' })
          break
      }
    })
  },
  methods: {
    // 页面跳转
    turnTo(page) {
      this.$router.push({ path: page })
    },
    offlineWorking() {
      this.initStatus = true
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
  width: 100vw;
  img {
    margin: 20px auto;
    width: 150px;
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
  margin: 30px 0px 15px;
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
