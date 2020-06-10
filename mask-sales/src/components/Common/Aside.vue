<template>
  <el-menu
    :unique-opened="true"
    text-color="#909399"
    active-text-color="#303133">
    <slot></slot>
  </el-menu>
</template>

<script>
  export default {
    name: "Aside"
  }
</script>

<style scoped>
  .el-menu{
    border-right: none;
  }
</style>
