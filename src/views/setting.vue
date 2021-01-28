<!-- 设置页 -->
<template>
  <div class="">
    <van-nav-bar title="设置" left-arrow @click-left="onClickLeft" />
    <van-cell title="切换使用场景" size="large" is-link />
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
    return {}
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    turnTo(page) {
      this.$router.push({ path: page })
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
