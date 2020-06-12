<template>
  <el-container>
    <el-header height="60px">
      <div>
        <img src="../../src/assets/img/masks.png" alt="mask">
        <span>防疫登记后台管理系统</span>
      </div>
    </el-header>
    <el-container>
      <el-aside width="230px">
        <ManageAside/>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import ManageAside from "../components/Manage/ManageAside";

  export default {
    name: "Manage",
    components: {ManageAside},
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
        height: 55px;
      }

      span {
        margin-left: 5px;
      }
    }

    a {
      font-size: 14px;
    }

  }


  .el-main {
    background: #ffffff;

  }

</style>
