<!-- 个人档案首页 -->
<template>
  <div>
    <van-nav-bar title="个人档案" left-arrow @click-left="onClickLeft" />
    <div class="headerBox">
      <img class="headerPic" src="@/assets/headPic.png" />
      <div class="head-content">
        <h3>{{ staffInfo.Name }}</h3>
        <p>
          <span>{{ staffInfo.JobTitle }}</span
          ><br /><span>已在本校任职了{{ staffInfo.JoinDays }}天</span>
        </p>
      </div>
    </div>
    <van-cell-group title="人事档案">
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item title="基本信息" name="1" icon="user-o">
          <basic-info :formData="basicInfo" />
        </van-collapse-item>
        <van-collapse-item title="家庭情况" :value="staffInfo.HasFamilyInfo | ifHasValue" name="2" icon="wap-home-o">
          <family-info :familyData="familyData" />
        </van-collapse-item>
      </van-collapse>

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
import basicInfo from './detail/basicInfo'
import familyInfo from './detail/familyInfo'
export default {
  name: 'Home',
  components: { basicInfo, familyInfo },
  data() {
    return {
      staffId: 1,
      tenantId: 4,
      staffInfo: {},
      activeName: '0',
      basicInfo: {}, // 基础信息
      familyData: [{ id: 0 }, { id: 1 }] // 家庭信息
    }
  },
  mounted() {
    this.activeName = this.$store.state.app.activeName
    this.init()
  },
  methods: {
    // 返回事件
    onClickLeft() {
      this.$router.go(-1)
      Toast('返回')
    },
    // 初始化，查询员工人事档案信息
    init() {
      this.getAxios('/Information/{0}'.format(this.tenantId), { staffId: this.staffId }).then(res => {
        this.staffInfo = res
      })
    },
    // 获取某项基础信息
    getInfo(infoType, receiveItem) {
      this.getAxios('/Maintenance/{0}/{1}'.format(this.tenantId, infoType), { staffId: this.staffId }).then(res => {
        this[receiveItem] = res
      })
    }
  },
  watch: {
    // 监控点击详情项 获取最新数据
    activeName(val) {
      if (val > 0) {
        this.$store.dispatch('app/setActiveName', val)
      }
      switch (val) {
        case '1':
          this.getInfo('GetBasicInfo', 'basicInfo')
          break
        case '2':
          this.getInfo('GetBasicInfo', 'basicInfo')
          break
      }
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
