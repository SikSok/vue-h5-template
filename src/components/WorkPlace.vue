<template>
  <div>
    <van-field
      readonly
      clickable
      label="工作地点"
      :value="selectItem.Name"
      placeholder="请选择工作地点"
      @click="show = true"
    />
    <van-popup v-model="show" position="bottom">
      <van-picker
        title="工作地点"
        show-toolbar
        :columns="columns"
        value-key="Name"
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
    value: { default: null }
  },
  data() {
    return {
      show: false,
      columns: [],
      selectItem: {}
    }
  },
  computed: {},
  methods: {
    onConfirm(value) {
      this.selectItem = value
      this.$emit('input', value.Id)
      this.show = false
    },
    onCancel() {
      this.show = false
    }
  },
  // 获取工作地点参数
  created() {
    var tenantId = this.$store.state.ctx.TenantId
    this.getAxios('/Maintenance/{0}/GetWorkPlaces'.format(tenantId)).then(res => {
      this.columns = []
      res.forEach(element => {
        var item = {}
        item.Id = element.Id
        item.Name = element.Name
        this.columns.push(item)
      })
    })
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          this.columns.forEach(element => {
            if (element.Id === val) {
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
