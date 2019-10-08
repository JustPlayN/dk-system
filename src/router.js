import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/map',
      name: 'map',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "map" */ './views/map.vue')
    },
    {
      path: '/merchant',
      name: 'merchant',
      component: () => import(/* webpackChunkName: "merchant" */ './views/merchant.vue')
    },
    {
      path: '/addMerchant',
      name: 'addMerchant',
      component: () => import(/* webpackChunkName: "merchant" */ './views/addMerchant.vue')
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: () => import(/* webpackChunkName: "teacher" */ './views/teacher.vue')
    },
    {
      path: '/parent',
      name: 'parent',
      component: () => import(/* webpackChunkName: "parent" */ './views/parent.vue')
    },
    {
      path: '/children',
      name: 'children',
      component: () => import(/* webpackChunkName: "children" */ './views/children.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import(/* webpackChunkName: "test" */ './views/test.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import(/* webpackChunkName: "setting" */ './views/setting.vue')
    },
    {
      path: '/password',
      name: 'password',
      component: () => import(/* webpackChunkName: "password" */ './views/password.vue')
    }
  ]
})
