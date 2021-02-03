const state = {
  // 全局数据
  CommonData: null,
  offline: false, // 是否离线
  onlineStatus: true // 是否联网
}

const mutations = {
  SET_CommonData: (state, data) => {
    state.CommonData = data
  },
  set_offline: (state, data) => {
    state.offline = data
  },
  set_onlineStatus: (state, data) => {
    state.onlineStatus = data
  }
}

const actions = {
  setCommonData({ commit }, data) {
    commit('SET_CommonData', data)
  },
  setOffline({ commit }, data) {
    commit('set_offline', data)
  },
  setOnlineStatus({ commit }, data) {
    commit('set_onlineStatus', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
