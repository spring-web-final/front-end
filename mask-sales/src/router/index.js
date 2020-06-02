import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)

//路由懒加载
const Login = () => import('../views/Login.vue')

const routes = [
  // {
  //   path:'',
  //   redirect:'/home'
  // },
  // {
  //   path:'/home',
  //   component:
  // }
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router