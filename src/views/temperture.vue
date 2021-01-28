<!-- 个人档案首页 -->
<template>
  <div class="temperature-page">
    <svg-icon icon-class="message" class="svg-left" />
    <van-button @click="testTemperature" style="float:left">测温</van-button>
    <van-button @click="testNFC" style="float:left">读卡</van-button>
    <svg-icon icon-class="setting" @click.native="turnTo('setting')" class="svg-right" />
    <div class="content">
      <label :class="status == 1 ? 'status-label normal' : 'status-label abnormal'">
        {{ status == 1 ? '正常' : '异常' }}
      </label>
      <br />
      <b class="temperture">{{ temperture }}</b>
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
      currentUser: {},
      temperture: 36.7,
      status: 1 // 1 正常 2 异常
    }
  },
  methods: {
    // 模拟测温
    testTemperature() {
      this.temperatureCallBack('36.7')
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
    // nfc监听函数的回调函数
    nfcCallBack(res) {
      if (res === undefined) {
        return false
      }
      // 逆序16进制转10进制
      res = this.g_binaryConversion(res)
      // 根据卡号获取学生信息
      this.currentUser = this.$getUser(res)
      // 上传检查
      if (!this.currentUser) {
        this.$startup.toast('卡号【{0}】无匹配用户'.format(res))
        return false
      } else if (this.temperture <= 0) {
        this.$startup.toast('请测温')
      } else {
        // 上传数据
        this.g_postModel(this.currentUser, this.temperture)
      }
    },
    // 测温监听函数回调
    temperatureCallBack(res) {
      if (res === undefined) {
        return false
      }
      this.temperture = res
      this.$startup.toast('测温语音播报： {0}度'.format(this.temperture))
    },
    // 页面跳转
    turnTo(page) {
      this.$router.push({ path: page })
    }
  },
  mounted() {
    this.init()
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
  }
  .svg-right {
    font-size: 30px;
    float: right;
    margin-right: 15px;
  }
  .content {
    margin: 30px 33px;
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
    height: 110px;
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
