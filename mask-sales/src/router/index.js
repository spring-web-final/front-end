import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)

//路由懒加载
const Login = () => import('../views/Login.vue')
const Register = () => import('../views/Register.vue')
const Forget = () => import('../views/Forget.vue')
const Manage = () => import('../views/Manage.vue')
const Welcome = ()=>import('../components/Common/Welcome.vue')
const List = ()=>import('../components/Manage/ManageMain/List.vue')
const Chart = ()=>import('../components/Manage/ManageMain/Chart.vue')
const Add = ()=>import('../components/Manage/ManageMain/Add.vue')
const Search = ()=>import('../components/Manage/ManageMain/Search.vue')
const Profile = ()=>import('../components/Manage/ManageMain/Profile.vue')

const routes = [
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
    component: Manage,
    redirect:'/welcome',
    children:[
      {
        path:'/welcome',
        component: Welcome
      },
      {
        path: '/list',
        component:List
      },
      {
        path: '/chart',
        component:Chart
      },
      {
        path: '/add',
        component:Add
      },
      {
        path: '/search',
        component:Search
      },
      {
        path: '/profile',
        component:Profile
      }
    ]
  }
]

const router = new VueRouter({
  routes,
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
//避免重复导航
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
