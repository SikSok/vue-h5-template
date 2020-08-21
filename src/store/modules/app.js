const state = {
  activeName: 0
}
const mutations = {
  SET_ACTIVE_NAME: (state, data) => {
    state.activeName = data
  }
}

const actions = {
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
