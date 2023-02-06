import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import { ipcRenderer } from 'electron'
import { minix, pregunta } from '@/functions/alertas'

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

      if (r.codigo == 'OK') {
        minix({icon: 'success', mensaje: r.message, tiempo: 3000})
      }else{
        minix({icon: 'error', mensaje: r.message, tiempo: 3000})
      }


    },
    async obtenerData({commit, state, dispatch}, data){

      let r = await ipcRenderer.invoke(data.api, data)
      if (r.length == 0) {
        minix({icon: 'info', mensaje: 'NO HAY REGISTROS', tiempo: 3000})
      }else{
        return r
      }
    },
    async actualizarDatos({commit, state, dispatch}, data){
      let r = await ipcRenderer.invoke(data.api, data)
      minix({icon: 'info', mensaje: r.message, tiempo: 3000})
    },
    async borrarDatos({commit, state, dispatch}, data){

      let r = await ipcRenderer.invoke(data.api, data)
      minix({icon: 'info', mensaje: r.message, tiempo: 3000})
      
    },
  },
  plugins: [vuexPersist.plugin],
  modules: {
  }
})
