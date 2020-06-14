import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('../views/Home.vue')
const List = ()=>import('../views/List.vue')
const Chart = ()=>import('../views/Chart.vue')
const Add = ()=>import('../views/Add.vue')
const Search = ()=>import('../views/Search.vue')
const Profile = ()=>import('../views/Profile.vue')
const Detail = ()=>import('../components/Common/detail/Detail.vue')

const routes = [
  {
    path: '/',
    redirect:'/list'
  },
  {
    path: '/list',
    component:List,
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
  },
  {
    name:'detail',
    path:'/detail/:id',
    component:Detail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'

})

export default router
