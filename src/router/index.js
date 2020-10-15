import Vue from 'vue'
import VueRouter from 'vue-router'

import Content from '@/views/template/Content.vue'

import NotFound from '@/components/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  }, 
  {
    path: '/',
    name: 'main',
    component: Content,
    meta: {
      auth: false,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
