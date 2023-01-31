import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Inicio from '@/views/Inicio.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/inicio',
    name: 'Inicio',
    component: Inicio,
    // meta:{
    //   autentificado: true
    // }
  },
]

const router = new VueRouter({
  routes
})

export default router
