const state = {
  // 测试数据
  tenantId: 4,
  staffId: 0,
  userId: 0,
  // 全局数据
  activeName: 0
}
const mutations = {
  SET_ACTIVE_NAME: (state, data) => {
    state.activeName = data
  }
}

const actions = {
  setTenantId({ commit }, data) {
    state.tenantId = data
  },
  setStaffId({ commit }, data) {
    state.staffId = data
  },
  setUserId({ commit }, data) {
    state.userId = data
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
