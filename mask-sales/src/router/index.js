import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)

//路由懒加载
const Login = () => import('../views/Login.vue')
const Register = ()=>import('../views/Register.vue')
const Forget = ()=>import('../views/Forget.vue')

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
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/forget',
    component: Forget
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router