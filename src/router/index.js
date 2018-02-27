import Vue from 'vue'
import Router from 'vue-router'
import Paintings from '@/components/Paintings'
import Colors from '@/components/Colors'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Paintings',
      component: Paintings
    },
    {
      path: '/colors',
      name: 'Colors',
      component: Colors
    }
  ]
})
