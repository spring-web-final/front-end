import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)

//路由懒加载
const Login = () => import('../views/Login.vue')
const Register = () => import('../views/Register.vue')
const Forget = () => import('../views/Forget.vue')
const Manage = () => import('../views/Manage.vue')

const routes = [
  // {
  //   path:'',
  //   redirect:'/manage'
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
  },
  {
    path: '/manage',
    component: Manage
  },

]

const router = new VueRouter({
  routes,
  mode: 'history'
})
//路由导航守卫
router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem('token');
  if (to.path ==='/login'|| to.path ==='/register' ||to.path ==='/forget'){
    return next();
  }
  if (!token){
    return next('/login');
  }else {
    next();
  }

})

export default router
