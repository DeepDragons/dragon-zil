import * as VueRouter from 'vue-router'

import Home from './page/Home'
import Buy from './page/Buy'
import Dragons from './page/Dragons'
import Dragon from './page/Dragon'
import Fights from './page/Fights'
import Fight from './page/Fight'
import NotFound from './page/404'
import ZLPStore from './page/ZLPStore'
import GenLab from './page/GenLab'
import BreedPlace from './page/BreedPlace'
import Breed from './page/Breed'
import MarketPlace from './page/MarketPlace'

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
    path: '/gen-lab/:id',
    name: 'GenLab',
    component: GenLab
  },
  {
    path: '/store',
    name: 'Store',
    component: ZLPStore
  },
  {
    path: '/trade',
    name: 'Trade',
    component: MarketPlace
  },
  {
    path: '/breeding',
    name: 'BreedPlace',
    component: BreedPlace
  },
  {
    path: '/breed/:id',
    name: 'Breed',
    component: Breed
  },
  {
    path: '/dragons',
    name: 'Dragons',
    component: Dragons
  },
  {
    path: '/dragon/:id',
    name: 'Dragon',
    component: Dragon
  },
  {
    path: '/fights',
    name: 'Fights',
    component: Fights
  },
  {
    path: '/fight/:id',
    name: 'Fight',
    component: Fight
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
