<!-- 输入测试基础数据 -->
<template>
  <div style="float:left">
    <span @click="show = true">T </span>
    <van-popup v-model="show" position="top" :style="{ height: '30%' }">
      <van-cell-group title="测试基础数据设置">
        <van-field v-model="tenantId" label="校园租户编号" placeholder="请输入校园租户编号" />
        <!-- <van-field v-model="userId" label="用户编号" placeholder="请输入" /> -->
        <van-field v-model="staffId" label="员工编号" placeholder="请输入" />
      </van-cell-group>
      <van-cell><van-button type="default" @click="Setting()">提交测试配置并刷新数据</van-button></van-cell>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: '',
  components: {},
  data() {
    return {
      show: false,
      tenantId: 4,
      staffId: 1
    }
  },
  methods: {
    Setting() {
      this.$store.dispatch('app/setTenantId', this.tenantId)
      this.$store.dispatch('app/setStaffId', this.staffId)
      this.show = false
      Toast('已设置')
      this.$emit('initPage')
    }
  }
}
</script>
<style scoped>
/*@import url(); 引入公共css类*/
</style>
