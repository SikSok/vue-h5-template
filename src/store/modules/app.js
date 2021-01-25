const state = {
  // 全局数据
  CommonData: null
}

const mutations = {
  SET_CommonData: (state, data) => {
    state.CommonData = data
  }
}

const actions = {
  setCommonData({ commit }, data) {
    commit('SET_CommonData', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
