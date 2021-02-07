const state = {
  // 全局数据
  offline: false, // 是否离线
  onlineStatus: true // 是否联网
}

const mutations = {
  set_offline: (state, data) => {
    state.offline = data
  },
  set_onlineStatus: (state, data) => {
    state.onlineStatus = data
  }
}

const actions = {
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
