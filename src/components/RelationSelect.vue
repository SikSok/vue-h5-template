<template>
  <div>
    <van-field readonly clickable label="title" :value="selectItem" placeholder="选择关系" @click="show = true" />
    <van-popup v-model="show" position="bottom">
      <van-picker title="title" show-toolbar :columns="columns" @confirm="onConfirm" @cancel="onCancel" />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'RelationSelect',
  props: {
    value: { default: null },
    title: { default: null }
  },
  data() {
    return {
      show: false,
      columns: ['父亲', '母亲', '配偶', '子女'],
      selectItem: ''
    }
  },
  computed: {},
  methods: {
    onConfirm(value) {
      this.selectItem = value
      this.$emit('input', value)
      this.show = false
    },
    onCancel() {
      this.show = false
    }
  },
  watch: {
    value: {
      handler(val) {
        this.selectItem = val
      }
    }
  }
}
</script>
