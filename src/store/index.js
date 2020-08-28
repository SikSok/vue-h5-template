import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', false, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

// 获取上下文令牌
const token = sessionStorage.getItem('token')
const ctx = JSON.parse(sessionStorage.getItem('ctx'))
const state = {
  token: token,
  ctx: ctx
}

const store = new Vuex.Store({
  modules,
  getters,
  state
})

export default store
