<!-- 家庭情况详情块 -->
<template>
  <div>
    <!-- 空数据提示 -->
    <van-cell class="data-none-cell" v-if="items.length < 1">
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
          <span>家庭成员 {{ index + 1 }}</span>
          <span style="float:right;" @click="SaveItem(item)"><van-icon name="edit" size="18"/></span>
        </template>
      </van-cell>
      <van-cell title="关系" :value="'父亲'" size="large" />
      <van-cell title="姓名" :value="'那把'" />
      <van-cell title="联系电话" :value="12232221232" />
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
    familyData: { default: null }
  },
  data() {
    return {
      items: []
    }
  },
  watch: {
    familyData: {
      handler(val) {
        this.items = val
      },
      immediate: true
    }
  },
  methods: {
    /* eslint-disable */
    // 跳转至维护界面 功能：新增/更新
    SaveItem(item) {
      var itemId = 0
      if (item !== undefined) {
        itemId = item.Id
      }
      this.$router.push({ name: 'familyEditPage', params: { id: itemId } })
    }
  }
}
</script>
<style scoped>
/*@import url(); 引入公共css类*/
</style>
