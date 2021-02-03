<!-- 离线弹窗组件 -->
<template>
  <van-dialog
    v-model="show"
    title="提示"
    show-cancel-button
    show-confirm-button
    cancelButtonText="重试"
    confirmButtonText="确认"
    @confirm="confirm"
    @cancel="cancel"
  >
    <p style="text-align:center">数据传输失败，是否离线运行？</p>
  </van-dialog>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      show: false
    }
  },
  methods: {
    // 转离线状态
    confirm() {
      this.$store.dispatch('app/setOffline', true)
      if (process.env.NODE_ENV === 'development') {
        sessionStorage.setItem('offline', true)
      }
      this.$emit('init')
      this.show = false
    },
    // 重新尝试
    cancel() {
      this.$emit('init')
      this.show = false
    }
  }
}
</script>
<style scoped>
/*@import url(); 引入公共css类*/
</style>
