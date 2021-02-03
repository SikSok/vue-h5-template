<!-- 每台机子只用1次的注册页 -->
<template>
  <div class="loginPage">
    <div class="img-div">
      <img src="../assets/logo.png" alt="" />
    </div>
    <van-form @submit="onSubmit" class="form">
      <van-field v-model="registModel.TenantCode" label="账号" placeholder="账号" :rules="rules.TenantCode" />
      <van-field v-model="registModel.Password" label="密码" placeholder="密码" :rules="rules.Password"> </van-field>
      <div class="login-in-row">
        <van-icon name="passed" class="login-in" @click="onSubmit" />
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
      this.postAxios('api/Temperature/regist?SN={0}'.format(this.$startup.sn), {}, this.registModel)
        .then(res => {
          if (res.tenantId > 0) {
            this.$router.push({ path: '/' })
          } else {
            this.$startup.toast('无效账户')
          }
        })
        .catch(() => {
          this.$startup.toast('请确认网络是否已连接')
        })
    }
  }
}
</script>
<style lang="less" scoped>
/*@import url(); 引入公共css类*/
.loginPage {
  .form {
    width: 80vw;
    margin-left: 10vw;
    border-radius: 10px;
  }
  .img-div {
    text-align: center;
    padding: 40px 1vw 10vh;
  }
  .login-in-row {
    margin-top: 30px;
    text-align: center;
  }
  .login-in {
    font-size: 40px;
    background-color: white;
    border-radius: 50%;
    border: none;
    padding: 15px;
    color: yellowgreen;
  }
}
</style>
