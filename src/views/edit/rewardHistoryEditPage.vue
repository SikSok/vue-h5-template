<!-- 资质认证 维护页 -->
<template>
  <div class="edit-page">
    <van-nav-bar :title="pageTitle" l left-arrow @click-left="onClickLeft" />
    <van-cell-group title="奖惩历史 ">
      <van-form @submit="onSubmit">
        <parameter-select
          v-model="item.Type"
          title="类型"
          placeholder="请选择奖惩类型"
          :parameters="typeOptions"
          :rules="[{ required: true, message: '请选择奖惩类型' }]"
        />
        <van-field
          v-model="item.Company"
          label="处置单位"
          placeholder="请填写处置单位"
          v-if="item.Type != 0"
          :rules="[{ required: true, message: '请填写该项' }]"
        />
        <van-field
          v-model="item.Company"
          label="颁发机构"
          placeholder="请填写颁发机构"
          v-if="item.Type == 0"
          :rules="[{ required: true, message: '请填写该项' }]"
        />
        <van-field
          v-model="item.Reason"
          label="原因"
          placeholder="请填写原因"
          :rules="[{ required: true, message: '请填写原因' }]"
        />
        <date-time-picker
          v-model="item.Occured"
          title="发生日期"
          @input="change"
          :rules="[{ required: true, message: '请填写发生日期' }]"
        />
        <van-field
          v-model="item.Notes"
          rows="2"
          autosize
          label="备注说明"
          type="textarea"
          maxlength="150"
          show-word-limit
          placeholder="请填写备注说明"
        />
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
import Parameters from '@/utils/parameters'
export default {
  name: 'QualificationEditPage',
  data() {
    return {
      pageTitle: '编辑',
      tenantId: 0,
      item: {},
      typeOptions: Parameters.Hr.RPType.Items
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    // 提交
    onSubmit(values) {
      this.postAxios('/WpRewardHistory/{0}'.format(this.tenantId), {}, this.item).then(res => {
        this.item = res
        this.$router.go(-1)
      })
    },
    // 获取数据
    getData(id) {
      this.getAxios('/WpRewardHistory/{0}'.format(this.tenantId), { id: id }).then(res => {
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
