import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from ,next) => {
      // to表示将要访问的路径
      // from代表从哪个路径跳转而来
      // next表示一个函数，表示放行
      // next()表示方式 next("/需要跳转的路径")
      if(to.path === '/login') return  next()
      const tokenStr = window.sessionStorage.getItem('token');
      if(!tokenStr) return next('/login');
      next()
})

export default router
