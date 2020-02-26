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
      component: () => import(/* webpackChunkName: "addMerchant" */ './views/addMerchant.vue')
    },
    {
      path: '/equipList',
      name: 'equipList',
      component: () => import(/* webpackChunkName: "equipList" */ './views/equipList.vue')
    },
    {
      path: '/addNotice',
      name: 'addNotice',
      component: () => import(/* webpackChunkName: "addNotice" */ './views/addNotice.vue')
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: () => import(/* webpackChunkName: "teacher" */ './views/teacher.vue')
    },
    {
      path: '/teacherDetail',
      name: 'teacherDetail',
      component: () => import(/* webpackChunkName: "teacher" */ './views/teacherDetail.vue')
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
      path: '/childDetail',
      name: 'childDetail',
      component: () => import(/* webpackChunkName: "children" */ './views/childDetail.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import(/* webpackChunkName: "test" */ './views/test.vue')
    },
    {
      path: '/pdf',
      name: 'pdf',
      component: () => import(/* webpackChunkName: "test" */ './views/downloadPdf.vue')
    },
    {
      path: '/classPdf',
      name: 'classPdf',
      component: () => import(/* webpackChunkName: "test" */ './views/classPdf.vue')
    },
    {
      path: '/schoolPdf',
      name: 'schoolPdf',
      component: () => import(/* webpackChunkName: "test" */ './views/schoolPdf.vue')
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
