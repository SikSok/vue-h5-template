<!-- 个人档案首页 -->
<template>
  <div>
    <van-nav-bar title="个人档案" left-arrow @click-left="onClickLeft" />
    <div class="headerBox">
      <img class="headerPic" src="@/assets/headPic.png" />
      <div class="head-content">
        <h3>黄新德</h3>
        <p><span>研发部-研发1组</span><br /><span>在北京长青云信息技术有限公司工作了768天</span></p>
      </div>
    </div>
    <van-cell-group title="人事档案">
      <van-cell title="基本信息" is-link icon="user-o" to="basicInformation" />
      <van-cell title="家庭情况" is-link icon="wap-home-o" to="basicInformation" />
      <van-cell title="教育背景" is-link icon="orders-o" to="basicInformation" />
      <van-cell title="工作经历" is-link icon="orders-o" to="basicInformation" value="未填写" />
      <van-cell title="资质认证" is-link icon="orders-o" to="basicInformation" value="未填写" />
      <van-cell title="奖惩历史" is-link icon="orders-o" to="basicInformation" value="未填写" />
      <van-cell title="附件" is-link icon="description" to="basicInformation" />
    </van-cell-group>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'Home',
  data() {
    return {}
  },
  methods: {
    onClickLeft() {
      Toast('返回')
    }
  }
}
</script>
<style scoped>
.headerBox {
  display: flex;
  padding: 0 16px;
  background: #ffffff;
  margin-top: 1px;
}
.headerPic {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  margin: 16px 16px 0px 0px;
}
.head-content {
  padding-top: 6px;
}
</style>
