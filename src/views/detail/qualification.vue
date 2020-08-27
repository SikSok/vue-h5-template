<!-- 工作经历详情块 -->
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
            <span>资质认证 {{ index + 1 }}</span>
            <span style="float:right;" @click="SaveItem(item)"><van-icon name="edit" size="18"/></span>
          </template>
        </van-cell>
        <van-cell title="证照">
          <template #right-icon>
            <span style="color:#969799" v-if="item.Type != '其他证件'">{{ item.Type | complete }}</span>
            <span style="color:#969799" v-if="item.Type == '其他证件'">{{ item.Name | complete }}</span>
          </template>
        </van-cell>
        <van-cell title="编号" :value="item.CertificateNo | complete" />
        <van-cell title="发证机构" :value="item.Authority | complete" />
        <van-cell title="备案日期" :value="item.EnterDate | csdate | complete" />
        <van-cell title="发证日期" :value="item.ReceivedDate | csdate | complete" />
        <van-cell title="到期日期" :value="item.PeriodofValidity | csdate | complete" />
        <van-cell title="提醒日期" :value="item.RemindDate | csdate | complete" />
        <van-cell title="专业" :value="item.Major | complete" />
        <van-cell title="等级" :value="item.Level | complete" />
        <van-cell title="描述" :value="item.Comments | complete" />
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
  name: 'QualificationInfo',
  props: {
    qualificationData: { default: null }
  },
  data() {
    return {
      loading: true,
      items: [],
      showNoneWarning: false
    }
  },
  watch: {
    qualificationData: {
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
      this.$router.push({ name: 'qualificationEditPage', query: { id: itemId, title: title } })
    }
  }
}
</script>
<style scoped>
/*@import url(); 引入公共css类*/
</style>
