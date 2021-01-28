<!-- 个人档案首页 -->
<template>
  <div class="temperature-page">
    <svg-icon icon-class="message" class="svg-left" />
    <svg-icon icon-class="setting" @click.native="turnTo('setting')" class="svg-right" />
    <div class="content">
      <div class="relation-label">
        <span>妈妈</span>
      </div>
    </div>
    <div class="info-box">
      <van-row v-if="currentUser != null">
        <van-col span="8">
          <img class="headerPic" :src="currentUser.avatarUrl" />
        </van-col>
        <van-col span="16">
          <div class="p-name">{{ currentUser.name }}</div>
          <div class="p-no">{{ currentUser.cardNo | cardNoStr }}</div>
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
      currentUser: { imageUrl: '@/assets/preview.jpg', relation: '妈妈' },
      cordovaobj: {}
    }
  },
  methods: {
    init() {
      // this.$startup.initialize()
      this.cordovaobj = this.$startup
    },
    turnTo(page) {
      this.$router.push({ path: page })
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
  }
  .svg-right {
    font-size: 30px;
    float: right;
    margin-right: 15px;
  }
  .big-img {
    background-repeat: no-repeat;
    background-size: auto;
    height: 100%;
  }
  .content {
    overflow: hidden;
    margin: 30px 33px;
    border: 7px solid white;
    border-radius: 50%;
    width: 230px;
    height: 230px;
    text-align: center;
    z-index: 1000px;
    background-image: url('../assets/preview.jpg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: auto 100%;
    position: relative;
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
    height: 90px;
    position: absolute;
    bottom: 0px;
    width: 100%;
    z-index: 1000;
    background-color: white;
    padding: 15px 15px 15px 25px;
    box-sizing: border-box;
    .headerPic {
      border-radius: 100%;
      width: 70px;
    }
    .p-name {
      font-size: 17px;
      text-align: center;
      line-height: 40px;
      margin-bottom: -15px;
    }
    .p-no {
      font-size: 16px;
      text-align: center;
      line-height: 30px;
    }
  }
}
</style>
