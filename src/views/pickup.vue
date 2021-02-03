<!-- 个人档案首页 -->
<template>
  <div class="temperature-page">
    <svg-icon icon-class="message" class="svg-left" />
    <van-button @click="testTemperature" style="float:left">测温</van-button>
    <svg-icon icon-class="setting" @click.native="turnTo('setting')" class="svg-right" />
    <div class="content">
      <img
        class="bac-img"
        :src="currentUser.avatarUrl === '' ? require('@/assets/default_man.png') : currentUser.avatarUrl"
      />
    </div>
    <div class="info-box">
      <van-row v-if="currentUser != null">
        <van-col span="8">
          <img
            class="headerPic"
            :src="currentUser.avatarUrl === '' ? require('@/assets/default_man.png') : currentUser.avatarUrl"
          />
        </van-col>
        <van-col span="16">
          <div class="p-name">{{ currentUser.name }}{{ currentUser.title | classNameStr }}</div>
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
      currentUser: {
        avatarUrl: ''
      },
      temperture: 0
    }
  },
  methods: {
    // 模拟测温
    testTemperature() {
      this.temperatureCallBack('36.5')
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
      if (!offline) {
        this.g_idataDb
          .find({
            selector: { type: 'cache' },
            limit: 2
          })
          .then(res => {
            for (var i = 0; i < res.docs.length; i++) {
              var model = res.docs[i]
              this.postAxios('api/Temperature?SN={0}'.format(this.$startup.sn), {}, model)
                .then(res => {
                  console.log('测温缓存数据已上传')
                })
                .catch(() => {
                  console.log('测温缓存数据上传失败')
                })
              this.g_idataDb.remove(model)
              if (res.docs.length > 0) {
                setTimeout(this.uploadCacheData(), 20000)
              } else {
                setTimeout(this.uploadCacheData(), 600000)
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    // 上传刷卡数据
    uploadData() {
      var offline = this.g_getoffline()
      // 离线缓存本地 否则直接上传
      if (offline) {
        this.model.type = 'cache'
        this.g_idataDb
          .post(this.model)
          .then(response => {
            console.log('刷卡离线缓存成功:{0}'.format(response))
          })
          .catch(err => {
            console.log('离线缓存刷新数据失败:{0}'.format(err))
          })
      } else {
        this.postAxios('api/Temperature?SN={0}'.format(this.$startup.sn), {}, this.model)
          .then(res => {
            this.$startup.toast('{0}测温数据已上传'.format(this.currentUser.name))
          })
          .catch(err => {
            console.log('访问服务器接口失败，原因:{0}'.format(err))
            this.$refs.offline_dialog.show = true
          })
      }
      this.temperture = 0
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
        this.model = this.g_creatModel(this.currentUser, this.temperture)
        this.uploadData()
      }
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
    height: 90px;
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
      line-height: 40px;
      margin-bottom: -15px;
    }
    .p-no {
      font-size: 16px;
      line-height: 30px;
    }
  }
}
</style>
