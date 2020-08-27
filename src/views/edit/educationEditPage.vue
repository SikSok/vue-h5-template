<!-- 教育背景 维护页 -->
<template>
  <div class="edit-page">
    <van-nav-bar :title="pageTitle" l left-arrow @click-left="onClickLeft" />
    <van-cell-group title="教育背景">
      <van-form @submit="onSubmit">
        <van-field
          v-model="item.Institution"
          label="学校"
          placeholder="请填写学校名称"
          :rules="[{ required: true, message: '请填写学校名称' }]"
        />
        <van-field v-model="item.Major" label="专业" placeholder="请填写专业" />
        <date-time-picker
          v-model="item.StartDate"
          title="入校时间"
          :rules="[{ required: true, message: '请填写入校时间' }]"
          @input="change"
        />
        <date-time-picker
          v-model="item.EndDate"
          title="结业时间"
          :rules="[{ required: true, message: '请填写结业时间' }]"
          @input="change"
        />
        <parameter-select v-model="item.Degree" title="学历" :parameters="degreeOptions" />
        <parameter-select v-model="item.Type" title="教育形式" :parameters="educationTypeOptions" />
        <parameter-select v-model="item.DegreeType" title="学历类型" :parameters="degreeTypeOptions" />
        <van-field name="switch" label="取得学位">
          <template #input>
            <van-switch v-model="item.IsCertNo" size="20" />
          </template>
        </van-field>
        <van-field name="switch" label="最高学历">
          <template #input>
            <van-switch v-model="item.IsDegree" size="20" />
          </template>
        </van-field>
        <upload-image :label="教育证书照" v-model="item.FildId" :tenantId="tenantId" />
        <van-cell>
          <template #title>
            <van-row type="flex" justify="center">
              <van-col span="7" style="text-align:center;"> <van-button type="info">提交</van-button></van-col>
              <van-col span="7" style="text-align:center;"> <van-button type="danger">删除</van-button></van-col>
            </van-row>
          </template>
        </van-cell>
      </van-form>
    </van-cell-group>
  </div>
</template>

<script>
import Parameters from '@/utils/parameters'
export default {
  name: 'EducationEditPage',
  data() {
    return {
      pageTitle: '编辑',
      tenantId: 0,
      item: {},
      degreeOptions: Parameters.Hr.EducationDegreeOptions.Items,
      educationTypeOptions: Parameters.Hr.RecruitmentType.Items,
      degreeTypeOptions: Parameters.Hr.DegreeType.Items
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    // 提交
    onSubmit(values) {
      this.postAxios('/WpEducatedHistory/{0}'.format(this.tenantId), {}, this.item).then(res => {
        this.item = res
        this.$router.go(-1)
      })
    },
    // 获取数据
    getData(id) {
      this.getAxios('/WpEducatedHistory/{0}'.format(this.tenantId), { id: id }).then(res => {
        this.item = res
      })
    },
    change() {
      this.$forceUpdate()
    }
  },
  // 进入页面触发初始化事件
  mounted() {
    this.tenantId = this.$store.state.app.tenantId
    if (this.$route.params.title) {
      this.pageTitle = this.$route.params.title
    }
    // 如果id>0？ 老数据维护 ： 新建数据
    if (this.$route.params.id > 0) {
      this.getData(this.$route.params.id)
    } else {
      this.item.staffId = this.$store.state.app.staffId
    }
  }
}
</script>
<style scoped></style>
