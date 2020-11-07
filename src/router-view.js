import * as VueRouter from 'vue-router'

import Home from './page/Home'
import Buy from './page/Buy'
import Airdrop from './page/Airdrop'
import Dragons from './page/Dragons'
import Dragon from './page/Dragon'
import NotFound from './page/404'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/buy',
    name: 'Buy',
    component: Buy
  },
  {
    path: '/airdrop',
    name: 'Airdrop',
    component: Airdrop
  },
  {
    path: '/dragons',
    name: 'Dragons',
    component: Dragons
  },
  {
    path: '/dragon/:id(.*)/:stage(.*)',
    name: 'Dragon',
    component: Dragon
  },
  {
    path: '/:data(.*)',
    component: NotFound,
    name: 'NotFound'
  }
]

export const routerHistory = VueRouter.createWebHistory()
export default VueRouter.createRouter({
  history: routerHistory,
  strict: true,
  routes // short for `routes: routes`
})
