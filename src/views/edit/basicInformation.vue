<!-- 个人档案首页 -->
<template>
  <div class="edit-page">
    <van-nav-bar title="编辑" l left-arrow @click-left="onClickLeft" />
    <van-cell-group title="基本信息">
      <van-form @submit="onSubmit">
        <van-field
          v-model="item.DisplayName"
          label="姓名"
          placeholder="请填写姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
          :disabled="true"
        />
        <van-field v-model="item.OrgNames" label="部门" placeholder="请选择部门（需包装组件）" />
        <van-field v-model="item.JobTitle" label="职位" placeholder="请选择职位（需包装组件）" />
        <van-field
          v-model="item.Mobile"
          type="tel"
          label="手机号"
          placeholder="请填写手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field v-model="item.EnterpriseEmail" type="tel" label="邮箱" placeholder="请填写邮箱" />
        <van-field v-model="item.EmployeeNo" type="number" label="工号" placeholder="请填写工号" />
        <van-field name="radio" label="性别">
          <template #input>
            <van-radio-group v-model="item.Gender" direction="horizontal">
              <van-radio name="1">男</van-radio>
              <van-radio name="2">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field v-model="item.Birthday" label="生日" placeholder="请选择生日（需包装时间组件）" />
        <van-field v-model="item.JoinedDate" label="入职日期" placeholder="请选择入职日期（需包装时间组件）" />
        <van-field v-model="item.WorkPlaceId" label="工作地点" placeholder="请选择工作地点（需包装组件）" />
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
import { Toast } from 'vant'
export default {
  name: 'Home',
  data() {
    return {
      item: {},
      username: '',
      password: ''
    }
  },
  methods: {
    // 返回上一页
    onClickLeft() {
      this.$router.go(-1)
    },
    // 提交更新
    onSubmit() {
      console.log(this.item)
      Toast('提交')
      this.$router.go(-1)
    }
  },
  // 获取员工基本信息数据
  mounted() {
    var tenantId = this.$store.state.app.tenantId
    var staffId = this.$store.state.app.staffId
    this.getAxios('/WpTenantStaff/{0}'.format(tenantId), { staffId: staffId }).then(res => {
      this.item = res
    })
  }
}
</script>
<style scoped></style>
