<!-- 家庭情况详情块 -->
<template>
  <div>
    <van-skeleton title :row="11" :loading="loading">
      <!-- 空数据提示 -->
      <van-cell class="data-none-cell" v-if="showNoneWarning">
        <template #title>
          <p>
            <van-icon name="question-o" size="40" /><br />
            <span class="custom-title">暂无数据</span>
          </p>
        </template>
      </van-cell>
      <!-- 数据内容 -->
      <div v-for="(item, index) in items" :key="index" class="info-item">
        <van-cell class="cellItem-title">
          <template #title>
            <span>教育背景 {{ index + 1 }}</span>
            <span style="float:right;" @click="SaveItem(item)"><van-icon name="edit" size="18"/></span>
          </template>
        </van-cell>
        <van-cell title="学校" :value="item.Institution | complete" />
        <van-cell title="专业" :value="item.Major | complete" />
        <van-cell title="入校时间" :value="item.StartDate | csdate | complete" />
        <van-cell title="结业时间" :value="item.EndDate | csdate | complete" />
        <van-cell title="学历" :value="item.Degree | translateParameter('Hr.EducationDegreeOptions') | complete" />
        <van-cell title="教育形式" :value="item.Type | translateParameter('Hr.RecruitmentType') | complete" />
        <van-cell title="学历类型" :value="item.DegreeType | translateParameter('Hr.DegreeType') | complete" />
        <van-cell title="取得学位" :value="item.IsCertNo | trueOrFalse | complete" />
        <van-cell title="最高学历" :value="item.IsDegree | trueOrFalse | complete" />
        <van-cell title="教育证书照" :value="item.FildId | complete" />
      </div>
      <van-cell class="edit-cell" @click="SaveItem()">
        <template #title>
          <span class="custom-title"><van-icon name="plus" size="15" />&nbsp;&nbsp;新增</span>
        </template>
      </van-cell>
    </van-skeleton>
  </div>
</template>

<script>
export default {
  name: 'EducationInfo',
  props: {
    educationData: { default: null }
  },
  data() {
    return {
      loading: true,
      items: [],
      showNoneWarning: false
    }
  },
  watch: {
    educationData: {
      handler(val) {
        this.items = val
        if (this.items.length < 1) {
          this.showNoneWarning = true
        }
        this.loading = false
      },
      immediate: false
    }
  },
  methods: {
    /* eslint-disable */
    // 跳转至维护界面 功能：新增/更新
    SaveItem(item) {
      var itemId = 0
      var title = '新增'
      if (item !== undefined) {
        itemId = item.Id
        title = '编辑'
      }
      this.$router.push({ name: 'educationEditPage', params: { id: itemId, title: title } })
    }
  }
}
</script>
<style scoped>
/*@import url(); 引入公共css类*/
</style>
