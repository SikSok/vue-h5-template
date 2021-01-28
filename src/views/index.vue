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
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      tenantName: '',
      imgUrl: '',
      initStatus: false
    }
  },
  methods: {
    turnTo(page) {
      this.$router.push({ path: page })
    }
  },
  mounted() {
    this.$startup.initialize()
    console.log(this.$startup)
    if (this.$store.getters.commonData === null) {
      // 检测设备是否注册
      this.getAxios('api/Temperature', { SN: this.$startup.sn }).then(res => {
        if (res.tenantId > 0) {
          this.initStatus = true
          this.$store.dispatch('app/setCommonData', res)
          this.tenantName = res.tenantName
          this.imgUrl = this.getFileUrl(res.tenantId, res.tenantImageId)
          // 缓存在session一份 调试时获取
          sessionStorage.setItem('commonData', JSON.stringify(res))
        } else {
          this.$router.push({ path: '/signIn' })
        }
      })
    } else {
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
