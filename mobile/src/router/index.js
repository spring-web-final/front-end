import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const List = () => import('../views/List.vue')
const Chart = () => import('../views/Chart.vue')
const Add = () => import('../views/Add.vue')
const Search = () => import('../views/Search.vue')
const Profile = () => import('../views/Profile/Profile.vue')
const Detail = () => import('../components/Common/detail/Detail.vue')
const QRCode = () => import('../views/Profile/QRCode.vue')
const Change = () => import('../views/Profile/Change.vue')
const Ourselves = () => import('../views/Profile/Ourselves.vue')
const Login = () => import('../views/Login')
const Register = () => import('../views/Register.vue')
const QRAdd = ()=>import('../views/QRAdd.vue')

const routes = [
    {
    path: '/list',
    component: List,
  },
  {
    path: '/chart',
    component: Chart
  },
  {
    path: '/add',
    component: Add
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    name: 'detail',
    path: '/detail/:id',
    component: Detail
  },
  {
    path: '/qrcode',
    component: QRCode
  },
  {
    path: '/change',
    component: Change
  },
  {
    path: '/ourselves',
    component: Ourselves
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/qradd',
    component:QRAdd
  }
]

const router = new VueRouter({
  routes
})

//路由导航守卫
router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem('token');
  if (to.path === '/login' || to.path === '/register' || to.path === '/qradd') {
    return next();
  }
  if (!token) {
    return next('/login');
  } else {
    next();
  }

})
export default router
