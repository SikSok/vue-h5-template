<!-- 工作经历 维护页 -->
<template>
  <div class="edit-page">
    <van-nav-bar :title="pageTitle" l left-arrow @click-left="onClickLeft" />
    <van-cell-group title="工作经历">
      <van-form @submit="onSubmit">
        <van-field
          v-model="item.Empolyer"
          label="公司名称"
          placeholder="请填写公司名称"
          :rules="[{ required: true, message: '请填写公司名称' }]"
        />
        <van-field
          v-model="item.Title"
          label="担任职位"
          placeholder="请填写担任职位"
          :rules="[{ required: true, message: '请填写担任职位' }]"
        />
        <date-time-picker
          v-model="item.StartDate"
          title="入职日期"
          :rules="[{ required: true, message: '请填写入职日期' }]"
          @input="change"
        />
        <date-time-picker v-model="item.EndDate" title="离职日期" @input="change" />
        <van-field
          v-model="item.Description"
          rows="2"
          autosize
          label="职位描述"
          type="textarea"
          maxlength="150"
          show-word-limit
          placeholder="请填写职位描述"
        />
        <van-cell>
          <template #title>
            <van-row type="flex" justify="center">
              <van-col span="7" style="text-align:center;"> <van-button type="info">提交</van-button></van-col>
              <van-col span="7" style="text-align:center;">
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
  name: 'EducationEditPage',
  data() {
    return {
      pageTitle: '编辑',
      tenantId: 0,
      item: {}
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    // 提交
    onSubmit(values) {
      this.postAxios('/WpWorkHistory/{0}'.format(this.tenantId), {}, this.item).then(res => {
        this.item = res
        this.$router.go(-1)
      })
    },
    // 获取数据
    getData(id) {
      this.getAxios('/WpWorkHistory/{0}'.format(this.tenantId), { id: id }).then(res => {
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
    this.tenantId = this.$store.state.ctx.TenantId
    if (this.$route.query.title) {
      this.pageTitle = this.$route.query.title
    }
    // 如果id>0？ 老数据维护 ： 新建数据
    if (this.$route.query.id > 0) {
      this.getData(this.$route.query.id)
    } else {
      this.item.staffId = this.$store.state.ctx.TenantMember.StaffId
    }
  }
}
</script>
<style scoped></style>
