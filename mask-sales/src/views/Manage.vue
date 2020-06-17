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
    }
  }
</script>

<style scoped lang="scss">
  .el-container {
    height: 100%;
  }

  .el-header {
    background: rgba(64, 158, 255, 0.86);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    font-size: 25px;
    box-shadow: 0 3px 3px rgba(144, 147, 153, 0.4);
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

  .el-aside{
    background: rgba(192, 196, 204, 0.1);

  }
  .el-main {
    background: rgba(192, 196, 204, 0.1);
  }

</style>
