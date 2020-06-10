<template>
  <Aside>
    <el-submenu v-for="item in menu" :index="item.id" :key="item.id">
      <template slot="title">
        <span>{{item.title}}</span>
      </template>
      <el-menu-item v-for="subItem in item.sub" :index="subItem.id" :key="subItem.id">
        {{subItem.title}}
      </el-menu-item>
    </el-submenu>
  </Aside>
</template>

<script>
  import Aside from "../Common/Aside";

  export default {
    name: "ManageAside",
    data() {
      return {
        menu: [
          {
            id: "0",
            title: "菜单一",
            sub: [{id: "0", title: "序号一"}, {id: "1", title: "序号一"}, {id: "2", title: "序号一"}]
          },
          {
            id: "1",
            title: "菜单一",
            sub: [{id: "0", title: "序号一"}, {id: "1", title: "序号一"}, {id: "2", title: "序号一"}]
          },
          {
            id: "2",
            title: "菜单一",
            sub: [{id: "0", title: "序号一"}, {id: "1", title: "序号一"}, {id: "2", title: "序号一"}]
          }
        ]
      }
    },
    components: {Aside}
  }
</script>

<style scoped>

</style>
