<!-- 个人档案首页 -->
<template>
  <div class="edit-page">
    <van-nav-bar title="编辑-家庭信息" l left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        label="姓名"
        placeholder="请填写姓名"
        :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <van-field
        v-model="username"
        label="部门"
        placeholder="请选择部门（需包装组件）"
        :rules="[{ required: true, message: '请选择部门' }]"
      />
      <van-field
        v-model="username"
        label="职务"
        placeholder="请填写职务"
        :rules="[{ required: true, message: '请填写职务' }]"
      />
      <van-field
        v-model="username"
        type="tel"
        label="手机号"
        placeholder="请填写手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field v-model="username" type="number" label="工号" placeholder="请填写工号" />

      <van-field name="radio" label="性别">
        <template #input>
          <van-radio-group v-model="username" direction="horizontal">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-cell>
        <template #title>
          <van-row type="flex" justify="center">
            <van-col span="7" style="text-align:center;"> <van-button type="info">提交</van-button></van-col>
            <van-col span="7" style="text-align:center;"> <van-button type="danger">删除</van-button></van-col>
          </van-row>
        </template>
      </van-cell>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'FamilyEditPage',
  data() {
    return {
      item: {},
      username: '',
      password: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    // 提交
    onSubmit(values) {
      console.log('submit', values)
    },
    // 获取数据
    getData(id) {
      this.getAxios('/Maintenance/{0}/GetFamilyDataById'.format(this.$tenantId), { id: id }).then(res => {
        this.item = res
      })
    }
  },
  // 进入页面触发初始化事件
  mounted() {
    // 如果id>0？ 老数据维护 ： 新建数据
    if (this.$route.params.id > 0) {
      this.getData()
    }
  }
}
</script>
<style scoped></style>
