<!-- 设置页 -->
<template>
  <div class="">
    <van-nav-bar title="设置" left-arrow>
      <template #left>
        <div style="padding-right:30px" @click="onClickLeft">
          <van-icon name="arrow-left" size="18" />
        </div>
      </template>
    </van-nav-bar>
    <van-cell title="离线" size="large">
      <template #default>
        <van-switch size="20px" v-model="offline" />
      </template>
    </van-cell>
    <van-cell title="切换使用场景" size="large" is-link @click="turnTo('/')" />
    <van-cell title="缓存数据" size="large">
      <template #default>
        {{ updateTime | cstime }}
      </template>
    </van-cell>
    <van-cell title="版本号" value="最新" size="large" label="V 1.0.0" />
    <van-cell size="large" @click="turnTo('signIn')">
      <template #title>
        <div class="center">
          <span class="custom-title">注销</span>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      offline: false,
      updateTime: null
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    turnTo(page) {
      this.$router.push({ path: page })
    },
    init() {
      this.offline = this.g_getoffline()
      this.updateTime = this.$store.getters.commonData.updateTime
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    offline(val) {
      if (val) {
        // 转离线状态
        this.$store.dispatch('app/setOffline', val)
        if (process.env.NODE_ENV === 'development') {
          sessionStorage.setItem('offline', val)
        }
      } else {
        // 转联网状态前先尝试同步上下文
        this.g_fetchCtx(res => {
          switch (res) {
            case 1: // 成功
              this.$store.dispatch('app/setOffline', val)
              // 上下文缓存至浏览器数据库
              this.g_cacheCtx(this.$store.getters.commonData)

              if (process.env.NODE_ENV === 'development') {
                sessionStorage.setItem('offline', val)
              }
              break
            case 2: // 失败
              this.$startup.toast('同步失败，无法转联网状态')
              break
          }
        })
      }
    }
  }
}
</script>
<style scoped>
/*@import url(); 引入公共css类*/
.center {
  text-align: center;
}
.custom-title {
  color: red;
}
</style>
