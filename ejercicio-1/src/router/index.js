import Vue from 'vue'
import VueRouter from 'vue-router'
import ArtistasView from '../views/ArtistasView.vue'
import LpView from '../views/LpView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Artistas',
    component: ArtistasView
  },

  {
    path: '/Lp',
    name: 'Lp',
    component: LpView
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
