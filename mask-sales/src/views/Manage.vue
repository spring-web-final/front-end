<template>
  <el-container>
    <el-header height="70px">
      <div>
        <img src="../../src/assets/img/masks.png" alt="mask">
        <span>人员登记系统</span>
      </div>
    </el-header>
    <el-container>
      <el-aside width="280px">
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
  import ManageMain from "../components/Manage/ManageMain";

  export default {
    name: "Manage",
    components: {ManageMain, ManageAside},
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


  .el-main {
    background: #ffffff;
    border-left: 1px solid #e6e6e6 !important;

  }

</style>
