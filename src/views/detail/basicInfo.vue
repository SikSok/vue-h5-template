<!-- 基本信息详情 -->
<template>
  <div>
    <van-cell title="姓名" :value="item.DisplayName | complete" />
    <van-cell title="部门" :value="item.OrgNames | complete" />
    <van-cell title="职位" :value="item.JobTitle | complete" />
    <van-cell title="手机号" :value="item.Mobile | complete" />
    <van-cell title="邮箱" :value="item.EnterpriseEmail | complete" />
    <van-cell title="工号" :value="item.EmployeeNo | complete" />
    <van-cell title="性别" :value="item.Gender | complete" />
    <van-cell title="生日" :value="item.Birthday | csdate | complete" />
    <van-cell title="入职日期" :value="item.JoinedDate | csdate | complete" />
    <van-cell title="工作地点" :value="item.WorkPlace | complete" />
    <van-cell class="edit-cell" to="basicInformation">
      <template #title>
        <span class="custom-title"><van-icon name="edit" size="15" />&nbsp;&nbsp;编辑</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'BasicInfoDetail',
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
