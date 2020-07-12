export default {
  state: {
    tags: [
      {
        title: 'Comedy',
        use: false
      },
      {
        title: 'Horror',
        use: false
      },
      {
        title: 'thriller',
        use: false
      }
    ]
  },
  mutations: {
    newTag (state, payLoad) {
      state.tags.push(payLoad)
    }
  },
  actions: {
    newTag ({commit}, payLoad) {
      commit('newTag', payLoad)
    }
  },
  getters: {
    tags (state) {
      return state.tags
    }
  }
}
