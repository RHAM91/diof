import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import { ipcRenderer } from 'electron'
import { minix } from '@/functions/alertas'

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
    },
  },
  actions: {
    async guardarData({commit, state, dispatch}, data){

      let r = await ipcRenderer.invoke(data.api, data)
      minix({icon: 'success', mensaje: r.message, tiempo: 6000})

    },
    async obtenerData({commit, state, dispatch}, data){

      let r = await ipcRenderer.invoke(data.api, data)
      return r

    }
  },
  plugins: [vuexPersist.plugin],
  modules: {
  }
})
