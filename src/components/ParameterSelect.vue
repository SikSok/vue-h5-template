<template>
  <div>
    <van-field
      readonly
      clickable
      :label="title"
      :value="selectItem.Label"
      :rules="rules"
      placeholder="请选择"
      @click="show = true"
    />
    <van-popup v-model="show" position="bottom">
      <van-picker
        :title="title"
        show-toolbar
        :columns="parameters"
        value-key="Label"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'WorkPlaceSelect',
  props: {
    title: { default: '表单项名称' },
    value: { default: null },
    // 待选参数对象数组
    parameters: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 验证规则
    rules: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      show: false,
      selectItem: {}
    }
  },
  methods: {
    onConfirm(value) {
      this.selectItem = value
      this.$emit('input', value.Value)
      this.show = false
    },
    onCancel() {
      this.show = false
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val != null) {
          this.parameters.forEach(element => {
            if (element.Value === val) {
              this.selectItem = element
              return
            }
          })
        }
      }
    }
  }
}
</script>
