<!-- 工作经历详情块 -->
<template>
  <div>
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
          <span>工作经历 {{ index + 1 }}</span>
          <span style="float:right;" @click="SaveItem(item)"><van-icon name="edit" size="18"/></span>
        </template>
      </van-cell>
      <van-cell title="公司名称" :value="item.Empolyer | complete" />
      <van-cell title="担任职位" :value="item.Title | complete" />
      <van-cell title="入职日期" :value="item.StartDate | csdate | complete" />
      <van-cell title="离职日期" :value="item.EndDate | csdate | complete" />
      <van-cell title="职位描述" :value="item.Description | complete" />
    </div>
    <van-cell class="edit-cell" @click="SaveItem()">
      <template #title>
        <span class="custom-title"><van-icon name="plus" size="15" />&nbsp;&nbsp;新增</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'FamilyInfo',
  props: {
    workExperienceData: { default: null }
  },
  data() {
    return {
      items: [],
      showNoneWarning: false
    }
  },
  watch: {
    workExperienceData: {
      handler(val) {
        this.items = val
        if (this.items.length < 1) {
          this.showNoneWarning = true
        }
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
      this.$router.push({ name: 'workExperienceEditPage', params: { id: itemId, title: title } })
    }
  }
}
</script>
<style scoped>
/*@import url(); 引入公共css类*/
</style>
