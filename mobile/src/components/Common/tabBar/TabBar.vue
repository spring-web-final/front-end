<template>
  <van-tabbar v-model="active" active-color="#fa7298" inactive-color="#787878" :border="false" route>
    <van-tabbar-item
            v-for="item in itemDataArr"
            :icon="item.icon" :key="item.name"
            :to="item.name">
      {{item.text}}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
  export default {
    name: "TabBar",
    components: {},
    props:{
      itemDataArr: {
        type:Array,
        default(){
          return [
            {
              icon: 'orders-o',
              name: '/list',
              text:'列表'
            },
            {
              icon: 'bar-chart-o',
              name: '/chart',
              text:'图表'
            },
            {
              icon: 'plus',
              name: '/add',
              text:'添加'
            },
            {
              icon: 'search',
              name: '/search',
              text:'搜索'
            },
            {
              icon: 'user-o',
              name: '/profile',
              text: '我的'
            }
          ]
        }
      }
    },
    data() {
      return {
        active:''
      }
    }
  }
</script>

<style scoped>
  .van-tabbar{
    background-color: rgba(255, 255, 255, 0.97);
    /*background-color: #f7f7f7;*/
  }
</style>