import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'kat',
  storage: window.localStorage,
  reducer: state => ({
    
  }) 
})

export default new Vuex.Store({
  state: {
    auth: false,
  },
  getters: {
  },
  mutations: {
    set_auth(state, data){
      state.auth = data
    }
  },
  actions: {
  },
  plugins: [vuexPersist.plugin],
  modules: {
  }
})
