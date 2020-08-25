<!-- 个人档案首页 -->
<template>
  <div>
    <van-nav-bar title="个人档案" left-arrow @click-left="onClickLeft" />
    <div class="headerBox">
      <img class="headerPic" src="@/assets/headPic.png" />
      <div class="head-content">
        <h3>{{ staffInfo.Name }}<set-test @initPage="UseTestSettinh" /></h3>
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
        <van-collapse-item title="教育背景" :value="staffInfo.HasEducationInfo | ifHasValue" name="3" icon="orders-o">
          <education-info :educationData="educationData" />
        </van-collapse-item>
        <van-collapse-item
          title="工作经历"
          :value="staffInfo.HasWorkExperienceInfo | ifHasValue"
          name="4"
          icon="orders-o"
        >
          <work-history :workExperienceData="workHistoryData" />
        </van-collapse-item>
        <van-collapse-item title="资质认证" :value="staffInfo.HasQualicationInfo | ifHasValue" name="5" icon="orders-o">
          <qualification :qualificationData="qualificationData" />
        </van-collapse-item>
        <van-collapse-item title="奖惩历史" :value="staffInfo.HasRewardInfo | ifHasValue" name="6" icon="orders-o">
        </van-collapse-item>
        <van-collapse-item title="附件" :value="staffInfo.HasFileInfo | ifHasValue" name="7" icon="orders-o">
        </van-collapse-item>
      </van-collapse>
    </van-cell-group>
  </div>
</template>

<script>
import setTest from '@/components/setTestData'
import { Toast } from 'vant'
import basicInfo from './detail/basicInfo'
import familyInfo from './detail/familyInfo'
import educationInfo from './detail/educationInfo'
import workHistory from './detail/workExperience'
import qualification from './detail/qualification'
export default {
  name: 'Home',
  components: { basicInfo, familyInfo, setTest, educationInfo, workHistory, qualification },
  data() {
    return {
      staffId: 0,
      tenantId: 0,
      staffInfo: {},
      activeName: '0',
      basicInfo: {}, // 基础信息
      familyData: [], // 家庭信息
      educationData: [], // 教育背景
      workHistoryData: [], // 工作经历
      qualificationData: [] // 资质认证信息
    }
  },
  // 初始化
  mounted() {
    this.activeName = this.$store.state.app.activeName
    // this.init()
    this.UseTestSettinh()
  },
  methods: {
    // 使用测试配置数据
    UseTestSettinh() {
      this.tenantId = this.$store.state.app.tenantId
      this.staffId = this.$store.state.app.staffId
      this.init()
    },
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
          this.getInfo('GetFamilyInfo', 'familyData')
          break
        case '3':
          this.getInfo('GetEducationInfo', 'educationData')
          break
        case '4':
          this.getInfo('GetWorkingHistoryInfo', 'workHistoryData')
          break
        case '5':
          this.getInfo('GetQualificationInfo', 'qualificationData')
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
