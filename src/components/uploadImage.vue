<!-- 图片上传组件 -->
<template>
  <div>
    <van-field :label="label" style="border-bottom:none"></van-field>
    <div style="padding:0px 17px 11px 17px">
      <div v-if="!multiple">
        <van-uploader v-model="fileList" accept="image/*" :after-read="afterRead" :before-delete="deleteFile" />
      </div>
      <div v-if="multiple">
        <van-uploader
          v-model="fileList"
          accept="image/*"
          :after-read="afterRead"
          :before-delete="deleteFile"
          multiple
          :max-count="max"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadImage',
  components: {},
  props: {
    value: {
      default: null
    },
    tenantId: {
      default: null
    },
    label: {
      type: String,
      default: '标题'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 9
    }
  },
  data() {
    return {
      fileIds: [],
      fileList: []
    }
  },
  methods: {
    // 服务器保存图片数据并放回图片索引
    afterRead(file) {
      console.log(file)
      var fileContentArray = file.content.split(',')
      var fileItem = {}
      fileItem.content = fileContentArray[1]
      fileItem.FileName = file.file.name
      fileItem.FileType = file.file.type
      fileItem.FileSize = file.file.size
      this.postAxios('/WpDbfile/{0}/WpUpLoad'.format(this.tenantId), {}, fileItem).then(res => {
        this.fileIds.push(res.Id)
      })
    },
    // 删除某个文件
    deleteFile(file) {
      this.fileList.splice(this.fileList.indexOf(file), 1) // 从展示组中删除
      this.fileIds.splice(this.fileIds.indexOf(file.Id), 1) // 从返回索引中删除该索引
    },
    // 获取已上传图片 缓存地址
    getDataUrlSchell(ids) {
      this.fileList = []
      ids.forEach(id => {
        var item = { url: this.getFileUrl(this.tenantId, id), Id: id }
        this.fileList.push(item)
      })
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          this.fileIds = val.split(',')
          this.getDataUrlSchell(this.fileIds)
        }
      },
      immediate: true,
      deep: true
    },
    fileIds: {
      handler(val) {
        // 返回获取图片地址索引
        this.$emit('input', val.join(','))
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
<style scoped>
/*@import url(); 引入公共css类*/
</style>
