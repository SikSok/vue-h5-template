<!-- 图片上传组件 -->
<template>
  <div>
    <van-field :label="label" style="border-bottom:none"></van-field>
    <div style="padding-bottom:11px;text-align:center">
      <van-uploader
        v-model="fileList"
        accept="image/Word/Excel/PPT/Pdf/Txt"
        :preview-image="false"
        :after-read="afterRead"
      >
        <van-button icon="plus" type="primary">{{ buttonLabel }}</van-button>
      </van-uploader>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
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
    max: {
      type: Number,
      default: 9
    }
  },
  data() {
    return {
      dbFile: null,
      fileList: [],
      buttonLabel: '上传文件'
    }
  },
  methods: {
    // 服务器保存图片数据并放回图片索引
    afterRead(file) {
      if (!this.tenantId) {
        Toast('组件未设置租户编号tenantId，无法正常使用')
      } else {
        console.log(file)
        var fileContentArray = file.content.split(',')
        var fileItem = {}
        fileItem.content = fileContentArray[1]
        fileItem.FileName = file.file.name
        fileItem.FileType = file.file.type
        fileItem.FileSize = file.file.size
        this.postAxios('/WpDbfile/{0}/WpUpLoad'.format(this.tenantId), {}, fileItem).then(res => {
          this.$emit('input', res)
        })
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          this.dbFile = val
          this.buttonLabel = '重新上传'
        } else {
          this.buttonLabel = '上传文件'
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
