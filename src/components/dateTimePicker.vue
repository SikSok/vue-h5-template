<!-- 表单 时间选择 年月日 -->
<template>
  <div>
    <van-field
      readonly
      clickable
      :label="title"
      :value="currentDate | csdate"
      placeholder="请选择时间"
      @click="showPopup()"
    />
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="selectDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        @cancel="show = false"
        @confirm="confirmPicker()"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'DateTimePicker',
  props: {
    // 绑定值
    value: {
      default: null
    },
    // 表单项名称
    title: { default: '时间' },
    // 最小可选时间
    minDate: {
      type: Date,
      default: function() {
        return new Date(1900, 0, 1)
      }
    }
  },
  data() {
    return {
      show: false,
      currentDate: null, // 当前时间
      selectDate: null // 时间控件所选时间 （确定后才变成当前时间）
    }
  },
  methods: {
    // 显示时间选择弹窗
    showPopup() {
      this.show = true
      this.selectDate = new Date(this.currentDate) // 每次打开，初始化所选时间为当前时间；时间控件无法识别字符串时间数据，要用new Date(*)
    },
    // 确认选择的时间
    confirmPicker(val) {
      this.$emit('input', val)
      this.currentDate = this.selectDate
      this.show = false
    }
  },
  watch: {
    // 初始化获取当前时间值
    value: {
      handler(val) {
        if (!val) {
          this.currentDate = new Date()
        } else {
          this.currentDate = new Date(val)
        }
      },
      immediate: true
    }
  }
}
</script>
