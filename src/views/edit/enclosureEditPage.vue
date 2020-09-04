<!-- 教育背景 维护页 -->
<template>
  <div class="edit-page">
    <van-nav-bar :title="pageTitle" l left-arrow @click-left="onClickLeft" />
    <van-cell-group title="附件">
      <van-form @submit="onSubmit">
        <upload-file v-model="fileItem" label="附件" :tenantId="tenantId" />
        <van-field v-model="item.Name" label="名称" placeholder="文件名称" />
        <van-field
          v-model="item.Description"
          rows="3"
          autosize
          label="描述"
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
export default {
  name: 'EducationEditPage',
  data() {
    return {
      pageTitle: '编辑',
      tenantId: 0,
      item: {},
      fileItem: null
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    // 提交
    onSubmit(values) {
      values.UserId = this.$store.getters.ctx.TenantMember.Id
      this.postAxios('/WpExAttachment/{0}'.format(this.tenantId), {}, this.item).then(res => {
        this.item = res
        this.$router.go(-1)
      })
    },
    // 获取数据
    getData(id) {
      this.getAxios('/WpExAttachment/{0}'.format(this.tenantId), { id: id }).then(res => {
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
  },
  watch: {
    fileItem: {
      handler(val) {
        if (val) {
          this.item.FileId = val.Id
          this.item.Name = val.FileName
          this.item.FileType = val.FileType
          this.item.FileSize = val.FileSize
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
<style scoped></style>
