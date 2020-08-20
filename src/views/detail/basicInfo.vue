<!-- 基本信息详情 -->
<template>
  <div>
    <van-cell title="姓名" :value="item.DisplayName | complete" size="large" />
    <van-cell title="手机号" :value="item.Mobile | complete" />
    <van-cell title="部门" :value="item.OrgNames | complete" />
    <van-cell style="text-align:center;padding-bottom:0px;color:#969799" to="basicInformation">
      <template #title>
        <span class="custom-title">编辑&nbsp;&nbsp;<van-icon name="edit" size="15"/></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'BasicInfoDetail',
  components: {},
  props: {
    formData: { default: null }
  },
  data() {
    return {
      item: {}
    }
  },
  watch: {
    formData: {
      handler(val) {
        this.item = val
      },
      immediate: false
    }
  }
}
</script>
<style scoped></style>
