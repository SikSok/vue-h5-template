<!-- 每台机子只用1次的注册页 -->
<template>
  <div class="loginPage">
    <div class="img-div">
      <img src="../assets/logo.png" alt="" />
    </div>
    <van-form @submit="onSubmit">
      <van-field v-model="registModel.TenantCode" label="账号" placeholder="账号" :rules="rules.TenantCode" />
      <van-field v-model="registModel.Password" label="密码" placeholder="密码" :rules="rules.Password"> </van-field>
      <div style="margin:16px;">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// eslint-disable-next-line
import { Toast } from 'vant'
export default {
  data() {
    return {
      registModel: {
        TenantCode: 'cloudschools',
        Password: '123456'
      }, // 注册所需信息
      registResult: {}, // 注册设备后返回的信息
      rules: {
        TenantCode: [
          {
            required: true,
            message: '账号不能为空'
          }
        ],
        Password: [
          {
            required: true,
            message: '密码不能为空'
          }
        ]
      },
      isSendCode: false
    }
  },
  methods: {
    // 注册
    onSubmit(values) {
      this.postAxios('api/Temperature/regist?SN={0}'.format(this.$cordova.sn), {}, this.registModel).then(res => {
        if (res.tenantId > 0) {
          this.$router.push({ path: '/' })
        } else {
          Toast('无效账户')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
/*@import url(); 引入公共css类*/
.loginPage {
  background: white;
  .img-div {
    text-align: center;
    padding: 20vh 1vw 10vh;
  }
}
</style>
