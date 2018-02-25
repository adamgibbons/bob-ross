import Vue from 'vue'
import Router from 'vue-router'
import Paintings from '@/components/Paintings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Paintings',
      component: Paintings
    }
  ]
})
