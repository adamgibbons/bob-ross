import Vue from 'vue'
import Router from 'vue-router'
import Paintings from '@/components/Paintings'
import ShowPainting from '@/components/ShowPainting'
import Colors from '@/components/Colors'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/paintings'
    },
    {
      path: '/paintings',
      name: 'Paintings',
      component: Paintings
    },
    {
      path: '/paintings/:paintingId',
      name: 'ShowPainting',
      component: ShowPainting
    },
    {
      path: '/colors',
      name: 'Colors',
      component: Colors
    }
  ]
})
