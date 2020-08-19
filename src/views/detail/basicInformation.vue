<!-- 个人档案首页 -->
<template>
  <div>
    <van-nav-bar title="基本信息" l left-arrow @click-left="onClickLeft" />
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
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onSubmit(values) {
      console.log('submit', values)
    }
  }
}
</script>
<style scoped></style>
