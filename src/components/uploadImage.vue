<!-- 图片上传组件 -->
<template>
  <div>
    <div v-if="!multiple">
      <van-uploader v-model="fileList" :after-read="afterRead" :before-delete="deleteFile" />
    </div>
    <div v-if="multiple">
      <van-uploader v-model="fileList" :after-read="afterRead" :before-delete="deleteFile" multiple :max-count="max" />
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
      this.postAxios('api/DbFile/{0}/WpUpLoad'.format(this.tenantId), {}, fileItem, '').then(res => {
        this.fileIds.push(res)
      })
    },
    // 删除某个文件
    deleteFile(file) {
      this.fileList.splice(this.fileList.indexOf(file), 1) // 从展示组中删除
      this.fileIds.splice(this.fileIds.indexOf(file.Id), 1) // 从返回索引中删除该索引
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          this.fileIds = val.split(',')
        }
      },
      immediate: false,
      deep: true
    },
    fileIds: {
      handler(val) {
        var _this = this
        // 返回获取图片地址索引
        _this.$emit('input', val.join(','))
        // 获取已上传图片 的DataUrlSchell
        if (this.fileIds.length > 0) {
          this.postAxios('api/DbFile/{0}/GetDataUrlScheme'.format(_this.tenantId), {}, _this.fileIds, '').then(res => {
            _this.fileList = []
            res.forEach(element => {
              var item = {}
              item.Id = element.Id
              item.content = element.DataUrlSchellStr
              _this.fileList.push(item)
            })
          })
        }
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
