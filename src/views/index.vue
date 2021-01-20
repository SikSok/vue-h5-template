<!-- 个人档案首页 -->
<template>
  <div class="body">
    <div class="header">
      <van-row gutter="20">
        <van-col span="10">
          <img class="img" src="@/assets/headPic.png" alt="" />
        </van-col>
        <van-col span="12">
          <p class="p-Name">赵宇阳</p>
          <p class="p-Label">可爱二班</p>
          <p class="p-Label">体温：16.7℃</p>
        </van-col>
      </van-row>
    </div>
    <div class="hr"></div>
    <div class="list">
      <van-cell v-for="item in items" :key="item.Id" is-link>
        <template #title>
          <span class="custom-title">{{ item.Name }} （{{ item.temperture }}） {{ item.date | cstime }}</span>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      items: [
        { Name: '赵宇阳', Id: 1, temperture: 26.8, date: new Date() },
        { Name: '黄小米', Id: 2, temperture: 25.8, date: new Date() },
        { Name: '徐凤年', Id: 3, temperture: 26.2, date: new Date() },
        { Name: '陈平安', Id: 4, temperture: 24.8, date: new Date() },
        { Name: '徐晓', Id: 5, temperture: 26.8, date: new Date() },
        { Name: '羌矢', Id: 6, temperture: 25.8, date: new Date() }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.body {
  background: rgba(255, 255, 255, 0.904);
  height: 100vh;
  width: 100vw;
}
.header {
  padding: 15px;
  .img {
    width: 100%;
    border-radius: 10px;
  }
  .p-Name {
    font-size: 16px;
  }
  .p-Label {
    font-size: 14px;
  }
}
.hr {
  width: 100vw;
  height: 10px;
  background-color: rgba(0, 0, 0, 0.055);
}
</style>
