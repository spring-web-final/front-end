<template>
  <Aside>
    <el-menu-item v-for="item in menu" :index="item.id" :key="item.id" @click="saveActivePath(item.id)">
      <i :class="item.icon"></i>
      <span slot="title">
        {{item.title}}
      </span>
    </el-menu-item>
  </Aside>
</template>

<script>
  import Aside from "../Common/Aside";

  export default {
    name: "ManageAside",
    components: {Aside},
    data() {
      return {
        menu: [
          {
            id: "/list",
            title: "列表",
            icon: "el-icon-document"
          },
          {
            id: "/chart",
            title: "图表",
            icon: "el-icon-data-analysis"
          },
          {
            id: "/add",
            title: "添加",
            icon:"el-icon-circle-plus-outline"
          },
          {
            id: "/search",
            title: "搜索",
            icon: "el-icon-search"
          },
          {
            id: "/profile",
            title: "我的",
            icon: "el-icon-user"
          }
        ]
      }
    },
    mounted() {
      let path = window.sessionStorage.getItem('activePath');
      if (path){
        this.$router.push(path);
      }
    },
    methods:{
      saveActivePath(path){
        window.sessionStorage.setItem('activePath',path);
      }
    }
  }
</script>

<style scoped lang="scss">
.el-menu-item{
  span{
    font-size: 18px;
  }
}
</style>
