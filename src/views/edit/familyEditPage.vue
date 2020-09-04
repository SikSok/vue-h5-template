<!-- 家庭信息 维护页 -->
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
        <relation-select title="与本人关系" v-model="item.Relationship" @input="change" />
        <van-field v-model="item.Company" label="工作单位" placeholder="请填写工作单位" />
        <van-field v-model="item.JobTitle" label="职位" placeholder="请填写职位" />
        <van-field
          v-model="item.ContactTel"
          type="tel"
          label="联系电话"
          placeholder="请填写联系电话"
          :rules="[
            { required: true, message: '请填写联系电话' },
            { pattern: /^1[3456789]\d{9}$/, message: '号码格式错误！' }
          ]"
        />
        <van-field v-model="item.Postcode" label="邮箱" placeholder="请填写邮箱" />
        <van-field v-model="item.Address" label="地址" placeholder="请填写地址" />
        <van-cell>
          <template #title>
            <van-row type="flex" justify="center">
              <van-col span="7" style="text-align:center;"> <van-button type="info">提交</van-button></van-col>
              <van-col span="7" style="text-align:center;" v-if="item.Id > 0">
                <van-button native-type="button" @click="Delete()" type="danger">删除</van-button>
              </van-col>
            </van-row>
          </template>
        </van-cell>
      </van-form>
    </van-cell-group>
  </div>
</template>

<script>
import { Dialog } from 'vant'
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
      values.UserId = this.$store.getters.ctx.TenantMember.Id
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
    },
    // 删除数据
    Delete() {
      var _this = this
      Dialog.alert({
        title: '提示',
        message: '删除确认',
        showCancelButton: true
      })
        .then(() => {
          _this.deleteAxios('/WpExAttachment/{0}'.format(_this.tenantId), { id: _this.item.Id }).then(res => {
            _this.$router.go(-1)
          })
        })
        .catch(() => {
          close()
        })
    },
    change() {
      this.$forceUpdate()
    }
  },
  // 进入页面触发初始化事件
  mounted() {
    this.tenantId = this.$store.getters.ctx.TenantId
    if (this.$route.query.title) {
      this.pageTitle = this.$route.query.title
    }
    // 如果id>0？ 老数据维护 ： 新建数据
    if (this.$route.query.id > 0) {
      this.getData(this.$route.query.id)
    } else {
      this.item.staffId = this.$store.getters.ctx.TenantMember.StaffId
    }
  }
}
</script>
<style scoped></style>
