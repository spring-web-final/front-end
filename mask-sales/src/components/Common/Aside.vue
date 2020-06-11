<template>
  <el-card shadow="hover">
    <el-menu
      :unique-opened="true"
      text-color="#909399"
      active-text-color="#303133"
      router
      :default-active="activePath">
      <slot></slot>
    </el-menu>
  </el-card>

</template>

<script>
  export default {
    name: "Aside",
    data(){
      return{
        activePath:''
      }
    },
    created() {
      this.activePath = window.sessionStorage.getItem('activePath');
    }
  }
</script>

<style scoped>
  .el-tabs{
    height: 100%;
  }
  .el-menu {
    border-right: none;
  }
  .el-card{
    margin-top: 67%;
    margin-left: 10%;
  }
</style>
