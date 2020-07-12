export default {
  state: {
    loading: false,
    error: null
  },
  mutations: {
    setLoading (state, payLoad) {
      state.loading = payLoad
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    setLoading ({commit}, payLoad) {
      commit('setLoading', payLoad)
    },
    setError ({commit}, payLoad) {
      commit('setError', payLoad)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
}
