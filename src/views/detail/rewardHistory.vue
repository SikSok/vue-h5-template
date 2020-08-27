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
            <span>奖惩历史 {{ index + 1 }}</span>
            <span style="float:right;" @click="SaveItem(item)"><van-icon name="edit" size="18"/></span>
          </template>
        </van-cell>
        <van-cell title="类型">
          <template #right-icon>
            <span style="color:#969799" v-if="item.Type != 0">惩罚</span>
            <span style="color:#969799" v-if="item.Type == 0">奖励</span>
          </template>
        </van-cell>
        <van-cell title="颁发机构" v-if="item.Type == 0" :value="item.Company | complete" />
        <van-cell title="处置单位" v-if="item.Type != 0" :value="item.Company | complete" />
        <van-cell title="原因" :value="item.Reason | complete" />
        <van-cell title="发生日期" :value="item.Occured | csdate | complete" />
        <van-cell title="备注说明" :value="item.Notes | complete" />
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
  name: 'RewardHistory',
  props: {
    rewardHistoryData: { default: null }
  },
  data() {
    return {
      loading: true,
      items: [],
      showNoneWarning: false
    }
  },
  watch: {
    rewardHistoryData: {
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
      this.$router.push({ name: 'rewardHistoryEditPage', query: { id: itemId, title: title } })
    }
  }
}
</script>
<style scoped>
/*@import url(); 引入公共css类*/
</style>
