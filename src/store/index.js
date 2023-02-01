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
    }
  },
  actions: {
    guardarData({commit, state, dispatch}, data){
      ipcRenderer.send(data.api, data)
      ipcRenderer.on(`${data.api}/res`, (event, arg)=>{
        ipcRenderer.removeAllListeners(`${data.api}/res`)
        minix({icon: 'success', mensaje: arg.message, tiempo: 6000})
      })
    }
  },
  plugins: [vuexPersist.plugin],
  modules: {
  }
})
