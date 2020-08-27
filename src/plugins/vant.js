// 按需全局引入 vant组件
import Vue from 'vue'
import {
  Button,
  List,
  Cell,
  CellGroup,
  Tabbar,
  TabbarItem,
  NavBar,
  Col,
  Row,
  Skeleton,
  Form,
  field,
  RadioGroup,
  Radio,
  Collapse,
  CollapseItem,
  icon,
  Popup,
  Toast,
  DatetimePicker,
  Picker,
  Switch,
  Uploader
} from 'vant'
Vue.use(Button)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(List)
Vue.use(Tabbar).use(TabbarItem)
Vue.use(NavBar)
Vue.use(Col)
Vue.use(Row)
Vue.use(Skeleton)
Vue.use(Form)
Vue.use(field)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(icon)
Vue.use(Popup)
Vue.use(Toast)
Vue.use(DatetimePicker)
Vue.use(Picker)
Vue.use(Switch)
Vue.use(Uploader)

// 全局引用自定义组件
import DateTimePicker from '@/components/dateTimePicker'
import WorkplaceSelect from '@/components/WorkPlace'
import RelationSelect from '@/components/RelationSelect'
import ParameterSelect from '@/components/ParameterSelect'
import UploadImage from '@/components/uploadImage'
import UploadFile from '@/components/uploadFile'

Vue.component('DateTimePicker', DateTimePicker)
Vue.component('WorkplaceSelect', WorkplaceSelect)
Vue.component('RelationSelect', RelationSelect)
Vue.component('ParameterSelect', ParameterSelect)
Vue.component('UploadImage', UploadImage)
Vue.component('UploadFile', UploadFile)
