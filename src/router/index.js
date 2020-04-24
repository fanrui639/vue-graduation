import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

import login from '../views/Login.vue'

const pages = x => () => import('@/pages' + x )

const routes = [
  {
    path: '/',
    name: 'home',
    // component: Home
    component: pages('/Index.vue'),
    meta:{
      title:"首页"
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta:{
      title:"首页"
    }
  },
  {
    path:'/login',
    name:'login',
    component:pages('/Login.vue'),
    meta:{
      title:"登录网盘"
    }
    // component: login
    // component: () => import(/* webpackChunkName:"login" */ '../views/Login.vue')
  },
  {
    path:'/register',
    name:'register',
    component:pages('/Register.vue'),
    meta:{
      title:"注册账号"
    }
  },
  {
    path:'/repsw',
    name:'repsw',
    component:pages('/Repwd.vue'),
    meta:{
      title:"重置密码"
    }
  },
  {
    path:'/VIP',
    name:'vip',
    component:pages('/VIP.vue'),
    meta:{
      title:"会员中心"
    }
  },
  {
    path:'/success',
    name:'vip',
    component:pages('/success.vue'),
    meta:{
      title:"支付成功",
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
