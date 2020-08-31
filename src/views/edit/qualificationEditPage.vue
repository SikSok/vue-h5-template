<!-- 资质认证 维护页 -->
<template>
  <div class="edit-page">
    <van-nav-bar :title="pageTitle" l left-arrow @click-left="onClickLeft" />
    <van-cell-group title="资质认证">
      <van-form @submit="onSubmit">
        <parameter-select v-model="item.Type" title="证照类型" :parameters="typeOptions" />
        <van-field
          v-if="item.Type == '其他证件'"
          v-model="item.Name"
          label="证照名称"
          placeholder="请选择证照名称"
          :rules="[{ required: true, message: '请选择证照名称' }]"
        />
        <van-field v-model="item.CertificateNo" label="证照编号" placeholder="请填写证照编号" />
        <van-field v-model="item.Authority" label="发证机构" placeholder="请填写发证机构" />
        <date-time-picker v-model="item.EnterDate" title="备案日期" @input="change" />
        <date-time-picker v-model="item.ReceivedDate" title="发证日期" @input="change" />
        <date-time-picker v-model="item.PeriodofValidity" title="到期日期" @input="change" />
        <date-time-picker v-model="item.RemindDate" title="提醒日期" @input="change" />
        <van-field v-model="item.Major" label="专业" placeholder="请填写专业" />
        <van-field v-model="item.Level" label="等级" placeholder="请填写等级" />
        <van-field
          v-model="item.Comments"
          rows="2"
          autosize
          label="描述"
          type="textarea"
          maxlength="150"
          show-word-limit
          placeholder="请填写描述"
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
import Parameters from '@/utils/parameters'
export default {
  name: 'QualificationEditPage',
  data() {
    return {
      pageTitle: '编辑',
      tenantId: 0,
      item: {},
      typeOptions: Parameters.Hr.QualificationType.Items
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    // 提交
    onSubmit(values) {
      this.postAxios('/WpQualification/{0}'.format(this.tenantId), {}, this.item).then(res => {
        this.item = res
        this.$router.go(-1)
      })
    },
    // 获取数据
    getData(id) {
      this.getAxios('/WpQualification/{0}'.format(this.tenantId), { id: id }).then(res => {
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
