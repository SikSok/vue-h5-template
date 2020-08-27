<!-- 图片上传组件 -->
<template>
  <div>
    <van-field :label="label" style="border-bottom:none"></van-field>
    <div style="padding:0px 17px 11px 17px">
      <div
        v-for="(id, index) in fileIds"
        :key="index"
        :style="{ width: '88.4px', height: '88.4px' }"
        class="upload-show-multiple"
      >
        <img :src="getFileUrl(tenantId, id)" />
        <div class="pic-delete" @click="deleteImg(id)">
          <van-icon size="13" name="cross" />
        </div>
      </div>
      <div v-if="!multiple">
        <van-uploader accept="image/*" :after-read="afterRead" :preview-image="false" />
      </div>
      <div v-if="multiple">
        <van-uploader accept="image/*" :after-read="afterRead" :preview-image="false" multiple :max-count="max" />
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
      fileIds: []
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
    deleteImg(id) {
      this.fileIds.splice(this.fileIds.indexOf(id), 1) // 从返回索引中删除该索引
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          this.fileIds = val.split(',')
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
