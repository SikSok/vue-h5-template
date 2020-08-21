<!-- 个人档案首页 -->
<template>
  <div class="edit-page">
    <van-nav-bar :title="pageTitle" l left-arrow @click-left="onClickLeft" />
    <van-cell-group title="家庭成员">
      <van-form @submit="onSubmit">
        <van-field
          v-model="item.Contact"
          label="姓名"
          placeholder="请填写姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field
          v-model="item.Relationship"
          label="关系"
          placeholder="与本人关系"
          :rules="[{ required: true, message: '请选择关系' }]"
        />
        <van-field v-model="item.Company" label="工作单位" placeholder="请填写工作单位" />
        <van-field v-model="item.JobTitle" label="职位" placeholder="请填写职位" />
        <van-field
          v-model="item.ContactTel"
          type="tel"
          label="联系电话"
          placeholder="请填写联系电话"
          :rules="[{ required: true, message: '请填写联系电话' }]"
        />
        <van-field v-model="item.Postcode" type="tel" label="邮箱" placeholder="请填写邮箱" />
        <van-field v-model="item.Address" type="tel" label="地址" placeholder="请填写地址" />
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
export default {
  name: 'FamilyEditPage',
  data() {
    return {
      pageTitle: '编辑',
      tenantId: 0,
      item: {},
      username: '',
      password: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    // 提交
    onSubmit(values) {
      this.postAxios('/WpRelation/{0}'.format(this.tenantId), {}, this.item).then(res => {
        this.item = res
        this.$router.go(-1)
      })
    },
    // 获取数据
    getData(id) {
      this.getAxios('/WpRelation/{0}'.format(this.tenantId), { id: id }).then(res => {
        this.item = res
      })
    }
  },
  // 进入页面触发初始化事件
  mounted() {
    this.tenantId = this.$store.state.app.tenantId
    this.pageTitle = this.$route.params.title
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
