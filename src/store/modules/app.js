const state = {
  // 全局数据
  token: null,
  ctx: null,
  staffId: 0,
  activeName: 0
}

const mutations = {
  SET_TOKEN: (state, data) => {
    state.token = data
  },
  SET_CTX: (state, data) => {
    state.ctx = data
  },
  SET_STAFFID: (state, data) => {
    state.staffId = data
  },
  SET_ACTIVE_NAME: (state, data) => {
    state.activeName = data
  }
}

const actions = {
  toggleToken({ commit }, data) {
    commit('SET_TOKEN', data)
  },
  setCtx({ commit }, data) {
    commit('SET_CTX', data)
  },
  setStaffId({ commit }, data) {
    commit('SET_STAFFID', data)
  },
  setActiveName({ commit }, data) {
    commit('SET_ACTIVE_NAME', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
