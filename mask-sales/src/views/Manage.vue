<template>
  <el-container>
    <el-header height="70px">
      <div>
        <img src="../../src/assets/img/masks.png" alt="mask">
        <span>口罩销售管理系统</span>
      </div>

    </el-header>
    <el-container>
      <el-aside width="330px"></el-aside>
      <el-main></el-main>
    </el-container>

  </el-container>

</template>

<script>
  export default {
    name: "Manage",
    methods: {
      logout() {
        window.sessionStorage.clear();
        this.$router.push('/login');
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-container {
    height: 100%;
  }

  .el-header {
    background: #409EFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    font-size: 25px;

    > div {
      display: flex;
      align-items: center;

      img {
        height: 65px;
      }

      span {
        margin-left: 5px;
      }
    }

    a {
      font-size: 14px;
    }

  }

  .el-aside {
    background: #ffffff;
    border-right: #E6E6E6 solid 1px;
  }

  .el-main {
    background: #ffffff;
  }


</style>
