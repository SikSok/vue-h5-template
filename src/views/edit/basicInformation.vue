<!-- 个人档案首页 -->
<template>
  <div class="edit-page">
    <van-nav-bar title="编辑" l left-arrow @click-left="onClickLeft" />
    <van-cell>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="custom-title">仅显示可编辑项</span>
      </template>
      <template #default>
        <van-switch v-model="onlyShowEditItems" size="20" />
      </template>
    </van-cell>
    <van-cell-group title="基本信息">
      <van-form @submit="onSubmit">
        <van-field v-model="item.DisplayName" label="姓名" v-if="!onlyShowEditItems" :disabled="true" />
        <van-field v-model="item.OrgNames" label="部门" v-if="!onlyShowEditItems" :disabled="true" />
        <van-field v-model="item.JobTitle" label="职位" v-if="!onlyShowEditItems" :disabled="true" />
        <van-field
          v-model="item.Mobile"
          type="tel"
          label="手机号"
          placeholder="手机号"
          :rules="[
            { required: true, message: '请填写手机号' },
            { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！' }
          ]"
        />
        <van-field v-model="item.EnterpriseEmail" type="tel" label="邮箱" placeholder="请填写邮箱" />
        <van-field v-model="item.EmployeeNo" type="number" label="工号" placeholder="请填写工号" />
        <van-field name="radio" label="性别" v-if="!onlyShowEditItems" :disabled="true">
          <template #input>
            <span style="color: #c8c9cc;" v-if="item.Gender === 0">未设置</span>
            <span style="color: #c8c9cc;" v-if="item.Gender === 1">女</span>
            <span style="color: #c8c9cc;" v-if="item.Gender === 2">男</span>
          </template>
        </van-field>
        <date-time-picker v-model="item.Birthday" title="生日" @input="change" />
        <date-time-picker v-model="item.JoinedDate" title="入职日期" @input="change" />
        <workplace-select v-model="item.WorkPlaceId" @input="change" />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      item: {},
      onlyShowEditItems: false // 仅显示可编辑项
    }
  },
  methods: {
    // 返回上一页
    onClickLeft() {
      this.$router.go(-1)
    },
    // 提交更新
    onSubmit() {
      var tenantId = this.$store.getters.ctx.TenantId
      this.putAxios('/WpTenantStaff/{0}'.format(tenantId), {}, this.item).then(res => {
        this.item = res
        this.$router.go(-1)
      })
    },
    change() {
      this.$forceUpdate()
    }
  },
  // 获取员工基本信息数据
  mounted() {
    var tenantId = this.$store.getters.ctx.TenantId
    var staffId = this.$store.getters.ctx.TenantMember.StaffId
    this.getAxios('/WpTenantStaff/{0}'.format(tenantId), { staffId: staffId }).then(res => {
      this.item = res
    })
  }
}
</script>
<style scoped></style>
