<!-- 个人档案首页 -->
<template>
  <div class="body" id="deviceready">
    <div class="header">
      <svg-icon icon-class="message" class="svg-left" />
      <svg-icon icon-class="setting" class="svg-right" />
      <div class="content">
        <label class="label">正常</label>
        <br />
        <label class="temperture">36.7 摄氏度</label>
      </div>
    </div>
    <div class="current-info">
      <van-row>
        <van-col span="8">
          <img class="headerPic" src="@/assets/headPic.png" />
        </van-col>
        <van-col span="16">
          <p class="p-name">池舒菡 . 国际大一班</p>
          <p class="p-no">NO . 241324212513</p>
          <p class="p-no">{{ cordovaobj }}</p>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      Users: [],
      currentUser: {},
      cordovaobj: {}
    }
  },
  methods: {
    init() {
      // this.$startup.initialize()
      this.cordovaobj = this.$startup
    }
  },
  mounted() {
    this.init()

    // 检测设备是否注册
    this.getAxios('api/Temperature', { SN: this.$startup.sn }).then(res => {
      if (res.tenantId > 0) {
        this.$store.dispatch('setCommonData', res)
        this.Users = res.users
        this.currentUser = res.users[0]
        this.init()
      } else {
        this.$router.push({ path: '/signIn' })
      }
    })
  }
}
</script>
<style lang="less" scoped>
.body {
  background-image: url('../assets/iData_app_background.jpg');
  background-repeat: no-repeat;
  background-size: 100% auto;
  height: 100vh;
  width: 100vw;
}
.header {
  height: 65vh;
  overflow: hidden;
  padding-top: 15px;
  .svg-left {
    font-size: 40px;
    float: left;
    margin-left: 15px;
  }
  .svg-right {
    font-size: 40px;
    float: right;
    margin-right: 15px;
  }
  .content {
    margin: 10vw 9vw;
    border: 10px solid white;
    border-radius: 100%;
    width: 80vw;
    height: 80vw;
    text-align: center;
    line-height: 70px;
    .label {
      font-size: 14px;
      text-align: center;
      background-color: #0cb312;
      color: white;
      padding: 10px 20px;
      border-radius: 10px;
      border: none;
    }
    .temperture {
      font-size: 40px;
      color: white;
    }
  }
}
.current-info {
  height: 35vh;
  background-color: white;
  .headerPic {
    border-radius: 100%;
    padding: 15px;
    width: 100px;
  }
  .p-name {
    font-size: 17px;
    text-align: center;
  }
  .p-no {
    font-size: 13px;
    text-align: center;
  }
}
</style>
